import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const TEAM_COLORS = {
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  ferrari: "#E8002D",
  mercedes: "#27F4D2",
  aston_martin: "#229971",
  alpine: "#0093CC",
  williams: "#64C4FF",
  rb: "#6692FF",
  alphatauri: "#5E8FAA",
  toro_rosso: "#469BFF",
  sauber: "#52E252",
  alfa: "#C92D4B",
  audi: "#BB0A30",
  haas: "#B6BABD",
  cadillac: "#C8A45A",
  racing_point: "#F596C8",
  force_india: "#F596C8",
  renault: "#FFF500",
};

const FALLBACK_COLORS = ["#a78bfa", "#f472b6", "#facc15", "#34d399", "#fb7185", "#38bdf8"];

function teamColor(constructorId) {
  if (TEAM_COLORS[constructorId]) return TEAM_COLORS[constructorId];
  let h = 0;
  for (const ch of constructorId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return FALLBACK_COLORS[h % FALLBACK_COLORS.length];
}

// Cache lap data per race so reopening a race doesn't refetch every page.
const lapsCache = new Map();
const PAGE = 100;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getPage(url, signal, attempt = 0) {
  try {
    return await axios.get(url, { signal });
  } catch (err) {
    if (err.response?.status === 429 && attempt < 4) {
      await sleep(1000 * (attempt + 1));
      return getPage(url, signal, attempt + 1);
    }
    throw err;
  }
}

// Returns { [lapNumber]: { [driverId]: position } }
async function fetchLaps(year, round, signal) {
  const key = `${year}/${round}`;
  if (lapsCache.has(key)) return lapsCache.get(key);

  const base = `${import.meta.env.VITE_BASE_URL}${year}/${round}/laps/?limit=${PAGE}`;
  const laps = {};
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const res = await getPage(`${base}&offset=${offset}`, signal);
    const data = res.data.MRData;
    total = Number(data.total);
    const race = data.RaceTable.Races[0];
    // A lap can be split across two pages, so merge timings by lap number.
    for (const lap of race?.Laps || []) {
      const n = Number(lap.number);
      laps[n] ??= {};
      for (const t of lap.Timings) laps[n][t.driverId] = Number(t.position);
    }
    offset += PAGE;
    if (offset < total) await sleep(250); // stay under the API burst limit
  }

  lapsCache.set(key, laps);
  return laps;
}

// Layout constants (SVG user units)
const ROW = 28;
const TOP = 16;
const BOTTOM = 30;
const LEFT = 34;
const RIGHT = 56;
const VIEW_W = 600; // matches the panel width so text renders ~1:1

function smoothPath(points) {
  if (points.length === 0) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (y0 === y1) {
      d += ` L${x1},${y1}`;
    } else {
      const mx = (x0 + x1) / 2;
      d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
    }
  }
  return d;
}

function PositionChart({ year, round, results }) {
  const [state, setState] = useState({ key: null, laps: null, error: false });
  const [hovered, setHovered] = useState(null);
  const key = `${year}/${round}`;

  useEffect(() => {
    if (!results?.length) return;
    const controller = new AbortController();
    fetchLaps(year, round, controller.signal)
      .then((laps) => setState({ key, laps, error: false }))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log("Error fetching laps", err);
          setState({ key, laps: null, error: true });
        }
      });
    return () => controller.abort();
  }, [year, round, key, results]);

  const chart = useMemo(() => {
    const laps = state.key === key ? state.laps : null;
    if (!laps || !results?.length) return null;
    const lapNumbers = Object.keys(laps).map(Number).sort((a, b) => a - b);
    if (lapNumbers.length === 0) return { empty: true };

    const totalLaps = lapNumbers[lapNumbers.length - 1];
    const n = results.length;

    const width = VIEW_W;
    const lapW = (VIEW_W - LEFT - RIGHT) / totalLaps;
    const height = TOP + (n - 1) * ROW + BOTTOM;
    const x = (lap) => LEFT + lap * lapW;
    const y = (pos) => TOP + (Math.min(pos, n) - 1) * ROW;

    // Count teammates to dash the second driver of each team.
    const seenTeams = {};

    const drivers = results.map((r) => {
      const id = r.Driver.driverId;
      const team = r.Constructor.constructorId;
      const dashed = seenTeams[team] === true;
      seenTeams[team] = true;
      const code = r.Driver.code || r.Driver.familyName.slice(0, 3).toUpperCase();
      const grid = Number(r.grid) > 0 ? Number(r.grid) : n; // grid 0 = pit lane start

      const points = [[x(0), y(grid)]];
      let lastLap = 0;
      for (const lap of lapNumbers) {
        const pos = laps[lap][id];
        if (pos == null) continue;
        points.push([x(lap), y(pos)]);
        lastLap = lap;
      }

      const finalPos = Number(r.position);
      // Cars that took the flag (incl. lapped ones: "+1 Lap", "Lapped") run to the
      // last lap at their classified position; retirements end where they stopped.
      const tookFlag = r.status === "Finished" || r.status === "Lapped" || r.status?.startsWith("+");
      const finished = tookFlag && /^\d+$/.test(r.positionText) && lastLap > 0;
      if (finished) {
        if (lastLap < totalLaps) points.push([x(totalLaps), y(finalPos)]);
        else points[points.length - 1] = [x(totalLaps), y(finalPos)];
      }

      return {
        id,
        code,
        color: teamColor(team),
        dashed,
        grid,
        finalPos,
        finished,
        points,
        path: smoothPath(points),
        end: points[points.length - 1],
      };
    });

    const ticks = [1];
    for (let l = 5; l <= totalLaps; l += 5) ticks.push(l);
    if (ticks[ticks.length - 1] !== totalLaps) ticks.push(totalLaps);

    return { width, height, n, totalLaps, drivers, ticks, x, y };
  }, [state, key, results]);

  if (!results?.length) return null;

  const loading = state.key !== key;

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-4 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Position Changes
      </h3>

      {loading && (
        <div className="flex flex-1 justify-center items-center p-12">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {!loading && (state.error || !chart || chart.empty) && (
        <p className="flex-1 flex items-center justify-center text-center text-slate-500 p-8">
          {state.error ? "Could not load lap data." : "No lap-by-lap data available for this race."}
        </p>
      )}

      {!loading && chart && !chart.empty && (
        <div className="overflow-x-auto flex-1">
          <svg
            viewBox={`0 0 ${chart.width} ${chart.height}`}
            className="w-full h-auto"
            onMouseLeave={() => setHovered(null)}
          >
            {/* Horizontal grid lines + position labels */}
            {Array.from({ length: chart.n }, (_, i) => i + 1).map((pos) => (
              <g key={pos}>
                <line x1={chart.x(0)} x2={chart.x(chart.totalLaps)} y1={chart.y(pos)} y2={chart.y(pos)} stroke="#1e293b" strokeWidth="1" />
                <text x={10} y={chart.y(pos)} dy="0.35em" fill="#94a3b8" fontSize="10" textAnchor="middle">{pos}</text>
              </g>
            ))}

            {/* Lap axis */}
            {chart.ticks.map((lap) => (
              <text key={lap} x={chart.x(lap)} y={chart.height - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">{lap}</text>
            ))}

            {/* Driver lines */}
            {chart.drivers.map((d) => {
              const dim = hovered && hovered !== d.id;
              return (
                <g
                  key={d.id}
                  opacity={dim ? 0.15 : 1}
                  onMouseEnter={() => setHovered(d.id)}
                  style={{ cursor: "pointer", transition: "opacity 150ms" }}
                >
                  <title>{`${d.code}: P${d.grid} → ${d.finished ? `P${d.finalPos}` : "DNF"}`}</title>
                  <path d={d.path} fill="none" stroke="transparent" strokeWidth="8" />
                  <path
                    d={d.path}
                    fill="none"
                    stroke={d.color}
                    strokeWidth={hovered === d.id ? 3 : 2}
                    strokeDasharray={d.dashed ? "5 3" : undefined}
                    strokeLinejoin="round"
                  />
                  {d.points.map(([px, py], i) => (
                    <circle key={i} cx={px} cy={py} r={chart.totalLaps > 60 ? 1.2 : 1.8} fill={d.color} />
                  ))}
                  {!d.finished && (
                    <text x={d.end[0] + 4} y={d.end[1]} dy="0.35em" fill={d.color} fontSize="10" fontWeight="700">
                      {d.code}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Final classification labels on the right */}
            {chart.drivers.filter((d) => d.finished).map((d) => (
              <text
                key={d.id}
                x={chart.x(chart.totalLaps) + 8}
                y={chart.y(d.finalPos)}
                dy="0.35em"
                fill={d.color}
                fontSize="11"
                fontWeight="700"
                opacity={hovered && hovered !== d.id ? 0.3 : 1}
                onMouseEnter={() => setHovered(d.id)}
                style={{ cursor: "pointer" }}
              >
                {d.code}
              </text>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

export default PositionChart;

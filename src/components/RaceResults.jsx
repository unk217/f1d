import axios from "axios";
import React, { useEffect, useState } from "react";

function RaceResults({ round, year }) {
  const [raceResults, setRaceResults] = useState(null);
  const [fastestLap, setFastestLap] = useState(null);
  const [raceName, setRaceName] = useState("");
  const [country, setCountry] = useState("");
  const [circuit, setCircuit] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}${year}/${round}/results`;
        const res = await axios.get(apiUrl);
        const raceData = res.data.MRData.RaceTable.Races[0];

        const results = raceData?.Results || [];

        const fastest = results.find(
          (r) => r.FastestLap && r.FastestLap.rank === "1"
        );

        setFastestLap(
          fastest
            ? {
                driver: `${fastest.Driver.givenName} ${fastest.Driver.familyName}`,
                lapTime: fastest.FastestLap.Time.time,
                lap: fastest.FastestLap.lap,
                //speed: fastest.FastestLap.AverageSpeed.speed,
                //speedUnits: fastest.FastestLap.AverageSpeed.units,
              }
            : null
        );

        setRaceResults(results);
        setRaceName(raceData?.raceName || "Unknown Race");
        setCountry(raceData.Circuit.Location.country || "Unknown Country");
        setCircuit(raceData.Circuit.circuitName || "Unknown Circuit");
      } catch (error) {
        console.log("Error fetching race results", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceResults();
  }, [round, year]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  if (!raceResults || raceResults.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-900/30 rounded-xl border border-slate-800/50">
        <p className="text-slate-400 font-medium text-lg">No results found for this race.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-6 drop-shadow-sm">
        {raceName} - Race
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 overflow-x-auto pb-4">
          <div className="min-w-[600px] w-full rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/80 border-b border-slate-700/50">
                  <th className="px-4 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider w-12">Pos</th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Driver</th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Team</th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {raceResults.map((result, index) => (
                  <tr key={index} className="hover:bg-slate-800/40 transition-colors duration-200">
                    <td className="px-4 py-3 text-center whitespace-nowrap text-sm font-bold text-slate-300">
                      {result.position}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        {/*<img
                          src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${year}Drivers/${result.Driver.familyName}`}
                          alt={result.Driver.familyName}
                          className="w-8 h-8 rounded-full object-cover border-2 border-slate-700/50 mr-3"
                          onError={(e) => {
                            e.target.src = "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2024Drivers/helmet.png";
                            e.target.className = "w-8 h-8 rounded-full object-cover mr-3 opacity-50";
                          }}
                        />*/}
                        <div>
                          <p className="font-semibold text-slate-200">{result.Driver.givenName} {result.Driver.familyName}</p>
                          <p className="text-xs text-slate-500">{result.status}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-400">
                      {result.Constructor.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-blue-400">
                      {result.Time?.time || result.status}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-400 text-right">
                      {result.points > 0 ? `+${result.points}` : '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 backdrop-blur-xl p-6 shadow-xl flex flex-col items-center">
            <h3 className="text-lg font-bold text-white mb-2 text-center">{circuit}</h3>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-4">{country}</p>
            <div className="bg-slate-800/30 p-4 rounded-xl w-full flex justify-center border border-slate-700/50">
              <img
                src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${country.replace(/ /g, '_')}_Circuit`}
                alt={`${circuit} map`}
                className="max-h-48 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          </div>

          {fastestLap && (
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-slate-900/60 backdrop-blur-xl p-6 shadow-xl shadow-blue-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <svg className="w-16 h-16 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              </div>
              <p className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Fastest Lap
              </p>
              <h4 className="text-2xl font-extrabold text-white mb-1">{fastestLap.driver}</h4>
              <div className="flex flex-col gap-2 mt-4 text-sm">
                <div className="flex justify-between border-b border-blue-500/20 pb-2">
                  <span className="text-slate-400">Time</span>
                  <span className="font-mono font-bold text-blue-300">{fastestLap.lapTime}</span>
                </div>
                <div className="flex justify-between border-b border-blue-500/20 pb-2">
                  <span className="text-slate-400">Lap Number</span>
                  <span className="font-semibold text-slate-200">{fastestLap.lap}</span>
                </div>
                {/* {fastestLap.speed && (
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Avg Speed</span>
                    <span className="font-semibold text-slate-200">{fastestLap.speed} {fastestLap.speedUnits}</span>
                  </div>
                )} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RaceResults;

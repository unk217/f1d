import axios from "axios";
import React, { useEffect, useState } from "react";
import { Td } from "./UI";

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
        const apiUrl = `${
          import.meta.env.VITE_BASE_URL
        }${year}/${round}/results`;
        const res = await axios.get(apiUrl);
        const raceData = res.data.MRData.RaceTable.Races[0];

        const results = raceData?.Results || [];

        // Buscar la vuelta más rápida
        const fastest = results.filter(
          (r) => r.FastestLap && r.FastestLap.rank === "1"
        )[0];

        setFastestLap(
          fastest
            ? {
                driver: `${fastest.Driver.givenName} ${fastest.Driver.familyName}`,
                lapTime: fastest.FastestLap.Time.time,
                lap: fastest.FastestLap.lap,
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

  if (loading)
    return <p className="text-white font-semibold">Loading race results...</p>;
  if (!raceResults || raceResults.length === 0)
    return (
      <p className="text-white font-semibold">
        No results found for this race.
      </p>
    );

  return (
    <div className="mt-8 p-4 rounded">
      <h2 className="text-lg font-bold text-white mb-4">{raceName} - Race</h2>

      <div className="lg:grid grid-cols-4 grid-rows-2 gap-3">
        <div className="col-span-2 row-span-2 overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-cyan-600">
                <th className="text-white">Position</th>
                <th className="text-white">Driver</th>
                <th className="text-white">Team</th>
                <th className="text-white">Time</th>
                <th className="text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((result, index) => (
                <tr
                  key={index}
                  className="text-white text-sm border-b border-gray-600"
                >
                  <td className="text-center">{result.position}</td>
                  <td className="py-1 flex items-center">
                    <img
                      src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${year}Drivers/${result.Driver.familyName}`}
                      alt={result.Driver.givenName}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    {result.Driver.familyName}
                  </td>
                  <Td>{result.Constructor.name}</Td>
                  <Td>{result.Time?.time || "No time"}</Td>
                  <Td>{result.status}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-1 col-span-2">
          <ul>
            <li>
              <h1 className="flex justify-center font-bold text-white">
                {circuit}
              </h1>
            </li>
            <li>
              <div>
                <img
                  src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${country}_Circuit`}
                  alt=""
                />
              </div>
            </li>
            {fastestLap && (
              <li className="mt-4 text-white text-sm text-center">
                <p>
                  <strong>Fastest Lap:</strong> {fastestLap.driver}
                </p>
                <p>
                  <strong>Time:</strong> {fastestLap.lapTime}
                </p>
                <p>
                  <strong>Lap:</strong> {fastestLap.lap}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RaceResults;

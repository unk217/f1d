import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RaceResults({ round }) {
  const [raceResults, setRaceResults] = useState(null);
  const [raceName, setRaceName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const apiUrl = `https://api.jolpi.ca/ergast/f1/2024/${round}/results`;
        const res = await axios.get(apiUrl);

        const raceData = res.data.MRData.RaceTable.Races[0];
        setRaceResults(raceData?.Results || []);
        setRaceName(raceData?.raceName || 'Unknown Race');
      } catch (error) {
        console.log('Error fetching race results', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceResults();
  }, [round]);

  if (loading) {
    return <p>Loading race results...</p>;
  }

  if (!raceResults || raceResults.length === 0) {
    return <p>No results found for this race.</p>;
  }

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-4">Resultados de la carrera: {raceName}</h2>
      <ul className="list-disc pl-6">
        {raceResults.map((result, index) => (
          <li key={index}>
            {result.Driver.givenName} {result.Driver.familyName} - {result.position}° lugar
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RaceResults;

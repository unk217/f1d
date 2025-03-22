import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RaceResults({ round, year }) {
  const [raceResults, setRaceResults] = useState(null);
  const [raceName, setRaceName] = useState('');
  const [country, setCountry] = useState('')
  const [circuit, setCircuit] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}${year}/${round}/results`;
        const res = await axios.get(apiUrl);
        console.log(res)
        const raceData = res.data.MRData.RaceTable.Races[0];
        setRaceResults(raceData?.Results || []);
        setRaceName(raceData?.raceName || 'Unknown Race');
        setCountry(raceData.Circuit.Location.country || 'Circuit not found')
        setCircuit(raceData.Circuit.circuitName || 'Circuit not found')
        console.log(country)
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
    <div className=" mt-8 p-4  rounded">
      <h2 className="text-lg font-bold text-white mb-4">{raceName}</h2>
      
     {/* <ul className="list-disc pl-6">
        {raceResults.map((result, index) => (
          <li key={index} className='text-white'>
            {result.Driver.givenName} {result.Driver.familyName} - {result.position}° lugar
          </li>
        ))}
      </ul>
      */}
      <div>
      </div>

<div className="grid grid-cols-4 grid-rows-5 gap-3">
    <div className="col-span-2 row-span-5">
    <table>
        <thead>
          <tr>
            <th className="text-white">Posición</th>
            <th className="text-white">Piloto</th>
            <th className="text-white">Constructor</th>
            <th className="text-white">Tiempo</th>
            <th className="text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          {raceResults.map((result, index) => (
            <tr key={index} className="text-white">
              <td className="text-center">{result.position}</td>
              <td className="flex items-center">
                <img
                  src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${year}Drivers/${result.Driver.familyName}`}
                  alt={result.Driver.givenName}
                  className="w-8 h-8 mr-2 rounded-full"
                />
                {result.Driver.familyName}
              </td>
              <td>{result.Constructor.name}</td>
              <td>{result.Time?.time || 'No time'}</td>
              <td>{result.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="col-span-2 row-span-3 col-start-3  flex justify-center">
      <h1 className='text-white font-bold'>{circuit}</h1>
          <div>
          <img src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${country}_Circuit`} alt="" />
          </div>

      </div>
</div>
    
    </div>
  );
}

export default RaceResults;

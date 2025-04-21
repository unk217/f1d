import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Td} from "./UI"

function QualifyingResults({ round, year }) {
  const [raceResults, setRaceResults] = useState(null);
  const [raceName, setRaceName] = useState('');
  const [country, setCountry] = useState('')
  const [circuit, setCircuit] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}${year}/${round}/qualifying`;
        const res = await axios.get(apiUrl);
        console.log(res)
        const raceData = res.data.MRData.RaceTable.Races[0];
        setRaceResults(raceData?.QualifyingResults || []);
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
      <h2 className="text-lg font-bold text-white mb-4">{raceName} - Qualifying</h2>
      
      <div>
      </div>

<div className="lg:grid grid-cols-4 grid-rows-2 gap-3 overflow-x-auto">
    <div className="col-span-2 row-span-2 ">
    <table className='table-auto w-full border-collapse'>
        <thead>
          <tr className='bg-cyan-800'>
            <th className="text-white ">Position</th>
            <th className="text-white">Driver</th>
            <th className="text-white">Team</th>
            <th className="text-white">Q1</th>
            <th className="text-white">Q2</th>
            <th className="text-white">Q3</th>
            
          </tr>
        </thead>
        <tbody >
          {raceResults.map((result, index) => (
            <tr key={index} className="text-white text-sm border-b border-gray-700">
              <td className="text-center">{result.position}</td>
              <td className="py-1 flex items-center">
                <img
                  src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${year}Drivers/${result.Driver.familyName}`}
                  alt={result.Driver.familyName}
                  className="w-8 h-8 mr-2 rounded-full"
                />
                {result.Driver.familyName}
              </td>
              <td className='px-10'>{result.Constructor.name}</td>
              <Td>{result.Q1 || '-'}</Td>
              <Td>{result.Q2 || '-'}</Td>
              <Td>{result.Q3 || '-'}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* <div className="col-span-2 row-span-3 col-start-3  flex justify-center">
      <h1 className='text-white font-bold'>{circuit}</h1>
          <div>
          <img src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${country}_Circuit`} alt="" />
          </div>

      </div> */}
</div>
    
    </div>
  );
}

export default QualifyingResults;

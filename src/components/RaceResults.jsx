import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RaceResults({ round, year }) {
  const [raceResults, setRaceResults] = useState(null);
  const [raceName, setRaceName] = useState('');
  const [country, setCountry] = useState('')
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
      <ul className="list-disc pl-6">
        {raceResults.map((result, index) => (
          <li key={index} className='text-white'>
            {result.Driver.givenName} {result.Driver.familyName} - {result.position}° lugar
          </li>
        ))}
      </ul>
      <div>
        <img src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${country}_Circuit`} alt="" />
      </div>
{/*
<div className="grid grid-cols-4 grid-rows-5 gap-3">
    <div className="col-span-2 row-span-5 bg-slate-300">
      1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum totam ducimus officia, in nostrum, debitis architecto quibusdam non iste asperiores aperiam? Quia, corrupti itaque! Dolorum laborum vel totam facere natus?
    </div>
    <div className="col-span-2 row-span-3 col-start-3 bg-red-900 flex justify-center">
      2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse modi illum ad, placeat officiis quidem. Quasi, autem esse? Id sapiente quam minus ex consequuntur error ipsa officiis culpa rem aliquam?
      </div>
</div>
    */}
    </div>
  );
}

export default RaceResults;

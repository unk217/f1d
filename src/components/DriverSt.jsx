import React, { useMemo, useState } from 'react';
import axios from 'axios';
import DynaTable from './DynaTable';
import { Input } from './UI';

function DriverSt() {
  const columns = useMemo(() => [
    {
      header: "Position",
      accessorKey: "position",
    },
    {
      header: "Driver",
      accessorKey: "driverName",
    },
    {
      header: "Nationality",
      accessorKey: "national",
    },
    {
      header: "Team",
      accessorKey: "constructor",
    },
    {
      header: "Points",
      accessorKey: "points",
    },
    {
      header: "Wins",
      accessorKey: "wins",
    },
  ], []);

  const [year, setYear] = useState('');
  const [standings, setStandings] = useState([]);
  const [season, setSeason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStandings = (year) => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BASE_URL}${year}/driverstandings/`)
      .then(response => {
        const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => ({
          position: driver.position,
          driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          national: driver.Driver.nationality,
          constructor: driver.Constructors[0].name,
          points: driver.points,
          wins: driver.wins,
        }));
        setStandings(standings);
        setSeason(response.data.MRData.StandingsTable.season);
        setError('');
        console.log(response)
        console.log(standings)
      })
      .catch(error => {
        setError('Error fetching data');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (year) {
      fetchStandings(year);
    } else {
      setError('Please enter a year');
    }
  };
  console.log(standings)
  return (
    <div>
      <h1 className='text-slate-400 text-2xl font-bold uppercase flex justify-center p-5'>Season {season}</h1>
      <form className='flex justify-center' onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleInputChange}
        />
        <button className='rounded-lg font-bold min-w-32 bg-indigo-500 hover:bg-indigo-400'
        type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Standings'}
        </button>
      </form>

      {error && <p className='flex justify-center p-3 text-slate-800 font-bold'>{error}</p>}

      {standings.length > 0 && <DynaTable columns={columns} data={standings} />}
    </div>
  );
}

export default DriverSt;

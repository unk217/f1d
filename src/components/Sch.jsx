import React, { useMemo, useState } from 'react';
import axios from 'axios';
import DynaTable from './DynaTable';

function Sch() {
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
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSchedule = (year) => {
    setLoading(true);
    axios.get(`https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`)
      .then(response => {
        const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => ({
          position: driver.position,
          driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          constructor: driver.Constructors[0].name,
          points: driver.points,
          wins: driver.wins,
        }));
        setSchedule(standings);
        setError('');
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
      fetchSchedule(year);
    } else {
      setError('Please enter a year');
    }
  };

  return (
    <div>
      <form className='flex justify-center' onSubmit={handleSubmit}>
        <input
          className='flex justify-center'
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Standings'}
        </button>
      </form>

      {error && <p>{error}</p>}

      {schedule.length > 0 && <DynaTable columns={columns} data={schedule} />}
    </div>
  );
}

export default Sch;

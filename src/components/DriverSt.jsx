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
      header: "Photo",
      accessorKey: "photo",
      Cell: ({ cell }) => (
        <img src={cell.getValue()} alt="Driver" style={{ width: '50px', height: 'auto' }} />
      ),
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
          photo: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${response.data.MRData.StandingsTable.season}Drivers/${driver.Driver.familyName}`,
          driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          national: driver.Driver.nationality,
          constructor: driver.Constructors[0].name,
          points: driver.points,
          wins: driver.wins,
        }));
        setStandings(standings);
        setSeason(response.data.MRData.StandingsTable.season);
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
      fetchStandings(year);
    } else {
      setError('Please enter a year');
    }
  };
  

  return (
    <div className='flex flex-col items-center justify-center w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className="text-center space-y-2 mt-4">
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-4xl md:text-5xl font-extrabold tracking-tight'>
          Driver Standings
        </h1>
        {season && <p className="text-slate-400 text-lg font-medium">Season {season}</p>}
      </div>

      <div className="w-full max-w-md backdrop-blur-md bg-slate-900/50 p-6 rounded-2xl border border-slate-800/60 shadow-xl">
        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <Input
               type="text"
               placeholder="YYYY"
               value={year}
               onChange={handleInputChange}
               className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl text-slate-200 placeholder-slate-500 transition-all outline-none"
            />
          </div>
          <button 
            className='inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20'
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className='bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-3 rounded-xl font-medium animate-in fade-in'>
          {error}
        </div>
      )}

      <div className="w-full mt-6">
        {standings.length > 0 && <DynaTable columns={columns} data={standings} />}
      </div>
    </div>
  );
}

export default DriverSt;

import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import DynaTable from './DynaTable';
import MySelect from './MySelect';

function DriverSt() {
  const columns = useMemo(
    () => [
      {
        header: "Position",
        accessorKey: "position",
      },
      /*{
      header: "Photo",
      accessorKey: "photo",
      Cell: ({ cell }) => (
        <img src={cell.getValue()} alt="Driver" style={{ width: '50px', height: 'auto' }} />
      ),
    },*/
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
        cell: ({ getValue }) => (
          <span className="text-success">{getValue()}</span>
        ),
      },
      {
        header: "Wins",
        accessorKey: "wins",
        cell: ({ getValue }) => (
          <span className="text-amber-300">{getValue()}</span>
        ),
      },
    ],
    [],
  );

  const [selectedYear, setSelectedYear] = useState(2026);
  const [seasons, setSeasons] = useState([]);
  const [standings, setStandings] = useState([]);
  const [season, setSeason] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const apiUrls = `${import.meta.env.VITE_BASE_URL}seasons/?limit=80`;
        const res = await axios.get(apiUrls);
        const seasonsData = res.data.MRData.SeasonTable.Seasons.map((s) => ({
          value: parseInt(s.season),
          label: s.season,
        })).sort((a, b) => b.value - a.value);
        
        setSeasons(seasonsData);
      } catch (error) {
        console.error("Error fetching seasons", error);
      }
    };
    fetchSeasons();
  }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${selectedYear}/driverstandings/`);
        const lists = response.data.MRData.StandingsTable.StandingsLists;
        
        if (lists && lists.length > 0) {
          const parsedStandings = lists[0].DriverStandings.map(driver => ({
            position: driver.position,
            //photo: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${response.data.MRData.StandingsTable.season}Drivers/${driver.Driver.familyName}`,
            driverName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            national: driver.Driver.nationality,
            constructor: driver.Constructors[0].name,
            points: driver.points,
            wins: driver.wins,
          }));
          setStandings(parsedStandings);
          setSeason(response.data.MRData.StandingsTable.season);
        } else {
          setStandings([]);
          setSeason('');
          setError('No driver standings available for this season.');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [selectedYear]);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className="relative z-50 flex flex-col sm:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl shadow-xl gap-4 w-full">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
            Driver Standings
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">
            Select a season to view driver championship standings
          </p>
        </div>
        <div className="w-full sm:w-64">
          <MySelect
            options={seasons}
            value={seasons.find((s) => s.value === selectedYear)}
            onChange={handleYearChange}
          />
        </div>
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

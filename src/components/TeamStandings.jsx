import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import DynaTable from "./DynaTable";
import MySelect from "./MySelect";
import { Input } from "./UI/Input";

function TeamStandings() {
  
  const columns = useMemo(
    () => [
      {
        header: "Position",
        accessorKey: "position",
      },
      {
        header: "Team",
        accessorKey: "name",
      },
      {
        header: "Nationality",
        accessorKey: "nation",
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
          <span className="text-amber-200">{getValue()}</span>
        ),
      },
    ],
    [],
  );

  const [seasons, setSeasons] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [standings, setStandings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const apiUrls = `${import.meta.env.VITE_BASE_URL}seasons/?limit=80`;
        const res = await axios.get(apiUrls);
        const seasonsData = res.data.MRData.SeasonTable.Seasons.map((season) => ({
          value: parseInt(season.season),
          label: season.season,
        })).sort((a, b) => b.value - a.value); // Ordenar de forma descendente
        
        setSeasons(seasonsData);
      } catch (error) {
        console.log("Error fetching seasons", error);
      }
    };
    fetchSeasons();
  }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${selectedYear}/constructorstandings/`
        );
        const lists = res.data.MRData.StandingsTable.StandingsLists;

        if (lists && lists.length > 0) {
          const fetchedStandings = lists[0].ConstructorStandings.map(
            (team) => ({
              position: team.position,
              name: team.Constructor.name,
              nation: team.Constructor.nationality,
              points: team.points,
              wins: team.wins,
            })
          );
          setStandings(fetchedStandings);
        } else {
          setStandings([]);
          setError("No team standings available for this season.");
        }
      } catch (error) {
        setError("Error fetching data");
        setStandings([]);
        console.error("Error fetching standings:", error);
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
    <div className="flex flex-col items-center justify-center w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative z-50 flex flex-col sm:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl shadow-xl gap-4 w-full">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-tight">
            Team Standings
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">
            Select a season to view constructor championship standings
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
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-3 rounded-xl font-medium animate-in fade-in">
          {error}
        </div>
      )}

      <div className="w-full mt-6">
        {standings.length > 0 && (
          <DynaTable columns={columns} data={standings} />
        )}
      </div>
    </div>
  );
}

export default TeamStandings;

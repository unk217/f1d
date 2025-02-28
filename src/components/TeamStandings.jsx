import React, { useMemo, useState } from "react";
import axios from "axios";
import DynaTable from "./DynaTable";
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
      },
      {
        header: "Wins",
        accessorKey: "wins",
      },
    ],
    []
  );

  const [year, setYear] = useState("");
  const [standings, setStandings] = useState([]);
  const [season, setSeason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStandings = async (year) => {
    setLoading(true);
    setError(""); // Resetear error al iniciar la solicitud

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${year}/constructorstandings/`
      );
      const standings =
        res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
          (team) => ({
            position: team.position,
            name: team.Constructor.name,
            nation: team.Constructor.nationality,
            points: team.points,
            wins: team.wins,
          })
        );
      console.log(res);
      setStandings(standings);
      //setSeason(res.data.MRData.StandingsTable.season); // Actualizar el estado de la temporada
    } catch (error) {
      setError("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false); // Siempre desactiva el estado de carga
    }
  };

  const handleInputChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (year) {
      fetchStandings(year);
    } else {
      setError("Please enter a year");
    }
  };

  return (
    <div>
      <h1 className="text-slate-400 text-2xl font-bold uppercase flex justify-center p-5">
        Season {season}
      </h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        {/*/
        <input
          className='flex justify-center mr-4 rounded-lg'
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleInputChange}
        />
        */}
        <Input
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleInputChange}
        />
        <button
          className="rounded-lg font-bold min-w-36 bg-indigo-500 hover:bg-indigo-400"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Constructors"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {standings.length > 0 && <DynaTable columns={columns} data={standings} />}
    </div>
  );
}

export default TeamStandings;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import SchCard from "./SchCard";
import RaceResults from "./RaceResults";
import MySelect from "./MySelect";
import QualifyingResults from "./QualifyingResults";

function Schedule() {
  const [seasons, setSeasons] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025); // Estado para el año seleccionado

  const [viewMode, setViewMode] = useState(null); 

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const apiUrls = `${import.meta.env.VITE_BASE_URL}seasons/?limit=80`;
        const res = await axios.get(apiUrls);

        const seasons = res.data.MRData.SeasonTable.Seasons.map((season) => ({
          value: parseInt(season.season),
          label: season.season,
        })).sort((a, b) => b.value - a.value); // Ordenar de forma descendente

        setSeasons(seasons);
      } catch (error) {
        console.log("Error fetching seasons", error);
      }
    };
    fetchSeasons();
  }, []);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}${selectedYear}/races/`;
        const res = await axios.get(apiUrl);

        const schedule = res.data.MRData.RaceTable.Races.map((sch) => ({
          rname: sch.raceName,
          circuit: sch.Circuit.circuitName,
          country: sch.Circuit.Location.country,
          date: sch.date,
          round: sch.round,
        }));

        setSchedule(schedule);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    loadSchedule();
  }, [selectedYear]); // Se ejecuta cada vez que cambia el año seleccionado

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-start    p-3 bg font-bold">
        <h1 className="text-xl px-2 text-zinc-200">Select season</h1>
        <MySelect
          options={seasons}
          value={seasons.find((s) => s.value === selectedYear)}
          onChange={handleYearChange}
        />
      </div>

      {!selectedRound ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 justify-items-center">
          {schedule.map((sch) => (
            <SchCard
              key={sch.round}
              schedule={sch}
              onClick={() => setSelectedRound(sch.round)}
            />
          ))}
        </div>
      ) : (
        <div>
  <button
    className="rounded-lg min-w-32 p-2 bg-blue-500 text-white font-bold hover:bg-cyan-800"
    onClick={() => {
      setSelectedRound(null);
      setViewMode(null);
    }}
  >
    Back to races
  </button>

  <button
    className="rounded-lg min-w-32 p-2 bg-blue-500 text-white font-bold hover:bg-cyan-800 ml-2"
    onClick={() => setViewMode("qualifying")}
  >
    Qualifying
  </button>

  <button
    className="rounded-lg min-w-32 p-2 bg-blue-500 text-white font-bold hover:bg-cyan-800 ml-2"
    onClick={() => setViewMode("race")}
  >
    Race
  </button>

  {viewMode === "qualifying" && (
    <QualifyingResults round={selectedRound} year={selectedYear} />
  )}

  {viewMode === "race" && (
    <RaceResults round={selectedRound} year={selectedYear} />
  )}
</div>

      )}
    </div>
  );
}

export default Schedule;

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

        const formatDate = (dateStr) => {
          if (!dateStr) return null;
          const date = new Date(dateStr);
          return date.toLocaleDateString("en-EN", {
            month: "long",
            day: "numeric",
          });
        };

        const formatTime = (timeStr) => {
          if (!timeStr) return null;
          const date = new Date(`1970-01-01T${timeStr}`);
          return date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          });
        };

        const schedule = res.data.MRData.RaceTable.Races.map((sch) => {
          // Determinar cuál se usó para secondPractice
          let secondPractice = sch.SecondPractice || sch.SprintQualifying;
          let secondPracticeType = sch.SecondPractice
            ? "SecondPractice"
            : sch.SprintQualifying
            ? "SprintQualifying"
            : null;

          // Determinar cuál se usó para thirdPractice
          let thirdPractice = sch.ThirdPractice || sch.Sprint;
          let thirdPracticeType = sch.ThirdPractice
            ? "ThirdPractice"
            : sch.Sprint
            ? "Sprint"
            : null;

          return {
            rname: sch.raceName,
            circuit: sch.Circuit.circuitName,
            country: sch.Circuit.Location.country,

            firstPracticeDate: formatDate(sch.FirstPractice?.date),
            firstPracticeTime: formatTime(sch.FirstPractice?.time),

            secondPracticeDate: formatDate(secondPractice?.date),
            secondPracticeTime: formatTime(secondPractice?.time),
            secondPracticeType,

            thirdPracticeDate: formatDate(thirdPractice?.date),
            thirdPracticeTime: formatTime(thirdPractice?.time),
            thirdPracticeType,

            qualifyingDate: formatDate(sch.Qualifying?.date),
            qualifyingTime: formatTime(sch.Qualifying?.time),

            raceDate: formatDate(sch.date),
            raceTime: formatTime(sch.time),
            round: sch.round,
          };
        });

        console.log(res);
        console.log(schedule);

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
        <div className= "grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center">
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

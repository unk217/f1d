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
  const [selectedYear, setSelectedYear] = useState(2026); // Estado para el año seleccionado

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

        const formatDate = (dateStr, timeStr) => {
          if (!dateStr) return null;
          // Combine date and time to accurately determine local timezone date
          const dateTimeStr = timeStr ? `${dateStr}T${timeStr}` : `${dateStr}T00:00:00Z`;
          const date = new Date(dateTimeStr);
          return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            ...(!timeStr && { timeZone: "UTC" }),
          }).format(date);
        };

        const formatTime = (dateStr, timeStr) => {
          if (!timeStr) return null;
          // Combine with dateStr for accurate DST offset, fallback if not provided
          const dateTimeStr = dateStr ? `${dateStr}T${timeStr}` : `1970-01-01T${timeStr}`;
          const date = new Date(dateTimeStr);
          return date.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          });
        };

        const schedule = res.data.MRData.RaceTable.Races.map((sch) => {
          // Determinar cuál se usó para secondPractice
          let secondPractice = sch.SecondPractice || sch.SprintQualifying || sch.SprintShootout;
          let secondPracticeType = sch.SecondPractice
            ? "SecondPractice"
            : sch.SprintQualifying
            ? "SprintQualifying"
            : sch.SprintShootout
            ? "SprintShootout"
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

            firstPracticeDate: formatDate(sch.FirstPractice?.date, sch.FirstPractice?.time),
            firstPracticeTime: formatTime(sch.FirstPractice?.date, sch.FirstPractice?.time),

            secondPracticeDate: formatDate(secondPractice?.date, secondPractice?.time),
            secondPracticeTime: formatTime(secondPractice?.date, secondPractice?.time),
            secondPracticeType,

            thirdPracticeDate: formatDate(thirdPractice?.date, thirdPractice?.time),
            thirdPracticeTime: formatTime(thirdPractice?.date, thirdPractice?.time),
            thirdPracticeType,

            qualifyingDate: formatDate(sch.Qualifying?.date, sch.Qualifying?.time),
            qualifyingTime: formatTime(sch.Qualifying?.date, sch.Qualifying?.time),

            raceDate: formatDate(sch.date, sch.time),
            raceTime: formatTime(sch.date, sch.time),
            round: sch.round,
          };
        });

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
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <div className="relative z-50 flex flex-col sm:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl shadow-xl gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-tight">Race Schedule</h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Select a season to view the full calendar</p>
        </div>
        <div className="w-full sm:w-64">
          <MySelect
            options={seasons}
            value={seasons.find((s) => s.value === selectedYear)}
            onChange={handleYearChange}
          />
        </div>
      </div>

      {!selectedRound ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {schedule.map((sch) => (
            <SchCard
              key={sch.round}
              schedule={sch}
              onClick={() => setSelectedRound(sch.round)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              className="px-6 py-2.5 rounded-xl font-semibold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all shadow-lg"
              onClick={() => {
                setSelectedRound(null);
                setViewMode(null);
              }}
            >
              &larr; Back to Calendar
            </button>

            <button
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg border ${viewMode === "qualifying" ? "bg-cyan-600 border-cyan-500 text-white shadow-cyan-500/20" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setViewMode("qualifying")}
            >
              Qualifying Results
            </button>

            <button
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg border ${viewMode === "race" ? "bg-blue-600 border-blue-500 text-white shadow-blue-500/20" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"}`}
              onClick={() => setViewMode("race")}
            >
              Race Results
            </button>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl shadow-xl w-full animate-in fade-in slide-in-from-bottom-2">
            {viewMode === "qualifying" && (
              <QualifyingResults round={selectedRound} year={selectedYear} />
            )}

            {viewMode === "race" && (
              <RaceResults round={selectedRound} year={selectedYear} />
            )}

            {!viewMode && (
              <div className="text-center py-16 text-slate-500">
                <svg className="mx-auto h-12 w-12 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-lg font-medium">Select an option above</p>
                <p className="mt-1">View the Qualifying or Race results for this round.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;

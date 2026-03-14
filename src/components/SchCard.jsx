import React from "react";

function SchCard({ schedule, onClick, isNext }) {
  return (
    <div
      className={`relative group w-full max-w-sm backdrop-blur-xl border p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1 ${
        isNext
          ? "bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-orange-500/60 shadow-lg shadow-orange-500/20 hover:border-orange-400"
          : "bg-slate-900/60 border-slate-800/80 shadow-xl hover:bg-slate-800/80 hover:border-cyan-500/50 hover:shadow-cyan-500/20"
      }`}
      onClick={onClick}
    >
      {isNext && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-br-xl z-20 uppercase tracking-widest shadow-md">
          Next Race
        </div>
      )}

      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none select-none">
        <span className="text-8xl font-black italic text-white">
          {schedule.round}
        </span>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <div className="border-b border-slate-800 pb-4">
          <p className="text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
            Round {schedule.round}
          </p>
          <h1 className="font-extrabold text-xl text-slate-100 uppercase tracking-tight leading-tight">
            {schedule.rname}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium text-xs uppercase">
              Country
            </span>
            <span className="text-slate-300 font-semibold">
              {schedule.country}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-500 font-medium text-xs uppercase">
              Circuit
            </span>
            <span
              className="text-slate-300 font-semibold truncate"
              title={schedule.circuit}
            >
              {schedule.circuit}
            </span>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          {schedule.firstPracticeDate && (
            <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400 font-medium">Practice 1</span>
              <span className="text-right text-slate-300">
                {schedule.firstPracticeDate}, {schedule.firstPracticeTime}
              </span>
            </div>
          )}

          {schedule.secondPracticeDate && (
            <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400 font-medium">
                {schedule.secondPracticeType || "Practice 2"}
              </span>
              <span className="text-right text-slate-300">
                {schedule.secondPracticeDate}, {schedule.secondPracticeTime}
              </span>
            </div>
          )}

          {schedule.thirdPracticeDate && (
            <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/50">
              <span className="text-slate-400 font-medium">
                {schedule.thirdPracticeType || "Practice 3"}
              </span>
              <span className="text-right text-slate-300">
                {schedule.thirdPracticeDate}, {schedule.thirdPracticeTime}
              </span>
            </div>
          )}

          {schedule.qualifyingDate && (
            <div className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/50">
              <span className="text-cyan-500 font-semibold">Qualifying</span>
              <span className="text-right font-medium text-cyan-400">
                {schedule.qualifyingDate}, {schedule.qualifyingTime}
              </span>
            </div>
          )}

          {schedule.raceDate && (
            <div className="flex justify-between items-center text-xs py-1.5">
              <span className="text-blue-500 font-semibold">Race</span>
              <span className="text-right font-medium text-blue-400">
                {schedule.raceDate}, {schedule.raceTime}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SchCard;

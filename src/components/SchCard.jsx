import React from "react";
import { H1, SpanTitle, LiCard } from "./UI";


function SchCard({ schedule, onClick }) {
  /*  console.log(schedule) */
  return (
    <div
      className="bg-sky-950 p-3 rounded-xl  hover:bg-pink-900 hover:cursor-pointer
     w-full justify-items-start"
      onClick={onClick}
    >
      <ul className="flex flex-col gap-2">
        <LiCard>
        <h1 className="font-bold uppercase text-slate-200">{schedule.rname}</h1>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">Country:</span>
          <SpanTitle>{schedule.country}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">Circuit:</span>
          <SpanTitle>{schedule.circuit}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">FirtsPractice</span>
          <SpanTitle>{schedule.firstPracticeDate}, {schedule.firstPracticeTime}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">{schedule.secondPracticeType}</span>
          <SpanTitle>{schedule.secondPracticeDate}, {schedule.secondPracticeTime}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">{schedule.thirdPracticeType}</span>
          <SpanTitle>{schedule.thirdPracticeDate}, {schedule.thirdPracticeTime}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">Qualifying</span>
          <SpanTitle>{schedule.qualifyingDate}, {schedule.qualifyingTime}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">Race</span>
          <SpanTitle>{schedule.raceDate}, {schedule.raceTime}</SpanTitle>
        </LiCard>
        <LiCard>
          <span className="font-bold text-gray-400">Round</span>
          <SpanTitle>{schedule.round}</SpanTitle>
        </LiCard>
      </ul>
      {/* <h1 className="font-bold uppercase text-slate-200">{schedule.rname}</h1>
      <h1 className="text-teal-200">Country: {schedule.country}</h1>
      <h1 className="italic text-amber-200">Circuit: {schedule.circuit}</h1>
        <H1>FirstPractice: {schedule.firstPracticeDate}, {schedule.firstPracticeTime}</H1>
        <H1>{schedule.secondPracticeType}: {schedule.secondPracticeDate}, {schedule.secondPracticeTime}</H1>
        <H1>{schedule.thirdPracticeType}: {schedule.thirdPracticeDate}, {schedule.thirdPracticeTime}</H1>
        <H1>Qualifying: {schedule.qualifyingDate}, {schedule.qualifyingTime}</H1>
        <H1>Race: {schedule.raceDate}, {schedule.raceTime}</H1>
        <h1 className='italic font-bold text-slate-400'>Round: {schedule.round}</h1> */}
    </div>
  );
}

export default SchCard;

import React from "react";
import { H1, SpanTitle, LiCard, Span } from "./UI";

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
          <h1 className="font-bold uppercase text-slate-200">
            {schedule.rname}
          </h1>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">Country:</Span>
          <SpanTitle>{schedule.country}</SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">Circuit:</Span>
          <SpanTitle>{schedule.circuit}</SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">FirtsPractice</Span>
          <SpanTitle>
            {schedule.firstPracticeDate}, {schedule.firstPracticeTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">
            {schedule.secondPracticeType}
          </Span>
          <SpanTitle>
            {schedule.secondPracticeDate}, {schedule.secondPracticeTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">
            {schedule.thirdPracticeType}
          </Span>
          <SpanTitle>
            {schedule.thirdPracticeDate}, {schedule.thirdPracticeTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">Qualifying</Span>
          <SpanTitle>
            {schedule.qualifyingDate}, {schedule.qualifyingTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">Race</Span>
          <SpanTitle>
            {schedule.raceDate}, {schedule.raceTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span className="font-bold text-gray-400">Round</Span>
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

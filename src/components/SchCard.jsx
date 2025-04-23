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
          <Span  >Country:</Span>
          <SpanTitle>{schedule.country}</SpanTitle>
        </LiCard>
        <LiCard>
          <Span  >Circuit:</Span>
          <SpanTitle>{schedule.circuit}</SpanTitle>
        </LiCard>
        <LiCard>
          <Span  >FirtsPractice</Span>
          <SpanTitle>
            {schedule.firstPracticeDate}, {schedule.firstPracticeTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span >
            {schedule.secondPracticeType}
          </Span>
          <SpanTitle>
            {schedule.secondPracticeDate}, {schedule.secondPracticeTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span  >
            {schedule.thirdPracticeType}
          </Span>
          <SpanTitle>
            {schedule.thirdPracticeDate}, {schedule.thirdPracticeTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span  >Qualifying</Span>
          <SpanTitle>
            {schedule.qualifyingDate}, {schedule.qualifyingTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span  >Race</Span>
          <SpanTitle>
            {schedule.raceDate}, {schedule.raceTime}
          </SpanTitle>
        </LiCard>
        <LiCard>
          <Span  >Round</Span>
          <SpanTitle>{schedule.round}</SpanTitle>
        </LiCard>
      </ul>
    </div>
  );
}

export default SchCard;

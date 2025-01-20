import React from 'react'

function SchCard({schedule, onClick}) {
    console.log(schedule)
  return (
    <div className='bg-sky-950 p-3 rounded-xl  hover:bg-pink-900 hover:cursor-pointer
     w-full justify-items-center'
     onClick={onClick}>
      <h1 className="font-bold uppercase text-slate-200">{schedule.rname}</h1>
      <h1 className="text-teal-200">Country: {schedule.country}</h1>
      <h1 className="italic text-amber-200">Circuit: {schedule.circuit}</h1>
        <h1 className='italic text-slate-400'>Date: {schedule.date}</h1>
        <h1 className='italic text-zinc-300'>Round: {schedule.round}</h1>
    </div>
  )
}

export default SchCard

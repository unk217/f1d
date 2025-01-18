import React from 'react'

function SchCard({schedule, onClick}) {
    console.log(schedule)
  return (
    <div className='bg-sky-950 p-3 rounded-xl  hover:bg-pink-900 hover:cursor-pointer
     w-full justify-items-center'
     onClick={onClick}>
      <h1 className="font-bold uppercase">{schedule.rname}</h1>
      <h1 className="text-teal-200">Country: {schedule.country}</h1>
      <h1 className="italic">Circuit: {schedule.circuit}</h1>
        <h1 className='italic'>Date: {schedule.date}</h1>
        <h1 className='italic'>Round: {schedule.round}</h1>
    </div>
  )
}

export default SchCard

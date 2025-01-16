import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SchCard from './SchCard'

function Schedule() {

    const [schedule, setSchedule] = useState([])

    useEffect(()=>{
        const loadSchedule=async()=>{
            
            
            try{
                const apiUrl = 'https://api.jolpi.ca/ergast/f1/2025/races/'
                const res = await axios.get(apiUrl)
                const schedule = res.data.MRData.RaceTable.Races.map(sch=>({
                    rname: sch.raceName,
                    circuit: sch.Circuit.circuitName,
                    country: sch.Circuit.Location.country,
                    date: sch.date,
                    round: sch.round,

                }))
                setSchedule(schedule)
                console.log(res)
                
                
            }catch(error){
                console.log("Error fetching data", error)
            }
        
        }
        loadSchedule()
        
    },[])
    
  return (
    <div className='grid grid-cols-4 gap-3 p-8 justify-items-center'>
      

      {/*
     {circuit.map(circuit=>(
    <CircuitCard key={circuit.key} circuit={circuit}/>
     ))} 

     {schedule.length > 0 && <SchCard key={schedule.key} schedule={schedule}/>}
     */}
      {schedule.map(schedule=>(
        <SchCard  schedule={schedule}/>
      ))}
      
    </div>
  )
}

export default Schedule

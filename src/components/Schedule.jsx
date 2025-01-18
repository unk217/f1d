import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SchCard from './SchCard'

function Schedule() {

    const [schedule, setSchedule] = useState([])

    useEffect(()=>{
        const loadSchedule=async()=>{
            
            
            try{
                const apiUrl = 'https://api.jolpi.ca/ergast/f1/2024/races/'
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
      
            {schedule.map(schedule=>(
        <SchCard  schedule={schedule}/>
      ))}
      
    </div>
  )
}

export default Schedule

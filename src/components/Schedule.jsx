import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SchCard from './SchCard'
import RaceResults from './RaceResults'

function Schedule() {

    const [schedule, setSchedule] = useState([])
    const [selectedRound, setSelectedRound] = useState(null);

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
    
    // Manejador de clic para seleccionar una carrera
  const handleCardClick = (round) => {
    setSelectedRound(round); // Establece la carrera seleccionada
  }

  // Manejador para volver al listado
  const handleBackToSchedule = () => {
    setSelectedRound(null); // Reinicia la selección
  };

  return (
    <div className="p-4">
      {!selectedRound ? (
        // Mostrar las tarjetas si no hay una carrera seleccionada
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {schedule.map((sch) => (
            <SchCard
              key={sch.round}
              schedule={sch}
              onClick={() => handleCardClick(sch.round)}
            />
          ))}
        </div>
      ) : (
        // Mostrar resultados de la carrera seleccionada
        <div>
          <button
            className="rounded-lg min-w-32 p-2 bg-blue-500 text-white font-bold hover:bg-cyan-800"
            onClick={handleBackToSchedule}
          >
            Back to races
          </button>
          <RaceResults round={selectedRound} />
        </div>
      )}
    </div>
  );
}

export default Schedule


import React from 'react'

function CircuitCard({circuit}) {
  return (
    <div className="bg-slate-900 p-3 rounded-xl  hover:bg-pink-900 hover:cursor-pointer">
      <h1 className="font-bold uppercase">{circuit.meeting_name}</h1>
      <h1 className="text-teal-200">Pais: {circuit.country_name}</h1>
      <h1 className="italic">Official Name: {circuit.meeting_official_name}</h1>
      <h1>Circuito: {circuit.circuit_short_name}</h1>
      <h1>Año: {circuit.year}</h1>
      
    </div>
  )
}

export default CircuitCard

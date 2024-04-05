
import React from 'react'

function CircuitCard({circuit}) {
  return (
    <div className="bg-slate-900 p-3 rounded-xl  hover:bg-emerald-50 hover:cursor-pointer">
      <h1 className="font-bold uppercase">Circuit {circuit.circuit_short_name}</h1>
      <h1>Pais {circuit.country_name}</h1>
      <h1>Ubicacion {circuit.location}</h1>
      <h1>Año {circuit.year}</h1>
    </div>
  )
}

export default CircuitCard

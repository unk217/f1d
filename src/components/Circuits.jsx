import React, { useEffect, useState } from 'react'
//import { getC, getF } from '../Api/F1Api'
import axios from "axios";
import CircuitCard from './CircuitCard';

export function Circuits() {

    const [circuit, setCircuit] = useState([])

    useEffect(()=>{
      const loadAllcircuits=async()=>{
        try {
          const apiUrl ='https://api.openf1.org/v1/meetings?year=2023'
          const res = await axios.get(apiUrl);
          setCircuit(res.data); 
          //console.log(res)
        } catch (error) {
          console.log("Error fetching data", error)
        }
      }
      //console.log(circuit)
      loadAllcircuits()
      
    },[])
    //console.log(circuit)
  return (
   
    <div className="grid grid-cols-3 gap-3 text-white">
     {/*
     
     */}
      {circuit.map(circuit=>(
    <CircuitCard key={circuit.key} circuit={circuit}/>
     ))} 
    </div>

    
   
  )
}

export default Circuits

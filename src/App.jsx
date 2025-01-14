import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
//import { getF } from './Api/F1Api';
//import axios from 'axios';
import MyComponent from './components/Drivers';
//import Dr from './components/Dr';
import Circuits from './components/Circuits';
import Schedule from './components/Schedule';
import CircuitCard from './components/CircuitCard';
import Sch from './components/Sch';

function App() {
  {/*
  const [data, setData] = useState(null);

  useEffect(() => {
    async function Ld() {
      try {
      
        const response = await getF();
        
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    Ld();
  }, []);
  console.log(data)
*/}




  return (
    
    <>
     <h1 className="text-slate-400 text-2xl font-bold uppercase flex justify-center p-5">F1 season 2024</h1>
    
    <BrowserRouter>
    <Routes>
      <Route path="/schedule" element={<Schedule/>}/>
      <Route path="/sch" element={<Circuits/>}/>
      <Route path="/s" element ={<Sch/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

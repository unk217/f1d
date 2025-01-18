import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Circuits from './components/Circuits';
import Schedule from './components/Schedule';
import CircuitCard from './components/CircuitCard';
import DriverSt from './components/DriverSt';
import NavBar from './components/NavBar';
import D from './components/TeamStandings';
import TeamStandings from './components/TeamStandings';

function App() {
  {/*
 
*/}

  return (
    
    <>
     
    
    <BrowserRouter>

    <NavBar/>

    <Routes>
      <Route path="/schedule" element={<Schedule/>}/>
      <Route path="/sch" element={<Circuits/>}/>
      <Route path="/drivers" element ={<DriverSt/>}/>
      <Route path='/schedule' element={<Schedule/>}/>
      <Route path='/teams' element={<TeamStandings/>}/>
      <Route path='d' element={<D/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

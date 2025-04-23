import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Schedule from './components/Schedule';
import DriverSt from './components/DriverSt';
import NavBar from './components/NavBar';
import TeamStandings from './components/TeamStandings';

function App() {
  {/*
 
*/}

  return (
    
    <>
     
    
    <BrowserRouter>

    <NavBar/>

    <Routes>
    <Route path="/" element={<Navigate to="/schedule"/>}/>
      <Route path="/schedule" element={<Schedule/>}/>
      <Route path="/drivers" element ={<DriverSt/>}/>
      <Route path='/schedule' element={<Schedule/>}/>
      <Route path='/teams' element={<TeamStandings/>}/>
      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

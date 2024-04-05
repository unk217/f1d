import React, { useState, useEffect } from 'react';
import './App.css';
//import { getF } from './Api/F1Api';
//import axios from 'axios';
import MyComponent from './components/Drivers';
//import Dr from './components/Dr';
import Circuits from './components/Circuits';

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
     <h1 className="font-bold uppercase">F1</h1>
    
    <Circuits/>
    
    </>
  )
}

export default App

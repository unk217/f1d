import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@tremor/react'
import DriverCard from './DriverCard';

const MyComponent = () => {
    const [driver, setData] = useState(null);
    //const [countryCode, setCountryCode] = useState('GBR'); // Estado para almacenar countryCode
    const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga
    const meetingKey = "1231";
    const sessionKey = "9484";
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Establecer el estado de carga a true antes de la solicitud
          const apiUrl = `https://api.openf1.org/v1/drivers?meeting_key=${meetingKey}&session_key=${sessionKey}`;
          const response = await axios.get(apiUrl);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); // Establecer el estado de carga a false después de la solicitud
        }
      };
  
      fetchData();
    }, []); // Ejecutar efecto cada vez que countryCode cambie
  
    const handleChange = (event) => {
      setCountryCode(event.target.value); // Actualizar countryCode según el valor del input
    }; // Empty dependency array means this effect will only run once
    console.log(driver)
  return (
    <div>
      <h1 className='flex justify-center'> Drivers</h1>
      
      <div className="grid grid-cols-3 gap-3">
          {driver ? (
            driver.map(driver => (
                <DriverCard key={driver.driver_number} data={driver} />
            ))
          ) : (
            <p>No drivers found</p>
          )}
        </div>

     {/* <input type="text" value={countryCode} onChange={handleChange} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card className="mx-auto max-w-xs grid grid-cols-3 gap-3">
          {data ? (
            data.map(driver => (
                <>
                <img src={driver.headshot_url} alt="" />
                <p key={driver.driver_number}>{driver.full_name}</p>
                <p>{driver.country_code}</p>
                <p>{driver.name_acronym}</p>
                <p>{driver.team_name}</p>
                <p>{driver.driver_number}</p>
                </>
            ))
          ) : (
            <p>No drivers found</p>
          )}
        </Card>
      )}*/}
    </div>
  );
};

export default MyComponent;

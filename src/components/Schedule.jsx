import React, { useMemo, useState } from 'react';
import axios from 'axios';
import DynaTable from './DynaTable';

function Schedule() {

    const columns = useMemo(()=>[
        {
            header: "GP Name",
            accessorKey: "meeting_name",
        },
        {
            header: "Country",
            accessorKey: "country_name",
        },
        {
            header: "Location",
            accessorKey: "location",
        },
        {
            header: "Circuit",
            accessorKey: "circuit_short_name",
        },
        {
            header: "Year",
            accessorKey: "year",
        }
    ],[]);

    const [year, setYear] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchSchedule = (year) => {
        setLoading(true);
        axios.get(`https://api.openf1.org/v1/meetings?year=${year}`)
        .then(response => {
            setSchedule(response.data)
            setError('')
        })
        .catch(error => {
            setError('Error fetching data')
            console,log(error)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    const handleInputChange = (event) => {
        setYear(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(year){
            fetchSchedule(year)
        } else {
            setError('Please enter a year')
        }
    }
    console.log(schedule)
  return (
    <div >
        
      <form className='flex justify-center' onSubmit={handleSubmit} >
        <input className='flex justify-center'
          type="text"
          placeholder="Enter year"
          value={year}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Schedule'}
        </button>
      </form>
      
      {error && <p>{error}</p>}
      
      {schedule.length > 0 && <DynaTable columns={columns} data={schedule} />}
      
    </div>
  )
}

export default Schedule

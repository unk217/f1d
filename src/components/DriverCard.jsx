import React from 'react'

export function DriverCard({driver}) {
  return (
    <div>
                <img src={driver.headshot_url} alt="" />
                <p className='font-bold uppercase'>{driver.full_name}</p>
                <p className=''>{driver.country_code}</p>
                <p>{driver.name_acronym}</p>
                <p className='italic'>{driver.team_name}</p>
                <p>{driver.driver_number}</p>
    </div>
  )
}

export default DriverCard

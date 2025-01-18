import React from 'react'
import { Link } from "react-router-dom";

const NavBar = ()=> {

  return (
    <nav className=' p-3 bg-red-800'>
      <ul className='flex justify-between space-x-8 w-10'>
        <li className='text-white font-bold'><Link to="/drivers">Drivers</Link></li>
        <li className='text-white font-bold'><Link to="/teams">Constructors</Link></li>
        <li className='text-white font-bold'><Link to="/schedule">Schedule</Link></li>
        <li className='text-white font-bold'><Link to="/D">D</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar

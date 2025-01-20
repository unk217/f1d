import React from 'react'
import {Li} from "./UI"
import { Link } from "react-router-dom";

const NavBar = ()=> {

  return (
    <nav className=' p-3 bg-red-800'>
      <ul className='flex justify-between space-x-8 w-10'>
        <Li><Link to="/drivers">Drivers</Link></Li>
        <Li><Link to="/teams">Constructors</Link></Li>
        <Li><Link to="/schedule">Schedule</Link></Li>
        
      </ul>
    </nav>
  )
}

export default NavBar

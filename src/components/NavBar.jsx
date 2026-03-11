import React from 'react';
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = location.pathname.startsWith(path);
    return `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      isActive
        ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`;
  };

  return (
    <nav className='sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Link to="/" className='text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 transition-all'>
              F1D
            </Link>
          </div>
          <div className='flex space-x-2 sm:space-x-6'>
            <Link to="/drivers" className={getLinkClasses('/drivers')}>Drivers</Link>
            <Link to="/teams" className={getLinkClasses('/teams')}>Constructors</Link>
            <Link to="/schedule" className={getLinkClasses('/schedule')}>Seasons</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

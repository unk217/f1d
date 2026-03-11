import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Schedule from './components/Schedule';
import DriverSt from './components/DriverSt';
import NavBar from './components/NavBar';
import TeamStandings from './components/TeamStandings';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/schedule" />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/drivers" element={<DriverSt />} />
            <Route path="/teams" element={<TeamStandings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

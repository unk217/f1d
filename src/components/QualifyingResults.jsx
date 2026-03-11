import axios from 'axios';
import React, { useEffect, useState } from 'react';

function QualifyingResults({ round, year }) {
  const [raceResults, setRaceResults] = useState(null);
  const [raceName, setRaceName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaceResults = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_BASE_URL}${year}/${round}/qualifying`;
        const res = await axios.get(apiUrl);
        const raceData = res.data.MRData.RaceTable.Races[0];
        setRaceResults(raceData?.QualifyingResults || []);
        setRaceName(raceData?.raceName || 'Unknown Race');
      } catch (error) {
        console.log('Error fetching race results', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceResults();
  }, [round, year]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <svg className="animate-spin h-8 w-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!raceResults || raceResults.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-900/30 rounded-xl border border-slate-800/50">
        <p className="text-slate-400 font-medium text-lg">No qualifying results found for this race.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 drop-shadow-sm">
        {raceName} - Qualifying
      </h2>

      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[800px] w-full max-w-5xl rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 border-b border-slate-700/50">
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">Pos</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Team</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Q1</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Q2</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Q3</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {raceResults.map((result, index) => (
                <tr key={index} className="hover:bg-slate-800/40 transition-colors duration-200">
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-bold text-slate-300">
                    {result.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <img
                        src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${year}Drivers/${result.Driver.familyName}`}
                        alt={result.Driver.familyName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-700/50 mr-3"
                        onError={(e) => {
                          e.target.src = "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2024Drivers/helmet.png";
                          e.target.className = "w-10 h-10 rounded-full object-cover mr-3 opacity-50";
                        }}
                      />
                      <span className="font-semibold text-slate-200">{result.Driver.givenName} {result.Driver.familyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-400">
                    {result.Constructor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-cyan-400">{result.Q1 || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-400">{result.Q2 || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-400 font-semibold">{result.Q3 || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QualifyingResults;

'use client'

import { useEffect, useState } from 'react';
import "../../shared/tab_stats.css";


type PlayerStats = {
  gamesPlayed?: number;
  tackles?: number;
  solo?: number;
  assisted?: number;
  sack?: number;
  forcedFumble?: number;
  fumbleRecovery?: number;
  interception?: number;
  passDeflected?: number;
};



 export default function Stats({ playerId }: { playerId: string }) {
  const [stats, setStats] = useState<PlayerStats | null>(null);

  useEffect(() => {
  const fetchStats = async () => {
    try {                    //runs route in stats folder
      const res = await fetch(`/player/${playerId}/stats`);
      if (!res.ok) throw new Error(`Error fetching stats: ${res.statusText}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      setStats(null);
    }
  };
  fetchStats();
}, [playerId]);


 if (!stats) return <p>Loading stats...</p>;
  const formattedStats = [
    { label: 'Games Played', value: stats.gamesPlayed },
    { label: 'Tackles', value: stats.tackles },
    { label: 'Solo Tackles', value: stats.solo },
    { label: 'Assisted Tackles', value: stats.assisted },
    { label: 'Sacks', value: stats.sack },
    { label: 'Forced Fumbles', value: stats.forcedFumble },
    { label: 'Fumble Recoveries', value: stats.fumbleRecovery },
    { label: 'Interceptions', value: stats.interception },
    { label: 'Passes Deflected', value: stats.passDeflected },
  ];

  return (
    <div className="stats-table-container">
     
   <table className="stats-table">
       <thead> 
        <tr> 
        <th>stats</th>
        <th>gp</th>
        <th>tackles</th>
        <th>solo</th>
        <th>assisted</th>
        <th>sacks</th>
        <th>ff</th>
        <th>fr</th>
        <th>int</th>
        <th>pd</th>
        </tr>
       
       </thead> 

        <tbody className='tbody-player'>
          <tr>

          <td>2024</td>
          {formattedStats.map(
            (stat, index) =>
              stat.value !== undefined && (
                  <td key={index}>{stat.value}</td>
              )
          )}
           </tr>
        </tbody>
      </table>

    </div>
  );
}




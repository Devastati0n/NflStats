'use client'

import { useState } from 'react';
import Stats from './stats';
import AdvancedStats from './advancedstats';
import GameLog from './gamelog';

type PlayerTabsProps = {
  playerId: string;
};



export default function PlayerTabs({ playerId }: PlayerTabsProps) {
  const [tab, setTab] = useState<'stats' | 'advanced' | 'gamelog'>('stats');

  return (
    <div className="player-tabs">
      <nav className="tab-nav">
           
        <button onClick={() => setTab('stats')}>Stats</button>
        <button onClick={() => setTab('advanced')}>Advanced</button>
        <button onClick={() => setTab('gamelog')}>Game Log</button>
       
      </nav>

      <div className="player-tab-container">
        {tab === 'stats' && <Stats playerId={playerId} />}
        {tab === 'advanced' && <AdvancedStats playerId={playerId} />}
        {tab === 'gamelog' && <GameLog playerId={playerId} />}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Header from './Header';
import Ticker from './Ticker';
import SportsTabs from './SportsTabs';
import GameCard from './GameCard';
import BetSlip from './BetSlip';
import BetHistory from './BetHistory';
import { type Game } from '../../data/sports';
import { type BetRecord } from '../../data/agents';

interface Props {
  games: Game[];
  bets: BetRecord[];
  balance: number;
  totalProfit: number;
  ticker: string[];
  selectedBets: { gameId: string; marketName: string; oddLabel: string; oddValue: number }[];
  onToggleOdd: (gameId: string, marketName: string, oddLabel: string, oddValue: number) => void;
  onPlaceBet: (stake: number) => void;
}

type Tab = 'live' | 'slip' | 'history';

export default function LeftPhone({ games, bets, balance, totalProfit, ticker, selectedBets, onToggleOdd, onPlaceBet }: Props) {
  const [tab, setTab] = useState<Tab>('live');
  const [sport, setSport] = useState('All');

  const liveGames = games.filter(g => g.status === 'live');
  const upcomingGames = games.filter(g => g.status === 'upcoming');
  const sports = [...new Set(games.map(g => g.sport))];
  const filtered = sport === 'All' ? games : games.filter(g => g.sport === sport);
  const filteredLive = filtered.filter(g => g.status === 'live');
  const filteredUpcoming = filtered.filter(g => g.status === 'upcoming');

  return (
    <div className="phone-screen flex flex-col bg-[#0d0d12]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-2 z-50" style={{ height: '44px' }}>
        <span className="text-[10px] font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="15" height="10" viewBox="0 0 15 10" fill="white" opacity="0.8"><rect x="0" y="3" width="3" height="7" rx="0.5"/><rect x="4" y="2" width="3" height="8" rx="0.5"/><rect x="8" y="1" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
          <svg width="15" height="10" viewBox="0 0 15 10" fill="white" opacity="0.8"><path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.4 1.6 10.1 0.5 7.5 0.5C4.9 0.5 2.6 1.6 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z"/><circle cx="7.5" cy="8" r="1.5"/></svg>
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-2.5 rounded-sm border border-white border-opacity-60 flex items-center justify-end pr-0.5">
              <div className="w-3 h-1.5 bg-[#00e676] rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      <Header balance={balance} profit={totalProfit} />
      <Ticker items={ticker} />

      {/* Main Tab Bar */}
      <div className="flex border-b border-[rgba(255,255,255,0.06)]">
        {([['live', `LIVE (${liveGames.length})`], ['slip', `SLIP ${selectedBets.length > 0 ? `(${selectedBets.length})` : ''}`], ['history', 'HISTORY']] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-[10px] font-bold tracking-wide transition-all ${
              tab === t
                ? 'text-[#00e676] border-b-2 border-[#00c853]'
                : 'text-[#37474f]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'live' && (
          <>
            <SportsTabs active={sport} onChange={setSport} sports={sports} />
            {filteredLive.length > 0 && (
              <>
                <div className="px-3 py-1">
                  <div className="text-[9px] text-[#546e7a] font-bold uppercase tracking-widest flex items-center gap-2">
                    <div className="live-dot" /> Live Now · {filteredLive.length} Events
                  </div>
                </div>
                {filteredLive.map(g => (
                  <GameCard key={g.id} game={g} selectedBets={selectedBets} onToggleOdd={onToggleOdd} />
                ))}
              </>
            )}
            {filteredUpcoming.length > 0 && (
              <>
                <div className="px-3 py-2 mt-1">
                  <div className="text-[9px] text-[#546e7a] font-bold uppercase tracking-widest">Upcoming Events</div>
                </div>
                {filteredUpcoming.map(g => (
                  <GameCard key={g.id} game={g} selectedBets={selectedBets} onToggleOdd={onToggleOdd} />
                ))}
              </>
            )}
          </>
        )}
        {tab === 'slip' && (
          <div className="pt-2">
            <BetSlip
              selectedBets={selectedBets}
              onToggleOdd={onToggleOdd}
              onPlaceBet={onPlaceBet}
              balance={balance}
              games={games.map(g => ({ id: g.id, homeTeam: g.homeTeam, awayTeam: g.awayTeam }))}
            />
          </div>
        )}
        {tab === 'history' && <BetHistory bets={bets} />}
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar flex">
        {[
          { icon: '⚽', label: 'Sports' },
          { icon: '📊', label: 'Markets' },
          { icon: '💰', label: 'Cashout' },
          { icon: '🎁', label: 'Promos' },
          { icon: '👤', label: 'Account' },
        ].map(item => (
          <button key={item.label} className="flex-1 flex flex-col items-center gap-0.5 py-2">
            <span className="text-base">{item.icon}</span>
            <span className="text-[8px] text-[#37474f]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

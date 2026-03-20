import React, { useState } from 'react';
import { type Game, SPORTS_ICONS } from '../../data/sports';

interface Props {
  game: Game;
  selectedBets: { gameId: string; marketName: string; oddLabel: string; oddValue: number }[];
  onToggleOdd: (gameId: string, marketName: string, oddLabel: string, oddValue: number) => void;
}

export default function GameCard({ game, selectedBets, onToggleOdd }: Props) {
  const [activeMarket, setActiveMarket] = useState(0);
  const market = game.markets[activeMarket];
  const isUpcoming = game.status === 'upcoming';

  return (
    <div className="mx-3 mb-2 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Game Header */}
      <div className="px-3 py-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{SPORTS_ICONS[game.sport] || '🎮'}</span>
            <span className="text-[9px] text-[#546e7a] font-medium uppercase tracking-wide">{game.league}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {game.status === 'live' ? (
              <div className="live-pill"><div className="live-dot" />LIVE</div>
            ) : (
              <span className="text-[9px] text-[#546e7a]">{game.time}</span>
            )}
          </div>
        </div>
        {/* Teams & Score */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-white">{game.homeTeam}</span>
              {game.status === 'live' && (
                <span className="text-base font-bold font-orbitron text-[#00e676]">{game.homeScore}</span>
              )}
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[11px] font-semibold text-[#90a4ae]">{game.awayTeam}</span>
              {game.status === 'live' && (
                <span className="text-base font-bold font-orbitron text-[#90a4ae]">{game.awayScore}</span>
              )}
            </div>
          </div>
          {game.status === 'live' && (
            <div className="ml-3 text-center">
              <div className="text-[9px] text-[#ff6d3a] font-bold">{game.time}</div>
              <div className="text-[8px] text-[#546e7a] mt-0.5">in-play</div>
            </div>
          )}
        </div>
      </div>

      {/* Market Tabs */}
      {game.markets.length > 1 && (
        <div className="flex px-2 pt-2 gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {game.markets.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActiveMarket(i)}
              className={`flex-shrink-0 text-[9px] font-semibold px-2 py-1 rounded-full transition-all ${
                activeMarket === i
                  ? 'bg-[rgba(0,200,83,0.2)] text-[#00e676] border border-[rgba(0,200,83,0.4)]'
                  : 'text-[#546e7a] border border-[rgba(255,255,255,0.06)]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}

      {/* Odds */}
      <div className="p-2">
        <div className={`grid gap-1.5 ${market.odds.length === 2 ? 'grid-cols-2' : market.odds.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {market.odds.map(odd => {
            const isSel = selectedBets.some(b => b.gameId === game.id && b.marketName === market.name && b.oddLabel === odd.label);
            return (
              <button
                key={odd.label}
                onClick={() => onToggleOdd(game.id, market.name, odd.label, odd.value)}
                className={`odd-btn ${odd.dir} ${isSel ? 'selected' : ''}`}
              >
                <div className="text-[9px] text-[#78909c] truncate">{odd.label}</div>
                <div className={`text-sm font-bold mt-0.5 ${
                  isSel ? 'text-[#00e676]' :
                  odd.dir === 'up' ? 'text-[#00e676]' :
                  odd.dir === 'down' ? 'text-[#ff5252]' : 'text-white'
                }`}>
                  {odd.value.toFixed(2)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

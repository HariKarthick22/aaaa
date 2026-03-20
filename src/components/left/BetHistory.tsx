import React from 'react';
import { type BetRecord } from '../../data/agents';

interface Props { bets: BetRecord[]; }

export default function BetHistory({ bets }: Props) {
  return (
    <div className="px-3 pb-4 space-y-2">
      <div className="text-[10px] font-bold text-[#546e7a] uppercase tracking-wider px-1 mb-1">Recent Bets</div>
      {bets.slice(0, 10).map(bet => (
        <div key={bet.id} className="bet-card rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                  bet.status === 'pending' ? 'bg-[rgba(255,171,0,0.2)] text-[#ffab00]' :
                  bet.status === 'won' ? 'bg-[rgba(0,230,118,0.2)] text-[#00e676]' :
                  bet.status === 'lost' ? 'bg-[rgba(255,82,82,0.2)] text-[#ff5252]' :
                  'bg-[rgba(84,110,122,0.2)] text-[#546e7a]'
                }`}>
                  {bet.status.toUpperCase()}
                </span>
                <span className="text-[9px] text-[#546e7a] truncate">{bet.agentName}</span>
              </div>
              <div className="text-[10px] font-semibold text-white truncate">{bet.selection}</div>
              <div className="text-[9px] text-[#546e7a] truncate">{bet.game} · {bet.market}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-[11px] font-bold text-white">@{bet.odds.toFixed(2)}</div>
              <div className="text-[9px] text-[#546e7a]">£{bet.stake}</div>
              {bet.profit !== undefined && (
                <div className={`text-[10px] font-bold ${bet.profit >= 0 ? 'text-[#00e676]' : 'text-[#ff5252]'}`}>
                  {bet.profit >= 0 ? '+' : ''}£{Math.abs(bet.profit).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

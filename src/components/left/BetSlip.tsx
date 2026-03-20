import React, { useState } from 'react';

interface SelBet {
  gameId: string;
  marketName: string;
  oddLabel: string;
  oddValue: number;
}

interface Props {
  selectedBets: SelBet[];
  onToggleOdd: (gameId: string, marketName: string, oddLabel: string, oddValue: number) => void;
  onPlaceBet: (stake: number) => void;
  balance: number;
  games: { id: string; homeTeam: string; awayTeam: string }[];
}

export default function BetSlip({ selectedBets, onToggleOdd, onPlaceBet, balance, games }: Props) {
  const [stake, setStake] = useState('');
  const [betType, setBetType] = useState<'single' | 'acca'>('single');

  const totalOdds = selectedBets.reduce((acc, b) => acc * b.oddValue, 1);
  const stakeNum = parseFloat(stake) || 0;
  const potential = parseFloat((stakeNum * totalOdds).toFixed(2));

  const quickStakes = [5, 10, 25, 50, 100];

  const getGameName = (gameId: string) => {
    const g = games.find(x => x.id === gameId);
    return g ? `${g.homeTeam} vs ${g.awayTeam}` : 'Unknown';
  };

  if (selectedBets.length === 0) {
    return (
      <div className="mx-3 mb-3 rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-2xl mb-2">🎯</div>
        <div className="text-[11px] text-[#546e7a]">Select odds to build your bet slip</div>
      </div>
    );
  }

  return (
    <div className="mx-3 mb-3 rounded-xl overflow-hidden" style={{ background: 'rgba(0,200,83,0.05)', border: '1px solid rgba(0,200,83,0.25)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: 'rgba(0,200,83,0.1)' }}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#00e676]">BET SLIP</span>
          <span className="text-[9px] bg-[#00c853] text-black font-bold px-1.5 py-0.5 rounded-full">{selectedBets.length}</span>
        </div>
        {selectedBets.length > 1 && (
          <div className="flex gap-1">
            {(['single', 'acca'] as const).map(t => (
              <button key={t} onClick={() => setBetType(t)} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${betType === t ? 'bg-[#00c853] text-black' : 'text-[#546e7a]'}`}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selections */}
      <div className="px-3 py-2 space-y-1.5">
        {selectedBets.map(b => (
          <div key={`${b.gameId}-${b.marketName}`} className="flex items-center justify-between bet-card">
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-[#546e7a] truncate">{getGameName(b.gameId)} · {b.marketName}</div>
              <div className="text-[11px] font-semibold text-white truncate">{b.oddLabel}</div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm font-bold text-[#00e676]">{b.oddValue.toFixed(2)}</span>
              <button onClick={() => onToggleOdd(b.gameId, b.marketName, b.oddLabel, b.oddValue)} className="text-[#546e7a] hover:text-[#ff5252] transition-colors text-xs">✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* Stake */}
      <div className="px-3 pb-2">
        <div className="flex gap-1 mb-2">
          {quickStakes.map(s => (
            <button key={s} onClick={() => setStake(String(s))} className="flex-1 text-[9px] font-bold py-1 rounded-md text-[#78909c] border border-[rgba(255,255,255,0.08)] hover:border-[#00c853] hover:text-[#00e676] transition-all">
              £{s}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-2">
          <div className="flex-1 flex items-center gap-1 px-2 py-1.5 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="text-[11px] text-[#546e7a]">£</span>
            <input
              type="number"
              value={stake}
              onChange={e => setStake(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-white text-[12px] font-semibold outline-none w-full"
              style={{ minWidth: 0 }}
            />
          </div>
          <button onClick={() => setStake('')} className="px-2 text-[#546e7a] text-[10px]">CLR</button>
        </div>

        {/* Summary */}
        <div className="flex justify-between text-[10px] mb-2">
          <span className="text-[#546e7a]">Total Odds:</span>
          <span className="text-white font-bold">{totalOdds.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[10px] mb-2">
          <span className="text-[#546e7a]">Potential Win:</span>
          <span className="text-[#00e676] font-bold">£{potential.toFixed(2)}</span>
        </div>

        <button
          onClick={() => { onPlaceBet(stakeNum); setStake(''); }}
          disabled={stakeNum <= 0 || stakeNum > balance}
          className="w-full py-2.5 rounded-xl font-bold text-[12px] text-black transition-all disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #00c853, #00e676)' }}
        >
          PLACE BET {stakeNum > 0 ? `· £${stakeNum}` : ''}
        </button>
      </div>
    </div>
  );
}

import React from 'react';

interface Props {
  balance: number;
  profit: number;
}

export default function Header({ balance, profit }: Props) {
  return (
    <div className="px-3 pt-10 pb-2 bg-gradient-to-b from-[#0d1520] to-[#0d0d12]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[#00e676] font-orbitron font-bold text-sm tracking-wider">SOVEREIGN</span>
          <span className="text-[8px] bg-[#00e676] text-black font-bold px-1.5 py-0.5 rounded-sm">LIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-[10px] text-[#546e7a]">Balance</div>
            <div className="text-sm font-bold text-white">£{balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00c853] to-[#00e676] flex items-center justify-center text-black font-bold text-xs">S</div>
        </div>
      </div>
      {/* Profit Strip */}
      <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0,200,83,0.07)', border: '1px solid rgba(0,200,83,0.15)' }}>
        <span className="text-[10px] text-[#546e7a]">Today P&L</span>
        <span className={`text-xs font-bold ${profit >= 0 ? 'text-[#00e676]' : 'text-[#ff5252]'}`}>
          {profit >= 0 ? '+' : ''}£{profit.toFixed(2)}
        </span>
        <div className="ml-auto flex items-center gap-1">
          <div className="live-dot" />
          <span className="text-[9px] text-[#ff6d3a] font-bold">LIVE</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { SPORTS_ICONS } from '../../data/sports';

interface Props {
  active: string;
  onChange: (sport: string) => void;
  sports: string[];
}

export default function SportsTabs({ active, onChange, sports }: Props) {
  return (
    <div className="flex overflow-x-auto gap-1 px-3 py-2" style={{ scrollbarWidth: 'none' }}>
      {['All', ...sports].map(sport => (
        <button
          key={sport}
          onClick={() => onChange(sport)}
          className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
            active === sport
              ? 'bg-[#00c853] text-black'
              : 'bg-[rgba(255,255,255,0.05)] text-[#78909c] border border-[rgba(255,255,255,0.06)]'
          }`}
        >
          {sport !== 'All' && <span>{SPORTS_ICONS[sport] || '🎮'}</span>}
          <span>{sport}</span>
        </button>
      ))}
    </div>
  );
}

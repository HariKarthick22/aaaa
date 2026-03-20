import React from 'react';

interface Props { items: string[]; }

export default function Ticker({ items }: Props) {
  const content = items.length > 0 ? items.join('  •  ') + '  •  ' + items.join('  •  ') : 'Scanning markets...  •  Loading live data...';
  return (
    <div className="ticker-wrap bg-[#0a1a0a] border-y border-[rgba(0,200,83,0.15)] py-1">
      <div className="ticker text-[10px] text-[#00e676] opacity-80 px-4">{content}</div>
    </div>
  );
}

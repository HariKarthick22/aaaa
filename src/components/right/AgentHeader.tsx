import { type Agent } from '../../data/agents';

interface Props {
  agents: Agent[];
  totalProfit: number;
}

export default function AgentHeader({ agents, totalProfit: _totalProfit }: Props) {
  const activeCount = agents.filter(a => ['active', 'analyzing', 'placing'].includes(a.status)).length;
  const avgWinRate = agents.reduce((s, a) => s + a.winRate, 0) / agents.length;
  const todayProfit = agents.reduce((s, a) => s + a.profitToday, 0);

  return (
    <div className="px-3 pt-10 pb-2" style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #0d0d12 100%)' }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-orbitron font-bold text-sm text-[#40c4ff] tracking-wider">AGENT HQ</div>
          <div className="text-[9px] text-[#546e7a]">{activeCount}/10 agents running</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00e676] pulse-green" />
          <span className="text-[9px] text-[#00e676] font-semibold">AUTONOMOUS</span>
        </div>
      </div>
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Active', value: `${activeCount}`, unit: 'bots', color: '#00e676' },
          { label: 'Win Rate', value: `${avgWinRate.toFixed(1)}%`, unit: 'avg', color: '#40c4ff' },
          { label: "Today P&L", value: `${todayProfit >= 0 ? '+' : ''}£${todayProfit.toFixed(0)}`, unit: 'profit', color: todayProfit >= 0 ? '#00e676' : '#ff5252' },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg px-2 py-1.5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-[9px] text-[#546e7a]">{stat.label}</div>
            <div className="text-[12px] font-bold font-orbitron" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[8px] text-[#37474f]">{stat.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

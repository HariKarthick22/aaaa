import { useState } from "react";
import AgentHeader from './AgentHeader';
import AgentList from './AgentList';
import ActivityFeed from './ActivityFeed';
import PnLChart from './PnLChart';
import { type Agent, type Activity } from '../../data/agents';

interface Props {
  agents: Agent[];
  activities: Activity[];
  totalProfit: number;
}

type Tab = 'agents' | 'activity' | 'pnl';

export default function RightPhone({ agents, activities, totalProfit }: Props) {
  const [tab, setTab] = useState<Tab>('agents');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const activeAgents = agents.filter(a => ['active', 'analyzing', 'placing'].includes(a.status)).length;

  return (
    <div className="phone-screen flex flex-col" style={{ background: '#0a0d14' }}>
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-2 z-50" style={{ height: '44px' }}>
        <span className="text-[10px] font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="15" height="10" viewBox="0 0 15 10" fill="white" opacity="0.8"><rect x="0" y="3" width="3" height="7" rx="0.5"/><rect x="4" y="2" width="3" height="8" rx="0.5"/><rect x="8" y="1" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
          <div className="w-5 h-2.5 rounded-sm border border-white border-opacity-60 flex items-center justify-end pr-0.5">
            <div className="w-3 h-1.5 bg-[#40c4ff] rounded-sm" />
          </div>
        </div>
      </div>

      <AgentHeader agents={agents} totalProfit={totalProfit} />

      {/* Tab Bar */}
      <div className="flex border-b border-[rgba(255,255,255,0.06)]">
        {([['agents', `AGENTS (${activeAgents})`], ['activity', 'ACTIVITY'], ['pnl', 'P&L CHART']] as const).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-[10px] font-bold tracking-wide transition-all ${
              tab === t
                ? 'text-[#40c4ff] border-b-2 border-[#40c4ff]'
                : 'text-[#37474f]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'agents' && (
          <div className="pt-2">
            <AgentList agents={agents} selectedAgent={selectedAgent} onSelect={id => setSelectedAgent(id === selectedAgent ? null : id)} />
          </div>
        )}
        {tab === 'activity' && (
          <div className="pt-2">
            <div className="px-3 mb-2 flex items-center gap-2">
              <div className="live-dot" />
              <span className="text-[9px] text-[#546e7a]">Real-time agent activity stream</span>
            </div>
            <ActivityFeed activities={activities} />
          </div>
        )}
        {tab === 'pnl' && (
          <div className="pt-2">
            <PnLChart totalProfit={totalProfit} />
            {/* Agent P&L breakdown */}
            <div className="px-3 space-y-1.5">
              <div className="text-[9px] text-[#546e7a] font-bold uppercase tracking-wider mb-2">Agent Breakdown</div>
              {agents.sort((a, b) => b.profitToday - a.profitToday).map(agent => (
                <div key={agent.id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span>{agent.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-white">{agent.name}</span>
                      <span className="text-[10px] font-bold" style={{ color: agent.profitToday >= 0 ? '#00e676' : '#ff5252' }}>
                        {agent.profitToday >= 0 ? '+' : ''}£{agent.profitToday.toFixed(0)}
                      </span>
                    </div>
                    <div className="h-1 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full" style={{
                        width: `${Math.min(100, Math.abs(agent.profitToday) / 10)}%`,
                        background: agent.profitToday >= 0 ? '#00e676' : '#ff5252',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div className="tab-bar flex">
        {[
          { icon: '🤖', label: 'Agents' },
          { icon: '📡', label: 'Signals' },
          { icon: '🎯', label: 'Strategy' },
          { icon: '⚙️', label: 'Config' },
          { icon: '📈', label: 'Stats' },
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

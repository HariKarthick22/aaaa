import { type Agent } from '../../data/agents';

interface Props {
  agents: Agent[];
  selectedAgent: string | null;
  onSelect: (id: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  active: 'ACTIVE',
  idle: 'IDLE',
  analyzing: 'ANALYZING',
  placing: 'PLACING BET',
  error: 'ERROR',
};

const STATUS_COLORS: Record<string, string> = {
  active: '#00e676',
  idle: '#37474f',
  analyzing: '#ffab00',
  placing: '#40c4ff',
  error: '#ff5252',
};

export default function AgentList({ agents, selectedAgent, onSelect }: Props) {
  return (
    <div className="px-3 pb-2 space-y-1.5">
      {agents.map(agent => (
        <div
          key={agent.id}
          onClick={() => onSelect(agent.id)}
          className="agent-row rounded-xl px-3 py-2 cursor-pointer transition-all"
          style={{
            background: selectedAgent === agent.id ? 'rgba(64,196,255,0.07)' : 'rgba(255,255,255,0.025)',
            border: selectedAgent === agent.id ? '1px solid rgba(64,196,255,0.3)' : '1px solid rgba(255,255,255,0.05)',
            borderLeft: `3px solid ${STATUS_COLORS[agent.status]}`,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{agent.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white">{agent.name}</span>
                <div className="flex items-center gap-1">
                  <div className={`agent-status-dot ${agent.status}`} />
                  <span className="text-[8px] font-bold" style={{ color: STATUS_COLORS[agent.status] }}>
                    {STATUS_LABELS[agent.status]}
                  </span>
                </div>
              </div>
              <div className="text-[9px] text-[#546e7a] truncate mt-0.5">{agent.task}</div>
            </div>
          </div>

          {/* Agent Stats */}
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-[#546e7a]">Bets:</span>
              <span className="text-[9px] font-semibold text-[#90a4ae]">{agent.betsToday}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-[#546e7a]">Win:</span>
              <span className="text-[9px] font-semibold" style={{ color: agent.winRate >= 60 ? '#00e676' : '#ffab00' }}>{agent.winRate.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] text-[#546e7a]">P&L:</span>
              <span className="text-[9px] font-bold" style={{ color: agent.profitToday >= 0 ? '#00e676' : '#ff5252' }}>
                {agent.profitToday >= 0 ? '+' : ''}£{agent.profitToday.toFixed(0)}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-[8px] text-[#546e7a]">Conf:</span>
              <span className="text-[9px] font-bold text-[#40c4ff]">{agent.confidence}%</span>
            </div>
          </div>

          {/* Confidence Bar */}
          <div className="mt-1.5 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${agent.confidence}%`,
                background: agent.confidence >= 80 ? '#00e676' : agent.confidence >= 60 ? '#ffab00' : '#ff5252'
              }}
            />
          </div>

          {/* Last Action */}
          <div className="text-[8px] text-[#37474f] mt-1 truncate">{agent.lastAction}</div>
        </div>
      ))}
    </div>
  );
}

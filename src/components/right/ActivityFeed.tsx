import { type Activity } from '../../data/agents';

interface Props { activities: Activity[]; }

const TYPE_STYLES: Record<string, { bg: string; color: string; icon: string }> = {
  bet: { bg: 'rgba(64,196,255,0.1)', color: '#40c4ff', icon: '💰' },
  scan: { bg: 'rgba(84,110,122,0.1)', color: '#78909c', icon: '🔍' },
  alert: { bg: 'rgba(255,171,0,0.1)', color: '#ffab00', icon: '⚠️' },
  win: { bg: 'rgba(0,230,118,0.1)', color: '#00e676', icon: '✅' },
  loss: { bg: 'rgba(255,82,82,0.1)', color: '#ff5252', icon: '❌' },
  analysis: { bg: 'rgba(103,58,183,0.1)', color: '#b39ddb', icon: '📊' },
};

function timeAgo(d: Date) {
  const secs = Math.floor((Date.now() - d.getTime()) / 1000);
  if (secs < 60) return `${secs}s`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  return `${Math.floor(secs / 3600)}h`;
}

export default function ActivityFeed({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="px-3 py-4 text-center">
        <div className="text-[11px] text-[#546e7a]">Waiting for agent activity...</div>
        <div className="text-2xl mt-2 spin-cw inline-block">⚙️</div>
      </div>
    );
  }

  return (
    <div className="px-3 pb-4 space-y-1.5">
      {activities.slice(0, 20).map(a => {
        const style = TYPE_STYLES[a.type] || TYPE_STYLES.scan;
        return (
          <div key={a.id} className="agent-activity flex items-start gap-2 rounded-lg px-2.5 py-2" style={{ background: style.bg, border: `1px solid ${style.color}22` }}>
            <span className="text-sm flex-shrink-0 mt-0.5">{style.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[9px] font-bold" style={{ color: style.color }}>{a.agentName}</span>
                <span className="text-[8px] text-[#37474f] flex-shrink-0">{timeAgo(a.timestamp)} ago</span>
              </div>
              <div className="text-[10px] text-[#90a4ae] mt-0.5 leading-tight">{a.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

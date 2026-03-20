import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface Props { totalProfit: number; }

function generatePnL(profit: number) {
  const points = [];
  let val = 0;
  const hours = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','NOW'];
  for (let i = 0; i < hours.length; i++) {
    const target = (profit / hours.length) * (i + 1);
    val += target * (0.7 + Math.random() * 0.6);
    points.push({ time: hours[i], pnl: parseFloat(val.toFixed(2)) });
  }
  return points;
}

export default function PnLChart({ totalProfit }: Props) {
  const [data, setData] = useState(() => generatePnL(totalProfit));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.4) * 80;
        const updated = [...prev.slice(0, -1), { ...last, pnl: parseFloat((last.pnl + delta).toFixed(2)) }];
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isPositive = data[data.length - 1].pnl >= 0;
  const color = isPositive ? '#00e676' : '#ff5252';

  return (
    <div className="mx-3 mb-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[9px] text-[#546e7a] uppercase tracking-wide">Portfolio P&L</div>
          <div className="text-sm font-bold font-orbitron" style={{ color }}>
            {data[data.length - 1].pnl >= 0 ? '+' : ''}£{data[data.length - 1].pnl.toFixed(2)}
          </div>
        </div>
        <div className="text-[9px] text-[#546e7a]">Today</div>
      </div>
      <ResponsiveContainer width="100%" height={70}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fill: '#37474f', fontSize: 7 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ background: '#111', border: `1px solid ${color}33`, borderRadius: 6, fontSize: 10, color: '#fff' }}
            formatter={(v: unknown) => [`£${Number(v).toFixed(2)}`, 'P&L']}
          />
          <Area type="monotone" dataKey="pnl" stroke={color} strokeWidth={1.5} fill="url(#pnlGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

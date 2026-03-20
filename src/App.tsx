import { useLiveData } from './hooks/useLiveData'
import LeftPhone from './components/left/LeftPhone'
import RightPhone from './components/right/RightPhone'

export default function App() {
  const {
    games, agents, bets, activities,
    balance, totalProfit, selectedBets, ticker,
    toggleOdd, placeBet
  } = useLiveData()

  const activeAgents = agents.filter(a => ['active', 'analyzing', 'placing'].includes(a.status)).length

  return (
    <div style={{ minHeight: '100vh', background: '#07080d', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <div style={{
        background: '#090b14',
        borderBottom: '1px solid #1a1f35',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <polygon points="10,1 19,7 16,18 4,18 1,7" stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity=".8" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#c8d0e0', letterSpacing: '.18em' }}>SOVEREIGN</span>
          <span style={{ fontSize: 8, background: 'rgba(0,255,136,.12)', border: '1px solid rgba(0,255,136,.3)', color: '#00ff88', padding: '2px 8px', borderRadius: 3, fontWeight: 700, letterSpacing: '.06em' }}>LIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 9, letterSpacing: '.04em' }}>
          <span style={{ color: '#4a5568' }}>AGENTS <span style={{ color: '#00ff88', fontWeight: 600 }}>{activeAgents}/10</span></span>
          <span style={{ color: '#4a5568' }}>P&L <span style={{ color: totalProfit >= 0 ? '#00ff88' : '#ff4060', fontWeight: 600 }}>{totalProfit >= 0 ? '+' : ''}£{totalProfit.toFixed(2)}</span></span>
          <span style={{ color: '#4a5568' }}>BAL <span style={{ color: '#c8d0e0', fontWeight: 600 }}>£{balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span></span>
        </div>
      </div>

      {/* Phone Stage */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        padding: '32px 24px',
        flexWrap: 'wrap'
      }}>

        {/* Left Phone - Sportsbook */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 9, color: '#2d3748', letterSpacing: '.12em' }}>SPORTSBOOK</div>
          <div style={{
            width: 375,
            height: 780,
            borderRadius: 44,
            border: '8px solid #1a1d2e',
            background: '#0d0d12',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px #252840, inset 0 0 30px rgba(0,0,0,.6), 0 30px 80px rgba(0,0,0,.9)'
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 126, height: 34, background: '#1a1d2e',
              borderRadius: '0 0 20px 20px', zIndex: 20
            }} />
            <LeftPhone
              games={games}
              bets={bets}
              balance={balance}
              totalProfit={totalProfit}
              ticker={ticker}
              selectedBets={selectedBets}
              onToggleOdd={toggleOdd}
              onPlaceBet={placeBet}
            />
          </div>
        </div>

        {/* Right Phone - Agent HQ */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 9, color: '#2d3748', letterSpacing: '.12em' }}>AGENT HQ</div>
          <div style={{
            width: 375,
            height: 780,
            borderRadius: 44,
            border: '8px solid #1a1d2e',
            background: '#0a0d14',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px #252840, inset 0 0 30px rgba(0,0,0,.6), 0 30px 80px rgba(0,0,0,.9)'
          }}>
            {/* Notch */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 126, height: 34, background: '#1a1d2e',
              borderRadius: '0 0 20px 20px', zIndex: 20
            }} />
            <RightPhone
              agents={agents}
              activities={activities}
              totalProfit={totalProfit}
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #0f1220',
        padding: '6px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 8,
        color: '#1e2535',
        letterSpacing: '.06em',
        flexShrink: 0
      }}>
        <span>SOVEREIGN ◈ 12-AGENT AUTONOMOUS SYSTEM ◈ v4</span>
        <span>{new Date().toLocaleDateString()} ◈ {activeAgents} AGENTS RUNNING</span>
      </div>
    </div>
  )
}

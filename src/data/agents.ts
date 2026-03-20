export type AgentStatus = 'active' | 'idle' | 'analyzing' | 'placing' | 'error';

export interface Agent {
  id: string;
  name: string;
  icon: string;
  status: AgentStatus;
  task: string;
  betsToday: number;
  winRate: number;
  profitToday: number;
  totalProfit: number;
  lastAction: string;
  confidence: number;
}

export interface BetRecord {
  id: string;
  agentId: string;
  agentName: string;
  game: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  potential: number;
  status: 'pending' | 'won' | 'lost' | 'void';
  timestamp: Date;
  profit?: number;
}

export interface Activity {
  id: string;
  agentId: string;
  agentName: string;
  message: string;
  type: 'bet' | 'scan' | 'alert' | 'win' | 'loss' | 'analysis';
  timestamp: Date;
}

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'OddsHunter',
    icon: '🎯',
    status: 'analyzing',
    task: 'Scanning Premier League markets',
    betsToday: 8,
    winRate: 71.4,
    profitToday: 342.50,
    totalProfit: 12840,
    lastAction: 'Found value: Arsenal vs Man City O2.5',
    confidence: 82,
  },
  {
    id: 'a2',
    name: 'ValueSniper',
    icon: '🔍',
    status: 'placing',
    task: 'Placing bet on NBA spread',
    betsToday: 12,
    winRate: 66.7,
    profitToday: 215.00,
    totalProfit: 8920,
    lastAction: 'Bet placed: Lakers +4.5 @1.90',
    confidence: 74,
  },
  {
    id: 'a3',
    name: 'ArbitrageBot',
    icon: '⚡',
    status: 'active',
    task: 'Monitoring line movements',
    betsToday: 5,
    winRate: 88.0,
    profitToday: 890.00,
    totalProfit: 31200,
    lastAction: 'Arb opportunity: 3.2% margin UFC',
    confidence: 95,
  },
  {
    id: 'a4',
    name: 'KellyCalc',
    icon: '📊',
    status: 'analyzing',
    task: 'Calculating optimal stake sizes',
    betsToday: 15,
    winRate: 60.0,
    profitToday: 128.75,
    totalProfit: 5640,
    lastAction: 'Kelly: 8.5% bankroll on Real Madrid',
    confidence: 68,
  },
  {
    id: 'a5',
    name: 'RiskGuard',
    icon: '🛡️',
    status: 'active',
    task: 'Managing portfolio exposure',
    betsToday: 3,
    winRate: 100.0,
    profitToday: 45.00,
    totalProfit: 2180,
    lastAction: 'Risk alert: Over-exposed on Soccer',
    confidence: 91,
  },
  {
    id: 'a6',
    name: 'LineWatcher',
    icon: '👁️',
    status: 'active',
    task: 'Tracking line movements',
    betsToday: 22,
    winRate: 54.5,
    profitToday: -85.00,
    totalProfit: 4320,
    lastAction: 'Line moved: Chiefs -3.5 → -4.5',
    confidence: 58,
  },
  {
    id: 'a7',
    name: 'StatEngine',
    icon: '🧮',
    status: 'analyzing',
    task: 'Processing historical data',
    betsToday: 7,
    winRate: 71.4,
    profitToday: 198.50,
    totalProfit: 9870,
    lastAction: 'Model: 73% Celtics win probability',
    confidence: 77,
  },
  {
    id: 'a8',
    name: 'TrendMaster',
    icon: '📈',
    status: 'idle',
    task: 'Waiting for next scan cycle',
    betsToday: 4,
    winRate: 75.0,
    profitToday: 410.00,
    totalProfit: 7650,
    lastAction: 'Trend: BTTS in high 3 EPL games',
    confidence: 79,
  },
  {
    id: 'a9',
    name: 'LiveTrader',
    icon: '⚽',
    status: 'placing',
    task: 'In-play bet on El Clasico',
    betsToday: 18,
    winRate: 61.1,
    profitToday: 267.00,
    totalProfit: 11340,
    lastAction: 'In-play: Real Madrid +0.5 @1.35',
    confidence: 83,
  },
  {
    id: 'a10',
    name: 'PortfolioAI',
    icon: '🤖',
    status: 'active',
    task: 'Optimizing bet portfolio',
    betsToday: 11,
    winRate: 63.6,
    profitToday: 335.25,
    totalProfit: 14890,
    lastAction: 'Rebalanced: 40% Soccer, 35% NBA',
    confidence: 86,
  },
];

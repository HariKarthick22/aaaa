# Sovereign

A real-time control room for autonomous agents — live status, confidence,
win rate, and P&L for every agent in the fleet.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Live](https://img.shields.io/badge/demo-live-F98E08?style=flat-square)

**Live:** https://aaaa-zeta-teal.vercel.app

---

## Problem

Once you are running more than one autonomous agent, the hard part stops being the
agents and becomes visibility. Which one is thinking right now? Which one is
placing? Which one has quietly been losing for an hour? A log file cannot answer
that at a glance, and by the time you have read it the state has already moved on.

Sovereign is the dashboard that answers it in real time.

## Approach

Every agent carries a typed state that the UI renders directly:

```ts
type AgentStatus = 'active' | 'idle' | 'analyzing' | 'placing' | 'error';

interface Agent {
  id: string;
  name: string;
  status: AgentStatus;     // drives the live indicator
  task: string;            // what it is doing right now
  confidence: number;      // model confidence on the current decision
  winRate: number;
  betsToday: number;
  profitToday: number;
  totalProfit: number;
  lastAction: string;
}
```

State streams from Firebase through a `useLiveData` hook, so the dashboard updates
without polling. Framer Motion animates transitions between agent states, which
matters more than it sounds — a status change nobody notices is a status change
that may as well not have happened. Recharts renders performance history.

## Results

| Dimension | Tracked |
|---|---|
| Agent states | 5 (`active`, `idle`, `analyzing`, `placing`, `error`) |
| Per-agent metrics | confidence, win rate, bets today, profit today, total profit |
| Bet records | agent, game, market, selection, odds, stake |
| Update mechanism | Firebase live subscription, no polling |
| Charting | Recharts time series |

## Quickstart

```bash
git clone https://github.com/HariKarthick22/aaaa.git
cd aaaa
npm install

cp .env.example .env        # add your Firebase config
npm run dev                 # http://localhost:5173
```

Build and deploy:

```bash
npm run build
firebase deploy             # firebase.json and .firebaserc are configured
```

## Structure

```
src/
  App.tsx               dashboard shell and layout
  firebase.ts           Firebase initialisation
  hooks/
    useLiveData.ts      live subscription — the core of the realtime behaviour
  data/
    agents.ts           Agent and BetRecord types, agent registry
    sports.ts           market and fixture definitions
public/
  icons.svg             sprite sheet
```

## Data

Agent state is held in Firebase. The repository ships with representative
definitions in `src/data/` so the dashboard renders immediately without a
configured backend.

## Limitations

- The agent feed is **simulated**, not wired to a live broker or exchange. This is
  a monitoring surface, not a trading system.
- Requires Firebase credentials in `.env`; without them the live hook falls back to
  the static definitions in `src/data/`.
- No authentication layer — anyone with the URL sees the dashboard. Do not point it
  at real financial data as it stands.
- The repository name is a placeholder left over from scaffolding and does not
  match the project name.

## License

MIT

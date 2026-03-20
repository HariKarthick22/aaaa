import { useState, useEffect, useCallback, useRef } from 'react';
import {
  collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { INITIAL_GAMES, UPCOMING_GAMES, type Game } from '../data/sports';
import { INITIAL_AGENTS, type Agent, type BetRecord, type Activity } from '../data/agents';

function rnd(min: number, max: number, dec = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(dec));
}
function randItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function uid() {
  return Math.random().toString(36).substring(2, 11);
}

const ACTIVITIES_TEMPLATES = [
  { type: "scan" as const, msg: (_a: Agent, g: Game) => `Scanning ${g.league}: ${g.homeTeam} vs ${g.awayTeam}` },
  { type: "analysis" as const, msg: (_a: Agent, g: Game) => `Model predicts ${rnd(55, 85)}% win probability for ${g.homeTeam}` },
  { type: "bet" as const, msg: (_a: Agent, g: Game) => `Placed £${rnd(20, 200, 0)} on ${g.homeTeam} @ ${rnd(1.5, 3.5)}` },
  { type: "alert" as const, msg: (_a: Agent, g: Game) => `Line movement detected: ${g.homeTeam} vs ${g.awayTeam}` },
  { type: "win" as const, msg: (_a: Agent, g: Game) => `BET WON +£${rnd(30, 300, 0)} — ${g.homeTeam} ${g.markets[0]?.name ?? ""}` },
  { type: "loss" as const, msg: (_a: Agent, _g: Game) => `Bet settled -£${rnd(20, 100, 0)} — market closed` },
];

const makeInitialBets = (): BetRecord[] => [
  { id: uid(), agentId: 'a1', agentName: 'OddsHunter', game: 'Arsenal vs Man City', market: 'Match Result', selection: 'Arsenal', odds: 3.40, stake: 50, potential: 170, status: 'pending', timestamp: new Date(Date.now() - 180000) },
  { id: uid(), agentId: 'a2', agentName: 'ValueSniper', game: 'Lakers vs Celtics', market: 'Point Spread', selection: 'LAL +4.5', odds: 1.90, stake: 100, potential: 190, status: 'pending', timestamp: new Date(Date.now() - 300000) },
  { id: uid(), agentId: 'a3', agentName: 'ArbitrageBot', game: 'Chiefs vs Eagles', market: 'Moneyline', selection: 'Eagles', odds: 2.38, stake: 75, potential: 178.50, status: 'won', profit: 103.50, timestamp: new Date(Date.now() - 600000) },
  { id: uid(), agentId: 'a9', agentName: 'LiveTrader', game: 'Real Madrid vs Barcelona', market: 'Match Result', selection: 'Draw', odds: 3.10, stake: 40, potential: 124, status: 'pending', timestamp: new Date(Date.now() - 120000) },
  { id: uid(), agentId: 'a7', agentName: 'StatEngine', game: 'Yankees vs Red Sox', market: 'Moneyline', selection: 'Yankees', odds: 1.58, stake: 150, potential: 237, status: 'won', profit: 87, timestamp: new Date(Date.now() - 900000) },
  { id: uid(), agentId: 'a6', agentName: 'LineWatcher', game: 'Rangers vs Bruins', market: 'Total Goals', selection: 'Over 5.5', odds: 1.80, stake: 60, potential: 108, status: 'lost', profit: -60, timestamp: new Date(Date.now() - 1200000) },
  { id: uid(), agentId: 'a10', agentName: 'PortfolioAI', game: 'Djokovic vs Alcaraz', market: 'Match Winner', selection: 'Djokovic', odds: 2.10, stake: 80, potential: 168, status: 'pending', timestamp: new Date(Date.now() - 60000) },
];

// Write a bet to Firestore, silently fail if Firebase not configured
async function persistBet(bet: BetRecord) {
  try {
    await addDoc(collection(db, 'bets'), {
      ...bet,
      timestamp: serverTimestamp(),
    });
  } catch {
    // Firebase not configured — running in offline mode
  }
}

// Write an activity to Firestore, silently fail if Firebase not configured
async function persistActivity(activity: Activity) {
  try {
    await addDoc(collection(db, 'activities'), {
      ...activity,
      timestamp: serverTimestamp(),
    });
  } catch {
    // Firebase not configured — running in offline mode
  }
}

export function useLiveData() {
  const [games, setGames] = useState<Game[]>([...INITIAL_GAMES, ...UPCOMING_GAMES]);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [bets, setBets] = useState<BetRecord[]>(makeInitialBets());
  const [activities, setActivities] = useState<Activity[]>([]);
  const [balance, setBalance] = useState(10000);
  const [totalProfit, setTotalProfit] = useState(2746.50);
  const [selectedBets, setSelectedBets] = useState<{ gameId: string; marketName: string; oddLabel: string; oddValue: number }[]>([]);
  const [ticker, setTicker] = useState<string[]>([]);
  const tickRef = useRef(0);

  // Subscribe to Firestore bets collection (last 50)
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      const q = query(collection(db, 'bets'), orderBy('timestamp', 'desc'), limit(50));
      unsubscribe = onSnapshot(q, snapshot => {
        if (snapshot.empty) return;
        const remoteBets: BetRecord[] = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            agentId: d.agentId ?? '',
            agentName: d.agentName ?? '',
            game: d.game ?? '',
            market: d.market ?? '',
            selection: d.selection ?? '',
            odds: d.odds ?? 1,
            stake: d.stake ?? 0,
            potential: d.potential ?? 0,
            status: d.status ?? 'pending',
            timestamp: d.timestamp?.toDate?.() ?? new Date(),
            profit: d.profit,
          };
        });
        setBets(remoteBets);
      }, () => {
        // Firestore offline or not configured — local state only
      });
    } catch {
      // Firebase not configured
    }
    return () => unsubscribe?.();
  }, []);

  // Subscribe to Firestore activities collection (last 50)
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      const q = query(collection(db, 'activities'), orderBy('timestamp', 'desc'), limit(50));
      unsubscribe = onSnapshot(q, snapshot => {
        if (snapshot.empty) return;
        const remoteActivities: Activity[] = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            agentId: d.agentId ?? '',
            agentName: d.agentName ?? '',
            message: d.message ?? '',
            type: d.type ?? 'scan',
            timestamp: d.timestamp?.toDate?.() ?? new Date(),
          };
        });
        setActivities(remoteActivities);
      }, () => {
        // Firestore offline or not configured — local state only
      });
    } catch {
      // Firebase not configured
    }
    return () => unsubscribe?.();
  }, []);

  // Main tick: update odds, scores, agents, activities every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      const tick = tickRef.current;

      // Update game odds & scores
      setGames(prev => prev.map(g => {
        if (g.status !== 'live') return g;
        const updated = { ...g };
        if (tick % 30 === 0 && Math.random() < 0.3 && g.sport === 'Soccer') {
          if (Math.random() < 0.5) updated.homeScore = g.homeScore + 1;
          else updated.awayScore = g.awayScore + 1;
        }
        if (g.minute !== undefined) {
          updated.minute = Math.min((g.minute || 0) + 1, 90);
          updated.time = `${updated.minute}'`;
        }
        updated.markets = g.markets.map(m => ({
          ...m,
          odds: m.odds.map(o => {
            const drift = (Math.random() - 0.5) * 0.08;
            const newVal = Math.max(1.05, parseFloat((o.value + drift).toFixed(2)));
            return { ...o, value: newVal, dir: drift > 0.02 ? 'up' : drift < -0.02 ? 'down' : 'neutral' };
          })
        }));
        return updated;
      }));

      // Update agent statuses (autonomous behaviour)
      setAgents(prev => prev.map(a => {
        if (Math.random() > 0.15) return a;
        const statuses: Agent['status'][] = ['active', 'idle', 'analyzing', 'placing'];
        const newStatus = Math.random() < 0.7 ? (a.status === 'idle' ? 'analyzing' : a.status) : randItem(statuses);
        const profitDelta = Math.random() < 0.3 ? rnd(-50, 150) : 0;
        return {
          ...a,
          status: newStatus,
          profitToday: parseFloat((a.profitToday + profitDelta).toFixed(2)),
          confidence: Math.min(99, Math.max(40, a.confidence + rnd(-3, 3, 0))),
        };
      }));

      // Autonomous agent activity
      if (tick % 3 === 0) {
        const agent = randItem(INITIAL_AGENTS);
        const game = randItem(INITIAL_GAMES);
        const tmpl = randItem(ACTIVITIES_TEMPLATES);
        const activity: Activity = {
          id: uid(),
          agentId: agent.id,
          agentName: agent.name,
          message: tmpl.msg(agent, game),
          type: tmpl.type,
          timestamp: new Date(),
        };
        setActivities(prev => [activity, ...prev].slice(0, 50));
        setTicker(prev => [`${agent.icon} ${agent.name}: ${activity.message}`, ...prev].slice(0, 20));
        // Persist to Firestore
        persistActivity(activity);
      }

      // Autonomous agent betting every 15 ticks
      if (tick % 15 === 0) {
        const agent = randItem(INITIAL_AGENTS.filter(a => ['active', 'analyzing'].includes(a.status) || Math.random() > 0.5));
        const game = randItem(INITIAL_GAMES);
        const market = randItem(game.markets);
        const odd = randItem(market.odds);
        const stake = Math.round(rnd(20, 150, 0));
        const potential = parseFloat((stake * odd.value).toFixed(2));
        const autoBet: BetRecord = {
          id: uid(),
          agentId: agent.id,
          agentName: agent.name,
          game: `${game.homeTeam} vs ${game.awayTeam}`,
          market: market.name,
          selection: odd.label,
          odds: parseFloat(odd.value.toFixed(2)),
          stake,
          potential,
          status: 'pending',
          timestamp: new Date(),
        };
        setBets(prev => [autoBet, ...prev].slice(0, 50));
        setBalance(b => parseFloat((b - stake).toFixed(2)));
        // Persist to Firestore
        persistBet(autoBet);
      }

      // Settle pending bets
      if (tick % 20 === 0) {
        setBets(prev => prev.map(b => {
          if (b.status !== 'pending' || Math.random() > 0.2) return b;
          const won = Math.random() < 0.55;
          const profit = won ? parseFloat((b.potential - b.stake).toFixed(2)) : -b.stake;
          if (won) setBalance(bal => parseFloat((bal + b.potential).toFixed(2)));
          setTotalProfit(tp => parseFloat((tp + profit).toFixed(2)));
          return { ...b, status: won ? 'won' : 'lost', profit };
        }));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleOdd = useCallback((gameId: string, marketName: string, oddLabel: string, oddValue: number) => {
    setSelectedBets(prev => {
      const exists = prev.find(b => b.gameId === gameId && b.marketName === marketName);
      if (exists) {
        if (exists.oddLabel === oddLabel) return prev.filter(b => !(b.gameId === gameId && b.marketName === marketName));
        return prev.map(b => b.gameId === gameId && b.marketName === marketName ? { ...b, oddLabel, oddValue } : b);
      }
      return [...prev, { gameId, marketName, oddLabel, oddValue }];
    });
  }, []);

  const placeBet = useCallback((stake: number) => {
    if (selectedBets.length === 0 || stake <= 0) return;
    const game = games.find(g => g.id === selectedBets[0].gameId);
    if (!game) return;
    const totalOdds = selectedBets.reduce((acc, b) => acc * b.oddValue, 1);
    const potential = parseFloat((stake * totalOdds).toFixed(2));
    const agent = randItem(INITIAL_AGENTS);
    const newBet: BetRecord = {
      id: uid(),
      agentId: agent.id,
      agentName: 'Manual',
      game: `${game.homeTeam} vs ${game.awayTeam}`,
      market: selectedBets[0].marketName,
      selection: selectedBets[0].oddLabel,
      odds: parseFloat(totalOdds.toFixed(2)),
      stake,
      potential,
      status: 'pending',
      timestamp: new Date(),
    };
    setBets(prev => [newBet, ...prev].slice(0, 50));
    setBalance(b => parseFloat((b - stake).toFixed(2)));
    setSelectedBets([]);
    persistBet(newBet);
  }, [selectedBets, games]);

  return { games, agents, bets, activities, balance, totalProfit, selectedBets, ticker, toggleOdd, placeBet };
}

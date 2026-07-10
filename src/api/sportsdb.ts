const KEY = import.meta.env.VITE_SPORTSDB_KEY || "123";
const BASE = `https://www.thesportsdb.com/api/v1/json/${KEY}/eventsround.php?id=4429&s=2026&r=`;

export const KO_ROUNDS = [
  { r: [32], st: "R32" },
  { r: [16], st: "R16" },
  { r: [8, 125], st: "QF" },
  { r: [4, 126], st: "SF" },
  { r: [2, 127], st: "F" },
] as const;

export const ORDER = ["R32", "R16", "QF", "SF", "F"] as const;
export type StageKey = typeof ORDER[number];

export const LABEL: Record<StageKey, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-finals",
  SF: "Semi-finals",
  F: "Final",
};

export interface Match {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string | null;
  strAwayTeam: string | null;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strHomeTeamBadge: string | null;
  strAwayTeamBadge: string | null;
  dateEvent: string | null;
  strTime: string | null;
  strStatus: string | null;
  strHomeGoalDetails?: string | null;
  strAwayGoalDetails?: string | null;
  intHomeScoreExtra?: string | null;
  intAwayScoreExtra?: string | null;
  intHomePenaltyScore?: string | null;
  intAwayPenaltyScore?: string | null;
  strResult?: string | null;
}

export type ByStage = Record<StageKey, Match[]>;

export function isLive(e: Match | null): boolean {
  if (!e) return false;
  const s = (e.strStatus || "").toUpperCase();
  return (
    (/\d/.test(s) || ["1H", "2H", "HT", "ET", "LIVE", "PLAY"].some((x) => s.includes(x))) &&
    !["FT", "AET", "AP", "PEN", "FINISHED"].some((x) => s.includes(x)) &&
    s !== "NS" &&
    s !== ""
  );
}

export function isFinished(e: Match | null): boolean {
  if (!e) return false;
  const s = (e.strStatus || "").toUpperCase();
  return (
    ["FT", "AET", "AP", "PEN", "FINISHED"].some((x) => s.includes(x)) ||
    (e.intHomeScore != null &&
      e.intAwayScore != null &&
      s !== "NS" &&
      s !== "" &&
      !isLive(e))
  );
}

export interface BracketResult {
  byStage: ByStage;
  // Rounds whose request genuinely failed (network/HTTP), as opposed to
  // succeeding with an empty list (a not-yet-played round is not a failure).
  failedStages: StageKey[];
}

export async function fetchBracketData(): Promise<BracketResult> {
  const byStage: Partial<ByStage> = {};
  ORDER.forEach((s) => {
    byStage[s] = [];
  });
  const failedStages: StageKey[] = [];

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchWithRetry = async (url: string, retries = 3, backoff = 300): Promise<{ ok: boolean; data: any }> => {
    for (let i = 0; i < retries; i++) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (r.status === 429) {
          await delay(backoff);
          backoff *= 2;
          continue;
        }
        if (!r.ok) return { ok: false, data: { events: null } };
        const data = await r.json();
        return { ok: true, data };
      } catch {
        if (i === retries - 1) return { ok: false, data: { events: null } };
        await delay(backoff);
        backoff *= 2;
      }
    }
    return { ok: false, data: { events: null } };
  };

  const results: { ok: boolean; data: any; roundNum: number; stageKey: StageKey }[] = [];
  for (let i = 0; i < KO_ROUNDS.length; i++) {
    const k = KO_ROUNDS[i];
    for (let j = 0; j < k.r.length; j++) {
      const rNum = k.r[j];
      if (results.length > 0) {
        await delay(150); // delay between fetches to avoid rate limit
      }
      const res = await fetchWithRetry(BASE + rNum);
      results.push({ ...res, roundNum: rNum, stageKey: k.st });
    }
  }

  const stageSuccess: Record<StageKey, boolean> = {
    R32: false,
    R16: false,
    QF: false,
    SF: false,
    F: false,
  };

  results.forEach((res) => {
    if (res.ok) {
      stageSuccess[res.stageKey] = true;
      const evs = res.data && res.data.events ? res.data.events : [];
      evs.forEach((ev: any) => {
        // Exclut la 2e journée de poules qui partage le round 2 avec la finale
        if (res.roundNum === 2 && !(ev.dateEvent && ev.dateEvent >= "2026-07-16")) return;
        
        // Avoid duplicate events if they exist under multiple query fallback rounds
        if (!byStage[res.stageKey]!.some((existing) => existing.idEvent === ev.idEvent)) {
          byStage[res.stageKey]!.push(ev);
        }
      });
    }
  });

  ORDER.forEach((s) => {
    if (!stageSuccess[s]) {
      failedStages.push(s);
    }
  });

  ORDER.forEach((s) => {
    byStage[s]!.sort((a, b) => {
      const slotA = getMatchSlot(a, s);
      const slotB = getMatchSlot(b, s);
      if (slotA !== slotB) {
        return slotA - slotB;
      }
      const dateTimeA = (a.dateEvent || "") + (a.strTime || "");
      const dateTimeB = (b.dateEvent || "") + (b.strTime || "");
      return dateTimeA.localeCompare(dateTimeB) || +a.idEvent - +b.idEvent;
    });
  });

  // Every round failed → treat as a full outage.
  if (failedStages.length === KO_ROUNDS.length) {
    throw new Error("Could not reach the data source");
  }
  if (!ORDER.some((s) => byStage[s]!.length > 0)) {
    throw new Error("No knockout matches returned");
  }

  return { byStage: byStage as ByStage, failedStages };
}

const normalizeTeamName = (name: string | null): string => {
  if (!name) return "";
  const n = name.trim().toLowerCase();
  if (n === "united states" || n === "usa") return "usa";
  return n;
};

const BRACKET_R32_PAIRS = [
  ["germany", "paraguay"],
  ["france", "sweden"],
  ["south africa", "canada"],
  ["netherlands", "morocco"],
  ["portugal", "croatia"],
  ["spain", "austria"],
  ["usa", "bosnia-herzegovina"],
  ["belgium", "senegal"],
  ["brazil", "japan"],
  ["ivory coast", "norway"],
  ["mexico", "ecuador"],
  ["england", "dr congo"],
  ["argentina", "cape verde"],
  ["australia", "egypt"],
  ["switzerland", "algeria"],
  ["colombia", "ghana"],
];

export function getMatchSlot(m: Match, stage: StageKey): number {
  const home = normalizeTeamName(m.strHomeTeam);
  const away = normalizeTeamName(m.strAwayTeam);

  if (stage === "R32") {
    for (let i = 0; i < BRACKET_R32_PAIRS.length; i++) {
      const pair = BRACKET_R32_PAIRS[i];
      if ((home && pair.includes(home)) || (away && pair.includes(away))) {
        return i;
      }
    }
  } else if (stage === "R16") {
    for (let j = 0; j < 8; j++) {
      const r32_1 = BRACKET_R32_PAIRS[2 * j];
      const r32_2 = BRACKET_R32_PAIRS[2 * j + 1];
      if (
        (home && (r32_1.includes(home) || r32_2.includes(home))) ||
        (away && (r32_1.includes(away) || r32_2.includes(away)))
      ) {
        return j;
      }
    }
  } else if (stage === "QF") {
    for (let k = 0; k < 4; k++) {
      const allowedTeams: string[] = [];
      for (let offset = 0; offset < 4; offset++) {
        allowedTeams.push(...BRACKET_R32_PAIRS[4 * k + offset]);
      }
      if (
        (home && allowedTeams.includes(home)) ||
        (away && allowedTeams.includes(away))
      ) {
        return k;
      }
    }
  } else if (stage === "SF") {
    for (let s = 0; s < 2; s++) {
      const allowedTeams: string[] = [];
      for (let offset = 0; offset < 8; offset++) {
        allowedTeams.push(...BRACKET_R32_PAIRS[8 * s + offset]);
      }
      if (
        (home && allowedTeams.includes(home)) ||
        (away && allowedTeams.includes(away))
      ) {
        return s;
      }
    }
  } else if (stage === "F") {
    return 0;
  }
  return 999;
}

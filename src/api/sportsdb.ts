const KEY = import.meta.env.VITE_SPORTSDB_KEY || "123";
const BASE = `https://www.thesportsdb.com/api/v1/json/${KEY}/eventsround.php?id=4429&s=2026&r=`;

export const KO_ROUNDS = [
  { r: 32, st: "R32" },
  { r: 16, st: "R16" },
  { r: 8, st: "QF" },
  { r: 4, st: "SF" },
  { r: 2, st: "F" },
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

export async function fetchBracketData(): Promise<ByStage> {
  const results = await Promise.all(
    KO_ROUNDS.map((k) =>
      fetch(BASE + k.r, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : { events: null }))
        .catch(() => ({ events: null }))
    )
  );

  const byStage: Partial<ByStage> = {};
  ORDER.forEach((s) => {
    byStage[s] = [];
  });

  results.forEach((data, i) => {
    const k = KO_ROUNDS[i];
    const evs = data && data.events ? data.events : [];
    evs.forEach((ev: any) => {
      // Exclut la 2e journée de poules qui partage le round 2 avec la finale
      if (k.r === 2 && !(ev.dateEvent && ev.dateEvent >= "2026-07-16")) return;
      byStage[k.st as StageKey]!.push(ev);
    });
  });

  ORDER.forEach((s) =>
    byStage[s]!.sort(
      (a, b) =>
        ((a.dateEvent || "") + (a.strTime || "")).localeCompare(
          (b.dateEvent || "") + (b.strTime || "")
        ) || +a.idEvent - +b.idEvent
    )
  );

  if (!ORDER.some((s) => byStage[s]!.length > 0)) {
    throw new Error("No knockout matches returned");
  }

  return byStage as ByStage;
}

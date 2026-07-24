import { HISTORICAL_DATA } from "./historicalData";
import { STATIC_2026 } from "./static2026";

const KEY = import.meta.env.VITE_SPORTSDB_KEY || "123";

export interface KOStage {
  r: readonly number[];
  st: StageKey;
}

export const getKoRoundsForSeason = (season: string): readonly KOStage[] => {
  if (season === "2022") {
    return [
      { r: [16], st: "R16" },
      { r: [125], st: "QF" },
      { r: [150], st: "SF" },
      { r: [200], st: "F" },
    ] as const;
  }
  if (season === "2018" || season === "2006" || season === "2002" || season === "1998" || season === "1994" || season === "1990" || season === "1986" || season === "1982" || season === "1978") {
    return [
      { r: [4], st: "R16" },
      { r: [125], st: "QF" },
      { r: [150], st: "SF" },
      { r: [200], st: "F" },
    ] as const;
  }
  if (season === "2014" || season === "2010") {
    return [
      { r: [16], st: "R16" },
      { r: [125], st: "QF" },
      { r: [150], st: "SF" },
      { r: [200], st: "F" },
    ] as const;
  }
  return [
    { r: [32], st: "R32" },
    { r: [16], st: "R16" },
    { r: [8, 125], st: "QF" },
    { r: [4, 150], st: "SF" },
    { r: [2, 200], st: "F" },
  ] as const;
};

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
  failedStages: StageKey[];
}

export async function fetchBracketData(season: string = "2026"): Promise<BracketResult> {
  if (
    season === "2022" ||
    season === "2018" ||
    season === "2014" ||
    season === "2010" ||
    season === "2006" ||
    season === "2002" ||
    season === "1998" ||
    season === "1994" ||
    season === "1990" ||
    season === "1986" ||
    season === "1982" ||
    season === "1978"
  ) {
    return HISTORICAL_DATA[season];
  }

  // Pre-load with hardcoded static 2026 data
  const byStage: ByStage = {
    R32: [...STATIC_2026.R32],
    R16: [...STATIC_2026.R16],
    QF: [...STATIC_2026.QF],
    SF: [],
    F: [],
  };
  const failedStages: StageKey[] = [];

  // Determine active/live rounds to fetch: only SF and F
  const liveStages: { r: readonly number[]; st: StageKey }[] = [
    { r: [4, 150], st: "SF" },
    { r: [2, 200], st: "F" },
  ];

  const baseApiUrl = `https://www.thesportsdb.com/api/v1/json/${KEY}/eventsround.php?id=4429&s=${season}&r=`;

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
  for (let i = 0; i < liveStages.length; i++) {
    const k = liveStages[i];
    for (let j = 0; j < k.r.length; j++) {
      const rNum = k.r[j];
      if (results.length > 0) {
        await delay(150);
      }
      const res = await fetchWithRetry(baseApiUrl + rNum);
      results.push({ ...res, roundNum: rNum, stageKey: k.st });
    }
  }

  const stageSuccess: Record<StageKey, boolean> = {
    R32: true, // statically loaded
    R16: true, // statically loaded
    QF: true,  // statically loaded
    SF: false,
    F: false,
  };

  results.forEach((res) => {
    if (res.ok) {
      stageSuccess[res.stageKey] = true;
      const evs = res.data && res.data.events ? res.data.events : [];
      evs.forEach((ev: any) => {
        // Exclut la 2e journée de poules qui partage le round 2 avec la finale (uniquement pour 2026)
        if (season === "2026" && res.roundNum === 2 && !(ev.dateEvent && ev.dateEvent >= "2026-07-16")) return;

        if (!byStage[res.stageKey]!.some((existing) => existing.idEvent === ev.idEvent)) {
          byStage[res.stageKey]!.push({
            idEvent: ev.idEvent,
            strEvent: ev.strEvent,
            strHomeTeam: ev.strHomeTeam,
            strAwayTeam: ev.strAwayTeam,
            intHomeScore: ev.intHomeScore,
            intAwayScore: ev.intAwayScore,
            strHomeTeamBadge: ev.strHomeTeamBadge,
            strAwayTeamBadge: ev.strAwayTeamBadge,
            dateEvent: ev.dateEvent,
            strTime: ev.strTime,
            strStatus: ev.strStatus,
            strHomeGoalDetails: ev.strHomeGoalDetails,
            strAwayGoalDetails: ev.strAwayGoalDetails,
            intHomeScoreExtra: ev.intHomeScoreExtra,
            intAwayScoreExtra: ev.intAwayScoreExtra,
            intHomePenaltyScore: ev.intHomePenaltyScore,
            intAwayPenaltyScore: ev.intAwayPenaltyScore,
            strResult: ev.strResult,
          });
        }
      });
    } else {
      if (res.stageKey === "SF" || res.stageKey === "F") {
        failedStages.push(res.stageKey);
      }
    }
  });

  const koRounds = getKoRoundsForSeason(season);
  koRounds.forEach((k) => {
    if (!stageSuccess[k.st]) {
      failedStages.push(k.st);
    }
  });

  ORDER.forEach((s) => {
    byStage[s]!.sort((a, b) => {
      const slotA = getMatchSlot(a, s, season);
      const slotB = getMatchSlot(b, s, season);
      if (slotA !== slotB) {
        return slotA - slotB;
      }
      const dateTimeA = (a.dateEvent || "") + (a.strTime || "");
      const dateTimeB = (b.dateEvent || "") + (b.strTime || "");
      return dateTimeA.localeCompare(dateTimeB) || +a.idEvent - +b.idEvent;
    });
  });

  // Every round failed → treat as a full outage.
  if (failedStages.length === koRounds.length) {
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

const BRACKET_R16_PAIRS_2022 = [
  ["netherlands", "usa"],
  ["argentina", "australia"],
  ["japan", "croatia"],
  ["brazil", "south korea"],
  ["england", "senegal"],
  ["france", "poland"],
  ["morocco", "spain"],
  ["portugal", "switzerland"],
];

const BRACKET_R16_PAIRS_2018 = [
  ["uruguay", "portugal"],
  ["france", "argentina"],
  ["brazil", "mexico"],
  ["belgium", "japan"],
  ["spain", "russia"],
  ["croatia", "denmark"],
  ["sweden", "switzerland"],
  ["colombia", "england"],
];

const BRACKET_R16_PAIRS_2014 = [
  ["brazil", "chile"],
  ["colombia", "uruguay"],
  ["france", "nigeria"],
  ["germany", "algeria"],
  ["netherlands", "mexico"],
  ["costa rica", "greece"],
  ["argentina", "switzerland"],
  ["belgium", "usa"],
];

const BRACKET_R16_PAIRS_2010 = [
  ["uruguay", "south korea"],
  ["usa", "ghana"],
  ["netherlands", "slovakia"],
  ["brazil", "chile"],
  ["argentina", "mexico"],
  ["germany", "england"],
  ["paraguay", "japan"],
  ["spain", "portugal"],
];

const BRACKET_R16_PAIRS_2006 = [
  ["germany", "sweden"],
  ["argentina", "mexico"],
  ["italy", "australia"],
  ["switzerland", "ukraine"],
  ["england", "ecuador"],
  ["portugal", "netherlands"],
  ["brazil", "ghana"],
  ["spain", "france"],
];

const BRACKET_R16_PAIRS_2002 = [
  ["germany", "paraguay"],
  ["mexico", "usa"],
  ["spain", "ireland"],
  ["south korea", "italy"],
  ["denmark", "england"],
  ["brazil", "belgium"],
  ["sweden", "senegal"],
  ["japan", "turkey"],
];

const BRACKET_R16_PAIRS_1998 = [
  ["brazil", "chile"],
  ["nigeria", "denmark"],
  ["netherlands", "fr yugoslavia"],
  ["argentina", "england"],
  ["italy", "norway"],
  ["france", "paraguay"],
  ["germany", "mexico"],
  ["romania", "croatia"],
];

const BRACKET_R16_PAIRS_1994 = [
  ["germany", "belgium"],
  ["mexico", "bulgaria"],
  ["spain", "switzerland"],
  ["nigeria", "italy"],
  ["saudi arabia", "sweden"],
  ["romania", "argentina"],
  ["netherlands", "republic of ireland"],
  ["brazil", "usa"],
];

const BRACKET_R16_PAIRS_1990 = [
  ["brazil", "argentina"],
  ["spain", "yugoslavia"],
  ["republic of ireland", "romania"],
  ["italy", "uruguay"],
  ["czechoslovakia", "costa rica"],
  ["west germany", "netherlands"],
  ["cameroon", "colombia"],
  ["england", "belgium"],
];

const BRACKET_R16_PAIRS_1986 = [
  ["brazil", "poland"],
  ["italy", "france"],
  ["morocco", "west germany"],
  ["mexico", "bulgaria"],
  ["argentina", "uruguay"],
  ["england", "paraguay"],
  ["soviet union", "belgium"],
  ["denmark", "spain"],
];

const BRACKET_R16_PAIRS_1982 = [
  ["poland", "belgium"],
  ["ussr", "italy"],
  ["argentina", "brazil"],
  ["poland", "italy"],
  ["west germany", "england"],
  ["spain", "france"],
  ["austria", "northern ireland"],
  ["west germany", "france"],
];

const BRACKET_R16_PAIRS_1978 = [
  ["netherlands", "italy"],
  ["west germany", "austria"],
  ["argentina", "brazil"],
  ["poland", "peru"],
  ["brazil", "italy"],
  ["austria", "west germany"],
  ["argentina", "netherlands"],
  ["peru", "poland"],
];

export function getMatchSlot(m: Match, stage: StageKey, season: string = "2026"): number {
  const home = normalizeTeamName(m.strHomeTeam);
  const away = normalizeTeamName(m.strAwayTeam);

  if (
    season === "2022" ||
    season === "2018" ||
    season === "2014" ||
    season === "2010" ||
    season === "2006" ||
    season === "2002" ||
    season === "1998" ||
    season === "1994" ||
    season === "1990" ||
    season === "1986" ||
    season === "1982" ||
    season === "1978"
  ) {
    const pairs =
      season === "1978"
        ? BRACKET_R16_PAIRS_1978
        : season === "1982"
        ? BRACKET_R16_PAIRS_1982
        : season === "1986"
        ? BRACKET_R16_PAIRS_1986
        : season === "1990"
        ? BRACKET_R16_PAIRS_1990
        : season === "1994"
        ? BRACKET_R16_PAIRS_1994
        : season === "1998"
        ? BRACKET_R16_PAIRS_1998
        : season === "2018"
        ? BRACKET_R16_PAIRS_2018
        : season === "2014"
        ? BRACKET_R16_PAIRS_2014
        : season === "2010"
        ? BRACKET_R16_PAIRS_2010
        : season === "2006"
        ? BRACKET_R16_PAIRS_2006
        : season === "2002"
        ? BRACKET_R16_PAIRS_2002
        : BRACKET_R16_PAIRS_2022;
    if (stage === "R16") {
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        if ((home && pair.includes(home)) || (away && pair.includes(away))) {
          return i;
        }
      }
    } else if (stage === "QF") {
      for (let k = 0; k < 4; k++) {
        const allowedTeams: string[] = [
          ...pairs[2 * k],
          ...pairs[2 * k + 1],
        ];
        if ((home && allowedTeams.includes(home)) || (away && allowedTeams.includes(away))) {
          return k;
        }
      }
    } else if (stage === "SF") {
      for (let s = 0; s < 2; s++) {
        const allowedTeams: string[] = [];
        for (let offset = 0; offset < 4; offset++) {
          allowedTeams.push(...pairs[4 * s + offset]);
        }
        if ((home && allowedTeams.includes(home)) || (away && allowedTeams.includes(away))) {
          return s;
        }
      }
    } else if (stage === "F") {
      return 0;
    }
    return 999;
  }

  // 2026 logic
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

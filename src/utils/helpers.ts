import { isLive, isFinished } from "../api/sportsdb";
import type { Match } from "../api/sportsdb";

// ===================== Geometry =====================
export const SIZE = 940;
export const C = SIZE / 2;

export const RINGS_2026 = {
  teams: { r: C - 42, sz: 40 }, // 32 teams (outer)
  R32: { r: 340, sz: 42 },
  R16: { r: 250, sz: 46 },
  QF: { r: 168, sz: 50 },
  SF: { r: 92, sz: 56 },
  F: { r: 0, sz: 66 },
};

export const RINGS_2022 = {
  teams: { r: C - 42, sz: 44 }, // 16 teams (outer)
  R32: { r: 0, sz: 0 },         // Fallback to prevent crash
  R16: { r: 310, sz: 48 },
  QF: { r: 200, sz: 52 },
  SF: { r: 100, sz: 58 },
  F: { r: 0, sz: 66 },
};

export function getRingsConfig(season: string) {
  return season === "2026" ? RINGS_2026 : RINGS_2022;
}

export const rad = (deg: number) => (deg * Math.PI) / 180;
export const pos = (angle: number, r: number) => ({
  x: C + r * Math.cos(angle),
  y: C + r * Math.sin(angle),
});

export function meanAngle(list: number[]) {
  let x = 0,
    y = 0;
  list.forEach((a) => {
    x += Math.cos(a);
    y += Math.sin(a);
  });
  return Math.atan2(y, x);
}

// Brings any angle into [-90°, 270°) to sort nodes in circular order
export function normAng(a: number) {
  while (a < -Math.PI / 2) a += 2 * Math.PI;
  while (a >= 1.5 * Math.PI) a -= 2 * Math.PI;
  return a;
}

// ===================== Display Utils =====================
const FLAG_ISO: Record<string, string> = {
  Canada: "ca", Mexico: "mx", USA: "us", "United States": "us", Russia: "ru",
  "South Africa": "za", Brazil: "br", Japan: "jp", Germany: "de", Paraguay: "py",
  Netherlands: "nl", Morocco: "ma", "Ivory Coast": "ci", Norway: "no", France: "fr",
  Sweden: "se", Ecuador: "ec", England: "gb-eng", Scotland: "gb-sct", Wales: "gb-wls",
  "DR Congo": "cd", Belgium: "be", Senegal: "sn", "Bosnia-Herzegovina": "ba", Portugal: "pt",
  Croatia: "hr", Spain: "es", Austria: "at", Australia: "au", Egypt: "eg", Argentina: "ar",
  "Cape Verde": "cv", Switzerland: "ch", Algeria: "dz", Colombia: "co", Ghana: "gh", Qatar: "qa",
  "South Korea": "kr", "Czech Republic": "cz", Haiti: "ht", Italy: "it", Uruguay: "uy", Nigeria: "ng",
  Cameroon: "cm", Tunisia: "tn", Iran: "ir", "Saudi Arabia": "sa", Denmark: "dk", Poland: "pl",
  Serbia: "rs", Peru: "pe", Chile: "cl", Panama: "pa", "Costa Rica": "cr", Jamaica: "jm",
  Honduras: "hn", "New Zealand": "nz", Jordan: "jo", Uzbekistan: "uz", Iraq: "iq",
  "United Arab Emirates": "ae", Curacao: "cw", Turkey: "tr", Greece: "gr", Ukraine: "ua",
  Ireland: "ie", "Republic of Ireland": "ie", "Panama ": "pa", Venezuela: "ve", Bolivia: "bo", Kenya: "ke", Slovakia: "sk",
  Romania: "ro", "FR Yugoslavia": "rs", Bulgaria: "bg",
};

export function flagURL(name: string | null): string | null {
  if (!name) return null;
  const c = FLAG_ISO[name];
  return c ? `https://flagcdn.com/w160/${c}.png` : null;
}

export function short(name: string | null): string {
  if (!name) return "";
  const map: Record<string, string> = {
    "South Africa": "RSA", "Ivory Coast": "CIV", "DR Congo": "COD", "Bosnia-Herzegovina": "BIH",
    "Cape Verde": "CPV", "South Korea": "KOR", "Saudi Arabia": "KSA", "United States": "USA", USA: "USA",
    "Czech Republic": "CZE", "New Zealand": "NZL", "Costa Rica": "CRC", Austria: "AUT", Australia: "AUS",
    Spain: "ESP", Netherlands: "NED", Japan: "JPN", Switzerland: "SUI", Germany: "GER", Morocco: "MAR",
    Paraguay: "PAR", Qatar: "QAT", Haiti: "HAI", England: "ENG", Portugal: "POR", Croatia: "CRO",
    Slovakia: "SVK", Romania: "ROU", "FR Yugoslavia": "YUG", Bulgaria: "BUL", "Republic of Ireland": "IRL",
    Ireland: "IRL", Nigeria: "NGA", Argentina: "ARG",
  };
  if (map[name]) return map[name];
  return name.replace(/[^A-Za-z ]/g, "").slice(0, 3).toUpperCase();
}

import { translations } from "./i18n";
import type { SupportedLang } from "./i18n";

export function scoreTxt(e: Match | null): string {
  if (!e) return "";
  return e.intHomeScore != null && e.intAwayScore != null
    ? `${e.intHomeScore}–${e.intAwayScore}`
    : "";
}

export function matchTip(e: Match | null, lang: SupportedLang = "en"): string {
  if (!e) return "";
  let sc = "";
  if (e.intHomeScore != null) {
    sc = ` ${e.intHomeScore}-${e.intAwayScore}`;
    if (e.intHomePenaltyScore != null && e.intAwayPenaltyScore != null) {
      sc += ` (${e.intHomePenaltyScore}-${e.intAwayPenaltyScore})`;
    }
  }
  const st = isLive(e)
    ? " (LIVE)"
    : isFinished(e)
    ? ""
    : e.strTime
    ? ` ${e.strTime.slice(0, 5)}`
    : "";
  let t = `${e.strHomeTeam || "?"} ${translations[lang].vs} ${e.strAwayTeam || "?"}${sc}${st}`;
  if (e.strHomeGoalDetails || e.strAwayGoalDetails) {
    t += `\n\n⚽️ ${translations[lang].scorers} :\n${e.strHomeTeam}: ${e.strHomeGoalDetails || "-"}\n${e.strAwayTeam}: ${e.strAwayGoalDetails || "-"}`;
  }
  return t;
}

export function winner(e: Match | null, nextStageTeams?: Set<string | null>): string | null {
  if (!e) return null;
  const h = e.strHomeTeam;
  const a = e.strAwayTeam;
  
  if (nextStageTeams) {
    if (nextStageTeams.has(h) && !nextStageTeams.has(a)) return h;
    if (nextStageTeams.has(a) && !nextStageTeams.has(h)) return a;
  }
  
  if (isFinished(e)) {
    const hs = +(e.intHomeScore || 0) + +(e.intHomeScoreExtra || 0);
    const as = +(e.intAwayScore || 0) + +(e.intAwayScoreExtra || 0);
    if (hs > as) return h;
    if (as > hs) return a;
    const hp = +(e.intHomePenaltyScore || 0);
    const ap = +(e.intAwayPenaltyScore || 0);
    if (hp > ap) return h;
    if (ap > hp) return a;
  }
  return null;
}

export function badgeOf(e: Match | null, teamName: string | null): string | null {
  if (!e || !teamName) return null;
  if (e.strHomeTeam === teamName) return e.strHomeTeamBadge;
  if (e.strAwayTeam === teamName) return e.strAwayTeamBadge;
  return null;
}

export function lineState(m: Match | null, w: string | null, team: string | null) {
  if (!m) return "cold";
  if (isLive(m)) return "live";
  if (isFinished(m)) return team === w ? "won" : "lost";
  if (m.strHomeTeam && m.strAwayTeam) return "sched"; // upcoming
  return "cold";
}

export function formatMatchDate(dateStr: string | null, timeStr: string | null, tz: string = Intl.DateTimeFormat().resolvedOptions().timeZone, lang: SupportedLang = "en"): { date: string, time: string } {
  if (!dateStr) return { date: "TBD", time: "" };
  const d = new Date(dateStr + "T" + (timeStr || "00:00:00") + "Z");
  if (isNaN(d.getTime())) return { date: dateStr, time: timeStr ? timeStr.slice(0, 5) : "" };
  
  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", timeZone: tz };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz };
  
  const locale = lang === "en" ? "en-US" : lang;
  const dateFormatted = d.toLocaleDateString(locale, dateOptions);
  const timeFormatted = d.toLocaleTimeString(locale, timeOptions);
  
  return { date: dateFormatted, time: timeFormatted };
}

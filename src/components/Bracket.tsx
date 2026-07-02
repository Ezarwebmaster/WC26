import React, { useMemo } from "react";
import { ORDER } from "../api/sportsdb";
import type { ByStage, Match, StageKey } from "../api/sportsdb";
import {
  C,
  SIZE,
  RINGS,
  pos,
  rad,
  meanAngle,
  normAng,
  winner,
  badgeOf,
  lineState,
  flagURL,
  scoreTxt,
} from "../utils/helpers";
import { TeamNode } from "./TeamNode";
import { Links } from "./Links";
import type { LinkData } from "./Links";

import { translations } from "../utils/i18n";
import type { SupportedLang } from "../utils/i18n";

interface BracketProps {
  byStage: ByStage;
  timezone: string;
  lang: SupportedLang;
}

interface NodeData {
  x: number;
  y: number;
  angle: number;
  team: string | null;
  badge: string | null;
  ringSize: number;
  isWin: boolean;
  match: Match | null;
  isOuter: boolean;
  timezone: string;
}

export const Bracket: React.FC<BracketProps> = ({ byStage, timezone, lang }) => {
  const { nodes, links, center } = useMemo(() => {
    const computedNodes: NodeData[] = [];
    const computedLinks: LinkData[] = [];

    // Precompute teams at each stage for winner determination
    const teamsAt: Partial<Record<StageKey, Set<string | null>>> = {};
    ORDER.forEach((s) => {
      teamsAt[s] = new Set(
        byStage[s].flatMap((e) => [e.strHomeTeam, e.strAwayTeam].filter(Boolean))
      );
    });

    const getWinner = (e: Match | null, si: number) => {
      const nextStage = ORDER[si + 1];
      const nextTeams = nextStage ? teamsAt[nextStage] : undefined;
      return winner(e, nextTeams);
    };

    // Feeder logic to order initial R32 matches
    const feedersOf = (m: Match, si: number): Match[] => {
      if (si <= 0) return [];
      const parts = [m.strHomeTeam, m.strAwayTeam].filter(Boolean);
      return byStage[ORDER[si - 1]].filter((pm) => {
        const w = getWinner(pm, si - 1);
        return w && parts.includes(w);
      });
    };

    const orderedR32: Match[] = [];
    const seen = new Set<Match>();

    const expand = (m: Match, si: number) => {
      if (si === 0) {
        if (!seen.has(m)) {
          seen.add(m);
          orderedR32.push(m);
        }
        return;
      }
      feedersOf(m, si).forEach((f) => expand(f, si - 1));
    };

    let T = -1;
    for (let i = ORDER.length - 1; i >= 1; i--) {
      if (byStage[ORDER[i]].length) {
        T = i;
        break;
      }
    }
    if (T > 0) {
      byStage[ORDER[T]].forEach((m) => expand(m, T));
    }
    byStage.R32.forEach((m) => {
      if (!seen.has(m)) {
        seen.add(m);
        orderedR32.push(m);
      }
    });

    const slots = Math.max(byStage.R32.length * 2, 2);
    const r32win: { x: number; y: number; angle: number; team: string | null }[] = [];
    const offset = 360 / (slots * 2);

    orderedR32.forEach((m, j) => {
      const w = getWinner(m, 0);
      const aH = rad(-90 + offset + ((2 * j) * 360) / slots);
      const aA = rad(-90 + offset + ((2 * j + 1) * 360) / slots);

      const p1 = pos(aH, RINGS.teams.r);
      const n1 = { x: p1.x, y: p1.y, angle: normAng(aH), team: m.strHomeTeam };
      computedNodes.push({
        ...n1, badge: m.strHomeTeamBadge, ringSize: RINGS.teams.sz,
        isWin: w === m.strHomeTeam, match: m, isOuter: true, timezone
      });

      const p2 = pos(aA, RINGS.teams.r);
      const n2 = { x: p2.x, y: p2.y, angle: normAng(aA), team: m.strAwayTeam };
      computedNodes.push({
        ...n2, badge: m.strAwayTeamBadge, ringSize: RINGS.teams.sz,
        isWin: w === m.strAwayTeam, match: m, isOuter: true, timezone
      });

      const wa = meanAngle([aH, aA]);
      const p3 = pos(wa, RINGS.R32.r);
      const n3 = { x: p3.x, y: p3.y, angle: normAng(wa), team: w };
      
      computedNodes.push({
        ...n3, badge: badgeOf(m, w), ringSize: RINGS.R32.sz,
        isWin: true, match: m, isOuter: false, timezone
      });
      computedLinks.push({ a: n1, b: n3, state: lineState(m, w, m.strHomeTeam), match: m });
      computedLinks.push({ a: n2, b: n3, state: lineState(m, w, m.strAwayTeam), match: m });
      r32win.push(n3);
    });

    const innerRing = (
      stageKey: StageKey,
      si: number,
      feeders: typeof r32win
    ) => {
      const out: typeof r32win = [];
      const used = new Set<typeof r32win[0]>();

      byStage[stageKey].forEach((m) => {
        const w = getWinner(m, si);
        const fs = feeders.filter((f) => f.team && (f.team === m.strHomeTeam || f.team === m.strAwayTeam));
        fs.forEach((f) => used.add(f));

        const ang = fs.length
          ? meanAngle(fs.map((f) => f.angle))
          : rad(-90 + (out.length * 360) / Math.max(byStage[stageKey].length, 1));
        
        const p = pos(ang, RINGS[stageKey].r);
        const wn = { x: p.x, y: p.y, angle: normAng(ang), team: w };
        
        computedNodes.push({
          ...wn, badge: badgeOf(m, w), ringSize: RINGS[stageKey].sz,
          isWin: true, match: m, isOuter: false, timezone
        });
        fs.forEach((f) => computedLinks.push({ a: f, b: wn, state: lineState(m, w, f.team), match: m }));
        out.push(wn);
      });

      const left = feeders.filter((f) => !used.has(f)).sort((a, b) => a.angle - b.angle);
      for (let i = 0; i + 1 < left.length; i += 2) {
        const ang = meanAngle([left[i].angle, left[i + 1].angle]);
        const p = pos(ang, RINGS[stageKey].r);
        const wn = { x: p.x, y: p.y, angle: normAng(ang), team: null };
        
        computedNodes.push({
          ...wn, badge: null, ringSize: RINGS[stageKey].sz,
          isWin: false, match: null, isOuter: false, timezone
        });
        computedLinks.push({ a: left[i], b: wn, state: "cold" });
        computedLinks.push({ a: left[i + 1], b: wn, state: "cold" });
        out.push(wn);
      }
      return out;
    };

    const r16win = innerRing("R16", 1, r32win);
    const qfwin = innerRing("QF", 2, r16win);
    const sfwin = innerRing("SF", 3, qfwin);

    const finalM = byStage.F[0];
    let champ: string | null = null;
    let centerData = null;

    if (finalM) {
      champ = getWinner(finalM, 4);
      sfwin
        .filter((f) => f.team && (f.team === finalM.strHomeTeam || f.team === finalM.strAwayTeam))
        .forEach((f) =>
          computedLinks.push({ a: f, b: { x: C, y: C }, state: lineState(finalM, champ, f.team), match: finalM })
        );
      centerData = { finalM, champ, badge: badgeOf(finalM, champ), score: scoreTxt(finalM) };
    } else {
      sfwin.forEach((f) => computedLinks.push({ a: f, b: { x: C, y: C }, state: "cold" }));
      centerData = { finalM: null, champ: null, badge: null, score: null };
    }

    return { nodes: computedNodes, links: computedLinks, center: centerData };
  }, [byStage, timezone, lang]);

  return (
    <div className="canvas" id="canvas" style={{ width: SIZE, height: SIZE }}>
      <div className="glow"></div>
      
      <Links links={links} lang={lang} />

      {nodes.map((n, i) => (
        <TeamNode
          key={i}
          team={n.team}
          badge={n.badge}
          x={n.x}
          y={n.y}
          size={n.ringSize}
          isWin={n.isWin}
          match={n.match}
          isOuter={n.isOuter}
          timezone={n.timezone}
          lang={lang}
        />
      ))}

      {/* Center Trophy */}
      <div className="center">
        {center.finalM && center.champ ? (
          <>
            <div className="node champ" style={{ position: "static", transform: "none", width: 66, height: 66, margin: "0 auto", marginBottom: 10 }}>
              {flagURL(center.champ) ? (
                <img className="flag" src={flagURL(center.champ)!} alt={center.champ} />
              ) : center.badge ? (
                <img className="flag" src={center.badge} style={{ objectFit: "contain" }} alt="" />
              ) : null}
              {center.badge && (
                <img className="crest" src={center.badge} alt="" />
              )}
            </div>

            <div className="champ">
              {center.champ}
              <br />
              <span style={{ color: "var(--muted)", fontWeight: 600 }}>{translations[lang].champion}</span>
            </div>
          </>
        ) : center.finalM ? (
          <>
            <img src="/trophy.png" alt="World Cup" style={{ width: 100, height: 100, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))" }} />
            <div className="champ" style={{ color: "#fff", fontSize: 11 }}>
              {translations[lang].F.toUpperCase()}<br />
              {center.finalM.strHomeTeam || "?"} {center.score || "vs"} {center.finalM.strAwayTeam || "?"}
            </div>
          </>
        ) : (
          <img src="/trophy.png" alt="World Cup" style={{ width: 100, height: 100, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))" }} />
        )}
      </div>

      {/* Top Layer for Round Labels */}
      <svg width={SIZE} height={SIZE} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 10 }}>
        <defs>
          <path id="txt-R32" d={`M ${C - RINGS.R32.r} ${C} A ${RINGS.R32.r} ${RINGS.R32.r} 0 0 1 ${C + RINGS.R32.r} ${C}`} />
          <path id="txt-R16" d={`M ${C - RINGS.R16.r} ${C} A ${RINGS.R16.r} ${RINGS.R16.r} 0 0 1 ${C + RINGS.R16.r} ${C}`} />
          <path id="txt-QF"  d={`M ${C - RINGS.QF.r}  ${C} A ${RINGS.QF.r}  ${RINGS.QF.r}  0 0 1 ${C + RINGS.QF.r}  ${C}`} />
          <path id="txt-SF"  d={`M ${C - RINGS.SF.r}  ${C} A ${RINGS.SF.r}  ${RINGS.SF.r}  0 0 1 ${C + RINGS.SF.r}  ${C}`} />
        </defs>
        <g
        fill="var(--gold)"
        fontSize="14"
        fontWeight="800"
        letterSpacing="2"
        style={{ textTransform: "uppercase" }}
        fontFamily="Outfit"
        paintOrder="stroke"
        stroke="#060608"
        strokeWidth={lang === "ar" ? 3.5 : 6}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
          <text><textPath href="#txt-R32" startOffset="50%" textAnchor="middle">{translations[lang].R32}</textPath></text>
          <text><textPath href="#txt-R16" startOffset="50%" textAnchor="middle">{translations[lang].R16}</textPath></text>
          <text><textPath href="#txt-QF" startOffset="50%" textAnchor="middle">{translations[lang].QF}</textPath></text>
          <text><textPath href="#txt-SF" startOffset="50%" textAnchor="middle">{translations[lang].SF}</textPath></text>
        </g>
      </svg>
    </div>
  );
};

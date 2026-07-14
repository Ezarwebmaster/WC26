import React, { useMemo, useState, useEffect, useRef } from "react";
import { ORDER } from "../api/sportsdb";
import type { ByStage, Match, StageKey } from "../api/sportsdb";
import { MATCH_DETAILS } from "../api/matchDetails";
import { formatMatchDate } from "../utils/helpers";
import {
  C,
  SIZE,
  getRingsConfig,
  pos,
  rad,
  meanAngle,
  normAng,
  winner,
  badgeOf,
  lineState,
  flagURL,
  scoreTxt,
  penaltyScoreTxt,
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
  season: string;
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
  // Determined pairing for a slot whose fixture is not yet in the API
  // (e.g. both feeder winners are known but the next-round match isn't
  // published). Lets the node render as a split instead of a blank circle.
  homeTeam?: string | null;
  awayTeam?: string | null;
}

export const Bracket: React.FC<BracketProps> = ({ byStage, timezone, lang, season }) => {
  const [activeDetails, setActiveDetails] = useState<{ match: Match; x: number; y: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActiveDetails(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScoreClick = (match: Match, x: number, y: number) => {
    setActiveDetails({ match, x, y });
  };

  const is16Team = season !== "2026";
  const { RINGS, nodes, links, center } = useMemo(() => {
    const RINGS = getRingsConfig(season);
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

    // Feeder logic to order initial matches
    const feedersOf = (m: Match, si: number): Match[] => {
      if (si <= 0) return [];
      const parts = [m.strHomeTeam, m.strAwayTeam].filter(Boolean);
      return byStage[ORDER[si - 1]].filter((pm) => {
        const w = getWinner(pm, si - 1);
        return w && parts.includes(w);
      });
    };

    const startStageIdx = is16Team ? 1 : 0;
    const startStageKey = ORDER[startStageIdx]; // "R16" or "R32"
    const startMatches = byStage[startStageKey];

    const orderedStartMatches: Match[] = [];
    const seen = new Set<Match>();

    const expand = (m: Match, si: number) => {
      if (si === startStageIdx) {
        if (!seen.has(m)) {
          seen.add(m);
          orderedStartMatches.push(m);
        }
        return;
      }
      feedersOf(m, si).forEach((f) => expand(f, si - 1));
    };

    let T = -1;
    for (let i = ORDER.length - 1; i >= startStageIdx + 1; i--) {
      if (byStage[ORDER[i]].length) {
        T = i;
        break;
      }
    }
    if (T > startStageIdx) {
      byStage[ORDER[T]].forEach((m) => expand(m, T));
    }
    startMatches.forEach((m) => {
      if (!seen.has(m)) {
        seen.add(m);
        orderedStartMatches.push(m);
      }
    });

    const slots = Math.max(orderedStartMatches.length * 2, 2);
    const startWin: { x: number; y: number; angle: number; team: string | null }[] = [];
    const offset = 360 / (slots * 2);

    orderedStartMatches.forEach((m, j) => {
      const w = getWinner(m, startStageIdx);
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
      const p3 = pos(wa, RINGS[startStageKey].r);
      const n3 = { x: p3.x, y: p3.y, angle: normAng(wa), team: w };
      
      computedNodes.push({
        ...n3, badge: badgeOf(m, w), ringSize: RINGS[startStageKey].sz,
        isWin: true, match: m, isOuter: false, timezone
      });
      computedLinks.push({ a: n1, b: n3, state: lineState(m, w, m.strHomeTeam), match: m });
      computedLinks.push({ a: n2, b: n3, state: lineState(m, w, m.strAwayTeam), match: m });
      startWin.push(n3);
    });

    const innerRing = (
      stageKey: StageKey,
      si: number,
      feeders: typeof startWin
    ) => {
      const out: typeof startWin = [];
      const used = new Set<typeof startWin[0]>();

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
        const bothKnown = !!left[i].team && !!left[i + 1].team;
        computedNodes.push({
          ...wn, badge: null, ringSize: RINGS[stageKey].sz,
          isWin: false, match: null, isOuter: false, timezone,
          homeTeam: left[i].team, awayTeam: left[i + 1].team,
        });
        const linkState = bothKnown ? "sched" : "cold";
        computedLinks.push({ a: left[i], b: wn, state: linkState });
        computedLinks.push({ a: left[i + 1], b: wn, state: linkState });
        out.push(wn);
      }
      return out;
    };

    let currentFeeders = startWin;
    if (!is16Team) {
      currentFeeders = innerRing("R16", 1, currentFeeders);
    }
    const qfwin = innerRing("QF", 2, currentFeeders);
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
      if (champ) {
        computedLinks.push({
          a: { x: C, y: C },
          b: { x: C, y: C - 45 },
          state: "won",
        });
      }
      const penScore = penaltyScoreTxt(finalM, translations[lang].pen);
      centerData = { finalM, champ, badge: badgeOf(finalM, champ), score: scoreTxt(finalM), penScore };
    } else {
      sfwin.forEach((f) => computedLinks.push({ a: f, b: { x: C, y: C }, state: "cold" }));
      centerData = { finalM: null, champ: null, badge: null, score: null, penScore: null };
    }

    return { RINGS, nodes: computedNodes, links: computedLinks, center: centerData };
  }, [byStage, timezone, season, is16Team, lang]);

  return (
    <div className="canvas" id="canvas" style={{ width: SIZE, height: SIZE }}>
      <div className="glow"></div>
      
      <Links links={links} lang={lang} onScoreClick={handleScoreClick} />

      {nodes.map((n) => (
        <TeamNode
          key={`${Math.round(n.x)},${Math.round(n.y)}`}
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
          homeTeam={n.homeTeam}
          awayTeam={n.awayTeam}
        />
      ))}

      {/* Center Trophy */}
      <div className="center">
        {center.finalM && center.champ ? (
          <>
            <div className="node champ" style={{ position: "static", transform: "none", width: 66, height: 66, margin: "0 auto", marginBottom: 8 }}>
              {flagURL(center.champ) ? (
                <img className="flag" src={flagURL(center.champ)!} alt={center.champ} />
              ) : center.badge ? (
                <img className="flag" src={center.badge} style={{ objectFit: "contain" }} alt="" />
              ) : null}
              {center.badge && (
                <img className="crest" src={center.badge} alt="" />
              )}
            </div>

            <div 
              className="center-score-bubble" 
              onClick={() => handleScoreClick(center.finalM!, C, C - 35)}
              style={{ 
                background: "rgba(11, 11, 14, 0.95)", 
                border: "1.5px solid var(--gold)", 
                borderRadius: "8px", 
                padding: "4px 10px", 
                marginBottom: 8, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                pointerEvents: "auto",
                cursor: "pointer"
              }}
            >
              <span style={{ color: "var(--gold)", fontSize: 12, fontWeight: 800, fontFamily: "Outfit", letterSpacing: "0.5px" }}>
                {center.score}
              </span>
              {center.penScore && (
                <span style={{ color: "var(--muted)", fontSize: 9, fontWeight: 600, fontFamily: "Inter", marginTop: 1 }}>
                  {center.penScore}
                </span>
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
          {!is16Team && (
            <text><textPath href="#txt-R32" startOffset="50%" textAnchor="middle">{translations[lang].R32}</textPath></text>
          )}
          <text><textPath href="#txt-R16" startOffset="50%" textAnchor="middle">{translations[lang].R16}</textPath></text>
          <text><textPath href="#txt-QF" startOffset="50%" textAnchor="middle">{translations[lang].QF}</textPath></text>
          <text><textPath href="#txt-SF" startOffset="50%" textAnchor="middle">{translations[lang].SF}</textPath></text>
        </g>
      </svg>

      {activeDetails && (
        <div ref={popoverRef}>
          <MatchDetailsPopover
            match={activeDetails.match}
            x={activeDetails.x}
            y={activeDetails.y}
            lang={lang}
            timezone={timezone}
            onClose={() => setActiveDetails(null)}
          />
        </div>
      )}
    </div>
  );
};

interface MatchDetailsPopoverProps {
  match: Match;
  x: number;
  y: number;
  lang: SupportedLang;
  timezone: string;
  onClose: () => void;
}

const MatchDetailsPopover: React.FC<MatchDetailsPopoverProps> = ({
  match,
  x,
  y,
  lang,
  timezone,
  onClose,
}) => {
  const details = MATCH_DETAILS[match.idEvent];

  const tLocal = {
    en: {
      stadium: "Stadium",
      city: "City",
      goals: "Goals",
      cards: "Cards",
      noDetails: "Lineups, goal times, and card details will be imported soon.",
    },
    fr: {
      stadium: "Stade",
      city: "Ville",
      goals: "Buts",
      cards: "Cartons",
      noDetails: "Les compositions, buteurs et cartons détaillés seront bientôt importés.",
    },
    ar: {
      stadium: "الملعب",
      city: "المدينة",
      goals: "الأهداف",
      cards: "البطاقات",
      noDetails: "سيتم استيراد التشكيلات وأوقات الأهداف والبطاقات قريبًا.",
    },
    es: {
      stadium: "Estadio",
      city: "Ciudad",
      goals: "Goles",
      cards: "Tarjetas",
      noDetails: "Las alineaciones, minutos de goles y tarjetas se importarán pronto.",
    },
    pt: {
      stadium: "Estádio",
      city: "Cidade",
      goals: "Gols",
      cards: "Cartões",
      noDetails: "As escalações, tempos de gols e cartões serão importados em breve.",
    },
  }[lang];

  const openDown = y < 350;

  // Position popover above or below the score bubble
  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: openDown ? y + 12 : y - 12,
    transform: openDown ? "translate(-50%, 0)" : "translate(-50%, -100%)",
    zIndex: 2000,
    pointerEvents: "auto",
  };

  const renderEventEmoji = (type?: string) => {
    if (type === "yellow") return <span className="card-icon yellow"></span>;
    if (type === "red" || type === "yellow-red") return <span className="card-icon red"></span>;
    if (type === "own") return "⚽ (csc)";
    return "⚽";
  };

  const dateInfo = details
    ? formatMatchDate(details.dateEvent, details.strTime, timezone, lang)
    : formatMatchDate(match.dateEvent, match.strTime, timezone, lang);

  return (
    <div className="popover-capsule">
      <div className={`popover-inner ${openDown ? "down" : "up"}`} style={style}>
        <button className="popover-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        
        <div className="popover-header">
          <div className="popover-teams">
            {match.strHomeTeam} vs {match.strAwayTeam}
          </div>
          <div className="popover-date">
            {dateInfo.date} • {dateInfo.time}
          </div>
          {details && (
            <div className="popover-venue">
              {details.stadium}, {details.city}
            </div>
          )}
        </div>

        <div className="popover-body">
          {details ? (
            <div className="popover-columns">
              {/* Home Column */}
              <div className="popover-column">
                <div className="team-name-header">{match.strHomeTeam}</div>
                
                {/* Goals */}
                {details.homeGoals && details.homeGoals.length > 0 && (
                  <div className="event-section">
                    <div className="section-title">{tLocal.goals}</div>
                    {details.homeGoals.map((g, idx) => (
                      <div key={idx} className="event-item">
                        <span>⚽</span>
                        <span>{g.player} ({g.minute}') {g.type === "own" && "(csc)"} {g.type === "penalty" && "(pen)"}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cards */}
                {details.homeCards && details.homeCards.length > 0 && (
                  <div className="event-section">
                    <div className="section-title">{tLocal.cards}</div>
                    {details.homeCards.map((c, idx) => (
                      <div key={idx} className="event-item">
                        {renderEventEmoji(c.type)}
                        <span>{c.player} ({c.minute}')</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Away Column */}
              <div className="popover-column">
                <div className="team-name-header">{match.strAwayTeam}</div>
                
                {/* Goals */}
                {details.awayGoals && details.awayGoals.length > 0 && (
                  <div className="event-section">
                    <div className="section-title">{tLocal.goals}</div>
                    {details.awayGoals.map((g, idx) => (
                      <div key={idx} className="event-item">
                        <span>⚽</span>
                        <span>{g.player} ({g.minute}') {g.type === "own" && "(csc)"} {g.type === "penalty" && "(pen)"}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cards */}
                {details.awayCards && details.awayCards.length > 0 && (
                  <div className="event-section">
                    <div className="section-title">{tLocal.cards}</div>
                    {details.awayCards.map((c, idx) => (
                      <div key={idx} className="event-item">
                        {renderEventEmoji(c.type)}
                        <span>{c.player} ({c.minute}')</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="popover-no-details">
              {tLocal.noDetails}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

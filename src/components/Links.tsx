import React from "react";
import { SIZE, scoreTxt } from "../utils/helpers";
import type { Match } from "../api/sportsdb";

export interface LinkData {
  a: { x: number; y: number };
  b: { x: number; y: number };
  state: string; // "won" | "sched" | "live" | "lost" | "cold"
  match?: Match | null;
}

interface LinksProps {
  links: LinkData[];
}

const STYLE: Record<string, { stroke: string; w: number; op: number; dash: string | null; glow: boolean }> = {
  won: { stroke: "url(#hot)", w: 3.4, op: 1, dash: null, glow: true },
  sched: { stroke: "url(#hot)", w: 2, op: 0.8, dash: "4 6", glow: false },
  live: { stroke: "var(--live)", w: 2.8, op: 1, dash: null, glow: false },
  lost: { stroke: "#4a4a58", w: 1.5, op: 0.7, dash: null, glow: false },
  cold: { stroke: "#4a4a58", w: 1.5, op: 0.6, dash: null, glow: false },
};

const RANK: Record<string, number> = { lost: 0, cold: 0, sched: 1, live: 2, won: 3 };

const C = SIZE / 2;

const getPolar = (pt: { x: number; y: number }) => {
  const dx = pt.x - C;
  const dy = pt.y - C;
  return { r: Math.hypot(dx, dy), ang: Math.atan2(dy, dx) };
};

const polarToCartesian = (r: number, ang: number) => {
  return {
    x: C + r * Math.cos(ang),
    y: C + r * Math.sin(ang),
  };
};

const generatePath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  if (Math.abs(b.x - C) < 1 && Math.abs(b.y - C) < 1) {
    return { path: `M ${a.x} ${a.y} L ${b.x} ${b.y}`, scorePt: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
  }
  const pA = getPolar(a);
  const pB = getPolar(b);
  const rMid = (pA.r + pB.r) / 2;

  const pt1 = polarToCartesian(rMid, pA.ang);
  const pt2 = polarToCartesian(rMid, pB.ang);

  let diff = pB.ang - pA.ang;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  const sweepFlag = diff > 0 ? 1 : 0;

  const path = `M ${a.x} ${a.y} L ${pt1.x} ${pt1.y} A ${rMid} ${rMid} 0 0 ${sweepFlag} ${pt2.x} ${pt2.y} L ${b.x} ${b.y}`;
  return { path, scorePt: pt2 };
};
export const Links: React.FC<LinksProps> = ({ links }) => {
  // Sort links from least to most visible
  const sortedLinks = [...links].sort((a, b) => (RANK[a.state] || 0) - (RANK[b.state] || 0));

  return (
    <svg
      className="links"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
    >
      <defs>
        <linearGradient id="hot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#d99a1f" />
        </linearGradient>
        <filter id="goldglow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Links */}
      {sortedLinks.map((l, i) => {
        const s = STYLE[l.state] || STYLE.cold;
        
        const isWonLine = l.state === "won" && l.match;
        const score = l.match ? scoreTxt(l.match) : "";
        const { path, scorePt } = generatePath(l.a, l.b);

        let tooltip = "";
        if (l.match && (l.match.strHomeGoalDetails || l.match.strAwayGoalDetails)) {
          tooltip = `${l.match.strHomeTeam || "Home"}: ${l.match.strHomeGoalDetails || "-"}\n${l.match.strAwayTeam || "Away"}: ${l.match.strAwayGoalDetails || "-"}`;
        }

        let penScore = "";
        if (l.match) {
          const hPen = l.match.intHomePenaltyScore;
          const aPen = l.match.intAwayPenaltyScore;
          // Fallback if API uses Extra score for penalties when status is PEN or similar
          const hEx = l.match.intHomeScoreExtra;
          const aEx = l.match.intAwayScoreExtra;
          const isPen = l.match.strStatus === "PEN" || (hPen != null && aPen != null);
          
          if (hPen != null && aPen != null) {
            penScore = `${hPen} - ${aPen} PEN`;
          } else if (isPen && hEx != null && aEx != null) {
            penScore = `${hEx} - ${aEx} PEN`;
          } else if (l.match.strResult?.includes("penalties")) {
            // Rough fallback if they put it in strResult
            penScore = "PEN"; 
          }
        }

        const rectW = penScore ? 50 : 40;
        const rectH = penScore ? 34 : 20;
        const rectY = penScore ? -17 : -10;
        const scoreY = penScore ? -3 : 1;
        const penY = penScore ? 9 : 0;

        return (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke={s.stroke}
              strokeWidth={s.w}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={s.op}
              strokeDasharray={s.dash || undefined}
              filter={s.glow ? "url(#goldglow)" : undefined}
            />
            {isWonLine && score && (
              <g transform={`translate(${scorePt.x}, ${scorePt.y})`} style={{ pointerEvents: "auto", cursor: tooltip ? "help" : "default" }}>
                {tooltip && <title>{tooltip}</title>}
                <rect x={-rectW/2} y={rectY} width={rectW} height={rectH} rx="6" fill="#0b0b0e" stroke="var(--gold)" strokeWidth="1.5" />
                <text x="0" y={scoreY} fill="var(--gold)" fontSize="11" fontWeight="800" textAnchor="middle" alignmentBaseline="middle" fontFamily="Outfit">
                  {score}
                </text>
                {penScore && (
                  <text x="0" y={penY} fill="var(--muted)" fontSize="8" fontWeight="600" textAnchor="middle" alignmentBaseline="middle" fontFamily="Inter">
                    {penScore}
                  </text>
                )}
              </g>
            )}
            {/* For live matches, maybe show score on the line too, or just leave it to TeamNode */}
          </g>
        );
      })}
    </svg>
  );
};

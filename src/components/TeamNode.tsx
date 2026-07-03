import { isLive, isFinished } from "../api/sportsdb";
import type { Match } from "../api/sportsdb";
import { flagURL, short, matchTip, scoreTxt, formatMatchDate } from "../utils/helpers";
import { translations } from "../utils/i18n";
import type { SupportedLang } from "../utils/i18n";

interface TeamNodeProps {
  team: string | null;
  badge: string | null;
  x: number;
  y: number;
  size: number;
  isWin: boolean;
  match: Match | null;
  isOuter?: boolean;
  timezone: string;
  lang: SupportedLang;
  homeTeam?: string | null;
  awayTeam?: string | null;
}

export const TeamNode: React.FC<TeamNodeProps> = ({
  team,
  badge,
  x,
  y,
  size,
  isWin,
  match,
  isOuter = false,
  timezone,
  lang,
  homeTeam,
  awayTeam,
}) => {
  const live = isLive(match);
  const fin = isFinished(match);


  const classes = [
    "node",
    live ? "live" : "",
    fin && !isWin ? "lost" : "",
    fin && isWin ? "won" : "",
    !match ? "sched" : "",
    !team ? "empty" : "",
  ]
    .filter(Boolean)
    .join(" ");



  // The two sides of an upcoming match: from the API fixture when present,
  // otherwise the determined pairing passed in (fixture not yet published).
  const splitHome = match?.strHomeTeam ?? homeTeam ?? null;
  const splitAway = match?.strAwayTeam ?? awayTeam ?? null;

  const isSplit = !team && !isOuter && !!splitHome && !!splitAway && !fin;

  const flag = flagURL(team);

  const style: React.CSSProperties = {
    left: x,
    top: y,
    width: size,
    height: size,
  };

  const score = !isOuter && live ? scoreTxt(match) : "";

  let dateStr = "";
  let timeStr = "";
  if (isSplit && match) {
    const fd = formatMatchDate(match.dateEvent, match.strTime, timezone, lang);
    dateStr = fd.date;
    timeStr = fd.time;
  }

  const finalClasses = classes;

  const title = match
    ? matchTip(match, lang)
    : splitHome && splitAway
    ? `${splitHome} ${translations[lang].vs} ${splitAway}`
    : "";

  return (
    <div className={finalClasses} style={style} title={title}>
      {isSplit ? (
        <>
          <img
            className="split-flag home"
            src={flagURL(splitHome) || match?.strHomeTeamBadge || ""}
            alt={splitHome || ""}
          />
          <img
            className="split-flag away"
            src={flagURL(splitAway) || match?.strAwayTeamBadge || ""}
            alt={splitAway || ""}
          />
          <div className={`split-text-below ${live ? "has-live-score" : ""}`}>
            <div className="date">{dateStr} {timeStr}</div>
          </div>
        </>
      ) : flag ? (
        <img
          className="flag"
          src={flag}
          alt={team || ""}
          onError={(e) => {
            if (badge) {
              e.currentTarget.src = badge;
              e.currentTarget.style.objectFit = "contain";
            }
          }}
        />
      ) : badge ? (
        <img className="flag" src={badge} alt="" style={{ objectFit: "contain" }} />
      ) : null}

      {!isSplit && team && badge && (
        <img
          className="crest"
          src={badge}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}

      {score && (
        <span className={`score ${live ? "livesc" : ""}`}>{score}</span>
      )}

      {isOuter && team && <span className="code">{short(team)}</span>}
    </div>
  );
};

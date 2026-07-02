import { isLive, isFinished } from "../api/sportsdb";
import type { Match } from "../api/sportsdb";
import { flagURL, short, matchTip, scoreTxt, formatMatchDate } from "../utils/helpers";

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
}) => {
  const live = isLive(match);
  const fin = isFinished(match);
  const elim = isOuter && team && fin && !isWin;
  const sched =
    !team &&
    !isOuter &&
    match &&
    match.strHomeTeam &&
    match.strAwayTeam &&
    !fin &&
    !live;

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

  const isSplit =
    !team &&
    !isOuter &&
    match?.strHomeTeam &&
    match?.strAwayTeam &&
    !fin;

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
    const fd = formatMatchDate(match.dateEvent, match.strTime, timezone);
    dateStr = fd.date;
    timeStr = fd.time;
  }

  const finalClasses = classes;

  return (
    <div className={finalClasses} style={style} title={matchTip(match)}>
      {isSplit ? (
        <>
          <img
            className="split-flag home"
            src={flagURL(match.strHomeTeam) || match.strHomeTeamBadge || ""}
            alt={match.strHomeTeam!}
          />
          <img
            className="split-flag away"
            src={flagURL(match.strAwayTeam) || match.strAwayTeamBadge || ""}
            alt={match.strAwayTeam!}
          />
          <div className="split-text-below">
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

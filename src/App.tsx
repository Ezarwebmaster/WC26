import { useState, useEffect, useCallback, useRef } from "react";
import { fetchBracketData, ORDER, isLive } from "./api/sportsdb";
import type { ByStage } from "./api/sportsdb";
import { Bracket } from "./components/Bracket";
import { SIZE } from "./utils/helpers";
import { detectBrowserLanguage, translations, languageNames } from "./utils/i18n";
import type { SupportedLang } from "./utils/i18n";

type StatusType = "load" | "ok" | "err";

const COMMON_TIMEZONES = [
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
];

function App() {
  const [data, setData] = useState<ByStage | null>(null);
  const [status, setStatus] = useState<StatusType>("load");
  const [lang, setLang] = useState<SupportedLang>(detectBrowserLanguage);
  const [stats, setStats] = useState<{ tot: number; live: number } | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [scale, setScale] = useState(1);
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState<string>(localTimezone);
  const loadId = useRef(0);

  // Fetch is independent of language so switching locale never refetches or
  // resets the auto-refresh timer. Status text is derived from state below.
  const load = useCallback(async () => {
    const id = ++loadId.current;
    setStatus("load");
    try {
      const byStage = await fetchBracketData();
      // Ignore stale responses: a newer load() was started while this awaited.
      if (id !== loadId.current) return;

      setData(byStage);

      const live = ORDER.flatMap((s) => byStage[s]).filter(isLive).length;
      const tot = ORDER.reduce((n, s) => n + byStage[s].length, 0);

      setStats({ tot, live });
      setStatus("ok");
      setLastUpdate(new Date());
    } catch (err: any) {
      if (id !== loadId.current) return;
      setErrMsg(err.message);
      setStatus("err");
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => {
    const handleResize = () => {
      const avail = Math.min(window.innerWidth - 16, 960);
      setScale(Math.min(1, avail / SIZE));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const t = translations[lang];
  const statusTxt =
    status === "err"
      ? `${t.error}: ${errMsg}`
      : status === "ok" && stats
      ? `${stats.tot} ${t.matches}${stats.live ? ` · ${stats.live} ${t.live}` : ""}`
      : t.connecting;
  const lastUpdateTxt = lastUpdate
    ? lastUpdate.toLocaleTimeString(lang === "en" ? "en-US" : lang)
    : "—";

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <header>
        <h1>{translations[lang].title}</h1>
        <div className="sub">{translations[lang].subtitle}</div>
        <div className="bar">
          <span className="status">
            <span className={`dot ${status}`}></span>
            <span id="statusTxt">{statusTxt}</span>
          </span>
          <button className="refresh" onClick={load}>
            ↻ {translations[lang].refresh}
          </button>
          
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as SupportedLang)} 
            style={{ 
              padding: "8px 12px", 
              borderRadius: 20, 
              background: "rgba(20, 20, 25, 0.8)", 
              color: "var(--text)", 
              border: "1px solid rgba(255, 255, 255, 0.05)", 
              fontSize: 13,
              backdropFilter: "blur(10px)",
              outline: "none",
              cursor: "pointer",
              marginRight: lang === "ar" ? 0 : 8,
              marginLeft: lang === "ar" ? 8 : 0
            }}
          >
            {Object.entries(languageNames).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <select 
            value={timezone} 
            onChange={(e) => setTimezone(e.target.value)} 
            style={{ 
              padding: "8px 12px", 
              borderRadius: 20, 
              background: "rgba(20, 20, 25, 0.8)", 
              color: "var(--text)", 
              border: "1px solid rgba(255, 255, 255, 0.05)", 
              fontSize: 13,
              backdropFilter: "blur(10px)",
              outline: "none",
              cursor: "pointer"
            }}
          >
            {/* Auto (local) first, then common zones with the local one de-duped */}
            <option value={localTimezone}>
              {lang === "ar" ? "تلقائي" : "Auto"} ({localTimezone})
            </option>
            {COMMON_TIMEZONES.filter((tz) => tz !== localTimezone).map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </header>

      {status === "err" && !data ? (
        <div className="msg" style={{ marginTop: 40 }}>
          {translations[lang].couldNotReach}
        </div>
      ) : (
        <div className="stage" style={{ height: SIZE * scale + 10 }}>
          <div className="scaler" style={{ transform: `scale(${scale})` }}>
            {data && <Bracket byStage={data} timezone={timezone} lang={lang} />}
          </div>
        </div>
      )}

      <footer>
        {translations[lang].liveDataVia}{" "}
        <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer">
          TheSportsDB
        </a>{" "}
        · {translations[lang].autoRefresh} · {translations[lang].hoverBadge} · <span>{lastUpdateTxt}</span>
      </footer>
    </div>
  );
}

export default App;

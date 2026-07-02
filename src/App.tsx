import { useState, useEffect, useCallback } from "react";
import { fetchBracketData, ORDER, isLive } from "./api/sportsdb";
import type { ByStage } from "./api/sportsdb";
import { Bracket } from "./components/Bracket";
import { SIZE } from "./utils/helpers";
import { detectBrowserLanguage, translations, languageNames } from "./utils/i18n";
import type { SupportedLang } from "./utils/i18n";

type StatusType = "load" | "ok" | "err";

function App() {
  const [data, setData] = useState<ByStage | null>(null);
  const [status, setStatus] = useState<StatusType>("load");
  const [lang, setLang] = useState<SupportedLang>(detectBrowserLanguage);
  const [statusTxt, setStatusTxt] = useState(translations[lang].connecting);
  const [lastUpdate, setLastUpdate] = useState<string>("—");
  const [scale, setScale] = useState(1);
  const [timezone, setTimezone] = useState<string>(() => Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Sync initial loading message if language changes before load finishes
  useEffect(() => {
    if (status === "load") {
      setStatusTxt(translations[lang].connecting);
    }
  }, [lang, status]);

  const load = useCallback(async () => {
    setStatus("load");
    setStatusTxt(translations[lang].connecting);
    try {
      const byStage = await fetchBracketData();
      
      setData(byStage);

      const live = ORDER.flatMap((s) => byStage[s]).filter(isLive).length;
      const tot = ORDER.reduce((n, s) => n + byStage[s].length, 0);

      setStatus("ok");
      setStatusTxt(`${tot} ${translations[lang].matches}${live ? ` · ${live} ${translations[lang].live}` : ""}`);
      setLastUpdate(new Date().toLocaleTimeString(lang === "en" ? "en-US" : lang));
    } catch (err: any) {
      setStatus("err");
      setStatusTxt(`${translations[lang].error}: ${err.message}`);
    }
  }, [lang]);

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

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "rtl" : ""}>
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
            {/* List some common timezones */}
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
            <option value="Australia/Sydney">Australia/Sydney</option>
            <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
              {lang === "ar" ? "تلقائي" : "Auto"} ({Intl.DateTimeFormat().resolvedOptions().timeZone})
            </option>
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
        · {translations[lang].autoRefresh} · {translations[lang].hoverBadge} · <span>{lastUpdate}</span>
      </footer>
    </div>
  );
}

export default App;

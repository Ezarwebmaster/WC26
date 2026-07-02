import { useState, useEffect, useCallback } from "react";
import { fetchBracketData, ORDER, isLive } from "./api/sportsdb";
import type { ByStage } from "./api/sportsdb";
import { Bracket } from "./components/Bracket";
import { SIZE } from "./utils/helpers";

type StatusType = "load" | "ok" | "err";

function App() {
  const [data, setData] = useState<ByStage | null>(null);
  const [status, setStatus] = useState<StatusType>("load");
  const [statusTxt, setStatusTxt] = useState("Connecting to API…");
  const [lastUpdate, setLastUpdate] = useState<string>("—");
  const [scale, setScale] = useState(1);
  const [timezone, setTimezone] = useState<string>(() => Intl.DateTimeFormat().resolvedOptions().timeZone);

  const load = useCallback(async () => {
    setStatus("load");
    setStatusTxt("Connecting to API…");
    try {
      const byStage = await fetchBracketData();
      setData(byStage);

      const live = ORDER.flatMap((s) => byStage[s]).filter(isLive).length;
      const tot = ORDER.reduce((n, s) => n + byStage[s].length, 0);

      setStatus("ok");
      setStatusTxt(`${tot} matches${live ? ` · ${live} LIVE` : ""}`);
      setLastUpdate(new Date().toLocaleTimeString("en-US"));
    } catch (err: any) {
      setStatus("err");
      setStatusTxt(`Error: ${err.message}`);
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

  return (
    <>
      <header>
        <h1>World Cup 2026</h1>
        <div className="sub">🇨🇦 🇲🇽 🇺🇸 — Knockout stage · live</div>
        <div className="bar">
          <span className="status">
            <span className={`dot ${status}`}></span>
            <span id="statusTxt">{statusTxt}</span>
          </span>
          <button className="refresh" onClick={load}>
            ↻ Refresh
          </button>
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
              Auto ({Intl.DateTimeFormat().resolvedOptions().timeZone})
            </option>
          </select>
        </div>
      </header>

      {status === "err" && !data ? (
        <div className="msg" style={{ marginTop: 40 }}>
          Could not reach the API. Retrying in 60s.
        </div>
      ) : (
        <div className="stage" style={{ height: SIZE * scale + 10 }}>
          <div className="scaler" style={{ transform: `scale(${scale})` }}>
            {data && <Bracket byStage={data} timezone={timezone} />}
          </div>
        </div>
      )}

      <footer>
        Live data via{" "}
        <a href="https://www.thesportsdb.com" target="_blank" rel="noreferrer">
          TheSportsDB
        </a>{" "}
        · auto-refresh 60s · hover a badge for details · <span>{lastUpdate}</span>
      </footer>
    </>
  );
}

export default App;

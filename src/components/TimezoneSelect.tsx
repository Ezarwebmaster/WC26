import { useState, useRef, useEffect } from "react";
import type { SupportedLang } from "../utils/i18n";

interface TimezoneSelectProps {
  value: string;
  onChange: (val: string) => void;
  lang: SupportedLang;
}

const COMMON_TIMEZONES = [
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
];

export function TimezoneSelect({ value, onChange, lang }: TimezoneSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const filteredZones = [localTimezone, ...COMMON_TIMEZONES.filter((tz) => tz !== localTimezone)];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTzTime = (tz: string) => {
    try {
      return new Date().toLocaleTimeString(lang === "en" ? "en-US" : lang, {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return "";
    }
  };

  const cleanLabel = (tz: string) => {
    if (tz === localTimezone) {
      return lang === "ar" ? `تلقائي (${tz})` : `Auto (${tz})`;
    }
    return tz;
  };

  return (
    <div className={`custom-dropdown ${isOpen ? "open" : ""}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="custom-dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>🕒</span>
        <span>{value === localTimezone ? (lang === "ar" ? "تلقائي" : "Auto") : value.split("/").pop()?.replace("_", " ")}</span>
        <span className="arrow"></span>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu" role="listbox" style={{ width: "260px" }}>
          {filteredZones.map((tz) => {
            const isActive = tz === value;
            return (
              <button
                key={tz}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(tz);
                  setIsOpen(false);
                }}
                className={`custom-dropdown-item ${isActive ? "active" : ""}`}
              >
                <div className="custom-dropdown-item-top">
                  <span className="custom-dropdown-item-year" style={{ fontSize: "13px", fontWeight: 500 }}>
                    <span>{cleanLabel(tz).split("/").pop()?.replace("_", " ")}</span>
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--gold)" }}>
                    {getTzTime(tz)}
                  </span>
                </div>
                {tz !== localTimezone && (
                  <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)", marginTop: "2px" }}>
                    {tz}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

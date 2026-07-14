import { useState, useRef, useEffect } from "react";
import type { SupportedLang } from "../utils/i18n";
import { languageNames } from "../utils/i18n";

interface LanguageSelectProps {
  value: SupportedLang;
  onChange: (val: SupportedLang) => void;
}

const LANG_FLAGS: Record<SupportedLang, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  ar: "🇸🇦",
  es: "🇪🇸",
  pt: "🇵🇹",
};

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`custom-dropdown ${isOpen ? "open" : ""}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="custom-dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{LANG_FLAGS[value]}</span>
        <span>{languageNames[value]}</span>
        <span className="arrow"></span>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu" role="listbox" style={{ width: "160px" }}>
          {Object.entries(languageNames).map(([code, name]) => {
            const isActive = code === value;
            return (
              <button
                key={code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(code as SupportedLang);
                  setIsOpen(false);
                }}
                className={`custom-dropdown-item ${isActive ? "active" : ""}`}
                style={{ padding: "8px 12px" }}
              >
                <div className="custom-dropdown-item-top">
                  <span className="custom-dropdown-item-year" style={{ fontSize: "14px" }}>
                    <span>{LANG_FLAGS[code as SupportedLang]}</span>
                    <span>{name}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

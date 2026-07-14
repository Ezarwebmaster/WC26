import { useState, useRef, useEffect } from "react";
import type { SupportedLang } from "../utils/i18n";

interface SeasonInfo {
  season: string;
  flag: string;
  hosts: Record<SupportedLang, string>;
  mascot: Record<SupportedLang, string>;
}

const SEASONS_DATA: SeasonInfo[] = [
  {
    season: "2026",
    flag: "🇺🇸 🇨🇦 🇲🇽",
    hosts: {
      en: "Canada / Mexico / USA",
      fr: "Canada / Mexique / États-Unis",
      ar: "كندا / المكسيك / أمريكا",
      es: "Canadá / México / EE.UU.",
      pt: "Canadá / México / EUA",
    },
    mascot: {
      en: "TBD",
      fr: "À déterminer",
      ar: "لم تحدد بعد",
      es: "Por definir",
      pt: "A definir",
    },
  },
  {
    season: "2022",
    flag: "🇶🇦",
    hosts: {
      en: "Qatar",
      fr: "Qatar",
      ar: "قطر",
      es: "Catar",
      pt: "Catar",
    },
    mascot: {
      en: "La'eeb 🏆",
      fr: "La'eeb 🏆",
      ar: "لعيب 🏆",
      es: "La'eeb 🏆",
      pt: "La'eeb 🏆",
    },
  },
  {
    season: "2018",
    flag: "🇷🇺",
    hosts: {
      en: "Russia",
      fr: "Russie",
      ar: "روسيا",
      es: "Rusia",
      pt: "Rússia",
    },
    mascot: {
      en: "Zabivaka 🐺",
      fr: "Zabivaka 🐺",
      ar: "زابيفاكا 🐺",
      es: "Zabivaka 🐺",
      pt: "Zabivaka 🐺",
    },
  },
  {
    season: "2014",
    flag: "🇧🇷",
    hosts: {
      en: "Brazil",
      fr: "Brésil",
      ar: "البرازيل",
      es: "Brasil",
      pt: "Brasil",
    },
    mascot: {
      en: "Fuleco 🐾",
      fr: "Fuleco 🐾",
      ar: "فوليكو 🐾",
      es: "Fuleco 🐾",
      pt: "Fuleco 🐾",
    },
  },
  {
    season: "2010",
    flag: "🇿🇦",
    hosts: {
      en: "South Africa",
      fr: "Afrique du Sud",
      ar: "جنوب أفريقيا",
      es: "Sudáfrica",
      pt: "África do Sul",
    },
    mascot: {
      en: "Zakumi 🐆",
      fr: "Zakumi 🐆",
      ar: "زاكومي 🐆",
      es: "Zakumi 🐆",
      pt: "Zakumi 🐆",
    },
  },
  {
    season: "2006",
    flag: "🇩🇪",
    hosts: {
      en: "Germany",
      fr: "Allemagne",
      ar: "ألمانيا",
      es: "Alemania",
      pt: "Alemanha",
    },
    mascot: {
      en: "Goleo VI 🦁",
      fr: "Goleo VI 🦁",
      ar: "غولييو السادس 🦁",
      es: "Goleo VI 🦁",
      pt: "Goleo VI 🦁",
    },
  },
  {
    season: "2002",
    flag: "🇰🇷 🇯🇵",
    hosts: {
      en: "South Korea / Japan",
      fr: "Corée du Sud / Japon",
      ar: "كوريا الجنوبية / اليابان",
      es: "Corea del Sur / Japón",
      pt: "Coreia do Sul / Japão",
    },
    mascot: {
      en: "Spheriks 👾",
      fr: "Spheriks 👾",
      ar: "سفيريكس 👾",
      es: "Spheriks 👾",
      pt: "Spheriks 👾",
    },
  },
  {
    season: "1998",
    flag: "🇫🇷",
    hosts: {
      en: "France",
      fr: "France",
      ar: "فرنسا",
      es: "Francia",
      pt: "França",
    },
    mascot: {
      en: "Footix  rooster 🐓",
      fr: "Footix le coq 🐓",
      ar: "فوتيكس الديك 🐓",
      es: "Footix el gallo 🐓",
      pt: "Footix o galo 🐓",
    },
  },
  {
    season: "1994",
    flag: "🇺🇸",
    hosts: {
      en: "United States",
      fr: "États-Unis",
      ar: "الولايات المتحدة",
      es: "Estados Unidos",
      pt: "Estados Unidos",
    },
    mascot: {
      en: "Stryker 🐶",
      fr: "Stryker 🐶",
      ar: "سترايكر 🐶",
      es: "Stryker 🐶",
      pt: "Stryker 🐶",
    },
  },
];

interface SeasonSelectProps {
  value: string;
  onChange: (val: string) => void;
  lang: SupportedLang;
}

export function SeasonSelect({ value, onChange, lang }: SeasonSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedData = SEASONS_DATA.find((s) => s.season === value) || SEASONS_DATA[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelMascot = {
    en: "Mascot",
    fr: "Mascotte",
    ar: "التعويذة",
    es: "Mascota",
    pt: "Mascote",
  };

  const labelHost = {
    en: "Host",
    fr: "Hôte",
    ar: "المستضيف",
    es: "Sede",
    pt: "Sede",
  };

  return (
    <div className={`custom-dropdown ${isOpen ? "open" : ""}`} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="custom-dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedData.flag}</span>
        <span style={{ fontWeight: 700 }}>{selectedData.season}</span>
        <span className="arrow"></span>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu" role="listbox">
          {SEASONS_DATA.map((item) => {
            const isActive = item.season === value;
            return (
              <button
                key={item.season}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(item.season);
                  setIsOpen(false);
                }}
                className={`custom-dropdown-item ${isActive ? "active" : ""}`}
              >
                <div className="custom-dropdown-item-top">
                  <span className="custom-dropdown-item-year">
                    <span>{item.flag}</span>
                    <span>{item.season}</span>
                  </span>
                </div>
                <div className="custom-dropdown-item-details">
                  <div>
                    <strong>{labelHost[lang]} :</strong> {item.hosts[lang]}
                  </div>
                  <div className="custom-dropdown-item-mascot">
                    <strong>{labelMascot[lang]} :</strong> {item.mascot[lang]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

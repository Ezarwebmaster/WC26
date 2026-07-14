export type SupportedLang = "en" | "fr" | "ar" | "es" | "pt";

export interface TranslationDict {
  title: string;
  subtitle: string;
  connecting: string;
  refresh: string;
  matches: string;
  live: string;
  error: string;
  partialData: string;
  couldNotReach: string;
  liveDataVia: string;
  autoRefresh: string;
  hoverBadge: string;
  champion: string;
  scorers: string;
  home: string;
  away: string;
  vs: string;
  pen: string;
  R32: string;
  R16: string;
  QF: string;
  SF: string;
  F: string;
}

export const translations: Record<SupportedLang, TranslationDict> = {
  en: {
    title: "World Cup 2026",
    subtitle: "🇨🇦 🇲🇽 🇺🇸 — Knockout stage · live",
    connecting: "Connecting to API…",
    refresh: "Refresh",
    matches: "matches",
    live: "LIVE",
    error: "Error",
    partialData: "partial data",
    couldNotReach: "Could not reach the API. Retrying in 60s.",
    liveDataVia: "Live data via",
    autoRefresh: "auto-refresh 60s",
    hoverBadge: "hover a badge for details",
    champion: "Champion",
    scorers: "Goalscorers",
    home: "Home",
    away: "Away",
    vs: "vs",
    pen: "PEN",
    R32: "Round of 32",
    R16: "Round of 16",
    QF: "Quarter-finals",
    SF: "Semi-finals",
    F: "Final"
  },
  fr: {
    title: "Coupe du Monde 2026",
    subtitle: "🇨🇦 🇲🇽 🇺🇸 — Phase finale · en direct",
    connecting: "Connexion à l'API…",
    refresh: "Actualiser",
    matches: "matchs",
    live: "EN DIRECT",
    error: "Erreur",
    partialData: "données partielles",
    couldNotReach: "Impossible de contacter l'API. Nouvelle tentative dans 60s.",
    liveDataVia: "Données en direct via",
    autoRefresh: "actualisation auto 60s",
    hoverBadge: "survolez un badge pour les détails",
    champion: "Champion",
    scorers: "Buteurs",
    home: "Domicile",
    away: "Extérieur",
    vs: "contre",
    pen: "t.a.b.",
    R32: "32es de finale",
    R16: "16es de finale",
    QF: "Quarts de finale",
    SF: "Demi-finales",
    F: "Finale"
  },
  ar: {
    title: "كأس العالم 2026",
    subtitle: "🇨🇦 🇲🇽 🇺🇸 — مرحلة خروج المغلوب · مباشر",
    connecting: "الاتصال بالواجهة البرمجية...",
    refresh: "تحديث",
    matches: "مباريات",
    live: "مباشر",
    error: "خطأ",
    partialData: "بيانات جزئية",
    couldNotReach: "تعذر الاتصال بالواجهة البرمجية. إعادة المحاولة خلال 60 ثانية.",
    liveDataVia: "البيانات المباشرة عبر",
    autoRefresh: "تحديث تلقائي كل 60 ثانية",
    hoverBadge: "ضع المؤشر على الشارة للتفاصيل",
    champion: "البطل",
    scorers: "الهدافون",
    home: "المستضيف",
    away: "الضيف",
    vs: "ضد",
    pen: "PEN",
    R32: "دور الـ 32",
    R16: "دور الـ 16",
    QF: "ربع النهائي",
    SF: "نصف النهائي",
    F: "النهائي"
  },
  es: {
    title: "Copa del Mundo 2026",
    subtitle: "🇨🇦 🇲🇽 🇺🇸 — Fase de eliminación directa · en vivo",
    connecting: "Conectando a la API…",
    refresh: "Actualizar",
    matches: "partidos",
    live: "EN VIVO",
    error: "Error",
    partialData: "datos parciales",
    couldNotReach: "No se pudo conectar a la API. Reintentando en 60s.",
    liveDataVia: "Datos en vivo a través de",
    autoRefresh: "auto-actualización 60s",
    hoverBadge: "pasa el cursor sobre un escudo para detalles",
    champion: "Campeón",
    scorers: "Goleadores",
    home: "Local",
    away: "Visitante",
    vs: "vs",
    pen: "PEN",
    R32: "Dieciseisavos de final",
    R16: "Octavos de final",
    QF: "Cuartos de final",
    SF: "Semifinales",
    F: "Final"
  },
  pt: {
    title: "Copa do Mundo 2026",
    subtitle: "🇨🇦 🇲🇽 🇺🇸 — Fase de eliminação direta · ao vivo",
    connecting: "Conectando à API…",
    refresh: "Atualizar",
    matches: "jogos",
    live: "AO VIVO",
    error: "Erro",
    partialData: "dados parciais",
    couldNotReach: "Não foi possível conectar à API. Tentando novamente em 60s.",
    liveDataVia: "Dados ao vivo via",
    autoRefresh: "atualização automática 60s",
    hoverBadge: "passe o mouse sobre um escudo para detalhes",
    champion: "Campeão",
    scorers: "Artilheiros",
    home: "Mandante",
    away: "Visitante",
    vs: "vs",
    pen: "PEN",
    R32: "Fase de 32",
    R16: "Oitavas de final",
    QF: "Quartas de final",
    SF: "Semifinais",
    F: "Final"
  }
};

export const languageNames: Record<SupportedLang, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  es: "Español",
  pt: "Português"
};

export function detectBrowserLanguage(): SupportedLang {
  const browserLang = (navigator.language || (navigator as any).userLanguage || "en").split("-")[0];
  if (browserLang in translations) {
    return browserLang as SupportedLang;
  }
  return "en";
}

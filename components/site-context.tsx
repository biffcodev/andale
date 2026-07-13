"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { I18N, detectLang, type Lang, type Translation } from "@/lib/i18n";

export type Theme = "light" | "dark";

export interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
}

export interface ConsentLogEntry {
  ts: number;
  action: "accept_all" | "decline_all" | "custom";
  analytics: boolean;
  marketing: boolean;
}

interface SiteContextValue {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translation;
  loading: boolean;
  loadPct: number;
  /* cookie consent */
  consent: Consent | null;
  consentExpired: boolean;
  consentLog: ConsentLogEntry[];
  cookieOpen: boolean;
  cookiePanel: boolean;
  cookiePrefs: { analytics: boolean; marketing: boolean };
  toggleCookieCat: (k: "analytics" | "marketing") => void;
  acceptAllCookies: () => void;
  declineAllCookies: () => void;
  savePrefs: () => void;
  openCookiePanel: () => void;
  closeCookiePanel: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 180; // 180 days, as in the design

const MANAGED_SCRIPTS: { cat: "analytics" | "marketing"; id: string; code: string }[] = [
  { cat: "analytics", id: "andale-analytics", code: "window.__andaleAnalytics=true;window.dataLayer=window.dataLayer||[];console.info('[cookies] analytics scripts loaded');" },
  { cat: "marketing", id: "andale-marketing", code: "window.__andaleMarketing=true;console.info('[cookies] marketing/pixel scripts loaded');" },
];

function readConsentRaw(): Consent | null {
  try {
    const raw = localStorage.getItem("andaleCookie");
    if (!raw) return null;
    if (raw.charAt(0) === "{") {
      const o = JSON.parse(raw);
      return { necessary: true, analytics: !!o.analytics, marketing: !!o.marketing, ts: o.ts || 0 };
    }
    if (raw === "accepted") return { necessary: true, analytics: true, marketing: true, ts: 0 };
    if (raw === "declined") return { necessary: true, analytics: false, marketing: false, ts: 0 };
    return null;
  } catch {
    return null;
  }
}

export function consentExpiryTs(consent: Consent | null): number {
  return consent && consent.ts ? consent.ts + CONSENT_MAX_AGE : 0;
}

function isConsentExpired(consent: Consent): boolean {
  const exp = consentExpiryTs(consent);
  return !exp || Date.now() > exp;
}

function readConsentLog(): ConsentLogEntry[] {
  try {
    const raw = localStorage.getItem("andaleCookieLog");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

const loadedScripts: Record<string, boolean> = {};

function applyConsent(consent: Consent) {
  if (typeof document === "undefined") return;
  MANAGED_SCRIPTS.forEach((m) => {
    if (consent[m.cat]) {
      if (!loadedScripts[m.id]) {
        const s = document.createElement("script");
        s.id = "ck-" + m.id;
        s.setAttribute("data-cookie-category", m.cat);
        s.text = m.code;
        document.head.appendChild(s);
        loadedScripts[m.id] = true;
      }
    } else {
      console.info("[cookies] " + m.cat + " scripts blocked (no consent)");
    }
  });
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("EN");
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);

  const [consent, setConsent] = useState<Consent | null>(null);
  const [consentExpired, setConsentExpired] = useState(false);
  const [consentLog, setConsentLog] = useState<ConsentLogEntry[]>([]);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [cookiePanel, setCookiePanel] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({ analytics: true, marketing: true });
  const booted = useRef(false);

  /* Boot: restore prefs, detect language, run the loader progress */
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    const storedTheme = localStorage.getItem("andaleTheme") as Theme | null;
    if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);

    const storedLang = localStorage.getItem("andaleLang") as Lang | null;
    setLangState(storedLang && I18N[storedLang] ? storedLang : detectLang());

    const rawConsent = readConsentRaw();
    const valid = rawConsent && !isConsentExpired(rawConsent) ? rawConsent : null;
    setConsentExpired(!!rawConsent && !valid);
    setConsentLog(readConsentLog());
    if (valid) {
      applyConsent(valid);
      setConsent(valid);
      setCookiePrefs({ analytics: valid.analytics, marketing: valid.marketing });
    } else {
      setCookieOpen(true);
    }

    /* Loader: 0→100 over ~1.8s, then release (mirrors the design's timings) */
    const start = Date.now();
    const dur = 1800;
    const iv = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setLoadPct(Math.round(p * 100));
      if (p >= 1) {
        clearInterval(iv);
        setTimeout(() => setLoading(false), 400);
      }
    }, 45);
    const fallback = setTimeout(() => {
      setLoadPct(100);
      setTimeout(() => setLoading(false), 400);
    }, 2800);
    return () => {
      clearInterval(iv);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("andaleTheme", next);
      return next;
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("andaleLang", l);
  }, []);

  const logConsent = useCallback((action: ConsentLogEntry["action"], c: Consent) => {
    try {
      const log = readConsentLog();
      log.push({ ts: Date.now(), action, analytics: !!c.analytics, marketing: !!c.marketing });
      const trimmed = log.slice(-50);
      localStorage.setItem("andaleCookieLog", JSON.stringify(trimmed));
      setConsentLog(trimmed);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const saveConsent = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }, action: ConsentLogEntry["action"]) => {
      const c: Consent = { necessary: true, ts: Date.now(), ...prefs };
      try {
        localStorage.setItem("andaleCookie", JSON.stringify({ v: 1, ...c }));
      } catch {
        /* storage unavailable */
      }
      applyConsent(c);
      logConsent(action, c);
      setCookieOpen(false);
      setCookiePanel(false);
      setCookiePrefs(prefs);
      setConsent(c);
      setConsentExpired(false);
    },
    [logConsent],
  );

  const value = useMemo<SiteContextValue>(
    () => ({
      theme,
      toggleTheme,
      lang,
      setLang,
      t: I18N[lang],
      loading,
      loadPct,
      consent,
      consentExpired,
      consentLog,
      cookieOpen,
      cookiePanel,
      cookiePrefs,
      toggleCookieCat: (k) => setCookiePrefs((p) => ({ ...p, [k]: !p[k] })),
      acceptAllCookies: () => saveConsent({ analytics: true, marketing: true }, "accept_all"),
      declineAllCookies: () => saveConsent({ analytics: false, marketing: false }, "decline_all"),
      savePrefs: () => saveConsent(cookiePrefs, "custom"),
      openCookiePanel: () => setCookiePanel(true),
      closeCookiePanel: () => setCookiePanel(false),
    }),
    [theme, toggleTheme, lang, setLang, loading, loadPct, consent, consentExpired, consentLog, cookieOpen, cookiePanel, cookiePrefs, saveConsent],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

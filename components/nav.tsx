"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LANGS, LANG_NAMES, STRINGS } from "@/lib/i18n";
import { EASE } from "./reveal";
import { useSite } from "./site-context";

const R_FULL = 536.45 / 123.77;
const R_ISO = 198.93 / 148.98;
const LOGO_H = 20;
const ISO_H = 24;

export function Nav() {
  const { t, lang, setLang, theme, toggleTheme } = useSite();
  const router = useRouter();
  const pathname = usePathname();
  const a11y = STRINGS.a11y[lang];
  const isDark = theme === "dark";

  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const lastY = useRef(0);

  /* Collapse on scroll down, expand on scroll up, hide near the footer — as in the design */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const el = document.documentElement;
      const down = y > lastY.current + 3;
      const up = y < lastY.current - 3;
      const nearBottom = el.scrollHeight - (y + window.innerHeight) < window.innerHeight * 0.55;
      setCollapsed((c) => (y < 90 ? false : down ? true : up ? false : c));
      setHidden(nearBottom && y > 90);
      lastY.current = y;
    };
    const onResize = () => setIsMobile(window.innerWidth < 760);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close overlays on navigation */
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
    setCollapsed(false);
    setHidden(false);
    lastY.current = 0;
  }, [pathname]);

  const links = [
    { label: t.nav.work, href: "/work" },
    { label: "Studio", href: "/studio" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const navCollapsed = collapsed && !isMobile;

  const navBase: CSSProperties = {
    position: "fixed", top: "clamp(14px,2vh,22px)", left: "50%", zIndex: 200,
    display: "flex", alignItems: "center",
    background: "var(--nav)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
    border: "1px solid var(--line)", boxShadow: "0 12px 40px rgba(0,0,0,.14)",
    transition: "gap .4s ease, padding .4s ease, width .4s ease, height .4s ease, background .5s, border-color .5s, opacity .35s ease, transform .4s ease",
  };
  const navStyle: CSSProperties = navCollapsed
    ? { ...navBase, gap: 0, padding: 0, width: 62, height: 62, borderRadius: 999, justifyContent: "center", transform: "translateX(-50%)" }
    : { ...navBase, gap: "clamp(22px,3vw,46px)", padding: "9px 22px", borderRadius: 999, maxWidth: "calc(100vw - 28px)", transform: "translateX(-50%)" };
  if (hidden) {
    navStyle.opacity = 0;
    navStyle.pointerEvents = "none";
    navStyle.transform = "translateX(-50%) translateY(-32px)";
  }

  const go = (href: string) => () => router.push(href);

  return (
    <>
      <a href="#maincontent" className="skip-link">{STRINGS.skipLabel[lang]}</a>

      <nav style={navStyle} aria-label={a11y.primary}>
        <button
          onClick={go("/")}
          aria-label="Home"
          style={{ display: "flex", alignItems: "center", padding: "0 4px", flex: "0 0 auto", background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              display: navCollapsed ? "none" : "block", height: LOGO_H, width: Math.round(LOGO_H * R_FULL),
              background: "var(--fg)", transition: "background .5s",
              WebkitMask: "url('/uploads/logo-bold.svg') center / contain no-repeat",
              mask: "url('/uploads/logo-bold.svg') center / contain no-repeat",
            }}
          />
          <span
            style={{
              display: navCollapsed ? "block" : "none", height: ISO_H, width: Math.round(ISO_H * R_ISO),
              background: "var(--fg)", transition: "background .5s",
              WebkitMask: "url('/uploads/isologo.svg') center / contain no-repeat",
              mask: "url('/uploads/isologo.svg') center / contain no-repeat",
            }}
          />
        </button>

        <div
          style={{
            display: isMobile ? "none" : "flex", alignItems: "center", gap: "clamp(14px,2vw,28px)", overflow: "hidden",
            transition: "max-width .45s ease, opacity .35s ease, transform .35s ease",
            maxWidth: navCollapsed ? 0 : 680, opacity: navCollapsed ? 0 : 1,
            transform: navCollapsed ? "scale(.96)" : "none", pointerEvents: navCollapsed ? "none" : "auto",
          }}
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <button
                key={l.href}
                onClick={go(l.href)}
                style={{
                  position: "relative", display: "inline-flex", alignItems: "center", fontSize: 14,
                  fontWeight: active ? 600 : 500, letterSpacing: ".01em", color: "var(--navText)",
                  background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
                  padding: "4px 0", whiteSpace: "nowrap", transition: "color .25s, font-weight .25s",
                }}
              >
                {l.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "flex", gap: 8, alignItems: "center", flex: "0 0 auto",
            overflow: navCollapsed ? "hidden" : "visible",
            transition: "max-width .45s ease, opacity .35s ease, width .45s ease",
            maxWidth: navCollapsed ? 0 : 260, width: navCollapsed ? 0 : "auto",
            opacity: navCollapsed ? 0 : 1, pointerEvents: navCollapsed ? "none" : "auto",
          }}
        >
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={a11y.menu}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{ display: isMobile && !navCollapsed ? "grid" : "none", placeItems: "center", width: 38, height: 38, flex: "0 0 auto", border: "none", background: "transparent", color: "var(--fg)", cursor: "pointer" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? a11y.themeToLight : a11y.themeToDark}
            aria-pressed={isDark}
            className="hover-fade"
            style={{ width: 34, height: 34, flex: "0 0 auto", border: "none", background: "transparent", color: "var(--fg)", display: "grid", placeItems: "center", cursor: "pointer" }}
          >
            {isDark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" /></svg>
            )}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-label={`${a11y.lang}, ${lang}`}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="hover-fade"
              style={{ height: 34, padding: "0 2px", border: "none", background: "transparent", color: "var(--fg)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, letterSpacing: ".06em", fontFamily: "inherit" }}
            >
              {lang}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
            </button>
            {langOpen && (
              <div
                role="listbox"
                aria-label={a11y.lang}
                style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 150, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 14, padding: 6, boxShadow: "0 24px 50px rgba(0,0,0,.22)", zIndex: 300 }}
              >
                {LANGS.map((code) => (
                  <button
                    key={code}
                    role="option"
                    aria-selected={code === lang}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%",
                      padding: "9px 12px", borderRadius: 9, border: "none",
                      background: code === lang ? "var(--stripe)" : "transparent",
                      color: "var(--fg)", cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}
                  >
                    <span style={{ fontWeight: 700, letterSpacing: ".06em", fontSize: 13 }}>{code}</span>
                    <span style={{ color: "var(--muted)", fontSize: 13, fontWeight: 500 }}>{LANG_NAMES[code]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={a11y.menuDialog}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: "fixed", inset: 0, zIndex: 190, background: "var(--bg)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "clamp(80px,16vh,140px) clamp(24px,8vw,60px) clamp(40px,8vh,80px)", gap: "clamp(18px,3vh,30px)",
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label={a11y.closeMenu}
              style={{ position: "absolute", top: "clamp(20px,4vh,34px)", right: "clamp(20px,6vw,40px)", width: 44, height: 44, display: "grid", placeItems: "center", background: "none", border: "none", color: "var(--fg)", cursor: "pointer" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => {
                  setMenuOpen(false);
                  router.push(l.href);
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.14 + i * 0.075 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, width: "100%",
                  textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
                  fontSize: "clamp(38px,10vw,68px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1,
                  color: pathname === l.href ? "var(--fg)" : "var(--muted)", padding: "6px 0",
                  transition: "color .3s ease",
                }}
              >
                {l.label}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" style={{ flex: "0 0 auto", opacity: 0.4 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

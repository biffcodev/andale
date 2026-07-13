"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { COOKIE_TEXTS, EXPIRY_TEXTS } from "@/lib/policies";
import { EASE } from "./reveal";
import { useSite } from "./site-context";

/* Floating controls: back-to-top + cookie FAB + consent banner + preferences panel */
export function CookieUi() {
  const {
    lang, loading, cookieOpen, cookiePanel, cookiePrefs, consentExpired,
    acceptAllCookies, declineAllCookies, savePrefs, toggleCookieCat, openCookiePanel, closeCookiePanel,
  } = useSite();
  const router = useRouter();
  const cookie = COOKIE_TEXTS[lang];
  const expiry = EXPIRY_TEXTS[lang];

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const y = window.scrollY;
      const nearBottom = el.scrollHeight - (y + window.innerHeight) < window.innerHeight * 0.55;
      setShowTop(y > 500 && !(nearBottom && y > 90));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fabShown = !cookieOpen && !cookiePanel && !loading;

  return (
    <>
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed", right: "clamp(16px,3vw,34px)", bottom: "clamp(16px,3vw,34px)", zIndex: 190,
          width: "clamp(46px,4vw,56px)", height: "clamp(46px,4vw,56px)", borderRadius: 999,
          background: "var(--fg)", color: "var(--bg)", border: "none", cursor: "pointer",
          display: "grid", placeItems: "center", boxShadow: "0 10px 30px rgba(0,0,0,.24)",
          opacity: showTop ? 1 : 0, transform: showTop ? "none" : "translateY(18px)",
          pointerEvents: showTop ? "auto" : "none",
          transition: "opacity .3s ease, transform .3s ease, background .5s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>

      {/* Cookie FAB */}
      <button
        onClick={openCookiePanel}
        aria-label={cookie.fabLabel}
        title={cookie.fabLabel}
        style={{
          position: "fixed", left: "clamp(16px,3vw,34px)", bottom: "clamp(16px,3vw,34px)", zIndex: 190,
          width: "clamp(46px,4vw,56px)", height: "clamp(46px,4vw,56px)", borderRadius: 999,
          background: "var(--nav)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
          color: "var(--fg)", border: "1px solid var(--line)", cursor: "pointer",
          display: "grid", placeItems: "center", boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          opacity: fabShown ? 1 : 0, transform: fabShown ? "none" : "translateY(18px)",
          pointerEvents: fabShown ? "auto" : "none",
          transition: "opacity .3s ease, transform .3s ease, background .5s, color .5s",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3a9 9 0 1 0 9 9 3.2 3.2 0 0 1-4-4 3.2 3.2 0 0 1-4-4 4.9 4.9 0 0 0-1-1Z" strokeLinejoin="round" />
          <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" /><circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="10.5" cy="15" r="0.8" fill="currentColor" stroke="none" /><circle cx="15" cy="9.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {/* Consent banner */}
      <AnimatePresence>
        {cookieOpen && !loading && (
          <motion.div
            role="dialog"
            aria-label="Cookie consent"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              position: "fixed", left: "clamp(16px,3vw,34px)", bottom: "clamp(16px,3vw,34px)", zIndex: 200,
              maxWidth: "min(440px, calc(100vw - 32px))",
              background: "var(--nav)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
              border: "1px solid var(--line)", borderRadius: 22, padding: "clamp(22px,2.4vw,30px)",
              boxShadow: "0 18px 48px rgba(0,0,0,.22)",
            }}
          >
            {consentExpired && (
              <p className="mono" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent,var(--fg))", margin: "0 0 12px" }}>
                {expiry.expired}
              </p>
            )}
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg)", margin: 0 }}>
              {cookie.text}{" "}
              <a
                href="/cookies"
                onClick={(e) => { e.preventDefault(); router.push("/cookies"); }}
                style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: 3, transition: "color .25s" }}
              >
                {cookie.policy}
              </a>
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
              <button
                onClick={acceptAllCookies}
                style={{ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em", color: "var(--bg)", background: "var(--fg)", borderRadius: 999, padding: "12px 26px" }}
              >
                {cookie.accept}
              </button>
              <button
                onClick={declineAllCookies}
                style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em", color: "var(--fg)", background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "12px 26px" }}
              >
                {cookie.decline}
              </button>
              <button
                onClick={openCookiePanel}
                style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em", color: "var(--muted)", background: "none", border: "none", padding: "12px 8px", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                {cookie.customize}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences panel */}
      <AnimatePresence>
        {cookiePanel && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={cookie.panelTitle}
            style={{ position: "fixed", inset: 0, zIndex: 210, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,40px)" }}
          >
            <motion.div
              onClick={closeCookiePanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                position: "relative", width: "min(560px,100%)", maxHeight: "88vh", overflow: "auto",
                background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 24,
                padding: "clamp(26px,3vw,44px)", boxShadow: "0 30px 80px rgba(0,0,0,.35)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h2 style={{ fontSize: "clamp(24px,2.6vw,34px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1 }}>{cookie.panelTitle}</h2>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)", maxWidth: "44ch", margin: 0 }}>{cookie.panelIntro}</p>
                </div>
                <button
                  onClick={closeCookiePanel}
                  aria-label="Close"
                  style={{ flex: "0 0 auto", width: 38, height: 38, borderRadius: 999, border: "1px solid var(--line)", background: "none", color: "var(--fg)", cursor: "pointer", display: "grid", placeItems: "center", transition: "background .25s, color .25s" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: "clamp(24px,3vh,36px)" }}>
                {cookie.cats.map((c) => {
                  const locked = c.k === "necessary";
                  const on = locked ? true : cookiePrefs[c.k as "analytics" | "marketing"];
                  return (
                    <div key={c.k} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, padding: "clamp(18px,2.2vh,24px) 0", borderTop: "1px solid var(--line)" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <h3 style={{ fontSize: "clamp(16px,1.4vw,19px)", fontWeight: 700, letterSpacing: "-.01em" }}>{c.t}</h3>
                          <span className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>
                            {locked ? cookie.required : on ? cookie.on : cookie.off}
                          </span>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)", maxWidth: "40ch", margin: 0 }}>{c.d}</p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={on}
                        aria-label={c.t}
                        onClick={() => !locked && toggleCookieCat(c.k as "analytics" | "marketing")}
                        style={{
                          position: "relative", width: 46, height: 26, flex: "0 0 auto", borderRadius: 999, border: "none",
                          cursor: locked ? "not-allowed" : "pointer", padding: 0,
                          background: on ? "var(--accent,var(--fg))" : "var(--line)",
                          opacity: locked ? 0.5 : 1, transition: "background .3s ease",
                        }}
                      >
                        <span style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left .3s cubic-bezier(.22,1,.36,1)", boxShadow: "0 1px 3px rgba(0,0,0,.3)" }} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "clamp(24px,3vh,34px)" }}>
                <button
                  onClick={savePrefs}
                  style={{ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em", color: "var(--bg)", background: "var(--fg)", borderRadius: 999, padding: "13px 28px" }}
                >
                  {cookie.save}
                </button>
                <button
                  onClick={acceptAllCookies}
                  style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em", color: "var(--fg)", background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "13px 28px" }}
                >
                  {cookie.accept}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

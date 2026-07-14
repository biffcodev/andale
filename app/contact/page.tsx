"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { Footer } from "@/components/footer";
import { useSite } from "@/components/site-context";
import { FOOTER_SOCIAL, MAP_SRC } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";
import { submitContactMessage } from "@/lib/supabase";

const inputStyle: CSSProperties = {
  width: "100%", border: "none", borderBottom: "1px solid var(--line)", background: "transparent",
  color: "var(--fg)", fontFamily: "inherit", fontSize: 17, padding: "12px 0", outline: "none",
};

export default function ContactPage() {
  const { t, lang, consent, openCookiePanel, theme } = useSite();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [mapActive, setMapActive] = useState(false);

  const mapAllowed = !!(consent && consent.marketing);
  const mapConsent = STRINGS.mapConsent[lang];
  const isDark = theme === "dark";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    setSending(true);
    await submitContactMessage({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      lang,
    });
    setSending(false);
    setSent(true);
  };

  return (
    <main id="maincontent" role="main">
      <section
        className="snap"
        style={{
          minHeight: "100vh", alignContent: "center",
          padding: "clamp(90px,14vh,160px) clamp(20px,6vw,110px) clamp(50px,7vh,80px)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "clamp(44px,6vw,100px)",
        }}
      >
        <div>
          <span className="kicker">{t.ui.formTitle}</span>
          {!sent ? (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 34, maxWidth: 520 }}>
              <input type="text" name="name" required placeholder={t.ui.fName} style={inputStyle} />
              <input type="email" name="email" required placeholder={t.ui.fEmail} style={inputStyle} />
              <textarea rows={4} name="message" placeholder={t.ui.fMsg} style={inputStyle} />
              <button
                type="submit"
                className="pillbtn"
                disabled={sending}
                style={{ marginTop: 10, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", padding: "15px 30px", borderRadius: 999, background: "var(--fg)", color: "var(--bg)", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit", opacity: sending ? 0.6 : 1 }}
              >
                {t.ui.fSend}
                <span className="pillarrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </button>
            </form>
          ) : (
            <p style={{ marginTop: 34, fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.25, maxWidth: "20ch" }}>{t.ui.fThanks}</p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(30px,4vh,46px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)" }}>{t.ui.reachH}</span>
            <a
              className="hover-fade"
              href={t.emailHref}
              style={{ fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 600, letterSpacing: "-.02em", width: "max-content", maxWidth: "100%", borderBottom: "1px solid var(--fg)", paddingBottom: 4, wordBreak: "break-word" }}
            >
              {t.email}
            </a>
            <span style={{ fontSize: 16, color: "var(--muted)" }}>{t.footCols[0].items[1]}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)" }}>{t.ui.followH}</span>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {FOOTER_SOCIAL.map((s) => (
                <a key={s.label} className="hover-fade" href={s.u} target="_blank" rel="noopener" style={{ fontSize: 16, fontWeight: 500 }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)" }}>{t.ui.visitH}</span>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {t.footCols[2].items.map((o) => (
                <span key={o} style={{ fontSize: 16, fontWeight: 500, color: "var(--fg)" }}>{o}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAP (marketing-consent gated) ---------- */}
      <div className="snap" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "var(--placeholder)" }} onMouseLeave={() => setMapActive(false)}>
        {mapAllowed ? (
          <>
            <iframe
              title={t.ui.mapNote}
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                width: "100%", height: "100%", border: 0, display: "block",
                pointerEvents: mapActive ? "auto" : "none",
                filter: isDark ? "grayscale(1) invert(0.92) contrast(0.82) brightness(1.06)" : "grayscale(1) contrast(1.08) brightness(1.02)",
              }}
            />
            {!mapActive && (
              <button
                onClick={() => setMapActive(true)}
                aria-label={STRINGS.mapHint[lang]}
                style={{ position: "absolute", inset: 0, zIndex: 2, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "clamp(30px,6vh,60px)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--fg)", background: "var(--nav)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid var(--line)", borderRadius: 999, padding: "11px 20px" }}
                >
                  {STRINGS.mapHint[lang]}
                </span>
              </button>
            )}
          </>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, padding: "clamp(24px,5vw,60px)", background: "var(--placeholder)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 20l-5.5 2.5v-15L9 5m0 15l6-2.5M9 20V5m6 12.5L21 20V5l-6 2.5m0 10V7.5" />
              <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
            <h3 style={{ fontSize: "clamp(20px,2vw,28px)", fontWeight: 700, letterSpacing: "-.02em", maxWidth: "22ch" }}>{mapConsent.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)", maxWidth: "40ch", margin: 0 }}>{mapConsent.body}</p>
            <button
              onClick={openCookiePanel}
              className="pillbtn"
              style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 999, background: "var(--fg)", color: "var(--bg)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em" }}
            >
              {mapConsent.btn}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

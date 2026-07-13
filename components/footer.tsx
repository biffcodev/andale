"use client";

import { useRouter } from "next/navigation";
import { STRINGS } from "@/lib/i18n";
import { BOOK_HREF, FOOTER_SOCIAL } from "@/lib/content";
import { useSite } from "./site-context";

const ARROW = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" style={{ flex: "0 0 auto" }}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function Footer() {
  const { t, lang } = useSite();
  const router = useRouter();
  const legal = STRINGS.legalLinks[lang];

  const footerNav = [
    { label: t.nav.contact, href: "/contact" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.work, href: "/work" },
  ];
  const footerLegal = [
    { label: legal.cookies, href: "/cookies" },
    { label: legal.privacy, href: "/privacy" },
    { label: legal.terms, href: "/terms" },
  ];

  return (
    <footer style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "hidden", position: "relative" }}>
      {/* Giant wordmark bleeding off the bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", left: "clamp(40px,10vw,180px)", right: "clamp(40px,10vw,180px)", bottom: "clamp(-84px,-6.5vw,-30px)",
          aspectRatio: "536.45 / 123.77", background: "var(--fg)",
          WebkitMask: "url('/uploads/logo-bold.svg') center / contain no-repeat",
          mask: "url('/uploads/logo-bold.svg') center / contain no-repeat",
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, padding: "clamp(96px,15vh,180px) clamp(20px,6vw,110px) clamp(40px,6vh,70px)" }}>
        <a
          className="pillbtn"
          href={BOOK_HREF}
          target="_blank"
          rel="noopener"
          style={{ display: "inline-flex", alignItems: "center", padding: "18px 34px", borderRadius: 999, background: "var(--accent,var(--fg))", color: "#fff", fontSize: "clamp(16px,1.5vw,19px)", fontWeight: 600, width: "max-content" }}
        >
          {STRINGS.ctaTxt[lang].book}{" "}
          <span className="pillarrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </a>
      </div>
      <div
        style={{
          position: "relative", zIndex: 1, padding: "clamp(20px,3vh,40px) clamp(20px,6vw,110px) 0",
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "clamp(34px,5vw,80px)", alignItems: "start",
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-.01em" }}>© 2026 Andale</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {footerNav.map((ln) => (
            <a key={ln.href} className="arrowlink" href={ln.href} onClick={(e) => { e.preventDefault(); router.push(ln.href); }}>
              {ARROW}
              {ln.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {footerLegal.map((ln) => (
            <a key={ln.href} className="arrowlink" href={ln.href} onClick={(e) => { e.preventDefault(); router.push(ln.href); }}>
              {ARROW}
              {ln.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "clamp(24px,3vw,50px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FOOTER_SOCIAL.map((s) => (
              <a key={s.label} className="arrowlink" href={s.u} target="_blank" rel="noopener">
                {ARROW}
                {s.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t.ui.backToTop}
            className="hover-fade"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", color: "var(--fg)", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, flex: "0 0 auto" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            {t.ui.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}

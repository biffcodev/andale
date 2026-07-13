"use client";

import { PolicyPage } from "@/components/policy-page";
import { consentExpiryTs, useSite } from "@/components/site-context";
import { DT_LOCALE } from "@/lib/i18n";
import { AUDIT_TEXTS, COOKIE_POLICY, COOKIE_TEXTS, EXPIRY_TEXTS } from "@/lib/policies";

export default function CookiesPage() {
  const { lang, consent, consentExpired, consentLog, openCookiePanel } = useSite();
  const audit = AUDIT_TEXTS[lang];
  const expiry = EXPIRY_TEXTS[lang];
  const cookie = COOKIE_TEXTS[lang];
  const locale = DT_LOCALE[lang];

  const entries = consentLog
    .slice()
    .reverse()
    .map((e, i) => {
      let when = "";
      try {
        when = new Date(e.ts).toLocaleString(locale, { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
      } catch {
        when = "";
      }
      return {
        id: consentLog.length - i,
        when,
        action: audit.actions[e.action] || e.action,
        analyticsLabel: e.analytics ? audit.on : audit.off,
        marketingLabel: e.marketing ? audit.on : audit.off,
      };
    });

  let expiryDateStr = "";
  const expTs = consentExpiryTs(consent);
  try {
    if (expTs) expiryDateStr = new Date(expTs).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    expiryDateStr = "";
  }

  const auditSection = (
    <section style={{ padding: "0 clamp(20px,6vw,110px) clamp(90px,14vh,170px)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "clamp(24px,3vh,36px)" }}>
        <h2 style={{ fontSize: "clamp(26px,3vw,44px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1 }}>{audit.title}</h2>
        <p style={{ fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.6, color: "var(--muted)", maxWidth: "52ch", margin: 0 }}>{audit.intro}</p>
        {consent && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 14, padding: "14px 18px", border: "1px solid var(--line)", borderRadius: 14, width: "max-content", maxWidth: "100%" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent,var(--fg))", flex: "0 0 auto" }} />
            <span className="mono" style={{ fontSize: 12, letterSpacing: ".06em", color: "var(--fg)" }}>
              {expiry.active} {expiryDateStr}
            </span>
          </div>
        )}
        {consentExpired && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 14 }}>
            <span className="mono" style={{ fontSize: 12, letterSpacing: ".06em", color: "var(--accent,var(--fg))" }}>{expiry.expired}</span>
            <button
              onClick={openCookiePanel}
              className="pillbtn"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 22px", borderRadius: 999, background: "var(--fg)", color: "var(--bg)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, letterSpacing: "-.01em" }}
            >
              {expiry.renew}
            </button>
          </div>
        )}
      </div>
      {entries.length === 0 ? (
        <p className="mono" style={{ fontSize: 13, letterSpacing: ".04em", color: "var(--muted)", padding: "clamp(24px,4vh,40px) 0", borderTop: "1px solid var(--line)" }}>{audit.empty}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {entries.map((e) => (
            <div key={e.id} style={{ display: "grid", gridTemplateColumns: "clamp(34px,4vw,58px) 1fr", columnGap: "clamp(16px,2.5vw,40px)", padding: "clamp(18px,2.6vh,28px) 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent,var(--fg))" }}>{e.id}</span>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: "clamp(16px,1.4vw,20px)", fontWeight: 600, letterSpacing: "-.01em" }}>{e.action}</span>
                  <span className="mono" style={{ fontSize: 12, letterSpacing: ".06em", color: "var(--muted)" }}>{e.when}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: 999, padding: "6px 13px" }}>
                    {audit.cats.analytics}: {e.analyticsLabel}
                  </span>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--line)", borderRadius: 999, padding: "6px 13px" }}>
                    {audit.cats.marketing}: {e.marketingLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <PolicyPage
      policy={COOKIE_POLICY[lang]}
      primaryCta={{ label: cookie.customize, onClick: openCookiePanel }}
      extra={auditSection}
    />
  );
}

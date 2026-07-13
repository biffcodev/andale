"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { STRINGS } from "@/lib/i18n";
import type { Policy } from "@/lib/policies";

/* Shared layout for Terms / Privacy / Cookies: hero + sticky aside + numbered sections */
export function PolicyPage({ policy, primaryCta, extra }: {
  policy: Policy;
  /* defaults to "Write us" → /contact; cookies page overrides with the settings panel */
  primaryCta?: { label: string; onClick: () => void };
  extra?: ReactNode;
}) {
  const { lang } = useSite();
  const router = useRouter();
  const cta = primaryCta ?? { label: STRINGS.ctaTxt[lang].write, onClick: () => router.push("/contact") };

  return (
    <main id="maincontent" role="main">
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(120px,18vh,220px) clamp(20px,6vw,110px) clamp(60px,9vh,110px)", maxWidth: 1100 }}>
        <span className="kicker">{policy.updated}</span>
        <h1 style={{ fontSize: "clamp(48px,9vw,132px)", fontWeight: 800, letterSpacing: "-.045em", lineHeight: 0.94, marginTop: 22, maxWidth: "14ch", textWrap: "balance" }}>{policy.title}</h1>
        <p style={{ marginTop: 30, fontSize: "clamp(18px,1.7vw,26px)", lineHeight: 1.5, color: "var(--muted)", maxWidth: "52ch" }}>{policy.intro}</p>
      </section>

      <section style={{ padding: "0 clamp(20px,6vw,110px) clamp(90px,14vh,170px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(30px,4vw,80px)", alignItems: "start" }}>
        <div style={{ position: "sticky", top: "clamp(104px,15vh,150px)", alignSelf: "start", display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)" }}>{policy.title}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button
              onClick={cta.onClick}
              className="pillbtn"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 999, background: "var(--fg)", color: "var(--bg)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, letterSpacing: "-.01em" }}
            >
              {cta.label}
            </button>
            <button onClick={() => router.push("/")} className="ghostbtn" style={{ padding: "13px 26px", fontSize: 14 }}>
              {STRINGS.cookiePolicyBack[lang]}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {policy.sections.map((sec, i) => (
            <Reveal key={sec.h} style={{ display: "grid", gridTemplateColumns: "clamp(34px,4vw,58px) 1fr", columnGap: "clamp(16px,2.5vw,40px)", padding: "clamp(28px,4vh,46px) 0", borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent,var(--fg))", lineHeight: 1.7 }}>0{i + 1}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <h2 style={{ fontSize: "clamp(22px,2.4vw,34px)", fontWeight: 700, letterSpacing: "-.025em", lineHeight: 1.08 }}>{sec.h}</h2>
                <p style={{ fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.65, color: "var(--muted)", maxWidth: "60ch" }}>{sec.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {extra}

      <Footer />
    </main>
  );
}

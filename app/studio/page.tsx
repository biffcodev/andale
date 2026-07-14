"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { HERO_IMGS, imgUrl, SOCIALS } from "@/lib/content";
import { STRINGS, TEAM_MEMBERS, TEAM_ROLES } from "@/lib/i18n";

export default function StudioPage() {
  const { t, lang } = useSite();
  const labels = STRINGS.studioLabels[lang];
  const [activeBio, setActiveBio] = useState(-1);

  const team = TEAM_MEMBERS.map((m, i) => ({ ...m, ...(TEAM_ROLES[lang][i] || TEAM_ROLES.EN[i]) }));
  const approach = STRINGS.approach[lang];
  const valuesCount = "0" + t.values.length + " " + STRINGS.principlesWord[lang];

  return (
    <main id="maincontent" role="main">
      {/* ---------- INTRO ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(96px,14vh,150px) clamp(20px,6vw,110px)", maxWidth: 1500 }}>
        <span className="kicker">{labels.intro}</span>
        <h1 style={{ fontSize: "clamp(40px,6vw,100px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 0.98, marginTop: "clamp(20px,2.6vh,30px)", maxWidth: "15ch", textWrap: "balance" }}>{t.aboutTitle}</h1>
        <p style={{ marginTop: "clamp(20px,2.8vh,30px)", fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.55, color: "var(--muted)", maxWidth: "46ch" }}>{STRINGS.studioLead[lang]}</p>
      </section>

      {/* ---------- FULL-BLEED IMAGE ---------- */}
      <div className="snap" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "var(--placeholder)" }}>
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,.12),rgba(0,0,0,.28)), url('${imgUrl(HERO_IMGS[1])}'), repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 16px)`,
            backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(1)",
          }}
        />
      </div>

      {/* ---------- MANIFESTO (ink) ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--ink)", color: "var(--inkfg)", padding: "clamp(90px,14vh,180px) clamp(20px,6vw,110px)" }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: "var(--inkmuted)" }}>{labels.intro}</span>
        <Reveal as="p" style={{ marginTop: "clamp(26px,4vh,44px)", fontSize: "clamp(30px,4vw,68px)", fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1.14, maxWidth: "20ch", textWrap: "balance" }}>
          {t.aboutBody}
        </Reveal>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(96px,14vh,160px) clamp(20px,6vw,110px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <span className="kicker">{t.ui.valuesH}</span>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".16em", color: "var(--accent,var(--fg))" }}>{valuesCount}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(30px,4vw,70px)", marginTop: "clamp(44px,7vh,80px)" }}>
          {t.values.map((v, i) => (
            <Reveal key={v.title} style={{ display: "flex", flexDirection: "column", gap: 18, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--accent,var(--fg))" }}>0{i + 1}</span>
              <h3 style={{ fontSize: "clamp(28px,3vw,46px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.02 }}>{v.title}</h3>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", maxWidth: "40ch" }}>{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- NUMBERS ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--surface)", padding: "clamp(90px,14vh,160px) clamp(20px,6vw,110px)" }}>
        <span className="kicker">{STRINGS.numbersLabel[lang]}</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(40px,6vw,90px)", marginTop: "clamp(44px,7vh,80px)" }}>
          {t.stats.map((st) => (
            <Reveal key={st.l} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: "clamp(64px,9vw,150px)", fontWeight: 800, letterSpacing: "-.05em", lineHeight: 0.9 }}>{st.n}</span>
              <span className="mono" style={{ fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", maxWidth: "22ch" }}>{st.l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: "clamp(70px,12vh,140px) clamp(20px,6vw,110px)", background: "var(--ink)", color: "var(--inkfg)" }}>
        <blockquote style={{ fontSize: "clamp(38px,7vw,104px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, maxWidth: "16ch", margin: "0 auto", textWrap: "balance" }}>
          {STRINGS.studioQuote[lang]}
        </blockquote>
      </section>

      {/* ---------- APPROACH ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(96px,14vh,160px) clamp(20px,6vw,110px)" }}>
        <span className="kicker">{STRINGS.approachKicker[lang]}</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(30px,4vw,70px)", marginTop: "clamp(44px,7vh,80px)" }}>
          {approach.map((ap, i) => (
            <Reveal key={ap.t} style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--accent,var(--fg))" }}>0{i + 1}</span>
              <h3 style={{ fontSize: "clamp(26px,2.8vw,42px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.02 }}>{ap.t}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)", maxWidth: "40ch" }}>{ap.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="snap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--surface)", padding: "clamp(96px,14vh,160px) clamp(20px,6vw,110px)" }}>
        <span className="kicker">{t.ui.teamH}</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(28px,3vw,52px)", marginTop: "clamp(40px,6vh,70px)" }}>
          {team.map((m, i) => {
            const open = i === activeBio;
            return (
              <Reveal key={m.name} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div
                  style={{
                    position: "relative", aspectRatio: "3 / 4",
                    backgroundImage: `url('${m.img}'), repeating-linear-gradient(135deg,var(--stripe) 0 2px,transparent 2px 16px)`,
                    backgroundSize: "cover", backgroundPosition: "center top", backgroundColor: "var(--placeholder)",
                    borderRadius: 16, overflow: "hidden",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <button
                    onClick={() => setActiveBio(open ? -1 : i)}
                    aria-expanded={open}
                    style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", fontFamily: "inherit", color: "var(--fg)" }}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      <span style={{ fontSize: "clamp(18px,1.5vw,23px)", fontWeight: 700, letterSpacing: "-.02em", whiteSpace: "nowrap" }}>{m.name}</span>
                      <span className="mono" style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>{m.role}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={{ display: "inline-flex", transform: open ? "rotate(45deg)" : "none", transition: "transform .45s cubic-bezier(.22,1,.36,1)", color: open ? "var(--accent,var(--fg))" : "var(--muted)" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <div
                    style={{
                      overflow: "hidden", maxHeight: open ? 240 : 0, opacity: open ? 1 : 0,
                      transition: "max-height .55s cubic-bezier(.22,1,.36,1), opacity .45s ease, margin-top .55s ease",
                      marginTop: open ? 2 : 0,
                    }}
                  >
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 14px", maxWidth: "38ch" }}>{m.bio}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {SOCIALS.map((s) => (
                      <a key={s.l} className="socialchip" href={s.u} target="_blank" rel="noopener" aria-label={s.label}>
                        {s.l}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}

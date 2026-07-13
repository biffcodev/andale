"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { GALLERY_POOL, imgUrl, WORK_IMGS } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";

const SVC_IMGS = [WORK_IMGS[0], GALLERY_POOL[3], WORK_IMGS[2], GALLERY_POOL[0], WORK_IMGS[1], GALLERY_POOL[5], WORK_IMGS[3]];

export default function ServicesPage() {
  const { t, lang } = useSite();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const deliverables = STRINGS.deliverables[lang];
  const philo = STRINGS.servicesPhilo[lang];
  const expCols = isMobile ? "1fr" : "0.9fr 1.1fr";

  return (
    <main id="maincontent" role="main">
      {/* ---------- INTRO ---------- */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(96px,14vh,150px) clamp(20px,6vw,110px)", maxWidth: 1500 }}>
        <span className="kicker">{t.ui.servicesKicker}</span>
        <h1 style={{ fontSize: "clamp(40px,6vw,100px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 0.98, marginTop: "clamp(20px,2.6vh,30px)", maxWidth: "15ch", textWrap: "balance" }}>{t.ui.servicesIntro}</h1>
        <p style={{ marginTop: "clamp(20px,2.8vh,30px)", fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.55, color: "var(--muted)", maxWidth: "46ch" }}>{STRINGS.servicesLead[lang]}</p>
      </section>

      {/* ---------- ACCORDION + STICKY VISUAL ---------- */}
      <section style={{ padding: "0 clamp(20px,6vw,110px) clamp(90px,14vh,170px)", display: "grid", gridTemplateColumns: expCols, gap: "clamp(30px,4vw,70px)", alignItems: "start" }}>
        <div
          style={
            isMobile
              ? { position: "relative", height: "46vh", marginBottom: 10 }
              : { position: "sticky", top: "clamp(96px,13vh,150px)", height: "clamp(420px,72vh,720px)", alignSelf: "start" }
          }
        >
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 16, overflow: "hidden", background: "var(--placeholder)" }}>
            {t.services.map((sv, i) => (
              <div
                key={sv.title}
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `linear-gradient(rgba(0,0,0,.15),rgba(0,0,0,.4)), url('${imgUrl(SVC_IMGS[i] || WORK_IMGS[2])}')`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.06)",
                  transition: "opacity .9s ease, transform 1.4s ease",
                }}
              />
            ))}
            <div style={{ position: "absolute", left: "clamp(18px,2vw,30px)", bottom: "clamp(18px,2vh,30px)", right: "clamp(18px,2vw,30px)", color: "#fff", pointerEvents: "none" }}>
              <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", color: "rgba(255,255,255,.8)" }}>0{active + 1}</span>
              <h3 style={{ fontSize: "clamp(24px,2.4vw,38px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1, margin: "8px 0 0", maxWidth: "16ch" }}>
                {t.services[active].title}
              </h3>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
          {t.services.map((sv, i) => {
            const open = i === active;
            return (
              <div
                key={sv.title}
                className="exprow"
                data-open={open ? "1" : "0"}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={open}
                style={{ borderBottom: "1px solid var(--line)", padding: "clamp(24px,3.4vh,44px) 0" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "clamp(38px,4vw,64px) 1fr auto", alignItems: "center", columnGap: "clamp(14px,2vw,28px)" }}>
                  <span className="mono" style={{ fontSize: "clamp(13px,1vw,15px)", fontWeight: 600, color: "var(--accent,var(--fg))" }}>0{i + 1}</span>
                  <h3 className="exptitle" style={{ fontSize: "clamp(28px,3.6vw,56px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 0.98, color: open ? "var(--fg)" : "var(--muted)" }}>{sv.title}</h3>
                  <span style={{ flex: "0 0 auto", color: open ? "var(--accent,var(--fg))" : "var(--muted)", transform: open ? "rotate(45deg)" : "none", transition: "transform .45s cubic-bezier(.22,1,.36,1), color .35s ease" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
                <div className="expdetail">
                  <div style={{ display: "grid", gridTemplateColumns: "clamp(38px,4vw,64px) 1fr", columnGap: "clamp(14px,2vw,28px)" }}>
                    <span />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3vw,44px)", alignItems: "flex-start" }}>
                      <p style={{ flex: "1 1 260px", fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.55, color: "var(--muted)", margin: 0, maxWidth: "44ch" }}>{sv.desc}</p>
                      <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
                        {(deliverables[i] || []).map((d) => (
                          <span key={d} style={{ fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 600, letterSpacing: "-.01em", color: "var(--fg)" }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- PHILOSOPHY (ink) ---------- */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: expCols, gap: "clamp(30px,5vw,90px)", alignItems: "center", background: "var(--ink)", color: "var(--inkfg)", padding: "clamp(96px,14vh,180px) clamp(20px,6vw,110px)" }}>
        <div>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: "var(--inkmuted)" }}>{philo.k}</span>
          <Reveal as="h2" style={{ fontSize: "clamp(34px,4.6vw,74px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, marginTop: "clamp(20px,3vh,32px)", maxWidth: "16ch", textWrap: "balance" }}>
            {philo.t}
          </Reveal>
        </div>
        <Reveal as="p" style={{ fontSize: "clamp(18px,1.6vw,24px)", lineHeight: 1.6, color: "var(--inkmuted)", maxWidth: "46ch" }}>
          {philo.b}
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Footer } from "@/components/footer";
import { PillButton } from "@/components/pill-button";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { enrichWorks, HERO_IMGS, HERO_VIDEO, imgUrl, mediaAbs } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

function ScrollCue({ label, light }: { label: string; light?: boolean }) {
  return (
    <span
      className="mono"
      style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8, color: light ? "rgba(255,255,255,.8)" : "var(--muted)", fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase" }}
    >
      <span style={{ writingMode: light ? "vertical-rl" : undefined, fontSize: light ? 11 : undefined }}>{label}</span>
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ animation: "cue 1.8s ease-in-out infinite" }}>
        <path d="M7 1v14M2 10l5 5 5-5" />
      </svg>
    </span>
  );
}

export default function HomePage() {
  const { t, lang } = useSite();
  const router = useRouter();
  const works = enrichWorks(t);
  const panels = works.slice(0, 5);

  /* --- hero video --- */
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const toggleReel = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  /* --- horizontal work rail: vertical wheel becomes horizontal panel steps --- */
  const railRef = useRef<HTMLDivElement>(null);
  const cool = useRef(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const atStart = el.scrollLeft <= 2;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 2;
      const down = e.deltaY > 0;
      if ((down && !atEnd) || (!down && !atStart)) {
        e.preventDefault();
        if (cool.current) return;
        cool.current = true;
        el.scrollBy({ left: (down ? 1 : -1) * el.clientWidth, behavior: "smooth" });
        setTimeout(() => {
          cool.current = false;
        }, 640);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const railBy = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }, []);

  const pct = Math.round(6 + Math.min(1, Math.max(0, prog)) * 94) + "%";
  const scrollLabel = STRINGS.scrollLabel[lang];

  return (
    <main id="maincontent" role="main">
      {/* ---------- HERO ---------- */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "#000" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={imgUrl(HERO_IMGS[0])}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.36) 42%,rgba(0,0,0,.12) 78%,rgba(0,0,0,0) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,0) 26%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)" }} />
        <div style={{ position: "relative", height: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(88px,12vh,120px) clamp(20px,6vw,110px) clamp(84px,12vh,110px)", maxWidth: 1100, color: "#fff" }}>
          <motion.span
            className="mono"
            style={{ fontSize: 13, letterSpacing: ".28em", textTransform: "uppercase", color: "#fff", opacity: 0.82, marginBottom: "clamp(14px,2.4vh,26px)" }}
            {...fadeUp(0.05)}
          >
            {t.hero[0].k}
          </motion.span>
          <motion.h1
            style={{ fontSize: "clamp(38px,6vw,100px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-.035em", maxWidth: "16ch", textWrap: "balance" }}
            {...fadeUp(0.16)}
          >
            {t.hero[0].t}
          </motion.h1>
          <motion.p
            style={{ marginTop: "clamp(16px,2.6vh,28px)", fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.5, color: "rgba(255,255,255,.8)", maxWidth: "52ch" }}
            {...fadeUp(0.3)}
          >
            {t.hero[0].s}
          </motion.p>
        </div>
        <button
          onClick={toggleReel}
          aria-label="Play or pause"
          className="frostbtn"
          style={{ position: "absolute", left: "clamp(20px,6vw,110px)", bottom: "clamp(96px,15vh,120px)", zIndex: 20, width: 48, height: 48, flex: "0 0 auto", border: "1px solid rgba(255,255,255,.5)" }}
        >
          {playing ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div style={{ position: "absolute", right: "clamp(20px,6vw,110px)", bottom: "clamp(30px,5vh,54px)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,.8)" }}>
          <ScrollCue label={scrollLabel} light />
        </div>
      </section>

      {/* ---------- WORK RAIL ---------- */}
      <section id="work" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <div
          ref={railRef}
          data-rail="1"
          onScroll={(e) => {
            const el = e.currentTarget;
            setProg(el.scrollLeft / (el.scrollWidth - el.clientWidth || 1));
          }}
          style={{ position: "absolute", inset: 0, display: "flex", overflowX: "auto", overflowY: "hidden", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {panels.map((w) => (
            <article key={w.slug} className="casepanel" style={{ flex: "0 0 100%", height: "100%", position: "relative", scrollSnapAlign: "start", overflow: "hidden" }}>
              <div className="casemedia" style={mediaAbs(w.resolvedImg)} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.42) 0%,rgba(0,0,0,0) 24%,rgba(0,0,0,0) 46%,rgba(0,0,0,.72) 100%)" }} />
              <span style={{ position: "absolute", top: "clamp(96px,13vh,132px)", right: "clamp(20px,5vw,64px)", fontSize: "clamp(64px,9vw,150px)", fontWeight: 800, letterSpacing: "-.04em", color: "rgba(255,255,255,.16)", lineHeight: 1 }}>
                {w.num}
              </span>
              <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", bottom: "clamp(96px,15vh,150px)", right: "clamp(20px,6vw,90px)", color: "#fff", maxWidth: 900 }}>
                <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>
                  {w.client} — {w.year}
                </span>
                <h3 style={{ fontSize: "clamp(34px,6vw,88px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1, marginTop: 18, maxWidth: "15ch", textWrap: "balance" }}>{w.title}</h3>
                <span className="mono" style={{ display: "block", fontSize: 13, letterSpacing: ".06em", color: "rgba(255,255,255,.72)", marginTop: 22 }}>{w.tags}</span>
                <PillButton inverted style={{ marginTop: 30 }} onClick={() => router.push(`/work/${w.slug}`)}>
                  {t.viewCase}
                </PillButton>
              </div>
            </article>
          ))}
          {/* CTA end-panel */}
          <div style={{ flex: "0 0 100%", height: "100%", scrollSnapAlign: "start", display: "grid", placeItems: "center", textAlign: "center", padding: "clamp(28px,5vw,80px)", background: "var(--bg)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: "var(--muted)" }}>{t.workKicker}</span>
              <h3 style={{ fontSize: "clamp(34px,5.4vw,84px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1, maxWidth: "15ch", textWrap: "balance" }}>{t.goWorksTitle}</h3>
              <PillButton style={{ marginTop: 6, padding: "16px 30px", fontSize: 16 }} onClick={() => router.push("/work")}>
                {t.goWorksCta}
              </PillButton>
              <span style={{ marginTop: 18 }}>
                <ScrollCue label={t.goWorksHint} />
              </span>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", top: "clamp(94px,13vh,128px)", zIndex: 15, color: "#fff", pointerEvents: "none" }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", textShadow: "0 1px 20px rgba(0,0,0,.5)" }}>{t.workKicker}</span>
        </div>
        <div style={{ position: "absolute", right: "clamp(20px,6vw,90px)", bottom: "clamp(30px,6vh,54px)", zIndex: 15, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className="mono"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "#fff", border: "1px solid rgba(255,255,255,.4)", background: "rgba(0,0,0,.28)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", padding: "7px 13px", borderRadius: 999 }}
            >
              <svg width="14" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 1 1 5l3 4M16 1l3 4-3 4M1 5h18" /></svg>
              {t.axisLabel}
            </span>
            <button onClick={() => railBy(-1)} aria-label="Previous case" className="frostbtn" style={{ width: 46, height: 46 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M15 5 8 12l7 7" /></svg>
            </button>
            <button onClick={() => railBy(1)} aria-label="Next case" className="frostbtn" style={{ width: 46, height: 46 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m9 5 7 7-7 7" /></svg>
            </button>
          </div>
          <div style={{ width: 220, height: 3, background: "rgba(255,255,255,.28)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: pct, background: "#fff", borderRadius: 999, transition: "width .15s linear" }} />
          </div>
        </div>
      </section>

      {/* ---------- MANIFESTO ---------- */}
      <RevealGroup>
        <section
          id="about"
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", background: "var(--surface)", padding: "clamp(90px,12vh,140px) clamp(20px,6vw,110px)" }}
        >
          <RevealItem>
            <span className="mono" style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--muted)" }}>{t.aboutKicker}</span>
          </RevealItem>
          <RevealItem>
            <h2 style={{ fontSize: "clamp(38px,6.4vw,96px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.02, marginTop: 32, maxWidth: "20ch", textWrap: "balance" }}>{t.aboutTitle}</h2>
          </RevealItem>
          <RevealItem>
            <p style={{ marginTop: 34, fontSize: "clamp(17px,1.5vw,21px)", lineHeight: 1.6, color: "var(--muted)", maxWidth: "60ch" }}>{t.aboutBody}</p>
          </RevealItem>
          <RevealItem>
            <PillButton style={{ marginTop: 38, padding: "16px 30px", fontSize: 16 }} onClick={() => router.push("/studio")}>
              Studio
            </PillButton>
          </RevealItem>
          <div style={{ display: "flex", gap: "clamp(30px,6vw,90px)", flexWrap: "wrap", justifyContent: "center", marginTop: "clamp(50px,7vh,84px)" }}>
            {t.stats.map((st) => (
              <Reveal key={st.l} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: "clamp(40px,5vw,72px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1 }}>{st.n}</span>
                <span className="mono" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>{st.l}</span>
              </Reveal>
            ))}
          </div>
        </section>
      </RevealGroup>

      <Footer />
    </main>
  );
}

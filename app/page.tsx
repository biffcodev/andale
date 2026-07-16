"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CasePanel } from "@/components/case-panel";
import { Footer } from "@/components/footer";
import { PillButton } from "@/components/pill-button";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { HERO_IMGS, HERO_VIDEO, imgUrl } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

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
  const works = getProjects(lang);
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* --- pinned horizontal "Selected Work" ---
     A tall section whose inner track slides sideways as you scroll through it:
     scroll down → the panel pins at the first project → each further scroll
     step advances exactly one project → vertical resumes after the last.
     Scrolling is quantized into whole-project steps (wheel + touch capture, with
     a settle backstop), so a gesture always lands on a project and never rests
     between two. */
  const reduce = useReducedMotion();
  const workRef = useRef<HTMLElement>(null);
  const lockRef = useRef(false);
  const SLIDES = panels.length + 1; // case panels + CTA end-panel
  const { scrollYProgress } = useScroll({ target: workRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(SLIDES - 1) * 100}vw`]);
  const scrollLabel = STRINGS.scrollLabel[lang];

  /* Geometry of the pinned section in document space (rect-based, so it is
     correct regardless of any positioned ancestor). */
  const geo = useCallback(() => {
    const el = workRef.current;
    const vh = window.innerHeight || 1;
    const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
    const maxStep = SLIDES - 1;
    const cur = Math.min(maxStep, Math.max(0, Math.round((window.scrollY - top) / vh)));
    return { vh, top, maxStep, cur };
  }, [SLIDES]);

  const goToStep = useCallback(
    (i: number) => {
      const { vh, top, maxStep } = geo();
      const clamped = Math.min(maxStep, Math.max(0, i));
      lockRef.current = true;
      window.scrollTo({ top: Math.round(top + clamped * vh), behavior: "smooth" });
      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    },
    [geo],
  );

  /* Quantize scrolling through the pinned section into one-project steps. */
  useEffect(() => {
    if (reduce || !workRef.current) return;
    const engaged = () => {
      const { vh, top, maxStep } = geo();
      const y = window.scrollY;
      return y >= top - 2 && y <= top + maxStep * vh + 2;
    };

    const onWheel = (e: WheelEvent) => {
      if (!engaged() || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const { cur, maxStep } = geo();
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (dir === 0) return;
      if ((dir > 0 && cur >= maxStep) || (dir < 0 && cur <= 0)) return; // release at the ends
      e.preventDefault();
      if (lockRef.current) return;
      goToStep(cur + dir);
    };

    let touchY = 0;
    let touchFired = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchFired = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!engaged()) return;
      const { cur, maxStep } = geo();
      const dy = touchY - e.touches[0].clientY;
      const dir = dy > 0 ? 1 : -1;
      if ((dir > 0 && cur >= maxStep) || (dir < 0 && cur <= 0)) return; // let the page scroll away
      e.preventDefault(); // hold the page and drive the carousel with the finger
      if (touchFired || lockRef.current || Math.abs(dy) < 40) return;
      touchFired = true; // one project per swipe
      goToStep(cur + dir);
    };

    let settleT = 0;
    const onScroll = () => {
      window.clearTimeout(settleT);
      settleT = window.setTimeout(() => {
        if (lockRef.current) return;
        const { vh, top, maxStep } = geo();
        const y = window.scrollY;
        if (y < top - 2 || y > top + maxStep * vh + 2) return; // not inside the section
        const nearest = Math.min(maxStep, Math.max(0, Math.round((y - top) / vh)));
        const target = Math.round(top + nearest * vh);
        if (Math.abs(target - y) > 2) window.scrollTo({ top: target, behavior: "smooth" });
      }, 140);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settleT);
    };
  }, [reduce, geo, goToStep]);

  const panelBase = { flex: "0 0 100vw", width: "100vw", height: "100%", position: "relative" as const, scrollSnapAlign: "start" as const, overflow: "hidden" };

  const casePanel = (w: (typeof panels)[number]) => (
    <CasePanel key={w.slug} work={w} onOpen={() => router.push(`/work/${w.slug}`)} style={panelBase} />
  );

  const ctaPanel = (
    <div key="cta" style={{ ...panelBase, display: "grid", placeItems: "center", textAlign: "center", padding: "clamp(28px,5vw,80px)", background: "var(--bg)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: "var(--muted)" }}>{t.workKicker}</span>
        <h3 style={{ fontSize: "clamp(34px,5.4vw,84px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1, maxWidth: "15ch", textWrap: "balance" }}>{t.goWorksTitle}</h3>
        <PillButton style={{ marginTop: 6, padding: "16px 30px", fontSize: 16 }} onClick={() => router.push("/work")}>
          {t.goWorksCta}
        </PillButton>
      </div>
    </div>
  );

  const slides: ReactNode[] = [...panels.map(casePanel), ctaPanel];

  const workKickerOverlay = (
    <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", top: "clamp(94px,13vh,128px)", zIndex: 15, color: "#fff", pointerEvents: "none" }}>
      <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", textShadow: "0 1px 20px rgba(0,0,0,.5)" }}>{t.workKicker}</span>
    </div>
  );

  return (
    <main id="maincontent" role="main">
      {/* ---------- HERO ---------- */}
      <section id="hero" className="snap" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "#000" }}>
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

      {/* ---------- SELECTED WORK (pinned horizontal scroll) ---------- */}
      {reduce ? (
        <section id="work" style={{ height: "100vh", position: "relative", overflow: "hidden", background: "#000" }}>
          <div data-rail="1" style={{ position: "absolute", inset: 0, display: "flex", overflowX: "auto", overflowY: "hidden", scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {slides}
          </div>
          {workKickerOverlay}
        </section>
      ) : (
        <section ref={workRef} id="work" style={{ height: `${SLIDES * 100}vh`, position: "relative" }}>
          {/* One snap marker per step so the site-wide scroll-snap agrees with the
              carousel's own step offsets (otherwise mandatory snap would fight the
              programmatic step scrolls). */}
          {Array.from({ length: SLIDES }).map((_, i) => (
            <div key={i} aria-hidden="true" className="snap" style={{ position: "absolute", top: `${i * 100}vh`, left: 0, width: 1, height: 1, pointerEvents: "none" }} />
          ))}
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000" }}>
            <motion.div style={{ display: "flex", height: "100%", width: `${SLIDES * 100}vw`, x, willChange: "transform" }}>
              {slides}
            </motion.div>
            {workKickerOverlay}
            <div style={{ position: "absolute", right: "clamp(20px,6vw,90px)", bottom: "clamp(30px,6vh,54px)", zIndex: 15, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  className="mono"
                  style={{ display: isMobile ? "none" : "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "#fff", border: "1px solid rgba(255,255,255,.4)", background: "rgba(0,0,0,.28)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", padding: "7px 13px", borderRadius: 999 }}
                >
                  <svg width="14" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 1 1 5l3 4M16 1l3 4-3 4M1 5h18" /></svg>
                  {t.axisLabel}
                </span>
                <button onClick={() => goToStep(geo().cur - 1)} aria-label="Previous case" className="frostbtn" style={{ width: 46, height: 46 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M15 5 8 12l7 7" /></svg>
                </button>
                <button onClick={() => goToStep(geo().cur + 1)} aria-label="Next case" className="frostbtn" style={{ width: 46, height: 46 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m9 5 7 7-7 7" /></svg>
                </button>
              </div>
              <div style={{ width: 220, height: 3, background: "rgba(255,255,255,.28)", borderRadius: 999, overflow: "hidden" }}>
                <motion.div style={{ height: "100%", width: "100%", background: "#fff", borderRadius: 999, transformOrigin: "left", scaleX: scrollYProgress }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- MANIFESTO ---------- */}
      <RevealGroup>
        <section
          id="about"
          className="snap"
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", background: "var(--surface)", padding: "clamp(90px,12vh,140px) clamp(20px,6vw,110px)" }}
        >
          <RevealItem>
            <span className="mono" style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--muted)" }}>{t.aboutKicker}</span>
          </RevealItem>
          <RevealItem>
            <h2 style={{ fontSize: "clamp(38px,6.4vw,96px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.02, marginTop: 32, maxWidth: "20ch", textWrap: "balance" }}>{t.aboutTitle}</h2>
          </RevealItem>
          <RevealItem>
            <p style={{ marginTop: 34, fontSize: "clamp(16px,1.25vw,20px)", lineHeight: 1.58, color: "var(--fg)", maxWidth: "62ch" }}>{t.aboutBody}</p>
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

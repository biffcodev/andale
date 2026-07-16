"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CasePanel } from "@/components/case-panel";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { coverBase, HERO_VIDEO, WORK_IMGS, imgUrl, pickSrc } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";
import { getProjects, type LocalizedProject } from "@/lib/projects";

const CASE_WORD: Record<string, string> = { EN: "case studies", ES: "casos", PT: "casos", IT: "casi" };

export default function WorkPage() {
  const { t, lang } = useSite();
  const router = useRouter();
  const works = getProjects(lang);
  const panels = works.slice(0, 5);
  const gridSrc = works.slice(5);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* hero video */
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

  /* "More projects" rows in the design's 2-1-2-3-1-2 rhythm */
  const rowPattern = [2, 1, 2, 3, 1, 2];
  const rows: { items: LocalizedProject[]; ar: string }[] = [];
  let gIdx = 0;
  let pIdx = 0;
  while (gIdx < gridSrc.length) {
    const n = Math.min(rowPattern[pIdx % rowPattern.length], gridSrc.length - gIdx);
    rows.push({ items: gridSrc.slice(gIdx, gIdx + n), ar: n === 1 ? "16 / 9" : "4 / 5" });
    gIdx += n;
    pIdx++;
  }

  const worksCountLabel = "0" + works.length + " " + (CASE_WORD[lang] || CASE_WORD.EN);

  return (
    <main id="maincontent" role="main">
      {/* ---------- VIDEO HERO ---------- */}
      <section className="snap" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={imgUrl(WORK_IMGS[0])}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#0A0A0A" }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 44%,rgba(0,0,0,.8) 100%)" }} />
        <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", bottom: "clamp(84px,15vh,150px)", right: "clamp(20px,6vw,90px)", color: "#fff" }}>
          <span className="mono" style={{ fontSize: 13, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>{t.ui.portfolioKicker}</span>
        </div>
        <button
          onClick={toggleReel}
          aria-label="Play or pause"
          className="frostbtn"
          style={{ position: "absolute", right: "clamp(20px,6vw,90px)", bottom: "clamp(38px,7vh,66px)", zIndex: 20, width: 52, height: 52, border: "1px solid rgba(255,255,255,.5)" }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="snap" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(96px,15vh,180px) clamp(20px,6vw,110px) clamp(60px,10vh,120px)", overflow: "hidden" }}>
        <Reveal as="h1" style={{ fontSize: "clamp(48px,10vw,168px)", fontWeight: 800, letterSpacing: "-.05em", lineHeight: 0.9, marginTop: "clamp(18px,2.5vh,30px)", maxWidth: "12ch", textWrap: "balance" }}>
          {t.ui.portfolioTitle}
        </Reveal>
        <Reveal as="p" style={{ marginTop: "clamp(22px,3vh,34px)", fontSize: "clamp(16px,1.25vw,20px)", lineHeight: 1.58, color: "var(--fg)", maxWidth: "50ch" }}>
          {t.ui.worksIntro}
        </Reveal>
        <div style={{ position: "absolute", left: "clamp(20px,6vw,110px)", bottom: "clamp(34px,6vh,60px)", right: "clamp(20px,6vw,110px)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>{worksCountLabel}</span>
          <span className="mono" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase" }}>
            {STRINGS.scrollLabel[lang]}
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ animation: "cue 1.8s ease-in-out infinite" }}><path d="M7 1v14M2 10l5 5 5-5" /></svg>
          </span>
        </div>
      </section>

      {/* ---------- FULLSCREEN CASE PANELS (identical presentation to the home rail) ---------- */}
      {panels.map((w) => (
        <CasePanel
          key={w.slug}
          work={w}
          onOpen={() => router.push(`/work/${w.slug}`)}
          className="snap"
          style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden", background: "var(--bg)" }}
        />
      ))}

      {/* ---------- MORE PROJECTS GRID ---------- */}
      <section style={{ padding: "clamp(80px,12vh,150px) clamp(20px,6vw,110px) clamp(90px,14vh,170px)" }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>{STRINGS.moreWorksLabel[lang]}</span>
        <div style={{ marginTop: "clamp(30px,4vh,54px)" }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4vw,40px)", marginBottom: "clamp(20px,2.4vw,40px)" }}>
              {row.items.map((w) => (
                <button
                  key={w.slug}
                  onClick={() => router.push(`/work/${w.slug}`)}
                  style={{ flex: isMobile ? "1 1 100%" : "1 1 0", minWidth: 0, textAlign: "left", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "transform .5s cubic-bezier(.22,1,.36,1)", fontFamily: "inherit", color: "var(--fg)" }}
                >
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, aspectRatio: row.ar }}>
                    {w.coverVideo ? (
                      <video className="casemedia" autoPlay muted loop playsInline src={pickSrc(w.coverVideo, isMobile, w.mobileMap)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "var(--placeholder)" }} />
                    ) : (
                      <div className="casemedia" style={{ position: "absolute", inset: 0, transition: "transform .8s ease", ...coverBase(pickSrc(w.cover, isMobile, w.mobileMap)) }} />
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, marginTop: 16 }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)" }}>
                      {w.client}{w.year ? ` — ${w.year}` : ""}
                    </span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: ".14em", color: "var(--muted)" }}>{w.sector}</span>
                  </div>
                  <h3 style={{ fontSize: "clamp(22px,2vw,30px)", fontWeight: 700, letterSpacing: "-.025em", lineHeight: 1.12, marginTop: 8, minHeight: "2.24em", maxWidth: "20ch", textWrap: "balance" }}>{w.title}</h3>
                  <span className="mono" style={{ display: "inline-block", marginTop: 12, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>{w.tags}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

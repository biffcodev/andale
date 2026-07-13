"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { notFound, useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { imgUrl, mediaAbs } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";
import { getProject, getProjects } from "@/lib/projects";

/* Fullscreen image that settles from 1.22→1 while scrolled through (the design's panelReveal view-timeline) */
function FeaturePanel({ img }: { img: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1]);
  return (
    <div ref={ref} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <motion.div style={{ ...mediaAbs(img), scale: reduce ? 1 : scale }} />
    </div>
  );
}

export default function ProjectPage() {
  const { t, lang } = useSite();
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const work = getProject(params.slug, lang);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!work) notFound();

  const all = getProjects(lang);
  const next = all[(work.index + 1) % all.length];
  const g = work.gallery;
  /* The layout uses four fixed image slots; pick() cycles so a project with
     fewer photos never lands on `undefined`, and any images beyond the four
     are shown in a closing grid so nothing the studio uploads goes unused. */
  const pick = (i: number) => (g.length ? g[i % g.length] : g[i]);
  const extras = g.slice(4);

  const toggleVid = () => {
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

  const meta = [
    { k: t.ui.client, v: work.client },
    ...(work.year ? [{ k: t.ui.year, v: work.year }] : []),
    { k: t.ui.sector, v: work.sector },
    ...(work.location ? [{ k: t.ui.location, v: work.location }] : []),
    { k: t.ui.services, v: work.tags },
  ];

  return (
    <main id="maincontent" role="main">
      {/* ---------- HERO ---------- */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={mediaAbs(work.cover)} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 44%,rgba(0,0,0,.8) 100%)" }} />
        <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", bottom: "clamp(84px,15vh,150px)", right: "clamp(20px,6vw,90px)", color: "#fff" }}>
          <span className="mono" style={{ fontSize: 13, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>
            {work.client}{work.year ? ` — ${work.year}` : ""}
          </span>
          <h1 style={{ fontSize: "clamp(34px,6vw,92px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.02, marginTop: 16, maxWidth: "18ch", textWrap: "balance" }}>{work.heroPhrase}</h1>
        </div>
      </section>

      {/* ---------- OVERVIEW ---------- */}
      <section style={{ padding: "clamp(70px,13vh,150px) clamp(20px,6vw,110px) clamp(50px,7vh,80px)" }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>01 — {t.ui.overviewH}</span>
        <Reveal as="p" style={{ marginTop: "clamp(24px,3vh,38px)", fontSize: "clamp(24px,2.8vw,42px)", fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.24, maxWidth: "26ch", textWrap: "balance" }}>
          {work.tagline}
        </Reveal>
        <Reveal as="p" style={{ marginTop: "clamp(20px,2.6vh,30px)", fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.6, color: "var(--muted)", maxWidth: "62ch" }}>
          {work.summary}
        </Reveal>
        <Reveal style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px,3vw,64px)", marginTop: "clamp(40px,6vh,72px)", paddingTop: "clamp(28px,4vh,40px)", borderTop: "1px solid var(--line)" }}>
          {meta.map((m) => (
            <div key={m.k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>{m.k}</span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{m.v}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <FeaturePanel img={pick(0)} />

      {/* ---------- CHALLENGE / APPROACH ---------- */}
      <section style={{ padding: "clamp(80px,14vh,170px) clamp(20px,6vw,110px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,110px)", alignItems: "start" }}>
        <Reveal>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>02 — {t.ui.challengeH}</span>
          <p style={{ marginTop: 22, fontSize: "clamp(18px,1.7vw,26px)", fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.36, maxWidth: "38ch" }}>{work.challenge}</p>
        </Reveal>
        <Reveal>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>03 — {t.ui.approachH}</span>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 18, maxWidth: "40ch" }}>
            {work.approach.map((para, i) => (
              <p key={i} style={{ fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.6, color: i === 0 ? "var(--fg)" : "var(--muted)" }}>{para}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- FILM (only when a project video exists) ---------- */}
      {work.video && (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>
          <video ref={videoRef} muted loop playsInline poster={imgUrl(work.cover)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={work.video} type="video/mp4" />
          </video>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.6))", opacity: playing ? 0 : 1, transition: "opacity .6s ease" }} />
          {!playing ? (
            <button
              onClick={toggleVid}
              aria-label="Play"
              style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "none", border: "none", cursor: "pointer", color: "#fff" }}
            >
              <span style={{ display: "grid", placeItems: "center", width: "clamp(84px,9vw,120px)", height: "clamp(84px,9vw,120px)", borderRadius: 999, border: "1px solid rgba(255,255,255,.55)", background: "rgba(0,0,0,.28)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span style={{ textAlign: "center" }}>
                <span className="mono" style={{ display: "block", fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>{STRINGS.watchFilm[lang]}</span>
                <span style={{ display: "block", fontSize: "clamp(24px,3vw,44px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.05, marginTop: 10 }}>{work.client}</span>
              </span>
            </button>
          ) : (
            <button onClick={toggleVid} aria-label="Pause" className="frostbtn" style={{ position: "absolute", right: "clamp(20px,6vw,90px)", bottom: "clamp(38px,7vh,66px)", zIndex: 20, width: 54, height: 54, border: "1px solid rgba(255,255,255,.5)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
            </button>
          )}
        </div>
      )}

      {/* ---------- TWO-UP GALLERY ---------- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 0 }}>
        <div className="casepanel" style={{ position: "relative", minHeight: "clamp(360px,64vh,640px)", overflow: "hidden" }}>
          <div className="casemedia" style={mediaAbs(pick(1))} />
        </div>
        <div className="casepanel" style={{ position: "relative", minHeight: "clamp(360px,64vh,640px)", overflow: "hidden" }}>
          <div className="casemedia" style={mediaAbs(pick(2))} />
        </div>
      </div>

      {/* ---------- QUOTES ---------- */}
      <section style={{ padding: "clamp(90px,15vh,190px) clamp(20px,6vw,110px)", textAlign: "center", background: "var(--ink)", color: "var(--inkfg)" }}>
        <Reveal as="blockquote" style={{ fontSize: "clamp(30px,4.6vw,72px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.04, maxWidth: "22ch", margin: "0 auto", textWrap: "balance" }}>
          “{work.quotes[0]}”
        </Reveal>
      </section>

      {/* ---------- OUTCOME ---------- */}
      <section style={{ padding: "clamp(80px,14vh,170px) clamp(20px,6vw,110px)", maxWidth: 1100 }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>04 — {t.ui.outcomeH}</span>
        <Reveal as="p" style={{ marginTop: "clamp(24px,3vh,38px)", fontSize: "clamp(24px,3vw,48px)", fontWeight: 600, letterSpacing: "-.025em", lineHeight: 1.18, maxWidth: "24ch", textWrap: "balance" }}>
          {work.outcome[0]}
        </Reveal>
        {work.outcome.slice(1).map((para, i) => (
          <Reveal as="p" key={i} style={{ marginTop: "clamp(18px,2.4vh,28px)", fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.6, color: "var(--muted)", maxWidth: "62ch" }}>
            {para}
          </Reveal>
        ))}
      </section>

      <FeaturePanel img={pick(3)} />

      {/* ---------- EXTRA IMAGES (anything beyond the four fixed slots) ---------- */}
      {extras.length > 0 && (
        <section style={{ padding: "clamp(70px,11vh,140px) clamp(20px,6vw,110px) 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(14px,1.6vw,26px)" }}>
            {extras.map((src, i) => (
              <div key={src} className="casepanel" style={{ position: "relative", overflow: "hidden", borderRadius: 14, aspectRatio: extras.length % 2 === 1 && i === 0 ? "16 / 9" : "4 / 5", gridColumn: extras.length % 2 === 1 && i === 0 ? "1 / -1" : "auto" }}>
                <div className="casemedia" style={mediaAbs(src)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------- REMAINING QUOTES ---------- */}
      {work.quotes.length > 1 && (
        <section style={{ padding: "clamp(80px,13vh,150px) clamp(20px,6vw,110px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(30px,4vw,64px)" }}>
          {work.quotes.slice(1).map((q, i) => (
            <Reveal key={i} style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
              <span className="mono" style={{ fontSize: 13, color: "var(--accent,var(--fg))" }}>0{i + 2}</span>
              <p style={{ fontSize: "clamp(20px,1.9vw,28px)", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.24 }}>{q}</p>
            </Reveal>
          ))}
        </section>
      )}

      {/* ---------- NEXT PROJECT ---------- */}
      <button
        onClick={() => router.push(`/work/${next.slug}`)}
        style={{ position: "relative", display: "block", width: "100%", height: "100vh", border: "none", padding: 0, cursor: "pointer", overflow: "hidden", textAlign: "center", background: "var(--bg)", fontFamily: "inherit" }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, color: "var(--fg)", padding: 20 }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: "var(--muted)" }}>{t.ui.nextProject}</span>
          <h2 style={{ fontSize: "clamp(36px,6vw,92px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1, maxWidth: "16ch", textWrap: "balance" }}>{next.client}</h2>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, marginTop: 6 }}>
            {t.ui.viewProject}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </button>

      <Footer />
    </main>
  );
}

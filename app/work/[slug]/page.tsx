"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { imgUrl, mediaAbs } from "@/lib/content";
import { STRINGS } from "@/lib/i18n";
import { getProject, getProjects } from "@/lib/projects";

/* Single full-bleed image, full viewport, that settles from 1.22→1 while scrolled
   through (the design's panelReveal view-timeline). */
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

/* One full-bleed image row — the whole project presents its images this way:
   a single image, two in a line, or three, edge-to-edge with no rounded corners.
   A single fills the viewport (FeaturePanel); a pair/trio splits it. On phones a
   row stacks and scrolls normally instead of squeezing the images into columns. */
function ImageRow({ imgs, mobile }: { imgs: string[]; mobile: boolean }) {
  if (imgs.length === 1) return <FeaturePanel img={imgs[0]} />;
  return (
    <div
      style={{ display: "flex", flexDirection: mobile ? "column" : "row", height: mobile ? "auto" : "100vh", width: "100%" }}
    >
      {imgs.map((src) => (
        <div key={src} className="casepanel" style={{ position: "relative", flex: mobile ? "none" : "1 1 0", minWidth: 0, height: mobile ? "64vh" : "100%", overflow: "hidden" }}>
          <div className="casemedia" style={mediaAbs(src)} />
        </div>
      ))}
    </div>
  );
}

/* A delicate, unobtrusive pull-quote — light italic, quotation marks in the same
   colour as the text (no accent tint). */
function PullQuote({ text, align = "left" }: { text: string; align?: "left" | "center" }) {
  return (
    <section style={{ padding: "clamp(72px,13vh,150px) clamp(20px,6vw,110px)" }}>
      <Reveal
        as="blockquote"
        style={{
          margin: align === "center" ? "0 auto" : 0,
          maxWidth: "30ch",
          textAlign: align,
          fontSize: "clamp(22px,2.7vw,40px)",
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: "-.01em",
          lineHeight: 1.4,
          color: "var(--fg)",
          textWrap: "balance",
        }}
      >
        “{text}”
      </Reveal>
    </section>
  );
}

const KICKER = { fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase" as const, color: "var(--accent,var(--fg))" };

/* A text section laid out as label-left / content-right so the copy spans the
   width instead of sitting in a narrow left column with empty space beside it. */
function TextBlock({ kicker, mobile, children }: { kicker: string; mobile: boolean; children: ReactNode }) {
  return (
    <section style={{ padding: "clamp(78px,13vh,160px) clamp(20px,6vw,110px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "minmax(0,180px) minmax(0,1fr)", gap: mobile ? "clamp(16px,3vh,26px)" : "clamp(36px,5vw,96px)", alignItems: "start", maxWidth: 1500 }}>
        <span className="mono" style={{ ...KICKER, paddingTop: mobile ? 0 : 10 }}>{kicker}</span>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function ProjectPage() {
  const { t, lang } = useSite();
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const work = getProject(params.slug, lang);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* No scroll "stops" on a project page — the text blocks sit between full-screen
     images, and snapping was skipping them. Scroll flows block to block instead.
     Snapping stays on for the rest of the site. */
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollSnapType;
    html.style.scrollSnapType = "none";
    return () => {
      html.style.scrollSnapType = prev;
    };
  }, []);

  if (!work) notFound();

  const all = getProjects(lang);
  const next = all[(work.index + 1) % all.length];
  const g = work.gallery;
  const q = work.quotes;

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

  /* Walk the gallery in a single, consistent rhythm (one image, then a pair,
     then one, then a pair …) and pull the next row wherever an image belongs. */
  let gi = 0;
  let ip = 0;
  const pattern = [1, 2];
  const nextRow = (): ReactNode => {
    if (gi >= g.length) return null;
    const n = Math.min(pattern[ip % pattern.length], g.length - gi);
    const row = g.slice(gi, gi + n);
    gi += n;
    ip += 1;
    return <ImageRow key={`row-${ip}`} imgs={row} mobile={isMobile} />;
  };

  /* Interleave text and image blocks so text never stacks up together. */
  const blocks: ReactNode[] = [];

  blocks.push(
    <TextBlock key="overview" kicker={`01 — ${t.ui.overviewH}`} mobile={isMobile}>
      <Reveal as="p" style={{ fontSize: "clamp(26px,3vw,46px)", fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.2, maxWidth: "34ch", textWrap: "balance" }}>
        {work.tagline}
      </Reveal>
      <Reveal as="p" style={{ marginTop: "clamp(22px,2.8vh,34px)", fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.62, color: "var(--muted)", maxWidth: "72ch" }}>
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
    </TextBlock>,
  );
  blocks.push(nextRow());

  blocks.push(
    <TextBlock key="challenge" kicker={`02 — ${t.ui.challengeH}`} mobile={isMobile}>
      <Reveal as="p" style={{ fontSize: "clamp(22px,2.4vw,38px)", fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.3, maxWidth: "40ch", textWrap: "balance" }}>{work.challenge}</Reveal>
    </TextBlock>,
  );
  blocks.push(nextRow());

  if (q[0]) {
    blocks.push(<PullQuote key="q0" text={q[0]} />);
    blocks.push(nextRow());
  }

  blocks.push(
    <TextBlock key="approach" kicker={`03 — ${t.ui.approachH}`} mobile={isMobile}>
      <Reveal style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(22px,3vw,54px)", maxWidth: "80ch" }}>
        {work.approach.map((para, i) => (
          <p key={i} style={{ fontSize: "clamp(16px,1.35vw,21px)", lineHeight: 1.62, color: i === 0 ? "var(--fg)" : "var(--muted)" }}>{para}</p>
        ))}
      </Reveal>
    </TextBlock>,
  );
  blocks.push(nextRow());

  if (q[1]) {
    blocks.push(<PullQuote key="q1" text={q[1]} align="center" />);
    blocks.push(nextRow());
  }

  blocks.push(
    <TextBlock key="outcome" kicker={`04 — ${t.ui.outcomeH}`} mobile={isMobile}>
      <Reveal as="p" style={{ fontSize: "clamp(26px,3.2vw,50px)", fontWeight: 600, letterSpacing: "-.025em", lineHeight: 1.16, maxWidth: "32ch", textWrap: "balance" }}>
        {work.outcome[0]}
      </Reveal>
      {work.outcome.slice(1).map((para, i) => (
        <Reveal as="p" key={i} style={{ marginTop: "clamp(18px,2.4vh,28px)", fontSize: "clamp(16px,1.3vw,20px)", lineHeight: 1.62, color: "var(--muted)", maxWidth: "72ch" }}>
          {para}
        </Reveal>
      ))}
    </TextBlock>,
  );
  blocks.push(nextRow());

  if (q[2]) {
    blocks.push(<PullQuote key="q2" text={q[2]} />);
    blocks.push(nextRow());
  }
  q.slice(3).forEach((quote, i) => {
    blocks.push(<PullQuote key={`qx-${i}`} text={quote} align={i % 2 === 0 ? "center" : "left"} />);
    blocks.push(nextRow());
  });

  /* Any images left over close out the gallery in the same rhythm. */
  for (let row = nextRow(); row; row = nextRow()) blocks.push(row);

  /* Film (only when a project has a video) — a full-viewport finale. */
  if (work.video) {
    blocks.push(
      <div key="film" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>
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
      </div>,
    );
  }

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

      {/* ---------- INTERLEAVED TEXT + IMAGE BLOCKS ---------- */}
      {blocks}

      {/* ---------- NEXT PROJECT (inverted to the opposite theme) ---------- */}
      <button
        onClick={() => router.push(`/work/${next.slug}`)}
        style={{ position: "relative", display: "block", width: "100%", height: "100vh", border: "none", padding: 0, cursor: "pointer", overflow: "hidden", textAlign: "center", background: "var(--ink)", color: "var(--inkfg)", fontFamily: "inherit" }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 20 }}>
          <span className="mono" style={{ fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: "var(--inkmuted)" }}>{t.ui.nextProject}</span>
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

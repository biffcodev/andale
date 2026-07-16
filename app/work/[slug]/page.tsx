"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { useSite } from "@/components/site-context";
import { coverBase, mediaAbs, pickSrc } from "@/lib/content";
import { getProject, getProjects } from "@/lib/projects";

const KICKER: CSSProperties = { fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent,var(--fg))" };
/* One shared, moderate type size for every section's copy (01–04). The tagline
   is the bold statement (LEAD); the section paragraphs read as clean prose
   (PROSE); supporting lines are muted (BODY). Only the quotes go large. */
const LEAD: CSSProperties = { fontSize: "clamp(18px,1.55vw,24px)", fontWeight: 600, letterSpacing: "-.015em", lineHeight: 1.34 };
const PROSE: CSSProperties = { fontSize: "clamp(17px,1.4vw,22px)", fontWeight: 400, letterSpacing: "-.005em", lineHeight: 1.52 };
const BODY: CSSProperties = { fontSize: "clamp(16px,1.35vw,19px)", fontWeight: 400, lineHeight: 1.62, color: "var(--muted)" };

/* One gallery row, shown COMPLETE (never cropped):
   - a single (landscape/square) image runs full-bleed width at its natural height,
     so the whole composition is visible;
   - a pair (portrait media) sits side by side, each contained in an equal cell so
     both are fully visible; empty slots ("") become a striped placeholder of the
     same size. On phones a pair stacks and scrolls normally.
   `pairAr` sizes the pair cells (the real portrait's width/height) so the image
   fills its cell exactly and any placeholder beside it matches. */
function ImageRow({ imgs, mobile, map, pairAr }: { imgs: string[]; mobile: boolean; map?: Record<string, string>; pairAr?: number }) {
  if (imgs.length === 1) {
    const src = imgs[0];
    if (!src) return <div style={{ width: "100%", aspectRatio: "16 / 9", ...coverBase(null) }} />;
    return (
      <Reveal style={{ width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pickSrc(src, mobile, map)} alt="" loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
      </Reveal>
    );
  }
  const boxAr = String(pairAr ?? 0.82);
  return (
    <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", width: "100%" }}>
      {imgs.map((src, i) => (
        <Reveal key={`${src}-${i}`} style={{ flex: mobile ? "none" : "1 1 0", minWidth: 0, width: mobile ? "100%" : undefined }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: boxAr, overflow: "hidden", ...(src ? {} : coverBase(null)) }}>
            {src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pickSrc(src, mobile, map)} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* The one large voice on the page — centred, upright (never italic), quotation
   marks in the same colour as the text. */
function PullQuote({ text }: { text: string }) {
  return (
    <section style={{ padding: "clamp(80px,14vh,160px) clamp(20px,6vw,110px)" }}>
      <Reveal
        as="blockquote"
        style={{
          margin: "0 auto",
          maxWidth: "26ch",
          textAlign: "center",
          fontSize: "clamp(26px,3.4vw,52px)",
          fontWeight: 400,
          letterSpacing: "-.02em",
          lineHeight: 1.24,
          color: "var(--fg)",
          textWrap: "balance",
        }}
      >
        “{text}”
      </Reveal>
    </section>
  );
}

/* A project's colour/motion clip, shown on a clean white field, centred and never
   cropped (object-fit is moot — it renders at its own size, capped to the frame).
   Autoplays muted on a loop, like a moving still. */
function ColorVideo({ src }: { src: string }) {
  return (
    <section style={{ height: "100vh", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px,6vw,96px)", overflow: "hidden" }}>
      <video src={src} autoPlay muted loop playsInline style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", display: "block" }} />
    </section>
  );
}

/* A text section laid out label-left / content-right so the copy spans the width. */
function TextBlock({ kicker, mobile, children }: { kicker: string; mobile: boolean; children: ReactNode }) {
  return (
    <section style={{ padding: "clamp(78px,13vh,160px) clamp(20px,6vw,110px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "minmax(0,180px) minmax(0,1fr)", gap: mobile ? "clamp(16px,3vh,26px)" : "clamp(36px,5vw,96px)", alignItems: "start", maxWidth: 1500 }}>
        <span className="mono" style={{ ...KICKER, paddingTop: mobile ? 0 : 8 }}>{kicker}</span>
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 760);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!work) notFound();

  const all = getProjects(lang);
  const next = all[(work.index + 1) % all.length];
  const g = work.gallery;
  const q = work.quotes;

  const meta = [
    { k: t.ui.client, v: work.client },
    ...(work.year ? [{ k: t.ui.year, v: work.year }] : []),
    { k: t.ui.sector, v: work.sector },
    ...(work.location ? [{ k: t.ui.location, v: work.location }] : []),
    { k: t.ui.services, v: work.tags },
  ];

  /* Build the image rows from the gallery, honouring each file's aspect ratio:
     portrait media pairs into a two-up row (a lone portrait pairs with a reserved
     placeholder — the half-width slot for a photo to come), while landscape/square
     media runs full-bleed as a single. Rows are then consumed in order at each
     media slot between the copy and quotes; once they run out, a slot falls back to
     a reserved placeholder so more images can be dropped in later. */
  const isPortrait = (url: string) => (work.ar?.[url] ?? 1.4) < 0.95;
  const rows: string[][] = [];
  {
    const gq = [...g];
    while (gq.length) {
      const first = gq.shift() as string;
      if (isPortrait(first)) {
        const partner = gq.length && isPortrait(gq[0]) ? (gq.shift() as string) : "";
        rows.push([first, partner]);
      } else {
        rows.push([first]);
      }
    }
  }
  const rowQueue = [...rows];
  let rowId = 0;
  const slot = (): ReactNode => {
    const imgs = rowQueue.shift() ?? [""];
    /* size a pair's cells from the real portrait in the row (fallback ~4:5) */
    const pairAr = imgs.map((u) => (u ? work.ar?.[u] : undefined)).find((v): v is number => typeof v === "number");
    return <ImageRow key={`row-${rowId++}`} imgs={imgs} mobile={isMobile} map={work.mobileMap} pairAr={pairAr} />;
  };

  /* Interleave copy, photos and quotes so nothing stacks up together. */
  const blocks: ReactNode[] = [];

  blocks.push(
    <TextBlock key="overview" kicker={`01 — ${t.ui.overviewH}`} mobile={isMobile}>
      <Reveal as="p" style={{ ...LEAD, maxWidth: "42ch", textWrap: "balance" }}>{work.tagline}</Reveal>
      <Reveal as="p" style={{ ...BODY, marginTop: "clamp(20px,2.6vh,30px)", maxWidth: "78ch" }}>{work.summary}</Reveal>
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
  /* Right after the overview: the first image row. A portrait asset (e.g. a
     960×1080 GIF) pairs with a reserved half-width slot; a landscape asset runs
     full-bleed. */
  blocks.push(slot());

  /* 02 — Challenge and 03 — Approach share one row, two columns. */
  blocks.push(
    <section key="reto-enfoque" style={{ padding: "clamp(78px,13vh,160px) clamp(20px,6vw,110px)" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(36px,5vw,96px)", alignItems: "start", maxWidth: 1500 }}>
        <Reveal>
          <span className="mono" style={KICKER}>02 — {t.ui.challengeH}</span>
          <p style={{ ...PROSE, marginTop: 20, maxWidth: "46ch" }}>{work.challenge}</p>
        </Reveal>
        <Reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span className="mono" style={KICKER}>03 — {t.ui.approachH}</span>
          {work.approach.map((para, i) => (
            <p key={i} style={{ ...PROSE, maxWidth: "48ch" }}>{para}</p>
          ))}
        </Reveal>
      </div>
    </section>,
  );
  blocks.push(slot());

  if (q[0]) {
    blocks.push(<PullQuote key="q0" text={q[0]} />);
    blocks.push(slot());
  }

  /* Colour/motion clip — a mid-page moment (not the opening, not the very end). */
  if (work.video) blocks.push(<ColorVideo key="colorvideo" src={pickSrc(work.video, isMobile, work.mobileMap)} />);

  blocks.push(
    <TextBlock key="outcome" kicker={`04 — ${t.ui.outcomeH}`} mobile={isMobile}>
      <Reveal as="p" style={{ ...PROSE, maxWidth: "62ch" }}>{work.outcome[0]}</Reveal>
      {work.outcome.slice(1).map((para, i) => (
        <Reveal as="p" key={i} style={{ ...BODY, marginTop: "clamp(16px,2.2vh,26px)", maxWidth: "78ch" }}>{para}</Reveal>
      ))}
    </TextBlock>,
  );
  blocks.push(slot());

  if (q[1]) {
    blocks.push(<PullQuote key="q1" text={q[1]} />);
    blocks.push(slot());
  }
  if (q[2]) {
    blocks.push(<PullQuote key="q2" text={q[2]} />);
    blocks.push(slot());
  }
  q.slice(3).forEach((quote, i) => {
    blocks.push(<PullQuote key={`qx-${i}`} text={quote} />);
    blocks.push(slot());
  });

  /* Any image rows left over close out the gallery. */
  while (rowQueue.length) blocks.push(slot());

  return (
    <main id="maincontent" role="main">
      {/* ---------- HERO (animated cover on the project page when provided) ---------- */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={mediaAbs(pickSrc(work.coverAnimated ?? work.cover, isMobile, work.mobileMap))} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.4) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 44%,rgba(0,0,0,.8) 100%)" }} />
        <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", bottom: "clamp(84px,15vh,150px)", right: "clamp(20px,6vw,90px)", color: "#fff" }}>
          <span className="mono" style={{ fontSize: 13, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>
            {work.client}{work.year ? ` — ${work.year}` : ""}
          </span>
          <h1 style={{ fontSize: "clamp(34px,6vw,92px)", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.02, marginTop: 16, maxWidth: "18ch", textWrap: "balance" }}>{work.heroPhrase}</h1>
        </div>
      </section>

      {/* ---------- INTERLEAVED COPY + PHOTOS + QUOTES (no stops) ---------- */}
      {blocks}

      {/* ---------- NEXT PROJECT (a deliberate stop, inverted to the opposite theme) ---------- */}
      <button
        onClick={() => router.push(`/work/${next.slug}`)}
        className="snap"
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

"use client";

import type { CSSProperties } from "react";
import { mediaAbs, pickSrc } from "@/lib/content";
import type { LocalizedProject } from "@/lib/projects";
import { PillButton } from "./pill-button";
import { useIsMobile } from "./use-is-mobile";
import { useSite } from "./site-context";

/* One full-viewport "featured project" panel. Used identically on the home rail
   and on the Work archive so both present the same information the same way. */
export function CasePanel({
  work,
  onOpen,
  style,
  className,
}: {
  work: LocalizedProject;
  onOpen: () => void;
  style?: CSSProperties;
  className?: string;
}) {
  const { t } = useSite();
  const isMobile = useIsMobile();
  return (
    <article className={`casepanel${className ? " " + className : ""}`} style={style}>
      <div className="casemedia" style={mediaAbs(pickSrc(work.cover, isMobile, work.mobileMap))} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.42) 0%,rgba(0,0,0,0) 24%,rgba(0,0,0,0) 46%,rgba(0,0,0,.72) 100%)" }} />
      <span style={{ position: "absolute", top: "clamp(96px,13vh,132px)", right: "clamp(20px,5vw,64px)", fontSize: "clamp(64px,9vw,150px)", fontWeight: 800, letterSpacing: "-.04em", color: "rgba(255,255,255,.16)", lineHeight: 1, pointerEvents: "none" }}>
        {work.num}
      </span>
      <div style={{ position: "absolute", left: "clamp(20px,6vw,90px)", bottom: "clamp(96px,15vh,150px)", right: "clamp(20px,6vw,90px)", color: "#fff", maxWidth: 900 }}>
        <span className="mono" style={{ fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.72)" }}>
          {work.client}{work.year ? ` — ${work.year}` : ` — ${work.sector}`}
        </span>
        <h3 style={{ fontSize: "clamp(26px,3.6vw,52px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.02, marginTop: 16, maxWidth: "18ch", textWrap: "balance" }}>{work.title}</h3>
        <span className="mono" style={{ display: "block", fontSize: 13, letterSpacing: ".06em", color: "rgba(255,255,255,.72)", marginTop: 22 }}>{work.tags}</span>
        <PillButton inverted style={{ marginTop: 30 }} onClick={onOpen}>
          {t.viewCase}
        </PillButton>
      </div>
    </article>
  );
}

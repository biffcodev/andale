"use client";

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

const ARROW = (
  <span className="pillarrow">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </span>
);

/* The design's .pillbtn — solid pill whose arrow slides in on hover */
export function PillButton({ children, onClick, href, target, inverted, style, ariaLabel }: {
  children: ReactNode;
  onClick?: MouseEventHandler;
  href?: string;
  target?: string;
  inverted?: boolean;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "15px 28px",
    borderRadius: 999,
    background: inverted ? "#fff" : "var(--fg)",
    color: inverted ? "#0A0A0A" : "var(--bg)",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    width: "max-content",
    ...style,
  };
  if (href) {
    return (
      <a className="pillbtn" href={href} target={target} rel={target === "_blank" ? "noopener" : undefined} style={base} aria-label={ariaLabel}>
        {children} {ARROW}
      </a>
    );
  }
  return (
    <button className="pillbtn" onClick={onClick} style={base} aria-label={ariaLabel}>
      {children} {ARROW}
    </button>
  );
}

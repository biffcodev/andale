"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE } from "@/components/reveal";

/* Page transition: accent sweep across the top + content easing up, as in the design.
   A template remounts on every navigation, so the mount effect resets scroll to the
   very top of each page (Next's default restoration otherwise left a few px offset). */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    /* Every navigation must open the new page at its exact top. Turn scroll-snap
       off for the reset so it can't re-snap the jump to another block (which was
       landing pages at the bottom), jump to the top, then restore snap next frame
       once the layout has settled. */
    const prev = html.style.scrollSnapType;
    html.style.scrollSnapType = "none";
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.style.scrollSnapType = prev;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (reduce) return <>{children}</>;
  return (
    <>
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{
          scaleX: [0, 1, 1, 0],
          transformOrigin: ["left", "left", "right", "right"],
        }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], times: [0, 0.45, 0.55, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 205, background: "var(--accent,#FC4855)", pointerEvents: "none" }}
      />
      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        /* Clear the leftover transform so position:sticky descendants (the
           pinned Selected Work section) work — sticky breaks inside a
           transformed ancestor. */
        onAnimationComplete={() => {
          const el = contentRef.current;
          if (el) {
            el.style.transform = "none";
            el.style.willChange = "auto";
          }
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

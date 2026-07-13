"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "./site-context";
import { STRINGS } from "@/lib/i18n";

const LOADER_LOGO_W = "clamp(200px,42vw,460px)";

/* Fullscreen intro: the Andale wordmark fills left→right with the load percentage */
export function Loader() {
  const { loading, loadPct, lang } = useSite();
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={STRINGS.a11y[lang].loading}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.38, ease: "easeOut" } }}
          style={{
            position: "fixed", inset: 0, zIndex: 500, background: "var(--bg)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Single mask on the parent so the fill and the base can never drift apart */}
          <div
            style={{
              position: "relative", width: LOADER_LOGO_W, aspectRatio: "536.45 / 123.77",
              WebkitMaskImage: "url('/uploads/logo-bold.svg')", maskImage: "url('/uploads/logo-bold.svg')",
              WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
              WebkitMaskPosition: "center", maskPosition: "center",
              WebkitMaskSize: "contain", maskSize: "contain",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "var(--line)" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: loadPct + "%", background: "var(--fg)", transition: "width .12s linear" }} />
          </div>
          <div
            className="mono"
            style={{
              position: "absolute", bottom: "clamp(28px,6vh,54px)", left: "clamp(20px,6vw,110px)", right: "clamp(20px,6vw,110px)",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)",
            }}
          >
            <span>Andale — Branding &amp; Strategy</span>
            <span style={{ fontSize: "clamp(40px,7vw,96px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--fg)", lineHeight: 0.8, fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {loadPct}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/components/reveal";

/* Page transition: accent sweep across the top + content easing up, as in the design */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
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
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}

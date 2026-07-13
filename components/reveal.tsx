"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Scroll-reveal, equivalent to the design's [data-reveal] behavior */
export function Reveal({ children, style, className, as = "div", delay = 0 }: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  as?: "div" | "p" | "h1" | "h2" | "blockquote";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/* Staggered group, equivalent to [data-rvg] */
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.02 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function RevealGroup({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className} style={style}>{children}</div>;
  }
  return (
    <motion.div className={className} style={style} variants={groupVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export { EASE };

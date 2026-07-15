"use client";

import { useEffect, useState } from "react";

/* Shared phone/desktop breakpoint (< 760px = phone). Drives which media variant
   loads and the portrait/landscape layout switches. */
export function useIsMobile(breakpoint = 760): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

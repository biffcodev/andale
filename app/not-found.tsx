"use client";

import { useRouter } from "next/navigation";
import { useSite } from "@/components/site-context";
import { PillButton } from "@/components/pill-button";
import { STRINGS } from "@/lib/i18n";

/* 404 — the flying-pig isologo, no footer (as in the design) */
export default function NotFound() {
  const { lang } = useSite();
  const router = useRouter();
  const nf = STRINGS.notFound[lang];

  return (
    <main id="maincontent" role="main">
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "clamp(20px,3vh,34px)", padding: "clamp(120px,16vh,200px) clamp(20px,6vw,110px) clamp(70px,10vh,120px)" }}>
        <div
          data-pigfly="1"
          aria-hidden="true"
          style={{ position: "relative", width: "clamp(150px,22vw,300px)", height: "clamp(150px,22vw,300px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pigfly 6s ease-in-out infinite", willChange: "transform" }}
        >
          <div
            data-pigflap="1"
            style={{
              width: "100%", height: "100%", background: "var(--fg)",
              WebkitMask: "url('/uploads/isologo.svg') center / contain no-repeat",
              mask: "url('/uploads/isologo.svg') center / contain no-repeat",
              animation: "pigflap 0.85s ease-in-out infinite", transformOrigin: "50% 60%", willChange: "transform",
            }}
          />
          <div
            data-pigshadow="1"
            style={{ position: "absolute", bottom: -28, left: "50%", width: "58%", height: 16, marginLeft: "-29%", borderRadius: 999, background: "var(--fg)", opacity: 0.18, filter: "blur(9px)", animation: "pigshadow 6s ease-in-out infinite", pointerEvents: "none" }}
          />
        </div>
        <span className="mono" style={{ fontSize: 13, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--accent,var(--fg))" }}>{nf.code}</span>
        <h1 style={{ fontSize: "clamp(40px,7vw,96px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 0.98, maxWidth: "16ch", textWrap: "balance" }}>{nf.title}</h1>
        <p style={{ fontSize: "clamp(16px,1.5vw,21px)", lineHeight: 1.55, color: "var(--muted)", maxWidth: "46ch", margin: 0 }}>{nf.body}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 8 }}>
          <PillButton onClick={() => router.push("/")}>{nf.home}</PillButton>
          <button onClick={() => router.push("/work")} className="ghostbtn">
            {nf.work}
          </button>
        </div>
      </section>
    </main>
  );
}

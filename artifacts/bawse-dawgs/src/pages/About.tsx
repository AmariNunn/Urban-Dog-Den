import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { useState } from "react";

const MARQUEE_ITEMS = [
  "Brisket Smoked Sausage",
  "Just a Good Old Dog",
];

const GOLD = "#c9a227";
const RED = "#cc0000";

export default function About() {
  const [marqueePaused, setMarqueePaused] = useState(false);

  return (
    <PageTransition>
      <div style={{ background: "#000000" }} className="min-h-screen relative pt-4">

        {/* ── GOLD MARQUEE BAR (top) ── */}
        <section
          className="relative z-10 overflow-hidden"
          style={{ background: GOLD }}
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
          onTouchStart={() => setMarqueePaused(true)}
          onTouchEnd={() => setMarqueePaused(false)}
        >
          <div
            className="flex whitespace-nowrap py-3"
            style={{
              animation: "marquee-scroll 18s linear infinite",
              animationPlayState: marqueePaused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center flex-shrink-0 font-heading text-[11px] tracking-[0.3em] uppercase"
                style={{ color: "#000" }}
              >
                {item}
                <span className="mx-4 text-black/50">·</span>
              </span>
            ))}
          </div>
        </section>

        {/* ── HERO ── */}
        <section
          className="relative z-10 flex items-center overflow-hidden"
          style={{ background: "#000", minHeight: "52vh", paddingTop: "4rem", paddingBottom: "4rem" }}
        >
          {/* Vertical sidebar text */}
          <div
            className="hidden md:flex absolute left-0 top-0 bottom-0 items-center justify-center"
            style={{ width: "3.5rem" }}
          >
            <span
              className="font-heading text-[9px] tracking-[0.45em] uppercase whitespace-nowrap"
              style={{
                color: `${GOLD}80`,
                transform: "rotate(-90deg)",
                transformOrigin: "center center",
              }}
            >
              ABOUT · OUR STORY
            </span>
          </div>

          {/* Hero content — left-aligned */}
          <div className="w-full px-8 md:pl-20 md:pr-12">

            {/* Nashville eyebrow — centered */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="font-heading text-[11px] tracking-[0.5em] uppercase text-center mb-6"
              style={{ color: GOLD }}
            >
              NASHVILLE, TN
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase tracking-tighter leading-[0.88]"
              style={{ fontSize: "clamp(3.2rem, 11vw, 8.5rem)" }}
            >
              <span className="text-white block">GOOD DAWGS.</span>
              <span style={{ color: GOLD }} className="block">DONE DIFFERENT.</span>
            </motion.h1>

            {/* Red underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.55 }}
              className="mt-6 h-[3px]"
              style={{
                background: RED,
                transformOrigin: "left center",
                width: "clamp(5rem, 18vw, 14rem)",
              }}
            />
          </div>
        </section>

        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
        `}</style>

      </div>
    </PageTransition>
  );
}

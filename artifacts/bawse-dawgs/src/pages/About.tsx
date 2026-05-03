import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { useState } from "react";

const MARQUEE_ITEMS = [
  "Nashville, TN",
  "Brisket Smoked Sausage",
  "Slow-Smoked",
  "Southern Twist",
];

const STATIC_CHIPS = [
  "NASHVILLE, TN",
  "SLOW-SMOKED",
  "BRISKET SAUSAGE",
  "SOUTHERN TWIST",
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

        {/* ── TWO-COLUMN CONTENT ── */}
        <section className="relative z-10 py-16 md:py-24 px-8 md:px-16" style={{ background: "#000" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Left: WHO WE ARE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="font-heading text-[11px] tracking-[0.45em] uppercase mb-3"
                style={{ color: GOLD, fontVariant: "small-caps" }}
              >
                WHO WE ARE
              </h2>
              <div className="w-full h-px mb-7" style={{ background: GOLD }} />
              <p className="font-sans text-sm md:text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.82)" }}>
                Bawse Dawgs is a luxury hot dawg brand based in Nashville, TN, specializing in gourmet hot dawgs with a southern twist.
              </p>
              <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                Known for our signature brisket smoked sausage, each dawg is slow-smoked, grilled to perfection, and topped with high-quality ingredients.
              </p>
            </motion.div>

            {/* Right: OUR PHILOSOPHY */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <h2
                className="font-heading text-[11px] tracking-[0.45em] uppercase mb-3"
                style={{ color: GOLD, fontVariant: "small-caps" }}
              >
                OUR PHILOSOPHY
              </h2>
              <div className="w-full h-px mb-7" style={{ background: GOLD }} />
              <p className="font-sans text-sm md:text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.82)" }}>
                Bawse Dawgs was created to elevate a classic staple into an unforgettable memory built from southern roots, bold flavors, and a whole lotta attitude.
              </p>
              <p className="font-sans text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                This isn't your average hot dog — this is a movement. A statement. A whole new standard.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Gold solid border */}
        <div className="w-full" style={{ height: "1px", background: GOLD }} />

        {/* ── QUOTE BLOCK ── */}
        <section className="relative z-10 py-20 md:py-28 px-8" style={{ background: "#000" }}>

          <div className="text-center max-w-5xl mx-auto">

            {/* Solid gold top border */}
            <div className="w-full mb-10 md:mb-14" style={{ height: "1px", background: GOLD }} />

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-[11px] tracking-[0.55em] uppercase mb-6 md:mb-10"
              style={{ color: GOLD, fontVariant: "small-caps" }}
            >
              THIS ISN'T YOUR AVERAGE HOT DOG
            </motion.p>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase leading-[0.88] text-white"
              style={{ fontSize: "clamp(2.8rem, 11vw, 8rem)" }}
            >
              JUST A GOOD OL' DAWG
            </motion.p>

            {/* Solid gold bottom border */}
            <div className="w-full mt-10 md:mt-14" style={{ height: "1px", background: GOLD }} />

          </div>
        </section>

        {/* Gold solid border */}
        <div className="w-full" style={{ height: "1px", background: GOLD }} />

        {/* ── STATIC 4-CHIP ROW ── */}
        <section className="relative z-10 py-6 px-8" style={{ background: "#000" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATIC_CHIPS.map((chip) => (
              <div
                key={chip}
                className="flex items-center justify-center py-3 px-4 font-heading text-[10px] tracking-[0.3em] uppercase text-center"
                style={{
                  border: `1px solid ${GOLD}`,
                  color: GOLD,
                }}
              >
                {chip}
              </div>
            ))}
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

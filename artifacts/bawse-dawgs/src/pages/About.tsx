import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { useState } from "react";

const CHIPS = [
  "Nashville, TN",
  "Brisket Smoked Sausage",
  "Slow-Smoked",
  "Southern Twist",
];

const GOLD = "#c9a227";
const RED = "#cc0000";

export default function About() {
  const [chipsPaused, setChipsPaused] = useState(false);

  return (
    <PageTransition>
      <div style={{ background: "#000000" }} className="min-h-screen relative">

        {/* Grain texture */}
        <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.06] z-0" aria-hidden>
          <filter id="grain-about">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-about)" />
        </svg>

        {/* ── HERO ── */}
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 text-center overflow-hidden">

          {/* Strong gold glow behind hero */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "radial-gradient(ellipse 80% 55% at 50% 45%, rgba(201,162,39,0.18) 0%, transparent 65%)",
                "radial-gradient(ellipse 40% 25% at 10% 80%, rgba(204,0,0,0.14) 0%, transparent 55%)",
                "radial-gradient(ellipse 35% 20% at 90% 20%, rgba(204,0,0,0.10) 0%, transparent 55%)",
              ].join(", "),
            }}
          />

          {/* Nashville eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-10 md:w-16" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
            <span className="font-heading text-[11px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
              Nashville, TN
            </span>
            <div className="h-px w-10 md:w-16" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display uppercase tracking-tighter leading-[0.88] text-white w-full"
            style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}
          >
            LUXURY
            <br />
            <span style={{ color: GOLD, textShadow: `0 0 60px rgba(201,162,39,0.5), 0 0 120px rgba(201,162,39,0.25)` }}>
              HOT DAWGS
            </span>
            <br />
            <span className="text-white/80">SOUTHERN TWIST</span>
          </motion.h1>

          {/* Red accent rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 mb-7 h-[3px] w-24 rounded-full"
            style={{ background: RED, transformOrigin: "center" }}
          />

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-heading text-base md:text-xl tracking-[0.22em] uppercase"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Slow-Smoked. Grilled to Perfection. Built Different.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
            aria-hidden
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="w-px h-10"
              style={{ background: `linear-gradient(to bottom, ${GOLD}80, transparent)` }}
            />
          </motion.div>
        </section>

        {/* Gold divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        {/* ── CHIP MARQUEE ── */}
        <section
          className="relative z-10 py-5 overflow-hidden"
          style={{ background: "#000" }}
          onMouseEnter={() => setChipsPaused(true)}
          onMouseLeave={() => setChipsPaused(false)}
          onTouchStart={() => setChipsPaused(true)}
          onTouchEnd={() => setChipsPaused(false)}
        >
          <div
            className="flex gap-5 whitespace-nowrap"
            style={{
              animation: "chips-marquee 18s linear infinite",
              animationPlayState: chipsPaused ? "paused" : "running",
              width: "max-content",
            }}
          >
            {[...CHIPS, ...CHIPS, ...CHIPS].map((chip, i) => (
              <span
                key={i}
                className="inline-flex items-center flex-shrink-0 px-5 py-2.5 font-heading text-[11px] tracking-[0.3em] uppercase rounded-sm"
                style={{
                  border: `1px solid ${GOLD}55`,
                  color: GOLD,
                  background: "rgba(201,162,39,0.05)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </section>

        {/* Gold divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        {/* ── BRAND STORY ── */}
        <section className="relative z-10 py-16 md:py-24 px-5" style={{ background: "#000" }}>

          {/* Subtle red glow left */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 70% at 0% 50%, rgba(204,0,0,0.06) 0%, transparent 60%)" }} />

          <div className="max-w-3xl mx-auto relative z-10">

            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-heading text-[10px] tracking-[0.5em] uppercase mb-8"
              style={{ color: `${GOLD}70` }}
            >
              Our Story
            </motion.p>

            {/* Paragraph 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 pl-5 md:pl-7"
              style={{ borderLeft: `3px solid ${GOLD}` }}
            >
              <p className="font-sans leading-relaxed text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.88)" }}>
                <span className="font-bold" style={{ color: GOLD }}>Bawse Dawgs</span> is a luxury hot dawg brand based in Nashville, TN, specializing in gourmet hot dawgs with a southern twist. Known for our signature{" "}
                <span className="font-semibold" style={{ color: GOLD }}>"brisket smoked sausage"</span>, each dawg is slow-smoked, grilled to perfection, and topped with high-quality ingredients.
              </p>
            </motion.div>

            {/* Paragraph 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pl-5 md:pl-7"
              style={{ borderLeft: `3px solid ${RED}` }}
            >
              <p className="font-sans leading-relaxed text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.88)" }}>
                Bawse Dawgs was created to elevate a classic staple into an unforgettable memory that is built from{" "}
                <span className="font-semibold" style={{ color: GOLD }}>southern roots</span>,{" "}
                <span className="font-semibold" style={{ color: GOLD }}>bold flavors</span>, and a whole lotta attitude.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Gold divider */}
        <div className="w-full h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

        {/* ── QUOTE ── */}
        <section className="relative z-10 py-20 md:py-32 px-5 overflow-hidden" style={{ background: "#000" }}>

          {/* Massive gold glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(201,162,39,0.12) 0%, transparent 65%)" }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center max-w-5xl mx-auto"
          >

            {/* Top border */}
            <div className="w-full h-[2px] mb-10 md:mb-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

            {/* Lead-in */}
            <p className="font-heading text-[11px] tracking-[0.55em] uppercase mb-6 md:mb-10"
              style={{ color: GOLD }}>
              This isn't your average hot dog
            </p>

            {/* The quote */}
            <p
              className="font-display uppercase leading-[0.88] text-white"
              style={{
                fontSize: "clamp(2.8rem, 11vw, 8rem)",
                textShadow: `0 0 80px rgba(201,162,39,0.35), 0 0 160px rgba(201,162,39,0.15)`,
              }}
            >
              "JUST A GOOD<br className="hidden md:block" /> OL' DAWG"
            </p>

            {/* Bottom border */}
            <div className="w-full h-[2px] mt-10 md:mt-14" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

          </motion.div>
        </section>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes chips-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>

      </div>
    </PageTransition>
  );
}

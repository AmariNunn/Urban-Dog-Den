import { PageTransition } from "@/components/layout/PageTransition";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Star } from "lucide-react";
import { useRef } from "react";

const STAR_POSITIONS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100),
  y: ((i * 97.33) % 100),
  size: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.2,
  opacity: 0.08 + (i % 7) * 0.04,
}));

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen lg:h-screen flex flex-col overflow-hidden text-center"
        style={{ background: "#07060a" }}
      >
        {/* Grain overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ opacity: 0.09 }}
          aria-hidden
        >
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Star dots — deterministic positions */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {STAR_POSITIONS.map(({ id, x, y, size, opacity }) => (
            <div
              key={id}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: id % 4 === 0 ? "#c9a227" : id % 4 === 1 ? "#cc0000" : "#f5c542",
                opacity,
              }}
            />
          ))}
        </div>

        {/* Radial gradients — gold center bloom + red corner accents */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(201,162,39,0.13) 0%, transparent 70%)",
              "radial-gradient(ellipse 40% 30% at 15% 80%, rgba(204,0,0,0.10) 0%, transparent 60%)",
              "radial-gradient(ellipse 35% 25% at 85% 15%, rgba(204,0,0,0.08) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139,90,10,0.12) 0%, transparent 70%)",
            ].join(", "),
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(7,6,10,0.85) 100%)",
          }}
        />

        {/* Animated gold sparks */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-spark pointer-events-none z-0"
            style={{
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              background: i % 2 === 0 ? "#c9a227" : "#cc0000",
              left: `${((i * 53.7) % 100)}%`,
              top: `${((i * 79.13) % 100)}%`,
              animationDelay: `${(i * 0.4) % 3}s`,
              animationDuration: `${2.5 + (i % 3) * 0.7}s`,
              opacity: 0.6,
            }}
          />
        ))}

        {/* ── Hero content — fluid flex column, no hardcoded zones ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-28 px-4 pb-4 w-full gap-5">

          {/* LOGO */}
          <div className="flex items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={import.meta.env.BASE_URL + "bawse-dawgs-logo.png"}
                alt="Bawse Dawgs"
                className="mx-auto"
                style={{
                  width: "clamp(200px, 52vw, 920px)",
                  height: "auto",
                  maxHeight: "40vh",
                  filter: "drop-shadow(0 0 50px rgba(201,162,39,0.30))",
                }}
              />
            </motion.div>
          </div>

          {/* TEXT + BUTTONS */}
          <div className="flex flex-col items-center w-full max-w-lg mx-auto gap-3">

            {/* Main tagline */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter leading-[0.88] text-center"
            >
              GOOD DOGS
              <br />
              <span
                className="text-primary"
                style={{ textShadow: "0 0 60px rgba(201,162,39,0.35)" }}
              >
                DONE DIFFERENT
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="text-sm md:text-lg font-heading text-white/45 tracking-[0.35em] uppercase text-center"
            >
              No shortcuts, just flavor.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <Link
                href="/order"
                data-testid="button-order-now"
                className="shimmer-btn px-10 py-4 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 flex-1"
              >
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/menu"
                data-testid="button-view-menu"
                className="shimmer-btn-red px-10 py-4 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 flex-1"
              >
                View Menu
              </Link>
            </motion.div>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="flex items-center gap-5 md:gap-10 flex-wrap justify-center"
            >
              {[
                { label: "100% Beef", sub: "No fillers. Ever." },
                { label: "Bawse Sauce", sub: "Made in-house." },
                { label: "Chef-Driven", sub: "Built to stand out." },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="font-display text-lg md:text-2xl text-primary tracking-wide"
                    style={{ textShadow: "0 0 20px rgba(201,162,39,0.3)" }}
                  >
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-white/30 font-heading tracking-widest uppercase mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, transparent, #07060a)" }}
        />
      </section>

      {/* ── BRAND PILLARS ── */}
      <section
        className="py-28 relative z-10 border-t border-primary/10"
        style={{ background: "#0a090f" }}
      >
        {/* Grain on this section too */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" aria-hidden>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <p className="font-heading text-xs tracking-[0.4em] text-primary/60 uppercase mb-4">
              What We Stand For
            </p>
            <h2 className="font-display text-5xl md:text-7xl mb-5">
              <span className="text-primary">100% Beef.</span>{" "}
              <span className="text-white">No Fillers.</span>
            </h2>
            <p className="text-xl font-heading text-white/30 uppercase tracking-widest">
              No Shortcuts. Just Flavor.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Flame,
                title: "Gourmet Swagger",
                tag: "Premium Craft",
                desc: "We source real ingredients and build every dawg with intention. No shortcuts, no fillers — just premium flavor stacked the way it was meant to be eaten.",
              },
              {
                icon: Star,
                title: "Street Certified",
                tag: "Southern Soul",
                desc: "Southern-inspired, street-certified. From Nashville heat to Carolina slaw — our flavor DNA runs deep. Every bite carries a story that hits different.",
              },
              {
                icon: Star,
                title: "Boss Execution",
                tag: "Every. Single. Time.",
                desc: "We serve fast, we serve loud, and every dawg leaves the kitchen perfect. No weak energy. No sloppy builds. The Bawse Rule is non-negotiable.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-8 border border-white/[0.06] hover:border-primary/40 transition-all duration-500 group overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,162,39,0.07) 0%, transparent 70%)",
                  }}
                />
                <div className="font-heading text-[10px] tracking-[0.4em] text-primary/50 uppercase mb-4">
                  {pillar.tag}
                </div>
                <pillar.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-3xl mb-4 tracking-wide text-white">
                  {pillar.title}
                </h3>
                <p className="text-white/35 font-sans leading-relaxed text-sm">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Story pull section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-20 grid md:grid-cols-2 gap-12 items-center border-t border-white/[0.05] pt-20"
          >
            <div>
              <p className="font-heading text-xs tracking-[0.4em] text-secondary/70 uppercase mb-4">
                The Origin
              </p>
              <h3 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
                From the Streets <br />
                <span className="text-primary">to the Grill.</span>
              </h3>
              <p className="text-white/35 font-sans leading-relaxed mb-4">
                Bawse Dawgs was born from a simple idea — that street food deserves the same respect
                as any fine dining experience. Real craft. Real ingredients. Real attitude. No
                pretension, no compromise.
              </p>
              <p className="text-white/35 font-sans leading-relaxed">
                We built this brand for the 21–45 crowd that loves premium food but hates the
                pretension that usually comes with it. Instagram-worthy, belly-filling, and built
                to make you come back the very next day.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "5", label: "Signature Dawgs", color: "text-primary" },
                { num: "2", label: "Classic Builds", color: "text-white" },
                { num: "4", label: "Loaded Fries", color: "text-secondary" },
                { num: "$0", label: "Shortcuts Taken", color: "text-primary" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 border border-white/[0.06] text-center"
                  style={{ background: "rgba(255,255,255,0.015)" }}
                >
                  <div className={`font-display text-5xl ${item.color} mb-2`}>{item.num}</div>
                  <div className="text-white/30 text-xs font-heading tracking-widest uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-6 bg-primary overflow-hidden flex whitespace-nowrap border-y border-primary/50">
        <div className="animate-marquee flex gap-8 items-center text-black font-display text-3xl tracking-widest uppercase">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              THE BAWSE RULE: EVERY DAWG PERFECT{" "}
              <Flame className="w-6 h-6 inline-block" />
            </span>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
          width: max-content;
        }
      `}</style>
    </PageTransition>
  );
}

import { PageTransition } from "@/components/layout/PageTransition";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
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
        className="relative min-h-[100vh] flex flex-col overflow-hidden text-center"
        style={{ background: "#000000" }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "#000000" }} />

        {/* ── Hero content — stacked column ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-[6vh] px-4 pb-20 w-full gap-6">

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center w-full"
          >
            <img
              src={import.meta.env.BASE_URL + "bawse-dawgs-logo-new2.png"}
              alt="Bawse Dawgs"
              style={{
                width: "clamp(300px, 77.5vw, 600px)",
                height: "auto",
                display: "block",
                margin: "0 auto",
                position: "relative",
                left: "-20px",
                filter: "drop-shadow(0 4px 32px rgba(201,162,39,0.28))",
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-sm md:text-lg font-heading text-white/60 tracking-[0.25em] uppercase text-center"
          >
            100% BEEF. NO FILLERS. JUST FLAVOR.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
          >
            <Link
              href="/menu"
              data-testid="button-view-menu"
              className="shimmer-btn-red px-10 py-4 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 flex-1"
            >
              View Menu
            </Link>
            <Link
              href="/order"
              data-testid="button-order-now"
              className="shimmer-btn px-10 py-4 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 flex-1"
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
        />
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

      {/* ── BRAND PILLARS ── */}
      <section
        className="py-28 relative z-10 border-t border-primary/10"
        style={{ background: "#000000" }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" aria-hidden>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Pillar 1 — Premium Craft */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative p-8 border border-white/[0.06] hover:border-primary/40 transition-all duration-500 group overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,162,39,0.07) 0%, transparent 70%)" }}
              />
              <h3 className="font-display text-3xl mb-4 tracking-wide text-white">
                Premium Craft
              </h3>
              <p className="text-white/35 font-sans leading-relaxed text-sm">
                We source real ingredients and build every dawg with intention. No shortcuts, no fillers — just premium flavor stacked the way it was meant to be eaten.
              </p>
            </motion.div>

            {/* Pillar 2 — Street Certified */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="relative p-8 border border-white/[0.06] hover:border-primary/40 transition-all duration-500 group overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(201,162,39,0.07) 0%, transparent 70%)" }}
              />
              <h3 className="font-display text-3xl mb-4 tracking-wide text-white">
                Street Certified
              </h3>
              <p className="text-white/35 font-sans leading-relaxed text-sm">
                Our flavor DNA runs deep. Every bite carries a story that hits different.
              </p>
            </motion.div>

          </div>
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

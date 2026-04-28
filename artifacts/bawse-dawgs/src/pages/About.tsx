import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";

const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100),
  y: ((i * 97.33) % 100),
  size: i % 5 === 0 ? 2.2 : i % 3 === 0 ? 1.6 : 1,
  opacity: 0.06 + (i % 7) * 0.035,
  color: i % 4 === 0 ? "#c9a227" : i % 4 === 1 ? "#cc0000" : "#f5c542",
}));

const BG_STYLE: React.CSSProperties = { background: "#07060a" };

const GRADIENTS: React.CSSProperties = {
  background: [
    "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(201,162,39,0.11) 0%, transparent 65%)",
    "radial-gradient(ellipse 35% 25% at 0% 60%, rgba(204,0,0,0.09) 0%, transparent 60%)",
    "radial-gradient(ellipse 30% 20% at 100% 80%, rgba(201,162,39,0.07) 0%, transparent 60%)",
  ].join(", "),
};

export default function About() {
  return (
    <PageTransition>
      <div style={BG_STYLE} className="min-h-screen relative overflow-hidden">

        {/* Grain */}
        <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.08] z-0" aria-hidden>
          <filter id="grain-about">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-about)"/>
        </svg>

        {/* Star dots */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {STARS.map(({ id, x, y, size, opacity, color }) => (
            <div key={id} className="absolute rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity }} />
          ))}
        </div>

        {/* Radial gradients */}
        <div className="fixed inset-0 pointer-events-none z-0" style={GRADIENTS} />

        {/* ── HERO ── */}
        <section className="relative z-10 pt-20 pb-14 px-4 border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="font-heading text-[10px] tracking-[0.45em] text-primary/60 uppercase">Nashville, TN</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-6"
            >
              LUXURY HOT DAWGS
              <br />
              <span className="text-primary" style={{ textShadow: "0 0 40px rgba(201,162,39,0.3)" }}>
                SOUTHERN TWIST
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-base md:text-lg text-white/30 tracking-[0.2em] uppercase"
            >
              Slow-Smoked. Grilled to Perfection. Built Different.
            </motion.p>
          </div>
        </section>

        {/* ── BRAND STORY ── */}
        <section className="relative z-10 py-16 px-4 border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="font-heading text-[10px] tracking-[0.4em] text-primary/50 uppercase">Our Story</p>

              <p className="text-white/60 font-sans leading-relaxed text-base md:text-lg">
                <span className="text-primary font-semibold">Bawse Dawgs</span> is a luxury hot dawg brand based in Nashville, TN, specializing in gourmet hot dawgs with a southern twist. Known for our signature{" "}
                <span className="text-primary">"brisket smoked sausage"</span>, each dawg is slow-smoked, grilled to perfection, and topped with high-quality ingredients.
              </p>

              <p className="text-white/60 font-sans leading-relaxed text-base md:text-lg">
                Bawse Dawgs was created to elevate a classic staple into an unforgettable memory that is built from southern roots, bold flavors, and a whole lotta attitude.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-14 border border-primary/25 text-center overflow-hidden"
              style={{ background: "rgba(201,162,39,0.03)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,162,39,0.08) 0%, transparent 70%)" }}
              />
              <p className="font-heading text-[10px] tracking-[0.4em] text-primary/40 uppercase mb-6 relative z-10">
                This isn't your average hot dog
              </p>
              <p className="font-display text-3xl md:text-5xl text-white leading-tight relative z-10">
                "JUST A GOOD OL' DAWG"
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}

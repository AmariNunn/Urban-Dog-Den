import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Zap, Target, Crown, Flame } from "lucide-react";

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
        <section className="relative z-10 pt-16 pb-12 px-4 border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <Crown className="w-4 h-4 text-primary" />
              <span className="font-heading text-[10px] tracking-[0.45em] text-primary/60 uppercase">The Brand</span>
              <Crown className="w-4 h-4 text-primary" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] mb-5"
            >
              FROM THE STREETS
              <br />
              <span className="text-primary" style={{ textShadow: "0 0 40px rgba(201,162,39,0.3)" }}>
                TO THE GRILL
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-base md:text-lg text-white/30 tracking-[0.25em] uppercase mb-8"
            >
              We're not just selling hot dogs. We're serving a lifestyle.
            </motion.p>

            {/* Quick stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap justify-center gap-px border border-white/[0.06] overflow-hidden"
            >
              {[
                { v: "100%", l: "Beef" },
                { v: "Zero", l: "Fillers" },
                { v: "Every", l: "Dawg Perfect" },
                { v: "No", l: "Shortcuts" },
              ].map((s, i) => (
                <div key={i} className="flex-1 min-w-[100px] px-6 py-4 text-center"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="font-display text-2xl text-primary">{s.v}</div>
                  <div className="font-heading text-[10px] tracking-widest text-white/25 uppercase mt-1">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── BRAND STORY + BAWSE RULE ── */}
        <section className="relative z-10 py-14 px-4 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-start">

            {/* Story text */}
            <motion.div
              className="md:col-span-3 space-y-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-heading text-[10px] tracking-[0.4em] text-primary/50 uppercase">Our Story</p>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
                Blue-Collar Roots.{" "}
                <span className="text-primary">Boss-Level</span>{" "}
                Execution.
              </h2>
              <p className="text-white/40 font-sans leading-relaxed text-sm">
                <span className="text-primary font-semibold">Bawse Dawgs</span> isn't just another hot dog stand — it's a statement. Born
                from the hustle and flavor of the streets, we bring boss-level execution to an
                American classic. No cut corners. No basic builds. Every dawg is 100% beef,
                loaded with premium, scratch-made toppings, and crafted to perfection.
              </p>
              <p className="text-white/40 font-sans leading-relaxed text-sm">
                We believe street food should feel like a luxury experience — bold,
                unapologetic, and unforgettable. From our custom-blended Bawse Sauce to
                our perfectly butter-toasted buns, every single detail earns its place.
              </p>
              <p className="text-white/40 font-sans leading-relaxed text-sm">
                Built for the 21–45 crowd that loves premium food but hates the pretension
                that usually tags along. Instagram-worthy. Belly-filling. Crafted to make
                you come back tomorrow and tell three people about it.
              </p>
            </motion.div>

            {/* Bawse Rule card */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="relative p-8 border border-primary/25 overflow-hidden"
                style={{ background: "rgba(201,162,39,0.03)" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,162,39,0.08) 0%, transparent 70%)" }} />
                <Shield className="w-8 h-8 text-primary mb-5 relative z-10" />
                <p className="font-heading text-[10px] tracking-[0.4em] text-primary/50 uppercase mb-3 relative z-10">
                  Non-Negotiable
                </p>
                <h3 className="font-display text-3xl text-white uppercase tracking-wide mb-4 relative z-10">
                  The Bawse Rule
                </h3>
                <p className="font-heading text-lg text-primary tracking-wide leading-relaxed relative z-10">
                  "We serve fast, we serve loud, and every dawg leaves perfect."
                </p>
                <div className="mt-6 pt-5 border-t border-white/[0.07] relative z-10">
                  <p className="text-white/25 text-xs font-sans leading-relaxed">
                    No sloppy builds. No weak energy. No apologies. Every employee
                    lives this rule — from the first bun to the last sauce drop.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section className="relative z-10 py-14 px-4 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-heading text-[10px] tracking-[0.4em] text-primary/50 uppercase mb-2">What We Stand For</p>
                <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight">
                  Brand <span className="text-primary">Pillars</span>
                </h2>
              </div>
              <Flame className="w-8 h-8 text-secondary opacity-50 hidden md:block" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  tag: "Premium Craft",
                  title: "Gourmet Swagger",
                  desc: "High-end ingredients meet unapologetic street energy. We source real beef, build real flavors, and stack every dawg with intention.",
                },
                {
                  icon: Target,
                  tag: "Southern Soul",
                  title: "Southern Certified",
                  desc: "Bold, rich flavors from the dirty south, the streets of Nashville, and everywhere in between. Our flavor DNA runs generations deep.",
                },
                {
                  icon: Shield,
                  tag: "Every. Single. Time.",
                  title: "Loud & Confident",
                  desc: "A brand that demands attention and backs it up at every single bite. We don't coast. We don't settle. We finish what we start.",
                },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative p-7 border border-white/[0.05] hover:border-primary/35 transition-all duration-500 group overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,162,39,0.07) 0%, transparent 70%)" }} />
                  <p className="font-heading text-[9px] tracking-[0.4em] text-primary/40 uppercase mb-4">{p.tag}</p>
                  <p.icon className="w-7 h-7 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-3">{p.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROADMAP ── */}
        <section className="relative z-10 py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-heading text-[10px] tracking-[0.4em] text-primary/50 uppercase mb-2">Think Like a Boss</p>
                <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight flex items-center gap-4">
                  The Blueprint <TrendingUp className="w-8 h-8 text-primary" />
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  year: "Year 1",
                  title: "Establish the Base",
                  desc: "Food truck + pop-ups. Lock down the brand. Build a cult following at breweries, car shows, college events, and high school football.",
                  items: ["Flagship truck launch", "Brand identity locked", "Cult following built"],
                  color: "text-primary",
                  borderColor: "border-primary/30",
                },
                {
                  year: "Year 2",
                  title: "Expand the Empire",
                  desc: "Second truck or trailer. Catering contracts. Limited sauce retail. Merch line generating buzz and brand loyalty.",
                  items: ["Second location", "Catering contracts", "Merch + sauce retail"],
                  color: "text-secondary",
                  borderColor: "border-secondary/30",
                },
                {
                  year: "Year 3",
                  title: "Take Over",
                  desc: "Brick & mortar or franchisable model. Regional dominance. Branded frozen or packaged dawgs in retail channels.",
                  items: ["Brick & mortar", "Franchise model", "Retail distribution"],
                  color: "text-white",
                  borderColor: "border-white/20",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  data-testid={`card-roadmap-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`relative p-7 border ${step.borderColor} overflow-hidden group hover:border-primary/50 transition-all duration-500`}
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 70%)" }} />
                  <p className={`font-heading text-[10px] tracking-[0.4em] uppercase mb-2 ${step.color} opacity-70`}>{step.year}</p>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-3">{step.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed mb-5">{step.desc}</p>
                  <ul className="space-y-1.5">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs font-heading tracking-widest text-white/25 uppercase">
                        <span className={`w-1 h-1 rounded-full ${i === 0 ? "bg-primary" : i === 1 ? "bg-secondary" : "bg-white/40"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Bottom manifesto */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 p-8 border border-white/[0.05] text-center"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <p className="font-heading text-[10px] tracking-[0.4em] text-primary/40 uppercase mb-3">The Bawse Manifesto</p>
              <p className="font-display text-3xl md:text-4xl text-white leading-tight">
                "Every Dawg a <span className="text-primary">Bawse.</span>"
              </p>
              <p className="text-white/25 text-sm font-sans mt-4 max-w-xl mx-auto leading-relaxed">
                From the first truck to the thousandth franchise — the standard never drops. 
                Street food with boss energy. Built different. Built to last.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

import { PageTransition } from "@/components/layout/PageTransition";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const STARS = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100),
  y: ((i * 97.33) % 100),
  size: i % 5 === 0 ? 2 : 1.2,
  opacity: 0.05 + (i % 6) * 0.025,
  color: i % 4 === 0 ? "#c9a227" : i % 4 === 1 ? "#cc0000" : "#f5c542",
}));

const BG: React.CSSProperties = { background: "#07060a" };

export default function OrderSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const orderType = params.get("order_type") || "pickup";

  return (
    <PageTransition>
      <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 py-20" style={BG}>
        <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.07] z-0" aria-hidden>
          <filter id="grain-success">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-success)"/>
        </svg>
        <div className="fixed inset-0 pointer-events-none z-0">
          {STARS.map(({ id, x, y, size, opacity, color }) => (
            <div key={id} className="absolute rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity }} />
          ))}
        </div>
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(201,162,39,0.09) 0%, transparent 65%)",
        }} />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <CheckCircle2
              className="w-24 h-24 text-primary mb-6 mx-auto"
              style={{ filter: "drop-shadow(0 0 20px rgba(201,162,39,0.4))" }}
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl mb-3 uppercase tracking-tight"
            style={{ textShadow: "0 0 40px rgba(201,162,39,0.25)" }}
          >
            ORDER SECURED
          </motion.h1>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base font-heading text-white/30 uppercase tracking-widest mb-10"
          >
            Your {orderType} is locked in. BAWSE-level execution incoming.
          </motion.p>

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="shimmer-btn px-10 py-4 rounded-sm flex items-center justify-center gap-2"
            >
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

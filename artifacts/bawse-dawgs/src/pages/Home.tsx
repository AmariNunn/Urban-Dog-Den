import { PageTransition } from "@/components/layout/PageTransition";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black text-center px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-50" />
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-spark"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={import.meta.env.BASE_URL + "bawse-dawgs-logo.png"} 
            alt="Bawse Dawgs Logo" 
            className="w-64 md:w-96 mb-8 drop-shadow-[0_0_30px_rgba(212,160,23,0.3)]"
          />
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none mb-6"
          >
            STREET DAWGS <br/>
            <span className="text-primary">DONE DIFFERENT</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-3xl text-gray-300 font-heading font-light tracking-wide mb-12 uppercase"
          >
            Just a Good Ol' Dawg. Boss-level execution.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/order" data-testid="button-order-now" className="shimmer-btn px-12 py-5 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3">
              Order Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/menu" data-testid="button-view-menu" className="shimmer-btn-red px-12 py-5 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3">
              View Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-24 bg-[#111] relative z-10 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl mb-4"><span className="text-primary">100% Beef.</span> No Fillers.</h2>
            <p className="text-2xl font-heading text-muted-foreground uppercase tracking-widest">No Shortcuts. Just Flavor.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Gourmet Swagger", desc: "Premium ingredients built with street attitude. We don't do basic.", icon: Flame },
              { title: "Street Certified", desc: "Southern-inspired flavors that hit hard and leave you wanting another round.", icon: ArrowRight },
              { title: "Loud & Confident", desc: "We serve fast, we serve loud, and every dawg leaves the kitchen perfect.", icon: Flame }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#1a1a1a] p-8 border border-white/5 hover:border-primary/50 transition-colors group"
              >
                <pillar.icon className="w-12 h-12 text-secondary mb-6 group-hover:text-primary transition-colors" />
                <h3 className="font-display text-3xl mb-4 tracking-wide">{pillar.title}</h3>
                <p className="text-gray-400 font-sans leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="py-8 bg-primary overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 items-center text-black font-display text-4xl tracking-widest uppercase">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              THE BAWSE RULE: EVERY DAWG PERFECT <Flame className="w-8 h-8" />
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
          animation: marquee 20s linear infinite;
          width: max-content;
        }
      `}</style>
    </PageTransition>
  );
}

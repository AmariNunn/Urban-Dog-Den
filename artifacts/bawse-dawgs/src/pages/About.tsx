import { PageTransition } from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Zap, Target } from "lucide-react";

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80" />
          
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <motion.img 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              src={import.meta.env.BASE_URL + "bawse-dawgs-logo.png"} 
              alt="Bawse Dawgs" 
              className="w-48 md:w-64 mx-auto mb-8 opacity-80 hover:opacity-100 transition-opacity"
            />
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter mb-6"
            >
              FROM THE STREETS <br/><span className="text-primary">TO THE GRILL</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-xl md:text-2xl text-gray-400 tracking-widest uppercase"
            >
              We're not just selling hot dogs. We're serving a lifestyle.
            </motion.p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-24 bg-[#111]">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 font-sans text-lg text-gray-300 leading-relaxed text-center"
            >
              <p>
                <span className="text-primary font-bold">Bawse Dawgs</span> isn't just another hot dog stand; it's a statement. Born from the hustle and flavor of the streets, we bring boss-level execution to an American classic. We don't cut corners. We don't do basic. Every dawg is 100% beef, loaded with premium, scratch-made toppings, and crafted to perfection.
              </p>
              <p>
                We believe that street food should feel like a luxury experience—bold, unapologetic, and unforgettable. From our custom-blended Bawse Sauce to our perfectly butter-toasted buns, every detail matters.
              </p>
              <div className="p-8 border border-primary/30 bg-black/50 mt-12 relative">
                <Shield className="absolute -top-6 -left-6 w-12 h-12 text-primary bg-black p-2 rounded-full border border-primary/30" />
                <h3 className="font-display text-4xl text-white mb-4 uppercase tracking-wide">The Bawse Rule</h3>
                <p className="font-heading text-2xl text-primary tracking-widest uppercase">
                  "We serve fast, we serve loud, and every dawg leaves perfect."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-24 border-y border-white/10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-display text-5xl md:text-6xl text-center mb-16 uppercase tracking-wider text-white">Brand Pillars</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Gourmet Swagger", desc: "High-end ingredients meet unapologetic street energy.", icon: Zap },
                { title: "Southern Certified", desc: "Bold, rich flavors inspired by the dirty south.", icon: Target },
                { title: "Loud & Confident", desc: "A brand that demands attention and backs it up with taste.", icon: Shield }
              ].map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#1a1a1a] p-8 border border-white/5 hover:border-primary/50 transition-colors text-center group"
                >
                  <pillar.icon className="w-12 h-12 text-secondary mx-auto mb-6 group-hover:text-primary transition-colors" />
                  <h3 className="font-display text-3xl mb-4 text-white uppercase tracking-wide">{pillar.title}</h3>
                  <p className="text-gray-400">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/10 via-black to-black">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-5xl md:text-6xl text-center mb-16 uppercase tracking-wider text-white flex items-center justify-center gap-4">
              The Blueprint <TrendingUp className="w-10 h-10 text-primary" />
            </h2>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {[
                { year: "Year 1", title: "Establish the Base", desc: "Launch flagship location, build core audience, perfect the operation." },
                { year: "Year 2", title: "Expand the Empire", desc: "Open 2 additional locations, launch catering wing and merch line." },
                { year: "Year 3", title: "Take Over", desc: "Franchise model rollout, regional dominance, retail sauce distribution." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  data-testid={`card-roadmap-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-primary text-black font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(0,0,0,1)] z-10">
                    {idx + 1}
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-[#111] border border-white/10 hover:border-primary/40 transition-colors">
                    <span className="font-heading text-primary uppercase tracking-widest mb-2 block">{step.year}</span>
                    <h3 className="font-display text-3xl text-white mb-2 uppercase tracking-wide">{step.title}</h3>
                    <p className="text-gray-400 font-sans">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

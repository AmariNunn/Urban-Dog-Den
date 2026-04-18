import { PageTransition } from "@/components/layout/PageTransition";
import { useCart } from "@/context/CartContext";
import { Flame, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100),
  y: ((i * 97.33) % 100),
  size: i % 5 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
  opacity: 0.05 + (i % 7) * 0.03,
  color: i % 4 === 0 ? "#c9a227" : i % 4 === 1 ? "#cc0000" : "#f5c542",
}));

const MENU_DATA = [
  {
    category: "SIGNATURE DAWGS",
    subtitle: "Chef-Driven. Built to Stand Out.",
    tag: "Premium",
    items: [
      { id: "bawse", name: "The Bawse Dawg", desc: "Brisket sausage, chili, slaw, cheese, onions, Bawse Sauce", price: 13, spicy: false, crown: true },
      { id: "dirty", name: "Dirty South Dawg", desc: "Chili, pimento cheese, bacon crumble, jalapeños", price: 12, spicy: false },
      { id: "carolina", name: "Carolina Heat", desc: "Mustard, chili, slaw, pickled onions", price: 11, spicy: true },
      { id: "corn", name: "Street Corn Dawg", desc: "Elote-style: lime crema, cotija, tajin", price: 12, spicy: false },
      { id: "nashville", name: "Nashville Dawg", desc: "Hot oil glaze, pickles, slaw, comeback sauce", price: 12, spicy: true },
    ],
  },
  {
    category: "CLASSIC DAWGS",
    subtitle: "Simple. Done Right.",
    tag: "Classic",
    items: [
      { id: "plain", name: "Plain Jane", desc: "Mustard, ketchup, relish", price: 9, spicy: false },
      { id: "big", name: "Big Dawg", desc: "Chili, slaw, cheese", price: 11, spicy: false },
    ],
  },
  {
    category: "BUILD YOUR OWN",
    subtitle: "Pick any toppings. Make it Bawse.",
    tag: "$10 Base",
    items: [
      { id: "byo", name: "Build Your Own Dawg", desc: "Bawse Dawg base + your choice of toppings. Chili, Slaw, Onions, Grilled Onions & Peppers, Jalapeños, Cheese, Pimento Cheese, Bacon, Bawse Sauce (BBQ), Spicy Jerk Sauce — $0.50–$1.50 each", price: 10, spicy: false },
    ],
  },
  {
    category: "LOADED FRIES",
    subtitle: "Big Flavor. Zero Regrets.",
    tag: "Sides",
    items: [
      { id: "bawse_fries", name: "Bawse Fries", desc: "Cheese, bacon, Bawse sauce", price: 9, spicy: false, crown: true },
      { id: "chili_fries", name: "Chili Cheese Fries", desc: "Chili, cheese", price: 9, spicy: false },
      { id: "elote_fries", name: "Elote Fries", desc: "Cotija, lime crema, tajin", price: 9, spicy: false },
    ],
  },
  {
    category: "SIDES & DRINKS",
    subtitle: "Complete the Mission.",
    tag: "Add-ons",
    items: [
      { id: "fries", name: "Fries", desc: "Crispy, golden, and perfect", price: 5, spicy: false },
      { id: "chips", name: "Grippo's Chips", desc: "The real BBQ chip", price: 3, spicy: false },
      { id: "pie", name: "Mini Sweet Potato Pie", desc: "Made with love", price: 5, spicy: false },
      { id: "drink", name: "Cold Drinks", desc: "Assorted soda & water", price: 3, spicy: false },
    ],
  },
];

export default function Menu() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addItem({ name: item.name, price: item.price, quantity: 1, instructions: "", options: [] });
    toast({
      title: "Added to Order",
      description: `${item.name} has been added.`,
      className: "bg-primary text-black border-none font-heading uppercase",
      duration: 2000,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative" style={{ background: "#07060a" }}>

        {/* Grain */}
        <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.07] z-0" aria-hidden>
          <filter id="grain-menu">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-menu)"/>
        </svg>

        {/* Star dots */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {STARS.map(({ id, x, y, size, opacity, color }) => (
            <div key={id} className="absolute rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity }} />
          ))}
        </div>

        {/* Radial gradient */}
        <div className="fixed inset-0 pointer-events-none z-0" style={{
          background: [
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,162,39,0.10) 0%, transparent 65%)",
            "radial-gradient(ellipse 40% 30% at 100% 50%, rgba(204,0,0,0.07) 0%, transparent 60%)",
          ].join(", ")
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-16">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="font-heading text-[10px] tracking-[0.45em] text-primary/60 uppercase">No Shortcuts, Just Flavor.</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

          {/* Combo callout bar */}
          <div className="mb-10 px-6 py-4 border border-secondary/30 flex flex-wrap items-center justify-between gap-4"
            style={{ background: "rgba(204,0,0,0.06)" }}>
            <div>
              <span className="font-display text-xl text-secondary tracking-wide">MAKE ANY DAWG A COMBO</span>
            </div>
            <span className="font-display text-3xl text-secondary">+$5</span>
          </div>

          {/* Menu sections */}
          <div className="space-y-14">
            {MENU_DATA.map((section, sIdx) => (
              <motion.section
                key={section.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                {/* Section header */}
                <div className="flex items-end justify-between mb-5 pb-3 border-b border-white/[0.07]">
                  <div>
                    <span className="font-heading text-[9px] tracking-[0.4em] text-primary/40 uppercase block mb-1">{section.tag}</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary tracking-wide">{section.category}</h2>
                    <p className="font-heading text-xs text-white/25 uppercase tracking-widest mt-1">{section.subtitle}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {section.items.map((item: any, iIdx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: iIdx * 0.07 }}
                      className="group border border-white/[0.05] hover:border-primary/40 transition-all duration-300 overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        boxShadow: "0 0 0 0 rgba(201,162,39,0)",
                      }}
                      whileHover={{ boxShadow: "0 0 20px rgba(201,162,39,0.08)" } as any}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-1.5">
                          <h3 className="font-display text-xl tracking-wide flex items-center gap-2 text-white">
                            {item.crown && <span className="text-primary">👑</span>}
                            {item.spicy && <Flame className="w-4 h-4 text-secondary flex-shrink-0" />}
                            {item.name}
                          </h3>
                          <span className="font-heading text-lg text-primary ml-4 flex-shrink-0">${item.price}</span>
                        </div>
                        <p className="text-white/30 font-sans text-xs leading-relaxed mb-4">{item.desc}</p>

                        <button
                          onClick={() => handleAddToCart(item)}
                          data-testid={`button-add-to-order-${item.id}`}
                          className="w-full py-2.5 border border-white/[0.07] group-hover:border-primary group-hover:bg-primary group-hover:text-black text-white/50 group-hover:text-black font-heading uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add to Order
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

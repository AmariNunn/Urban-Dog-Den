import { PageTransition } from "@/components/layout/PageTransition";
import { useCart } from "@/context/CartContext";
import { Flame, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const MENU_DATA = [
  {
    category: "SIGNATURE DAWGS",
    subtitle: "Chef-Driven. Built to Stand Out.",
    items: [
      { id: "bawse", name: "The Bawse Dawg", desc: "Brisket sausage, chili, slaw, cheese, onions, Bawse Sauce", price: 13, spicy: false },
      { id: "dirty", name: "Dirty South Dawg", desc: "Chili, pimento cheese, bacon crumble, jalapeños", price: 12, spicy: false },
      { id: "carolina", name: "Carolina Heat", desc: "Mustard, chili, slaw, pickled onions", price: 11, spicy: true },
      { id: "corn", name: "Street Corn Dawg", desc: "Elote-style: lime crema, cotija, tajin", price: 12, spicy: false },
      { id: "nashville", name: "Nashville Dawg", desc: "Hot oil glaze, pickles, slaw, comeback sauce", price: 12, spicy: true },
    ]
  },
  {
    category: "CLASSIC DAWGS",
    subtitle: "Simple. Done Right.",
    items: [
      { id: "plain", name: "Plain Jane", desc: "Mustard, ketchup, relish", price: 9, spicy: false },
      { id: "big", name: "Big Dawg", desc: "Chili, slaw, cheese", price: 11, spicy: false },
    ]
  },
  {
    category: "LOADED FRIES",
    subtitle: "Big Flavor. Zero Regrets.",
    items: [
      { id: "bawse_fries", name: "Bawse Fries", desc: "Cheese, bacon, Bawse sauce", price: 9, spicy: false },
      { id: "chili_fries", name: "Chili Cheese Fries", desc: "Chili, cheese", price: 9, spicy: false },
      { id: "elote_fries", name: "Elote Fries", desc: "Cotija, lime crema, tajin", price: 9, spicy: false },
      { id: "dirty_fries", name: "Dirty Fries", desc: "Chili, cheese, jalapeños, onions", price: 10, spicy: true },
    ]
  },
  {
    category: "SIDES & DRINKS",
    subtitle: "Complete the Mission.",
    items: [
      { id: "fries", name: "Fries", desc: "Crispy perfection", price: 5, spicy: false },
      { id: "chips", name: "Grippo's Chips", desc: "BBQ chips", price: 3, spicy: false },
      { id: "pie", name: "Mini Sweet Potato Pie", desc: "Made with Love", price: 5, spicy: false },
      { id: "drink", name: "Cold Drinks", desc: "Assorted soda & water", price: 3, spicy: false },
    ]
  }
];

export default function Menu() {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: any) => {
    addItem({
      name: item.name,
      price: item.price,
      quantity: 1,
      instructions: "",
      options: []
    });
    
    toast({
      title: "Added to Order",
      description: `${item.name} has been added.`,
      className: "bg-primary text-black border-none font-heading uppercase",
      duration: 2000,
    });
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
        <div className="text-center mb-16">
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-tighter mb-4">THE <span className="text-primary">MENU</span></h1>
          <p className="font-heading text-xl text-muted-foreground uppercase tracking-widest">No shortcuts. Just flavor.</p>
        </div>

        <div className="space-y-24">
          {MENU_DATA.map((section, sIdx) => (
            <motion.section 
              key={section.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-8 border-b-2 border-primary/30 pb-4">
                <h2 className="font-display text-4xl md:text-5xl text-primary tracking-wide">{section.category}</h2>
                <p className="font-heading text-lg text-gray-400 uppercase tracking-widest mt-1">{section.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((item, iIdx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: iIdx * 0.1 }}
                    className="group bg-[#111] border border-white/5 hover:border-primary/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,160,23,0.15)]"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display text-2xl tracking-wide flex items-center gap-2">
                          {item.name}
                          {item.spicy && <Flame className="w-5 h-5 text-secondary" />}
                        </h3>
                        <span className="font-heading text-xl text-primary">${item.price}</span>
                      </div>
                      <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
                        {item.desc}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      data-testid={`button-add-to-order-${item.id}`}
                      className="w-full py-3 bg-white/5 hover:bg-primary text-white hover:text-black font-heading uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-black"
                    >
                      <Plus className="w-4 h-4" /> Add to Order
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

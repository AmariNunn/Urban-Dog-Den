import { PageTransition } from "@/components/layout/PageTransition";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const STARS = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: ((i * 137.508) % 100),
  y: ((i * 97.33) % 100),
  size: i % 5 === 0 ? 2 : 1.2,
  opacity: 0.05 + (i % 6) * 0.025,
  color: i % 4 === 0 ? "#c9a227" : i % 4 === 1 ? "#cc0000" : "#f5c542",
}));

const BG: React.CSSProperties = { background: "#07060a" };

export default function Order() {
  const { items, updateQuantity, updateInstructions, removeItem, subtotal, clearCart } = useCart();
  const [orderType, setOrderType] = useState("pickup");
  const [isPlaced, setIsPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    setTimeout(() => clearCart(), 500);
  };

  const Overlay = () => (
    <>
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.07] z-0" aria-hidden>
        <filter id="grain-order">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-order)"/>
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
    </>
  );

  if (isPlaced) {
    return (
      <PageTransition>
        <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 py-20" style={BG}>
          <Overlay />
          <div className="relative z-10">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <CheckCircle2 className="w-24 h-24 text-primary mb-6 mx-auto" style={{ filter: "drop-shadow(0 0 20px rgba(201,162,39,0.4))" }} />
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-7xl mb-3 uppercase tracking-tight" style={{ textShadow: "0 0 40px rgba(201,162,39,0.25)" }}>
              ORDER SECURED
            </motion.h1>
            <motion.p initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-base font-heading text-white/30 uppercase tracking-widest mb-10">
              Your {orderType} is locked in. BAWSE-level execution incoming.
            </motion.p>
            <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link href="/" data-testid="button-back-to-home"
                className="shimmer-btn px-10 py-4 rounded-sm flex items-center justify-center gap-2"
                onClick={() => setIsPlaced(false)}>
                Back to Home <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 py-20" style={BG}>
          <Overlay />
          <div className="relative z-10">
            <ShoppingBag className="w-16 h-16 text-white/10 mb-6 mx-auto" />
            <h1 className="font-display text-5xl md:text-7xl mb-3 uppercase tracking-tight text-white">
              Cart is <span className="text-primary">Empty</span>
            </h1>
            <p className="text-sm font-heading text-white/25 uppercase tracking-widest mb-10">
              Time to secure the bag.
            </p>
            <Link href="/menu" data-testid="button-view-menu-empty-cart"
              className="shimmer-btn px-10 py-4 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3">
              View Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const tax = subtotal * 0.08;
  const deliveryFee = orderType === "delivery" ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  return (
    <PageTransition>
      <div className="min-h-screen relative" style={BG}>
        <Overlay />

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-10 pb-16">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/[0.07]">
            <h1 className="font-display text-4xl md:text-5xl text-white tracking-tighter">
              YOUR <span className="text-primary">ORDER</span>
            </h1>
            <span className="ml-auto font-heading text-xs tracking-widest text-white/20 uppercase">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.97 }}
                    className="border border-white/[0.05] hover:border-primary/25 transition-all duration-300 group overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="p-5 flex flex-col sm:flex-row gap-5">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-display text-xl tracking-wide uppercase text-white">{item.name}</h3>
                          <span className="font-heading text-lg text-primary ml-4 flex-shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <Label className="text-[9px] text-white/20 uppercase tracking-widest mb-1.5 block">
                            Special Instructions
                          </Label>
                          <Input
                            value={item.instructions}
                            onChange={(e) => updateInstructions(item.id, e.target.value)}
                            placeholder="No onions, extra sauce, etc."
                            className="bg-transparent border-white/[0.07] focus:border-primary/50 rounded-none font-sans text-sm text-white/60 placeholder:text-white/15 h-9"
                          />
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-3 sm:pt-0 sm:pl-5 min-w-[100px]">
                        <div className="flex items-center gap-3 border border-white/[0.07]">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`button-decrease-qty-${item.id}`}
                            className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-colors">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-heading text-base w-4 text-center text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-increase-qty-${item.id}`}
                            className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-colors">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                          data-testid={`button-remove-${item.id}`}
                          className="text-white/20 hover:text-secondary transition-colors text-[9px] uppercase tracking-widest flex items-center gap-1 font-heading">
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-1">
              <div className="border border-white/[0.06] p-6 sticky top-24" style={{ background: "rgba(255,255,255,0.025)" }}>
                <h3 className="font-display text-2xl tracking-wide uppercase mb-5 pb-4 border-b border-white/[0.07] text-white">
                  Summary
                </h3>

                <div className="space-y-5 mb-6">
                  <div>
                    <Label className="text-[9px] text-white/25 uppercase tracking-widest mb-3 block">Order Type</Label>
                    <RadioGroup value={orderType} onValueChange={setOrderType} className="grid grid-cols-2 gap-2">
                      {["pickup", "delivery"].map((type) => (
                        <div key={type}
                          data-testid={`radio-${type}`}
                          className={`border p-3 text-center cursor-pointer transition-all duration-200 ${orderType === type ? "border-primary text-primary bg-primary/5" : "border-white/[0.07] text-white/30 hover:border-white/20"}`}
                          onClick={() => setOrderType(type)}>
                          <RadioGroupItem value={type} id={type} className="sr-only" />
                          <Label htmlFor={type} className="font-heading uppercase tracking-widest cursor-pointer text-xs">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2 font-heading text-xs tracking-widest border-t border-white/[0.06] pt-4">
                    <div className="flex justify-between text-white/25 uppercase">
                      <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/25 uppercase">
                      <span>Tax</span><span>${tax.toFixed(2)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between text-white/25 uppercase">
                        <span>Delivery</span><span>${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white pt-3 border-t border-white/[0.06] font-heading text-base">
                      <span>Total</span>
                      <span className="text-primary" style={{ textShadow: "0 0 12px rgba(201,162,39,0.3)" }}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  data-testid="button-place-order"
                  className="w-full shimmer-btn py-4 uppercase tracking-widest font-bold"
                >
                  Place Order
                </button>

                <p className="text-center text-[9px] text-white/15 font-heading tracking-widest uppercase mt-4">
                  BAWSE-level execution guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

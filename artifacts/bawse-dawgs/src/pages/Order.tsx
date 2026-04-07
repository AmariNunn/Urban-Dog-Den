import { PageTransition } from "@/components/layout/PageTransition";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Order() {
  const { items, updateQuantity, updateInstructions, removeItem, subtotal, clearCart } = useCart();
  const [orderType, setOrderType] = useState("pickup");
  const [isPlaced, setIsPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (isPlaced) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <CheckCircle2 className="w-32 h-32 text-primary mb-8 mx-auto" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-7xl mb-4 uppercase tracking-wider"
          >
            ORDER SECURED
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-heading text-muted-foreground uppercase tracking-widest mb-12"
          >
            Your {orderType} is locked in. Boss level execution incoming.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/" data-testid="button-back-to-home" className="shimmer-btn px-8 py-4 rounded-sm flex items-center justify-center gap-2" onClick={() => setIsPlaced(false)}>
              Back to Home <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
          <ShoppingBag className="w-24 h-24 text-muted mb-8" />
          <h1 className="font-display text-5xl md:text-7xl mb-4 uppercase tracking-wider text-white">Cart is Empty</h1>
          <p className="text-xl font-heading text-muted-foreground uppercase tracking-widest mb-12">
            Time to secure the bag.
          </p>
          <Link href="/menu" data-testid="button-view-menu-empty-cart" className="shimmer-btn px-12 py-4 rounded-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3">
            View Menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </PageTransition>
    );
  }

  const tax = subtotal * 0.08;
  const deliveryFee = orderType === "delivery" ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
        <h1 className="font-display text-6xl text-primary tracking-tighter mb-12 border-b-2 border-primary/20 pb-4">YOUR ORDER</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  className="bg-[#111] border border-white/5 p-6 flex flex-col sm:flex-row gap-6 relative group"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-2xl tracking-wide uppercase">{item.name}</h3>
                      <span className="font-heading text-xl text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div className="mt-4">
                      <Label className="text-xs text-muted-foreground uppercase tracking-widest mb-2 block">Special Instructions</Label>
                      <Input 
                        value={item.instructions}
                        onChange={(e) => updateInstructions(item.id, e.target.value)}
                        placeholder="No onions, extra sauce, etc."
                        className="bg-black/50 border-white/10 focus:border-primary rounded-none font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 min-w-[120px]">
                    <div className="flex items-center gap-4 bg-black p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`button-decrease-qty-${item.id}`}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-heading text-xl w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`button-increase-qty-${item.id}`}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      data-testid={`button-remove-${item.id}`}
                      className="text-muted-foreground hover:text-destructive transition-colors text-sm uppercase tracking-widest flex items-center gap-1 font-heading"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-white/5 p-6 sticky top-28">
              <h3 className="font-display text-2xl tracking-wide uppercase mb-6 pb-4 border-b border-white/10">Summary</h3>
              
              <div className="space-y-6 mb-8">
                <div className="space-y-4">
                  <Label className="text-sm text-muted-foreground uppercase tracking-widest">Order Type</Label>
                  <RadioGroup value={orderType} onValueChange={setOrderType} className="grid grid-cols-2 gap-4">
                    <div data-testid="radio-pickup" className={`border p-4 text-center cursor-pointer transition-colors ${orderType === 'pickup' ? 'border-primary text-primary bg-primary/5' : 'border-white/10 text-white hover:border-white/30'}`} onClick={() => setOrderType('pickup')}>
                      <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
                      <Label htmlFor="pickup" className="font-heading uppercase tracking-widest cursor-pointer text-base">Pickup</Label>
                    </div>
                    <div data-testid="radio-delivery" className={`border p-4 text-center cursor-pointer transition-colors ${orderType === 'delivery' ? 'border-primary text-primary bg-primary/5' : 'border-white/10 text-white hover:border-white/30'}`} onClick={() => setOrderType('delivery')}>
                      <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                      <Label htmlFor="delivery" className="font-heading uppercase tracking-widest cursor-pointer text-base">Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3 font-heading tracking-widest border-t border-white/10 pt-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {orderType === "delivery" && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl text-white pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
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
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

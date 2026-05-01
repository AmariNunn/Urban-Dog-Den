import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/menu", label: "MENU" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50 h-full" data-testid="link-home">
          <img src={import.meta.env.BASE_URL + "bawse-dawgs-logo-new2.png"} alt="Bawse Dawgs" className="h-[51px] w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`} className={`font-heading text-lg uppercase tracking-wider transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-white"}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/order" data-testid="link-cart" className="relative flex items-center justify-center bg-primary text-black w-12 h-12 rounded-full hover:bg-primary/90 transition-all hover:scale-105">
            <ShoppingCart className="w-6 h-6" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <Link href="/order" data-testid="link-mobile-cart" className="relative flex items-center justify-center text-white p-2">
            <ShoppingCart className="w-6 h-6" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} data-testid="button-toggle-menu" className="text-white p-2" aria-label="Toggle Menu">
            {isOpen ? <X className="w-8 h-8 text-primary" /> : <MenuIcon className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 pt-20"
          >
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase()}`} className={`font-display text-5xl uppercase tracking-widest ${location === link.href ? "text-primary" : "text-white"}`}>
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

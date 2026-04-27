import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-primary/20 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        <h3 className="font-display text-3xl text-primary tracking-widest mb-8">Good Dawgs. Done Different.</h3>
        
        <div className="flex gap-6 mb-12">
          <Link href="/" data-testid="link-footer-home" className="text-sm font-heading tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">Home</Link>
          <Link href="/menu" data-testid="link-footer-menu" className="text-sm font-heading tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">Menu</Link>
          <Link href="/about" data-testid="link-footer-about" className="text-sm font-heading tracking-widest text-muted-foreground hover:text-white transition-colors uppercase">About</Link>
          <Link href="/order" data-testid="link-footer-order" className="text-sm font-heading tracking-widest text-primary hover:text-white transition-colors uppercase">Order Now</Link>
        </div>
        
        <div className="text-xs text-muted-foreground/50 border-t border-white/5 pt-8 w-full">
          &copy; {new Date().getFullYear()} Bawse Dawgs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

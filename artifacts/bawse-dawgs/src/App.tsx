import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Order from "@/pages/Order";
import About from "@/pages/About";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col bg-grain font-sans">
      <Navbar />
      <main className="flex-1 w-full relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/order" component={Order} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppContent />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;

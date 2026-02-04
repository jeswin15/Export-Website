import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Products from "@/pages/products";
import Admin from "@/pages/admin";
import Licenses from "@/pages/licenses";
import Contact from "@/pages/contact";
import Quote from "@/pages/quote";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/admin" component={Admin} />
          <Route path="/licenses" component={Licenses} />
          <Route path="/contact" component={Contact} />
          <Route path="/quote" component={Quote} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

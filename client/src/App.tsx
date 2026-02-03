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
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

function App() {
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
      <Toaster />
    </div>
  );
}

export default App;

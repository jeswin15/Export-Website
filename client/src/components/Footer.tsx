import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-secondary/30">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Goodwill Global Exports" className="h-8 w-auto" />
              <span className="font-serif text-xl font-bold text-primary">
                Goodwill Global
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium B2B export solutions connecting international markets with quality raw food products from Goodwill Global Exports.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/"><a className="hover:text-primary transition-colors">Home</a></Link></li>
              <li><Link href="/about"><a className="hover:text-primary transition-colors">About Us</a></Link></li>
              <li><Link href="/products"><a className="hover:text-primary transition-colors">Products</a></Link></li>
              <li><Link href="/licenses"><a className="hover:text-primary transition-colors">Licenses</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Products</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products"><a className="hover:text-primary transition-colors">Premium Spices</a></Link></li>
              <li><Link href="/products"><a className="hover:text-primary transition-colors">Organic Grains</a></Link></li>
              <li><Link href="/products"><a className="hover:text-primary transition-colors">Seasonal Fruits</a></Link></li>
              <li><Link href="/products"><a className="hover:text-primary transition-colors">Export Quality Nuts</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Trade Center, Business District</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@goodwillglobal.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p>&copy; {new Date().getFullYear()} Goodwill Global Exports Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

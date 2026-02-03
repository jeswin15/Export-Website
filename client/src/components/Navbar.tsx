import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Licenses", path: "/licenses" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <a className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              GlobalExport
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === item.path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex">
          <Link href="/contact">
            <Button variant="default" size="sm" className="bg-primary text-white hover:bg-primary/90">
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location === item.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              <Link href="/contact">
                <Button className="w-full mt-4" onClick={() => setIsOpen(false)}>
                  Get a Quote
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

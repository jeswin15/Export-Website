import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Package, Truck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl space-y-6"
            >
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Connecting World Markets with <span className="text-accent italic">Premium Quality</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
                Your trusted partner in international B2B food trade. We source and export the finest raw ingredients directly to your business.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/products">
                  <Button size="lg" className="h-12 bg-accent px-8 text-base font-medium text-white hover:bg-accent/90">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 border-white px-8 text-base font-medium text-white hover:bg-white hover:text-primary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary md:text-4xl">Why Choose Us</h2>
            <p className="mt-4 text-muted-foreground">Excellence in every step of the supply chain</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Package,
                title: "Premium Quality",
                description: "Rigorous quality checks ensure only the best products reach your destination."
              },
              {
                icon: Truck,
                title: "Global Logistics",
                description: "Efficient shipping networks to deliver products safely and on time, anywhere."
              },
              {
                icon: Globe,
                title: "International Standards",
                description: "Fully certified and compliant with global export regulations and standards."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">Ready to Start Trading?</h2>
              <p className="text-primary-foreground/80">Get in touch with our export specialists for a custom quote.</p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

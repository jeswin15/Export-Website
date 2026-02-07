import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Package, Truck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect for background

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image with Overlay - Parallax */}
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/hero-bg.png")',
            y: yBg
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5, textShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="cursor-default"
              >
                <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Connecting World Markets with <span className="text-accent italic">Premium Quality</span>
                </h1>
              </motion.div>

              <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
                Your trusted partner in international B2B food trade. We source and export the finest raw ingredients directly to your business.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/products">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="h-12 bg-accent px-8 text-base font-medium text-white hover:bg-accent/90">
                      Explore Products
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="h-12 border-white px-8 text-base font-medium text-white hover:bg-white hover:text-primary">
                      Contact Us
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />

        <div className="container px-4 md:px-6 relative z-10">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden bg-white p-8 shadow-sm transition-all hover:shadow-xl rounded-xl border border-transparent hover:border-primary/10"
              >
                <motion.div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: idx, ease: "easeInOut" }}
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="mb-2 text-xl font-bold text-primary">{feature.title}</h3>
                <p className="text-muted-foreground group-hover:text-gray-600 transition-colors">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="font-serif text-3xl font-bold md:text-4xl">Ready to Start Trading?</h2>
              <p className="text-primary-foreground/80">Get in touch with our export specialists for a custom quote.</p>
            </div>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8">
                  Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

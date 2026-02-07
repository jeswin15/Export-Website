import { motion } from "framer-motion";
import { BadgeCheck, Target, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-secondary/30 py-16 md:py-24">
        <div className="container px-4 text-center md:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl font-bold tracking-tight text-primary md:text-5xl"
          >
            Our Story
          </motion.h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A legacy of trust, quality, and global partnerships in the food export industry.
          </p>
        </div>
      </div>

      <div className="container px-4 py-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl font-bold text-primary">Global Reach, Local Roots</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Founded with a vision to bridge the gap between premium local producers and international markets, GlobalExport has grown into a leading name in the B2B food export sector.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We specialize in sourcing high-quality spices, grains, and seasonal produce directly from certified farms. Our rigorous quality control ensures that our clients receive products that meet international standards of excellence.
            </p>

            <div className="grid gap-6 pt-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Target className="h-5 w-5 text-accent" />
                  <h3>Our Mission</h3>
                </div>
                <p className="text-sm text-muted-foreground">To deliver the finest raw food products globally while empowering sustainable farming practices.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <h3>Our Vision</h3>
                </div>
                <p className="text-sm text-muted-foreground">To become the most trusted global partner in the agricultural supply chain.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-none bg-muted md:aspect-[4/3]"
          >
            <img
              src="/images/about-bg.png"
              alt="Warehouse Interior"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-y border-border py-12 md:grid-cols-4">
          {[
            { label: "Countries Served", value: "25+" },
            { label: "Partner Farms", value: "100+" },
            { label: "Years Experience", value: "15" },
            { label: "Tons Exported", value: "50k+" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="font-serif text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

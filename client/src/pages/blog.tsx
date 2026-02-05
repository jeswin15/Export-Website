import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  // Static mock data for initial view
  const blogs = [
    {
      id: 1,
      title: "The Future of Sustainable Spice Export",
      date: "May 15, 2025",
      author: "Goodwill Exports",
      image: "/images/product-spice.png",
      excerpt: "Exploring new eco-friendly packaging and fair-trade practices in the global spice market..."
    },
    {
      id: 2,
      title: "Global Grain Market Trends 2025",
      date: "June 02, 2025",
      author: "Market Analyst",
      image: "/images/product-grain.png",
      excerpt: "Analysis of the rising demand for organic ancient grains in European and North American markets..."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">Industry Insights</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, news, and insights from the global food export industry.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-white border-none">Industry News</Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Button variant="ghost" className="p-0 text-accent font-bold hover:bg-transparent group">
                    Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

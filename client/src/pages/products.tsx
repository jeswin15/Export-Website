import { useState } from "react";
import { initialProducts, Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Products() {
  const [products] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<"All" | "Regular" | "Seasonal">("All");

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Our Products</h1>
          <p className="mt-2 text-muted-foreground">Browse our premium selection of export-grade commodities.</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex justify-center gap-2">
          {["All", "Regular", "Seasonal"].map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? "default" : "outline"}
              onClick={() => setFilter(tab as any)}
              className={filter === tab ? "bg-accent text-white hover:bg-accent/90" : ""}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              layout
            >
              <Card className="h-full overflow-hidden border-border/50 transition-all hover:shadow-lg">
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-5 pb-2">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-primary">{product.name}</h3>
                    <Badge variant="secondary" className={product.category === "Seasonal" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}>
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

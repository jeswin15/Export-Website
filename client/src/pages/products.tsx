import { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { store } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Package, Globe, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(store.getProducts());
  const [filter, setFilter] = useState<"All" | "Regular" | "Seasonal">("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setProducts(store.getProducts());
    });
    return () => { unsubscribe(); };
  }, []);

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl uppercase tracking-tighter">GOODWILL GLOBAL EXPORTS</h1>
          <p className="mt-4 text-muted-foreground text-lg">Browse our premium selection of export-grade commodities.</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 flex justify-center gap-4">
          {["All", "Regular", "Seasonal"].map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? "default" : "outline"}
              onClick={() => setFilter(tab as any)}
              className={cn(
                "h-12 px-8 font-bold transition-all",
                filter === tab ? "bg-accent text-white shadow-lg scale-105" : "hover:text-accent"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                        View Specifications
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-6 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h3>
                      <Badge variant="secondary" className={cn(
                        "uppercase font-bold text-[10px]",
                        product.category === "Seasonal" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                      )}>
                        {product.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <Package className="h-16 w-16 mx-auto text-muted/30 mb-4" />
            <p className="text-muted-foreground italic text-lg">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-white">
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            <div className="w-full md:w-1/2 bg-muted relative overflow-hidden min-h-[300px]">
              {selectedProduct && (
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary/90 text-white border-none px-4 py-1">Export Quality</Badge>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-8 overflow-y-auto bg-white">
              <DialogHeader className="mb-6 text-left">
                <div className="flex items-center gap-2 mb-2 text-accent">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Certified Origin</span>
                </div>
                <DialogTitle className="text-3xl font-serif text-primary leading-tight">
                  {selectedProduct?.name}
                </DialogTitle>
                <Badge className="w-fit mt-2 bg-secondary text-primary border-none">
                  {selectedProduct?.category} Category
                </Badge>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-sm uppercase text-muted-foreground mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Product Description
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-muted-foreground">Standard</span>
                    <span className="text-sm font-semibold text-primary">ISO 22000 Certified</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-muted-foreground">Logistics</span>
                    <span className="text-sm font-semibold text-primary">Global Air/Sea Freight</span>
                  </div>
                </div>

                <Button className="w-full h-12 bg-primary text-white hover:bg-primary/90 mt-8 btn-hover-effect uppercase tracking-widest font-bold">
                  Request Quote for this Product
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

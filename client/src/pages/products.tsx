import { useState } from "react";
import { initialProducts, Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState<"All" | "Regular" | "Seasonal">("All");
  const { toast } = useToast();
  
  // Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    category: "Regular",
    image: "/images/product-spice.png"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name!,
      description: newProduct.description!,
      category: newProduct.category as "Regular" | "Seasonal",
      image: newProduct.image || "/images/product-spice.png"
    };

    setProducts([product, ...products]);
    setNewProduct({ name: "", description: "", category: "Regular", image: "/images/product-spice.png" });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Deleted",
      description: "Product removed from catalog",
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Our Products</h1>
            <p className="mt-2 text-muted-foreground">Browse our premium selection of export-grade commodities.</p>
          </div>

          <div className="flex items-center gap-4">
             {/* Admin Action: Add Product */}
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary text-white hover:bg-primary/90">
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={newProduct.name} 
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newProduct.category} 
                      onValueChange={(val: "Regular" | "Seasonal") => setNewProduct({...newProduct, category: val})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="w-full">Save Product</Button>
              </DialogContent>
            </Dialog>
          </div>
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
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl font-bold text-primary">{product.name}</h3>
                      <Badge variant="secondary" className={product.category === "Seasonal" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}>
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between p-5 pt-0">
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </CardFooter>
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

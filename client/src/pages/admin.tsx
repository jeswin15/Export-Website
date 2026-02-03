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
import { Plus, Trash2, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    category: "Regular",
    image: "/images/product-spice.png"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      toast({ title: "Welcome back", description: "Successfully logged into Admin Portal" });
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
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
    toast({ title: "Success", description: "Product added to catalog" });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: "Deleted", description: "Product removed" });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-secondary/20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="font-serif text-2xl font-bold text-primary text-center">Admin Login</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl">Admin Management</h1>
            <p className="mt-2 text-muted-foreground">Manage Goodwill Global Exports product catalog.</p>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary text-white">
                  <Plus className="h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={newProduct.category} onValueChange={(val: any) => setNewProduct({...newProduct, category: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="w-full">Save Product</Button>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <motion.div key={product.id} layout>
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <CardHeader className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <Badge variant="outline">{product.category}</Badge>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button variant="ghost" size="sm" className="text-destructive w-full" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

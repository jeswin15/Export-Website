import { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import { store } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, LogOut, Package, Newspaper, Image as ImageIcon, Type, FileText, Lock, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>(store.getProducts());
  const [blogs, setBlogs] = useState<any[]>(store.getBlogs());
  const { toast } = useToast();

  useEffect(() => {
    store.fetchProducts();
    store.fetchBlogs();
    const unsubscribe = store.subscribe(() => {
      setProducts(store.getProducts());
      setBlogs(store.getBlogs());
    });
    return () => { unsubscribe(); };
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Regular",
    image: "/images/product-spice.png",
    type: "product" as "product" | "blog"
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        toast({ title: "Image Uploaded", description: "Image has been encoded for permanent storage." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (formData.type === "product") {
      const product: Product = {
        id: Date.now(),
        name: formData.title,
        description: formData.description,
        category: formData.category as "Regular" | "Seasonal",
        image: formData.image
      };
      store.addProduct(product);
      toast({ title: "Success", description: "Product added to catalog" });
    } else {
      const blog = {
        id: Date.now(),
        title: formData.title,
        content: formData.description,
        image: formData.image,
        date: new Date().toLocaleDateString()
      };
      store.addBlog(blog);
      toast({ title: "Success", description: "Blog post published" });
    }

    setFormData({ title: "", description: "", category: "Regular", image: "/images/product-spice.png", type: "product" });
    setIsDialogOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    store.removeProduct(id);
    toast({ title: "Deleted", description: "Product removed" });
  };

  const handleDeleteBlog = (id: number) => {
    store.removeBlog(id);
    toast({ title: "Deleted", description: "Blog removed" });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-secondary/20 px-4">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="bg-primary text-white text-center rounded-t-lg">
            <Lock className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h1 className="font-serif text-2xl font-bold uppercase tracking-tight">GOODWILL GLOBAL EXPORTS</h1>
            <p className="text-primary-foreground/70 text-sm">Secure Access Required</p>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary/50"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50"
                  placeholder="Enter password"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 btn-hover-effect">
                Enter Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row border-b pb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary md:text-5xl uppercase tracking-tighter">GOODWILL GLOBAL EXPORTS</h1>
            <p className="mt-2 text-muted-foreground">Global Content Management Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary text-white btn-hover-effect h-12 px-6">
                  <Plus className="h-4 w-4" /> Create New Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif">Add New Content</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label>Content Type</Label>
                    <div className="flex gap-4">
                      <Button
                        variant={formData.type === 'product' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setFormData({ ...formData, type: 'product' })}
                      >
                        <Package className="mr-2 h-4 w-4" /> Product
                      </Button>
                      <Button
                        variant={formData.type === 'blog' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setFormData({ ...formData, type: 'blog' })}
                      >
                        <Newspaper className="mr-2 h-4 w-4" /> Blog
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <Type className="h-4 w-4 text-accent" />
                      {formData.type === 'product' ? 'Product Name' : 'Blog Title'} *
                    </Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter title..." />
                  </div>

                  {formData.type === 'product' && (
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(val: any) => setFormData({ ...formData, category: val })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Seasonal">Seasonal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-accent" /> Image Upload (JPG, PNG, WEBP)
                    </Label>
                    <div className="flex flex-col gap-4">
                      <Input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageUpload} className="cursor-pointer" />
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">or image url</span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                      <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                    </div>
                    {formData.image && (
                      <div className="mt-2 max-w-[200px] aspect-video overflow-hidden rounded-md border shadow-sm">
                        <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-accent" /> Description / Content *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[150px]"
                      placeholder="Write detailed information here..."
                    />
                  </div>
                </div>
                <Button onClick={handleAddItem} className="w-full h-12 bg-primary btn-hover-effect">
                  Confirm & Publish
                </Button>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="h-12" onClick={() => setIsAuthenticated(false)}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8 bg-secondary/50 p-1">
            <TabsTrigger value="products" className="px-8"><Package className="mr-2 h-4 w-4" /> Products</TabsTrigger>
            <TabsTrigger value="blogs" className="px-8"><Newspaper className="mr-2 h-4 w-4" /> Blogs</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-xl transition-shadow h-full flex flex-col">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-primary">{product.name}</h3>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="text-destructive w-full hover:bg-destructive/10" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Remove Product
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-xl transition-shadow h-full flex flex-col">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img src={blog.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <CardHeader className="p-4">
                        <h3 className="font-bold text-lg text-primary">{blog.title}</h3>
                        <p className="text-xs text-muted-foreground">{blog.date}</p>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="text-sm line-clamp-3 text-muted-foreground">{blog.content}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="ghost" size="sm" className="text-destructive w-full hover:bg-destructive/10" onClick={() => handleDeleteBlog(blog.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Remove Blog
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              {blogs.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed rounded-lg bg-secondary/10">
                  <p className="text-muted-foreground italic">No blog posts yet. Click 'Create New Content' to start writing.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

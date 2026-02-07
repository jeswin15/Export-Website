import { Product } from "./data";
import { toast } from "@/hooks/use-toast";

// Shared state
let products: Product[] = [];
let blogs: any[] = [];

type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const store = {
  getProducts: () => [...products],
  getBlogs: () => [...blogs],

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        products = await res.json();
        store.notify();
      }
    } catch (e) {
      console.error("Failed to fetch products", e);
    }
  },

  fetchBlogs: async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        blogs = await res.json();
        store.notify();
      }
    } catch (e) {
      console.error("Failed to fetch blogs", e);
    }
  },

  addProduct: async (product: Product) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const newProduct = await res.json();
        products = [newProduct, ...products];
        store.notify();
      } else {
        throw new Error("Failed to add product");
      }
    } catch (e) {
      console.error("Error adding product:", e);
      toast({ title: "Error", description: "Failed to add product", variant: "destructive" });
    }
  },

  removeProduct: async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      products = products.filter(p => p.id !== id);
      store.notify();
    } catch (e) {
      console.error("Error removing product:", e);
      toast({ title: "Error", description: "Failed to remove product", variant: "destructive" });
    }
  },

  addBlog: async (blog: any) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      });
      if (res.ok) {
        const newBlog = await res.json();
        blogs = [newBlog, ...blogs];
        store.notify();
      } else {
        throw new Error("Failed to add blog");
      }
    } catch (e) {
      console.error("Error adding blog:", e);
      toast({ title: "Error", description: "Failed to add blog", variant: "destructive" });
    }
  },

  removeBlog: async (id: number) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      blogs = blogs.filter(b => b.id !== id);
      store.notify();
    } catch (e) {
      console.error("Error removing blog:", e);
      toast({ title: "Error", description: "Failed to remove blog", variant: "destructive" });
    }
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notify: () => {
    listeners.forEach(l => l());
  }
};

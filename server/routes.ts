import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import "dotenv/config";
import { insertProductSchema, insertBlogSchema } from "@shared/schema";
import { SEED_PRODUCTS, SEED_BLOGS } from "./seed_data";
import { sendContactEmail, sendQuoteEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Products
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    const categories = await storage.getCategories();
    const result = products.map(p => ({
      ...p,
      category: categories.find(c => c.id === p.categoryId)?.name || "Uncategorized",
      image: p.imageUrl
    }));
    res.json(result);
  });

  app.post("/api/products", async (req, res) => {
    // Determine category ID
    const categoryName = req.body.category || "Regular";
    let categories = await storage.getCategories();
    let category = categories.find(c => c.name === categoryName);

    if (!category) {
      category = await storage.createCategory({ name: categoryName });
    }

    const parsed = insertProductSchema.safeParse({
      ...req.body,
      imageUrl: req.body.image,
      categoryId: category.id,
      price: req.body.price ? parseInt(req.body.price) : null // Ensure integer or null
    });

    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const product = await storage.createProduct(parsed.data);
    res.json({
      ...product,
      category: category.name,
      image: product.imageUrl
    });
  });

  app.delete("/api/products/:id", async (req, res) => {
    await storage.deleteProduct(parseInt(req.params.id));
    res.status(204).end();
  });

  // Blogs
  app.get("/api/blogs", async (_req, res) => {
    const blogs = await storage.getBlogs();
    const result = blogs.map(b => ({
      ...b,
      image: b.imageUrl,
      date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
    }));
    res.json(result);
  });

  app.post("/api/blogs", async (req, res) => {
    const parsed = insertBlogSchema.safeParse({
      ...req.body,
      imageUrl: req.body.image,
      author: req.body.author || "GOODWILL GLOBAL EXPORTS" // Default author
    });

    if (!parsed.success) {
      console.error("Blog validation failed:", JSON.stringify(parsed.error, null, 2));
      return res.status(400).json(parsed.error);
    }

    const blog = await storage.createBlog(parsed.data);
    res.json({
      ...blog,
      image: blog.imageUrl,
      date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
    });
  });

  app.delete("/api/blogs/:id", async (req, res) => {
    await storage.deleteBlog(parseInt(req.params.id));
    res.status(204).end();
  });

  // Seed categories if empty
  let categories = await storage.getCategories();
  if (categories.length === 0) {
    await storage.createCategory({ name: "Regular" });
    await storage.createCategory({ name: "Seasonal" });
    categories = await storage.getCategories();
  }

  // Seed products if empty
  const products = await storage.getProducts();
  if (products.length === 0) {
    const regularId = categories.find(c => c.name === "Regular")?.id || 1;
    const seasonalId = categories.find(c => c.name === "Seasonal")?.id || 2;

    for (const p of SEED_PRODUCTS) {
      await storage.createProduct({
        ...p,
        categoryId: p.category === "Seasonal" ? seasonalId : regularId
      });
    }
  }

  // Email Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Non-blocking email sending
      sendContactEmail({ name, email, message }).catch(err =>
        console.error("Background email error (contact):", err)
      );

      res.json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Contact route error:", error);
      res.status(500).json({ message: "Failed to process request" });
    }
  });

  app.post("/api/quote", async (req, res) => {
    try {
      const data = req.body;
      // Basic validation
      if (!data.companyName || !data.email || !data.contactPerson) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Non-blocking email sending
      sendQuoteEmail(data).catch(err =>
        console.error("Background email error (quote):", err)
      );

      res.json({ message: "Quote request sent successfully" });
    } catch (error) {
      console.error("Quote route error:", error);
      res.status(500).json({ message: "Failed to process request" });
    }
  });

  // Seed blogs if empty
  const blogs = await storage.getBlogs();
  if (blogs.length === 0) {
    for (const b of SEED_BLOGS) {
      await storage.createBlog(b);
    }
  }

  return httpServer;
}

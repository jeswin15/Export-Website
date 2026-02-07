import { type User, type InsertUser, type Category, type InsertCategory, type Product, type InsertProduct, type Blog, type InsertBlog, users, categories, products, blogs } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  getBlogs(): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  deleteBlog(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private blogs: Map<number, Blog>;
  private currentId: { users: number; categories: number; products: number; blogs: number };

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.blogs = new Map();
    this.currentId = { users: 1, categories: 1, products: 1, blogs: 1 };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId.categories++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId.products++;
    const product: Product = { ...insertProduct, id, price: insertProduct.price ?? null };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    this.products.delete(id);
  }

  async getBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = this.currentId.blogs++;
    const blog: Blog = { ...insertBlog, id: id, createdAt: new Date() };
    this.blogs.set(id, blog);
    return blog;
  }

  async deleteBlog(id: number): Promise<void> {
    this.blogs.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    if (!db) throw new Error("Database not initialized");
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  async getProducts(): Promise<Product[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    if (!db) throw new Error("Database not initialized");
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    if (!db) throw new Error("Database not initialized");
    await db.delete(products).where(eq(products.id, id));
  }

  async getBlogs(): Promise<Blog[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(blogs);
  }

  async getBlog(id: number): Promise<Blog | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog;
  }

  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    if (!db) throw new Error("Database not initialized");
    const [blog] = await db.insert(blogs).values(insertBlog).returning();
    return blog;
  }

  async deleteBlog(id: number): Promise<void> {
    if (!db) throw new Error("Database not initialized");
    await db.delete(blogs).where(eq(blogs.id, id));
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();

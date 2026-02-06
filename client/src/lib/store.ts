import { Product } from "./data";

// Shared state for the mockup
let products: Product[] = [
  {
    id: 1,
    name: "Premium Saffron Threads",
    description: "Hand-harvested, Grade A saffron threads perfect for culinary excellence. Sourced directly from our partner farms.",
    category: "Seasonal",
    image: "/images/product-spice.png"
  },
  {
    id: 2,
    name: "Golden Wheat Grains",
    description: "High-protein golden wheat grains, cleaned and processed for international export standards.",
    category: "Regular",
    image: "/images/product-grain.png"
  },
  {
    id: 3,
    name: "Organic Cardamom Pods",
    description: "Large, green, aromatic cardamom pods selected for their intense fragrance and flavor profile.",
    category: "Regular",
    image: "/images/product-spice.png"
  },
  {
    id: 4,
    name: "Royal Basmati Rice",
    description: "Extra long grain aged basmati rice, renowned for its delicate aroma and non-sticky texture.",
    category: "Regular",
    image: "/images/product-grain.png"
  },
  {
    id: 5,
    name: "Seasonal Alphonso Mangoes",
    description: "The king of mangoes, available only during peak season. Sweet, rich, and exported via air freight.",
    category: "Seasonal",
    image: "/images/hero-bg.png" 
  },
  {
    id: 6,
    name: "Export Quality Cashews",
    description: "Whole W180 grade cashew nuts, processed to maintain crunch and natural sweetness.",
    category: "Regular",
    image: "/images/product-grain.png"
  }
];

let blogs: any[] = [
  {
    id: 1,
    title: "The Future of Sustainable Spice Export",
    date: "May 15, 2025",
    author: "GOODWILL GLOBAL EXPORTS",
    image: "/images/product-spice.png",
    excerpt: "Exploring new eco-friendly packaging and fair-trade practices in the global spice market...",
    content: "Sustainability is at the core of our operations. We are implementing new biodegradable packaging solutions that reduce environmental impact while maintaining the freshness and quality of our premium spices. Our fair-trade partnerships ensure that farmers receive equitable compensation, fostering long-term stability in the global supply chain."
  },
  {
    id: 2,
    title: "Global Grain Market Trends 2025",
    date: "June 02, 2025",
    author: "Market Analyst",
    image: "/images/product-grain.png",
    excerpt: "Analysis of the rising demand for organic ancient grains in European and North American markets...",
    content: "The global demand for ancient grains like quinoa, millet, and amaranth is soaring. Consumers in North America and Europe are increasingly seeking nutrient-dense, gluten-free alternatives to traditional wheat. GOODWILL GLOBAL EXPORTS is expanding its network of organic certified farms to meet this growing international demand."
  }
];

type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const store = {
  getProducts: () => [...products],
  getBlogs: () => [...blogs],
  
  addProduct: (product: Product) => {
    products = [product, ...products];
    store.notify();
  },
  
  removeProduct: (id: number) => {
    products = products.filter(p => p.id !== id);
    store.notify();
  },
  
  addBlog: (blog: any) => {
    blogs = [blog, ...blogs];
    store.notify();
  },
  
  removeBlog: (id: number) => {
    blogs = blogs.filter(b => b.id !== id);
    store.notify();
  },
  
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  
  notify: () => {
    listeners.forEach(l => l());
  }
};

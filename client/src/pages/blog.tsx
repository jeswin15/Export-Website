import { useState, useEffect } from "react";
import { store } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Blog() {
  const [blogs, setBlogs] = useState(store.getBlogs());
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  useEffect(() => {
    store.fetchBlogs();
    const unsubscribe = store.subscribe(() => {
      setBlogs(store.getBlogs());
    });
    return () => { unsubscribe(); };
  }, []);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl uppercase tracking-tighter">GOODWILL GLOBAL EXPORTS</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends, news, and insights from the global food export industry.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedBlog(blog)}
                className="cursor-pointer"
              >
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-white border-none shadow-md">Industry News</Badge>
                    </div>
                  </div>
                  <CardHeader className="p-6 pb-2">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {blog.date}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author || "GOODWILL GLOBAL EXPORTS"}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {blog.excerpt || blog.content}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Button variant="ghost" className="p-0 text-accent font-bold hover:bg-transparent group">
                      Read Full Insight <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {blogs.length === 0 && (
          <div className="py-32 text-center">
            <BookOpen className="h-16 w-16 mx-auto text-muted/30 mb-4" />
            <p className="text-muted-foreground italic text-lg">No insights published yet.</p>
          </div>
        )}
      </div>

      {/* Blog Detail Modal */}
      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-white">
          <div className="overflow-y-auto max-h-[90vh]">
            <div className="aspect-[21/9] w-full relative">
              {selectedBlog && (
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="text-white text-left">
                  <div className="flex items-center gap-4 text-xs text-white/80 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {selectedBlog?.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {selectedBlog?.author || "GOODWILL GLOBAL EXPORTS"}</span>
                  </div>
                  <DialogTitle className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                    {selectedBlog?.title}
                  </DialogTitle>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 prose prose-emerald max-w-none">
              <div className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                {selectedBlog?.content || selectedBlog?.excerpt}
              </div>

              <div className="mt-12 pt-8 border-t flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-xl">
                    G
                  </div>
                  <div>
                    <span className="block font-bold text-primary uppercase">GOODWILL GLOBAL EXPORTS</span>
                    <span className="text-xs text-muted-foreground">Premium Food Export Specialists</span>
                  </div>
                </div>
                <Button className="bg-accent text-white hover:bg-accent/90">Share Insight</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

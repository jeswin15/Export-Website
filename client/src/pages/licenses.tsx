import { useState, useEffect } from "react";
import { FileText, Award, ShieldCheck, Eye, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Licenses() {
  const [selectedLicense, setSelectedLicense] = useState<null | typeof licenses[0]>(null);

  const licenses = [
    {
      title: "ISO 22000:2018",
      issuer: "International Organization for Standardization",
      description: "Certified for Food Safety Management Systems ensuring safety throughout the food chain.",
      icon: ShieldCheck,
      image: "/images/importexport.jpg"
    },
    {
      title: "Export House Status",
      issuer: "Directorate General of Foreign Trade",
      description: "Recognized as a Star Export House for consistent performance in international trade.",
      icon: Award,
      image: "/images/importexport.jpg"
    },
    {
      title: "Organic Certification",
      issuer: "Control Union",
      description: "Certified organic exporter for spices and grains in compliance with EU and USDA standards.",
      icon: FileText,
      image: "/images/membership.jpg"
    },
    {
      title: "FSSAI License",
      issuer: "Food Safety and Standards Authority",
      description: "Licensed under the Food Safety and Standards Act for handling food products.",
      icon: ShieldCheck,
      image: "/images/registration.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/20 py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">Licenses & Certifications</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our commitment to global quality and safety standards is verified by international certification bodies. Click any license to view the document.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {licenses.map((license, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedLicense(license)}
              className="cursor-pointer group"
            >
              <Card className="h-full border-l-4 border-l-accent transition-all duration-300 group-hover:shadow-xl group-hover:border-l-primary relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <license.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{license.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{license.issuer}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{license.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent group-hover:text-primary transition-colors">
                    <span>View Certificate</span>
                    <div className="h-px flex-1 bg-accent/20 group-hover:bg-primary/20" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* License Modal */}
      <AnimatePresence>
        {selectedLicense && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLicense(null)}
              className="absolute inset-0 bg-primary/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 hover:bg-accent/10 hover:text-accent"
                onClick={() => setSelectedLicense(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 space-y-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <selectedLicense.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-serif text-3xl font-bold text-primary">{selectedLicense.title}</h2>
                    <p className="text-sm font-bold uppercase tracking-widest text-accent">{selectedLicense.issuer}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg italic">
                    "{selectedLicense.description}"
                  </p>
                  <div className="pt-6">
                    <Button className="w-full btn-hover-effect bg-primary text-white" onClick={() => setSelectedLicense(null)}>
                      Close Viewer
                    </Button>
                  </div>
                </div>
                <div className="bg-secondary/30 p-8 flex items-center justify-center min-h-[400px]">
                  <img
                    src={selectedLicense.image}
                    alt={selectedLicense.title}
                    className="max-h-full w-auto shadow-2xl border-8 border-white transform -rotate-1"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

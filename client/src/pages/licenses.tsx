import { FileText, Award, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Licenses() {
  const licenses = [
    {
      title: "ISO 22000:2018",
      issuer: "International Organization for Standardization",
      description: "Certified for Food Safety Management Systems ensuring safety throughout the food chain.",
      icon: ShieldCheck
    },
    {
      title: "Export House Status",
      issuer: "Directorate General of Foreign Trade",
      description: "Recognized as a Star Export House for consistent performance in international trade.",
      icon: Award
    },
    {
      title: "Organic Certification",
      issuer: "Control Union",
      description: "Certified organic exporter for spices and grains in compliance with EU and USDA standards.",
      icon: FileText
    },
    {
      title: "FSSAI License",
      issuer: "Food Safety and Standards Authority",
      description: "Licensed under the Food Safety and Standards Act for handling food products.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/20 py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary">Licenses & Certifications</h1>
          <p className="mt-4 text-muted-foreground">Our commitment to quality is backed by global standards.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {licenses.map((license, idx) => (
            <Card key={idx} className="border-l-4 border-l-accent transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <license.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-primary">{license.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{license.issuer}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{license.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

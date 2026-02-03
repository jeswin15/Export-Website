import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FileText, Send, Building2, PackageCheck } from "lucide-react";

const quoteFormSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(2, "Destination country is required"),
  productInterest: z.string().min(1, "Please select a product category"),
  estimatedQuantity: z.string().min(1, "Estimated quantity is required"),
  frequency: z.string().min(1, "Order frequency is required"),
  additionalRequirements: z.string().optional(),
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to terms"),
});

export default function Quote() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      country: "",
      productInterest: "",
      estimatedQuantity: "",
      frequency: "One-time",
      additionalRequirements: "",
      agreedToTerms: false,
    },
  });

  function onSubmit(values: z.infer<typeof quoteFormSchema>) {
    console.log("Quote Request:", values);
    
    // In mockup mode, we simulate the email sending
    toast({
      title: "Quote Request Submitted",
      description: "Our export team will review your business needs and send a detailed quotation to " + values.email,
    });
    
    form.reset();
  }

  return (
    <div className="min-h-screen bg-secondary/20 py-16">
      <div className="container max-w-4xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <BadgeCheck className="mx-auto h-12 w-12 text-accent mb-4" />
          <h1 className="font-serif text-4xl font-bold text-primary">Request a Formal Quotation</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Provide your business requirements below, and our specialists will prepare a custom export proposal.
          </p>
        </motion.div>

        <div className="grid gap-8">
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <div className="bg-primary p-6 text-white flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif">Business Requirements Form</h2>
                <p className="text-primary-foreground/70 text-sm">All fields marked with * are required for processing.</p>
              </div>
            </div>
            
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Business Details Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Building2 className="h-4 w-4 text-accent" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-primary">Company Information</h3>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl><Input placeholder="Global Trade Ltd." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person *</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email *</FormLabel>
                            <FormControl><Input type="email" placeholder="procurement@company.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Export Needs Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <PackageCheck className="h-4 w-4 text-accent" />
                      <h3 className="font-bold text-sm uppercase tracking-wider text-primary">Export Requirements</h3>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination Country *</FormLabel>
                            <FormControl><Input placeholder="e.g. United Kingdom" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="productInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Category *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="spices">Premium Spices</SelectItem>
                                <SelectItem value="grains">Organic Grains</SelectItem>
                                <SelectItem value="fruits">Seasonal Fruits</SelectItem>
                                <SelectItem value="nuts">Export Nuts</SelectItem>
                                <SelectItem value="other">Other Commodities</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="estimatedQuantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Quantity (Tons) *</FormLabel>
                            <FormControl><Input placeholder="e.g. 50" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Frequency *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="One-time">One-time Order</SelectItem>
                                <SelectItem value="Monthly">Monthly Contract</SelectItem>
                                <SelectItem value="Quarterly">Quarterly Supply</SelectItem>
                                <SelectItem value="Annual">Annual Framework</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="additionalRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Requirements / Custom Packaging</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please detail any specific quality certifications or custom packaging needs..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="agreedToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-secondary/10">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I confirm that the above information is accurate and I am authorized to request a quote on behalf of my company.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                    Submit Quote Request <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

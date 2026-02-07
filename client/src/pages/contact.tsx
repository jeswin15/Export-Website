import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent Successfully",
        description: "We have received your inquiry. A confirmation email has been sent to " + values.email,
        duration: 5000,
        className: "bg-green-50 border-green-200"
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary uppercase tracking-tighter">Contact GOODWILL GLOBAL EXPORTS</h1>
          <p className="mt-4 text-muted-foreground">Connect with our global trade headquarters.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-primary">Get Connected</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our export specialists are available for consultation. Reach out for technical specifications, bulk pricing, and custom logistics solutions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-primary">Global Headquarters</h3>
                  <p className="text-muted-foreground">123 Trade Center, Business District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-primary">Direct Hotline</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-primary">Official Email</h3>
                  <p className="text-muted-foreground">contact@goodwillglobal.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border bg-card p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Mail className="h-32 w-32" />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name / Business Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inquiry Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about your export requirements..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || isSuccess}
                  className={`w-full text-white btn-hover-effect disabled:opacity-100 transition-all duration-300 ${isSuccess ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
                    }`}
                >
                  {form.formState.isSubmitting ? (
                    "Sending Message..."
                  ) : isSuccess ? (
                    "Message Sent Successfully"
                  ) : (
                    "Submit Inquiry to Exports Team"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

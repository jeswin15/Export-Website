import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call the backend API
    console.log("Submitting form:", values);
    
    // Simulate API delay
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We have received your inquiry and will get back to you shortly.",
      });
      form.reset();
    }, 1000);
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-16 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">Get in touch for export inquiries and quotes.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-semibold text-primary">Get Connected</h2>
              <p className="text-muted-foreground">
                We are available Mon-Fri, 9am - 6pm EST. Reach out to us for product catalogs, pricing, and shipping information.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-primary">Headquarters</h3>
                  <p className="text-muted-foreground">123 Trade Center, Business District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-primary">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 text-accent" />
                <div>
                  <h3 className="font-semibold text-primary">Email</h3>
                  <p className="text-muted-foreground">contact@globalexport.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                      <FormLabel>Email</FormLabel>
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your requirements..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

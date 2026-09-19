import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setSubmitError(null);
      
      const addDocPromise = addDoc(collection(db, "messages"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "unread"
      });

      // Timeout after 10 seconds to prevent hanging if Firestore isn't initialized
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timed out. Please ensure Firestore is initialized in your Firebase Console.")), 10000)
      );

      await Promise.race([addDocPromise, timeoutPromise]);

      setIsSubmitted(true);
      reset();
    } catch (error: any) {
      console.error("Error sending message:", error);
      setSubmitError(error.message || "Failed to send message. Please try again later or call us directly.");
    }
  };

  return (
    <div className="py-32 px-4 container mx-auto max-w-6xl min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div>
          <h1 className="text-5xl font-serif text-brand mb-6">Get in Touch</h1>
          <p className="text-white/70 mb-12 text-lg">
            Whether you have a question about our menu, private events, or anything else, our team is ready to answer all your questions.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-dark-soft border border-white/10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Location</h3>
                <p className="text-white/60">123 Culinary Ave, Food District<br />New York, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-dark-soft border border-white/10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Phone</h3>
                <p className="text-white/60">+1 (555) 123-4567<br />Mon-Sun: 9am - 10pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-dark-soft border border-white/10 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Email</h3>
                <p className="text-white/60">contact@aurarestaurant.com<br />events@aurarestaurant.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-dark-soft border border-white/10 rounded-xl p-8 shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 blur-[80px] rounded-full pointer-events-none" />
          
          {isSubmitted ? (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center py-12"
             >
               <h3 className="text-3xl font-serif text-brand mb-4">Message Sent</h3>
               <p className="text-white/70 mb-8">
                 Thank you for reaching out. We will get back to you as soon as possible.
               </p>
               <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                />
                {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                <input
                  {...register("subject")}
                  id="subject"
                  type="text"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-2">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 text-lg mt-8" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {submitError && (
                <div className="p-4 mt-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-400 text-sm text-center">
                  {submitError}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

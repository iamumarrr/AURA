import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  date: z.string().min(1, "Please select a date."),
  time: z.string().min(1, "Please select a time."),
  guests: z.string().min(1, "Please select number of guests."),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function ReservationsContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      setSubmitError(null);
      
      const addDocPromise = addDoc(collection(db, "reservations"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "pending"
      });

      // Timeout after 10 seconds to prevent hanging if Firestore isn't initialized
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timed out. Please ensure Firestore is initialized in your Firebase Console.")), 10000)
      );

      await Promise.race([addDocPromise, timeoutPromise]);

      setIsSubmitted(true);
      reset();
    } catch (error: any) {
      console.error("Error adding reservation:", error);
      setSubmitError(error.message || "Failed to submit reservation. Please try again later or call us directly.");
    }
  };

  return (
    <div className="py-32 px-4 container mx-auto max-w-4xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-brand mb-4">Make a Reservation</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Secure your table at Aura. For parties larger than 6, or special events, 
          please contact us directly.
        </p>
      </div>

      <div className="bg-dark-soft border border-white/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full pointer-events-none" />
        
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-brand/20 text-brand rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-serif text-white mb-4">Request Received</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Thank you for choosing Aura. We have received your reservation request and will send a confirmation email shortly.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>Make Another Booking</Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                <input
                  {...register("phone")}
                  id="phone"
                  type="tel"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone.message}</p>}
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-white/80 mb-2">Number of Guests</label>
                <select
                  {...register("guests")}
                  id="guests"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors appearance-none"
                >
                  <option value="">Select guests</option>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num.toString()}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
                {errors.guests && <p className="text-red-400 text-xs mt-2">{errors.guests.message}</p>}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-2">Date</label>
                <input
                  {...register("date")}
                  id="date"
                  type="date"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                />
                {errors.date && <p className="text-red-400 text-xs mt-2">{errors.date.message}</p>}
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-white/80 mb-2">Time</label>
                <select
                  {...register("time")}
                  id="time"
                  className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors appearance-none"
                >
                  <option value="">Select time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
                {errors.time && <p className="text-red-400 text-xs mt-2">{errors.time.message}</p>}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-white/80 mb-2">Special Requests (Optional)</label>
              <textarea
                {...register("specialRequests")}
                id="specialRequests"
                rows={4}
                className="w-full bg-dark-main border border-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors resize-none"
                placeholder="Dietary requirements, special occasions, etc."
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-4 text-lg mt-8" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Reservation"}
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
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800", alt: "Restaurant Interior", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800", alt: "Signature Dish", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800", alt: "Dessert", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", alt: "Wine Selection", span: "md:col-span-1 md:row-span-2" },
  { id: 5, src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800", alt: "Chef preparing food", span: "md:col-span-1 md:row-span-1" },
  { id: 6, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", alt: "Culinary Art", span: "md:col-span-1 md:row-span-1" },
];

export function GalleryContent() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="py-32 px-4 container mx-auto max-w-6xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-brand mb-4">Gallery</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          A glimpse into the Aura experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
        {images.map((img) => (
          <motion.div
            key={img.id}
            layoutId={`img-${img.id}`}
            className={`${img.span} relative group cursor-pointer overflow-hidden rounded-lg bg-dark-soft border border-white/5`}
            onClick={() => setSelectedImg(img.src)}
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-serif tracking-widest uppercase text-sm">View</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Full screen gallery image"
              className="max-w-full max-h-[90vh] object-contain rounded-md"
            />
            <button 
              className="absolute top-8 right-8 text-white hover:text-brand transition-colors p-2"
              onClick={() => setSelectedImg(null)}
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

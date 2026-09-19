import { motion } from "framer-motion";

export function AboutContent() {
  return (
    <div className="py-32 px-4 container mx-auto max-w-6xl min-h-screen">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-serif text-brand mb-6">Our Story</h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          A passion for gastronomy. A commitment to excellence. 
          The journey of Aura is a testament to the art of fine dining.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-square bg-dark-soft rounded-lg overflow-hidden border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" 
              alt="Chef at work" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-serif text-white mb-6">The Philosophy</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Founded in 2018 by Executive Chef Marcus Rossi, Aura was born from a singular vision: to create a dining experience that engages all the senses. We believe that true culinary artistry lies at the intersection of tradition and innovation.
          </p>
          <p className="text-white/70 leading-relaxed">
            Every dish we serve tells a story—of the local farmers who grew the ingredients, of the coastal fishers who provided the catch, and of the chefs who painstakingly crafted each element on the plate.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-4xl font-serif text-white mb-6">Local Sourcing, Global Inspiration</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            We are deeply committed to sustainability and seasonality. Our menu changes not just with the four seasons, but with the micro-seasons of our local region. 
          </p>
          <p className="text-white/70 leading-relaxed">
            By partnering exclusively with sustainable farms within a 100-mile radius, we ensure that every ingredient is at its absolute peak when it reaches your table. We then elevate these local ingredients using modern techniques and global flavor profiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <div className="aspect-[4/3] bg-dark-soft rounded-lg overflow-hidden border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=800" 
              alt="Fresh ingredients" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-serif text-brand mb-8">The Ambiance</h2>
        <p className="text-white/70 leading-relaxed">
          Designed by award-winning architectural firm Studio O, the interior of Aura is a study in modern luxury. Deep charcoal walls, dramatic directional lighting, and metallic gold accents create an atmosphere that is both intimate and grand. It is the perfect canvas for the culinary journey that awaits you.
        </p>
      </motion.div>
    </div>
  );
}

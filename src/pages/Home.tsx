import { HeroScene } from "../components/3d/HeroScene";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HomeContent() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-24">
        <HeroScene />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-white"
          >
            Taste the <span className="text-gradient">Extraordinary</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            An immersive culinary journey where modern gastronomy meets timeless luxury. 
            Experience dining elevated to an art form.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pointer-events-auto"
          >
            <Button size="lg" asChild>
              <Link to="/reservations">Reserve a Table</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/menu">Discover Menu</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 bg-dark-main">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand mb-6">Culinary Excellence</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              At Aura, we believe that dining is more than just a meal; it is a sensory experience. 
              Our executive chefs source only the finest, sustainable ingredients from local artisans 
              and global purveyors to craft dishes that are as visually stunning as they are delicious.
            </p>
            <Button variant="link" className="p-0 text-brand hover:text-brand-light">
              <Link to="/about">Read Our Story &rarr;</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-dark-soft rounded-lg overflow-hidden border border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800"
                alt="Chef's Signature Dish"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

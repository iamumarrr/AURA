import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = "All" | "Starters" | "Mains" | "Desserts" | "Drinks";

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  dietary?: ("V" | "GF" | "VE")[];
}

const menuData: MenuItemType[] = [
  {
    id: "1",
    name: "Truffle Arancini",
    description: "Crispy risotto balls filled with wild mushrooms and black truffle, served with garlic aioli.",
    price: 18,
    category: "Starters",
    dietary: ["V"],
  },
  {
    id: "2",
    name: "Wagyu Beef Carpaccio",
    description: "Thinly sliced premium wagyu, shaved parmesan, capers, and a drizzle of white truffle oil.",
    price: 24,
    category: "Starters",
    dietary: ["GF"],
  },
  {
    id: "3",
    name: "Pan-Seared Scallops",
    description: "Diver scallops with cauliflower purée, crispy pancetta, and herb oil.",
    price: 26,
    category: "Starters",
    dietary: ["GF"],
  },
  {
    id: "4",
    name: "Miso Glazed Black Cod",
    description: "Sustainably caught black cod, charred bok choy, and ginger dashi broth.",
    price: 42,
    category: "Mains",
    dietary: ["GF"],
  },
  {
    id: "5",
    name: "Aura Signature Duck",
    description: "Dry-aged duck breast, cherry reduction, parsnip purée, and seasonal greens.",
    price: 45,
    category: "Mains",
    dietary: ["GF"],
  },
  {
    id: "6",
    name: "Wild Mushroom Risotto",
    description: "Acquerello rice, assorted wild mushrooms, aged parmesan, and fresh herbs.",
    price: 32,
    category: "Mains",
    dietary: ["V", "GF"],
  },
  {
    id: "7",
    name: "Dark Chocolate Delice",
    description: "Valrhona chocolate mousse, hazelnut praline, and gold leaf.",
    price: 16,
    category: "Desserts",
    dietary: ["V"],
  },
  {
    id: "8",
    name: "Matcha Panna Cotta",
    description: "Silky green tea panna cotta with black sesame tuile and seasonal berries.",
    price: 14,
    category: "Desserts",
    dietary: ["V"],
  },
  {
    id: "9",
    name: "Smoked Old Fashioned",
    description: "Woodford Reserve, maple syrup, Angostura bitters, smoked with oak wood.",
    price: 18,
    category: "Drinks",
  },
  {
    id: "10",
    name: "Elderflower Spritz",
    description: "St-Germain, prosecco, soda water, fresh mint and lime.",
    price: 16,
    category: "Drinks",
  },
];

const categories: Category[] = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredMenu = menuData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="py-32 px-4 container mx-auto max-w-5xl min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-brand mb-4">Our Menu</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          A symphony of flavors crafted with passion and precision. 
          Discover our seasonal offerings designed to delight your senses.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "bg-brand text-dark-main shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-dark-soft text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <AnimatePresence mode="popLayout">
          {filteredMenu.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-serif text-white group-hover:text-brand transition-colors flex items-center gap-3">
                  {item.name}
                  {item.dietary && (
                    <span className="flex gap-1 text-[10px] font-sans">
                      {item.dietary.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 border border-white/20 rounded-sm text-white/50">
                          {d}
                        </span>
                      ))}
                    </span>
                  )}
                </h3>
                <span className="text-xl font-serif text-brand ml-4">${item.price}</span>
              </div>
              <div className="w-full border-t border-dashed border-white/20 mb-3"></div>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Gallery", path: "/gallery" },
  { name: "Reservations", path: "/reservations" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-dark-main/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center max-w-7xl">
        <Link to="/" className="text-2xl font-serif tracking-widest text-brand">
          AURA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand uppercase tracking-wider",
                location.pathname === link.path ? "text-brand" : "text-white/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-main border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium p-2 transition-colors",
                location.pathname === link.path ? "text-brand" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

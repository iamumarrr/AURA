import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-dark-soft border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="text-3xl font-serif text-brand mb-4 inline-block">
              AURA
            </Link>
            <p className="text-white/60 text-sm mt-4">
              Experience modern luxury and exquisite culinary artistry in the heart of the city.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Explore</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-brand transition-colors">Our Story</Link></li>
              <li><Link to="/menu" className="hover:text-brand transition-colors">Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-brand transition-colors">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>123 Culinary Ave, Food District</li>
              <li>New York, NY 10001</li>
              <li>contact@aurarestaurant.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6 text-white">Hours</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Mon - Thu: 5:00 PM - 10:00 PM</li>
              <li>Fri - Sat: 5:00 PM - 11:30 PM</li>
              <li>Sunday: 4:00 PM - 9:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Aura Restaurant. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

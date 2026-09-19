import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeContent } from "@/pages/Home";
import { MenuContent } from "@/pages/Menu";
import { ReservationsContent } from "@/pages/Reservations";
import { ContactContent } from "@/pages/Contact";
import { GalleryContent } from "@/pages/Gallery";

import { AboutContent } from "@/pages/About";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<AboutContent />} />
            <Route path="/menu" element={<MenuContent />} />
            <Route path="/gallery" element={<GalleryContent />} />
            <Route path="/reservations" element={<ReservationsContent />} />
            <Route path="/contact" element={<ContactContent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

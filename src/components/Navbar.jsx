import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/vite.png" alt="VitaCheck Logo" className="h-14 w-14 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">
              Beranda
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">
              Tentang
            </Link>
            <Link to="/content" className="text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">
              Analizer
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:scale-110">
              Kontak
            </Link>
          </div>

          {/* CTA Button */}
          <button className="hidden md:block btn-primary flex items-center gap-2">
            Mulai Sekarang
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-500 transition-transform duration-300 hover:scale-110"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t pt-4 slide-down">
            <Link to="/" className="block px-2 py-2 text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:pl-4">
              Beranda
            </Link>
            <Link to="/about" className="block px-2 py-2 text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:pl-4">
              Tentang
            </Link>
            <Link to="/content" className="block px-2 py-2 text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:pl-4">
              Analizer
            </Link>
            <Link to="/contact" className="block px-2 py-2 text-gray-700 hover:text-primary-500 font-medium transition-all duration-300 hover:pl-4">
              Kontak
            </Link>
            <button className="w-full btn-primary mt-4">Mulai Sekarang</button>
          </div>
        )}
      </div>
    </nav>
  );
}

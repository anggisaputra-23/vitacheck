import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Zap, Heart, Sparkles, Mail } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav className="sticky top-0 z-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 h-full bg-gradient-to-r from-gray-50 via-white to-gray-50">
        {/* Floating gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-float"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Border Bottom with Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Left Side with Creative Animation */}
          <Link 
            to="/" 
            className="flex items-center group relative z-10"
          >
            <div className="relative">
              {/* Background glow that expands on hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-300/0 via-primary-300/10 to-secondary-300/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
              
              {/* Logo container - Clean without borders */}
              <div className="relative p-1">
                <picture>
                  <source srcSet="/images/vite-logo.png" type="image/png" />
                  <img loading="lazy" decoding="async" 
                    src="/images/vite-logo.png" 
                    alt="VitaCheck" 
                    className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    width="80" height="40"
                  />
                </picture>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Creative Layout */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {[
              { to: '/', label: 'Beranda', icon: Heart },
              { to: '/about', label: 'Tentang', icon: Sparkles },
              { to: '/content', label: 'Analizer', icon: Zap },
              { to: '/contact', label: 'Kontak', icon: Mail }
            ].map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.to}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative group px-4 py-2"
                >
                  {/* Animated background pill */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-2">
                    {IconComponent && (
                      <IconComponent 
                        size={16} 
                        className="text-primary-600 group-hover:scale-110 group-hover:animate-bounce transition-all" 
                        style={{animationDuration: '0.6s'}}
                      />
                    )}
                    <span className="text-gray-700 font-bold text-sm group-hover:text-primary-700 transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"></div>

                  {/* Side glow effect */}
                  <div className="absolute inset-0 rounded-full border border-primary-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>

          {/* CTA Button - Right Side with Premium Design */}
          <Link
            to="/content"
            className="hidden md:flex items-center justify-center gap-2 group relative px-8 py-3 rounded-full overflow-hidden z-10 font-bold"
          >
            {/* Multiple gradient layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 transition-all duration-300"></div>
            
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

            {/* Glow effect on hover */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10"></div>

            {/* Icon and Text */}
            <Zap 
              size={18} 
              className="relative text-white group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300"
            />
            <span className="relative text-white text-sm uppercase tracking-wider">
              Mulai Sekarang
            </span>

            {/* Floating particles on hover */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float" style={{animationDelay: '0.5s'}}></div>
          </Link>

          {/* Mobile Menu Button - Creative */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-20 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 hover:border-primary-300/50 text-gray-700 hover:text-primary-700 transition-all duration-300 group"
          >
            {/* Hover glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-primary-300/20 to-secondary-300/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            {isOpen ? <X size={24} className="group-hover:rotate-90 transition-transform duration-300" /> : <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" />}
          </button>
        </div>

        {/* Mobile Navigation - Creative Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-3 border-t border-gray-200/30 pt-4 animate-slideDown relative z-10">
            {[
              { to: '/', label: 'Beranda', icon: Heart },
              { to: '/about', label: 'Tentang', icon: Sparkles },
              { to: '/content', label: 'Analizer', icon: Zap },
              { to: '/contact', label: 'Kontak', icon: Mail }
            ].map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="group relative block px-4 py-3 rounded-lg bg-gradient-to-r from-primary-50/0 to-secondary-50/0 hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 border-l-4 border-transparent hover:border-primary-500 overflow-hidden"
                >
                  {/* Background animation on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 rounded-lg"></div>

                  <div className="relative flex items-center gap-3">
                    {IconComponent && (
                      <IconComponent size={18} className="text-primary-600 group-hover:animate-bounce" style={{animationDuration: '0.6s'}} />
                    )}
                    <span className="text-gray-700 font-semibold group-hover:text-primary-700 transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Mobile CTA Button */}
            <Link
              to="/content"
              onClick={() => setIsOpen(false)}
              className="group relative block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-center mt-4 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
              
              {/* Glow on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>

              <div className="relative flex items-center justify-center gap-2">
                <Zap size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Mulai Sekarang</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </nav>
  );
}

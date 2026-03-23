import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Zap, Home, Stethoscope, Info, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down (but show if near top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      {/* Animated Background with Gradient */}
      <div className="absolute inset-0 h-full bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-lg border-b border-gray-100/50">
        {/* Floating gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-float"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-200/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Subtle bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/30 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-8">
          {/* Logo - Left Side */}
          <Link 
            to="/" 
            className="flex items-center group relative z-10 flex-shrink-0"
          >
            <div className="relative flex items-center gap-3">
              {/* Logo Image */}
              <div className="relative">
                <img 
                  src="/vite%20logo.png" 
                  alt="VitaCheck" 
                  className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Creative Layout */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center animate-fadeInDown" style={{animationDelay: '0.2s'}}>  
            {[
              { to: '/', label: 'Beranda', icon: Home },
              { to: '/about', label: 'Tentang', icon: Info },
              { to: '/content', label: 'Analizer', icon: Stethoscope },
              { to: '/contact', label: 'Kontak', icon: MessageSquare }
            ].map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.to}
                  className="relative group px-4 py-2 text-sm animate-fadeInDown whitespace-nowrap"
                  style={{animationDelay: `${0.3 + index * 0.1}s`}}
                >
                  {/* Animated background pill */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center gap-2">
                    {IconComponent && (
                      <IconComponent 
                        size={14} 
                        className="text-primary-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" 
                      />
                    )}
                    <span className="text-gray-700 font-semibold text-xs group-hover:text-primary-600 transition-colors duration-300">
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

          {/* CTA Button - with Colors */}
          <Link
            to="/content"
            className="hidden md:flex items-center justify-center gap-2 group relative px-6 py-2 rounded-full overflow-hidden z-10 font-bold text-sm animate-fadeInDown flex-shrink-0"
            style={{animationDelay: '0.6s'}}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 transition-all duration-300"></div>
            
            {/* Icon and Text */}
            <Zap 
              size={16} 
              className="relative text-white group-hover:scale-150 group-hover:rotate-12 transition-all duration-300"
            />
            <span className="relative text-white text-xs uppercase tracking-wider">
              Mulai
            </span>
          </Link>

          {/* Mobile Menu Button - with Colors */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-20 p-3 rounded-xl bg-white/40 backdrop-blur-md text-gray-700 hover:text-primary-700 transition-all duration-300 group"
          >
            {/* Hover glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-primary-300/20 to-secondary-300/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            {isOpen ? <X size={24} className="group-hover:rotate-90 transition-transform duration-300" /> : <Menu size={24} className="group-hover:scale-110 transition-transform duration-300" />}
          </button>
        </div>

        {/* Mobile Navigation - with Colors */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-3 border-t border-gray-200/30 pt-4 animate-slideDown relative z-10">
            {[
              { to: '/', label: 'Beranda', icon: Home },
              { to: '/about', label: 'Tentang', icon: Info },
              { to: '/content', label: 'Analizer', icon: Stethoscope },
              { to: '/contact', label: 'Kontak', icon: MessageSquare }
            ].map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={index}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="group relative block px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary-50/0 to-secondary-50/0 hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 border-l-4 border-transparent hover:border-primary-500 overflow-hidden text-sm animate-fadeInLeft"
                  style={{animationDelay: `${0.2 + index * 0.08}s`}}
                >
                  {/* Background animation on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 rounded-lg"></div>

                  <div className="relative flex items-center gap-3">
                    {IconComponent && (
                      <IconComponent size={16} className="text-primary-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    )}
                    <span className="text-gray-700 font-semibold text-sm group-hover:text-primary-700 transition-colors duration-300">
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Mobile CTA Button - with Colors */}
            <Link
              to="/content"
              onClick={() => setIsOpen(false)}
              className="group relative block w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-center text-sm mt-4 overflow-hidden animate-fadeInLeft"
              style={{animationDelay: '0.5s'}}
            >
              <div className="relative flex items-center justify-center gap-2">
                <Zap size={16} className="group-hover:scale-150 group-hover:rotate-12 transition-transform duration-300" />
                <span>Mulai</span>
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
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
}

import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-10">
          
          {/* Top Section: Logo & Description */}
          <div className="mb-3 sm:mb-8 pb-2 sm:pb-8 border-b border-gray-800/50">
            <div className="mb-2 sm:mb-4">
              <img src="/vite%20logo.png" alt="VitaCheck Logo" className="h-7 sm:h-10 w-auto object-contain" />
            </div>
            <p className="text-gray-300 text-xs leading-tight sm:leading-relaxed sm:text-sm max-w-3xl font-light">
              Platform pemeriksaan kesehatan untuk wawasan lengkap dan panduan gaya hidup lebih sehat.
            </p>
          </div>

          {/* Contact & Navigation Section */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-8 mb-4 sm:mb-10 pb-4 sm:pb-8 border-b border-gray-800/50">
            
            {/* Contact Info - Takes 2 cols on desktop */}
            <div className="lg:col-span-2 space-y-2 sm:space-y-4 hidden sm:block col-span-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hubungi Kami</h3>
              
              <div className="space-y-1.5 sm:space-y-3">
                <div className="flex items-start gap-1.5 sm:gap-3">
                  <Mail size={14} className="flex-shrink-0 mt-0.5 text-primary-500 sm:w-4 sm:h-4" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-0 sm:mb-0.5 hidden sm:block">Email</p>
                    <a href="mailto:info@vitacheck.com" className="text-xs text-gray-200 hover:text-primary-300 transition-colors hover:underline break-all">
                      info@vitacheck.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 sm:gap-3">
                  <Phone size={14} className="flex-shrink-0 mt-0.5 text-primary-500 sm:w-4 sm:h-4" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-0 sm:mb-0.5 hidden sm:block">Telepon</p>
                    <a href="tel:+62123456789" className="text-xs text-gray-200 hover:text-primary-300 transition-colors hover:underline">
                      +62 (123) 456-789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 sm:gap-3">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5 text-primary-500 sm:w-4 sm:h-4" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-0 sm:mb-0.5 hidden sm:block">Lokasi</p>
                    <p className="text-xs text-gray-200">
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Cepat */}
            <div className="sm:col-span-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Menu Cepat</h3>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  { label: 'Beranda', to: '/' },
                  { label: 'Tentang Kami', to: '/about' },
                  { label: 'Analizer', to: '/content' },
                  { label: 'Kontak', to: '/contact' }
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-xs sm:text-sm text-gray-400 hover:text-primary-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sumber Daya */}
            <div className="sm:col-span-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Sumber Daya</h3>
              <ul className="space-y-1 sm:space-y-2">
                {[
                  'Panduan Kesehatan',
                  'Artikel Blog',
                  'FAQ',
                  'Dukungan'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-gray-400 hover:text-primary-300 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ikuti Kami */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Ikuti Kami</h3>
              <div className="flex gap-3 sm:gap-3">
                {[
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Instagram, label: 'Instagram' }
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="text-gray-400 hover:text-primary-300 transition-all duration-300 hover:scale-110"
                    title={label}
                  >
                    <Icon size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center text-gray-400 text-xs">
            <p className="text-xs order-1 sm:order-none">© {currentYear} VitaCheck.</p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs order-2 sm:order-none">
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                Privasi
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                Syarat
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

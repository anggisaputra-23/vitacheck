import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <div className="mb-6">
                <img src="/vite%20logo.png" alt="VitaCheck Logo" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                Platform pemeriksaan kesehatan untuk wawasan lengkap dan panduan gaya hidup lebih sehat.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-400 group hover:text-primary-400 transition-colors cursor-pointer">
                  <Mail size={16} />
                  <a href="mailto:info@vitacheck.com">info@vitacheck.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group hover:text-primary-400 transition-colors cursor-pointer">
                  <Phone size={16} />
                  <a href="tel:+62123456789">+62 (123) 456-789</a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={16} />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Menu Cepat</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Beranda', to: '/' },
                  { label: 'Tentang Kami', to: '/about' },
                  { label: 'Analizer', to: '/content' },
                  { label: 'Kontak', to: '/contact' }
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-6">Sumber Daya</h4>
              <ul className="space-y-3">
                {[
                  'Panduan Kesehatan',
                  'Artikel Blog',
                  'FAQ',
                  'Dukungan'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-lg mb-6">Ikuti Kami</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Instagram, label: 'Instagram' }
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300 flex items-center justify-center"
                    title={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex gap-4">
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-yellow-200 mb-2">
                    Penting: Informasi Kesehatan
                  </p>
                  <p className="text-gray-300 text-sm">
                    Informasi di situs ini hanya untuk tujuan edukasi dan tidak menggantikan nasihat profesional medis. Selalu konsultasikan dengan dokter atau profesional kesehatan untuk diagnosis dan pengobatan. VitaCheck tidak bertanggung jawab atas penggunaan informasi ini.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>© {currentYear} VitaCheck. Semua hak dilindungi.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary-400 transition-colors">Kebijakan Privasi</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-primary-400 transition-colors">Syarat Layanan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

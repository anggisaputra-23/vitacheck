import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, AlertCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="gradient-blue px-2 py-1 rounded">VC</span>
              VitaCheck
            </div>
            <p className="text-gray-400 text-sm">
              Penganalisis risiko kesehatan Anda yang diperkuat oleh teknologi cerdas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Menu Cepat</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/content" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Analizer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Sumber Daya</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Panduan Kesehatan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Syarat Layanan
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-125">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-125">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-125">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-125">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 glow-pulse">
            <div className="flex gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
              <p className="text-yellow-800 text-sm">
                <strong>Peringatan Medis:</strong> VitaCheck adalah alat informasi dan BUKAN pengganti diagnosis medis profesional, saran, atau perawatan. Alat ini tidak boleh digunakan untuk diagnosis mandiri. Selalu konsultasikan dengan dokter berlisensi untuk masalah kesehatan apa pun. Hasil hanya untuk tujuan edukasi.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} VitaCheck. Semua hak dilindungi. | Demi kesehatan Anda dengan sepenuh hati</p>
        </div>
      </div>
    </footer>
  );
}

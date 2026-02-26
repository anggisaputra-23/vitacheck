import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, Lightbulb, ArrowRight, Users, Star, Clock, CheckCircle2, TrendingUp, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih VitaCheck?</h2>
          <p className="text-xl text-gray-600">Penilaian risiko kesehatan komprehensif dengan analitik canggih</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card group hover:shadow-lg slide-up">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <Zap className="text-primary-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Penilaian Cepat</h3>
            <p className="text-gray-600 leading-relaxed">
              Dapatkan hasil analisis risiko kesehatan instan dalam hitungan menit. Algoritma canggih kami memproses data kesehatan Anda untuk memberikan hasil yang akurat.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card group hover:shadow-lg slide-up" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <BarChart3 className="text-secondary-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visualisasi Data</h3>
            <p className="text-gray-600 leading-relaxed">
              Grafik dan dashboard interaktif yang indah membuat mudah untuk memahami metrik kesehatan Anda sekilas.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card group hover:shadow-lg slide-up" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <Lightbulb className="text-primary-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Wawasan Personal</h3>
            <p className="text-gray-600 leading-relaxed">
              Terima rekomendasi yang disesuaikan berdasarkan profil kesehatan unik Anda dan faktor gaya hidup.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bagaimana VitaCheck Bekerja</h2>
            <p className="text-xl text-gray-600">Proses 3 langkah sederhana untuk wawasan kesehatan yang komprehensif</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center slide-up">
              <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Masukkan Data</h3>
              <p className="text-gray-600">
                Bagikan informasi kesehatan Anda termasuk usia, berat, tinggi, kebiasaan gaya hidup, dan riwayat medis.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center justify-center absolute left-1/3 top-20 -translate-x-1/2">
              <ArrowRight className="text-primary-500" size={32} />
            </div>

            {/* Step 2 */}
            <div className="text-center slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analisis</h3>
              <p className="text-gray-600">
                Algoritma canggih kami menghitung skor risiko kesehatan dan faktor gaya hidup Anda menggunakan pedoman medis.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center justify-center absolute left-2/3 top-20 -translate-x-1/2">
              <ArrowRight className="text-primary-500" size={32} />
            </div>

            {/* Step 3 */}
            <div className="text-center slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dapatkan Rekomendasi</h3>
              <p className="text-gray-600">
                Terima wawasan kesehatan personal dan rekomendasi yang dapat ditindaklanjuti untuk meningkatkan kesejahteraan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Mengambil Alih Kesehatan Anda?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Mulai penilaian risiko kesehatan gratis Anda hari ini dan dapatkan wawasan personal tentang kesejahteraan Anda.
          </p>
          <Link 
            to="/content"
            className="inline-flex items-center gap-2 bg-white text-primary-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Analisis Sekarang <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="fade-in">
            <p className="text-5xl font-bold text-primary-500 mb-2">89%</p>
            <p className="text-gray-600 flex items-center justify-center gap-2"><TrendingUp size={18} /> Peningkatan Kesadaran Kesehatan</p>
            <p className="text-sm text-gray-500 mt-2">Pengguna lebih paham faktor risiko mereka</p>
          </div>
          <div className="fade-in" style={{animationDelay: '0.1s'}}>
            <p className="text-5xl font-bold text-secondary-500 mb-2">12+</p>
            <p className="text-gray-600 flex items-center justify-center gap-2"><CheckCircle2 size={18} /> Faktor Penilaian</p>
            <p className="text-sm text-gray-500 mt-2">Analisis kesehatan yang komprehensif</p>
          </div>
          <div className="fade-in" style={{animationDelay: '0.2s'}}>
            <p className="text-5xl font-bold text-primary-500 mb-2">3-5 min</p>
            <p className="text-gray-600 flex items-center justify-center gap-2"><Zap size={18} /> Waktu Penilaian</p>
            <p className="text-sm text-gray-500 mt-2">Hasil akurat dalam hitungan menit</p>
          </div>
          <div className="fade-in" style={{animationDelay: '0.3s'}}>
            <p className="text-5xl font-bold text-secondary-500 mb-2">100%</p>
            <p className="text-gray-600 flex items-center justify-center gap-2"><Shield size={18} /> Data Pribadi</p>
            <p className="text-sm text-gray-500 mt-2">Privasi & keamanan terjamin</p>
          </div>
        </div>
      </section>
    </div>
  );
}

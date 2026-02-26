import { Heart, Target, Lightbulb, Users, CheckCircle2, TrendingUp, Shield, Zap, Award, Compass, AlertCircle } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <Heart className="w-16 h-16 text-primary-500 mx-auto mb-6 heartbeat" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Tentang VitaCheck</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Memberdayakan individu dengan wawasan kesehatan yang cerdas untuk masa depan yang lebih sehat
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="slide-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Masalah yang Kami Selesaikan</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-6 py-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="text-primary-500" size={20} />
                  Kurangnya Kesadaran Kesehatan
                </h3>
                <p className="text-gray-600">
                  Kebanyakan orang tidak memahami faktor risiko kesehatan mereka sampai terlambat. Kesehatan preventif memerlukan kesadaran.
                </p>
              </div>
              <div className="border-l-4 border-secondary-500 pl-6 py-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="text-secondary-500" size={20} />
                  Penyakit Terkait Gaya Hidup
                </h3>
                <p className="text-gray-600">
                  Penyakit kronis dari pilihan gaya hidup yang buruk dapat dicegah dengan pengetahuan dan intervensi yang tepat.
                </p>
              </div>
              <div className="border-l-4 border-primary-500 pl-6 py-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="text-primary-500" size={20} />
                  Data Kesehatan Sulit Diakses
                </h3>
                <p className="text-gray-600">
                  Informasi kesehatan yang kompleks perlu disajikan dengan cara yang mudah dipahami dan dapat ditindaklanjuti.
                </p>
              </div>
            </div>
          </div>

          <div className="slide-up" style={{animationDelay: '0.1s'}}>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-24 h-24 text-primary-500 mx-auto heartbeat mb-4" />
                <p className="text-gray-700 font-semibold">Kesadaran kesehatan dimulai dengan memahami risiko Anda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Solusi Kami</h2>
            <p className="text-lg text-gray-600">VitaCheck memberikan penilaian risiko kesehatan yang cerdas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card slide-up group hover:shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <Target className="text-primary-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Penilaian Cerdas</h3>
              <p className="text-gray-600">
                Algoritma kami mengevaluasi berbagai faktor kesehatan termasuk BMI, gaya hidup, riwayat keluarga, dan banyak lagi untuk memberikan penilaian risiko yang komprehensif.
              </p>
            </div>

            <div className="card slide-up group hover:shadow-lg" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="text-secondary-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Interaktif</h3>
              <p className="text-gray-600">
                Visualisasikan metrik kesehatan Anda dengan grafik indah dan dashboard yang mudah dipahami yang membantu Anda melacak perjalanan kesehatan Anda.
              </p>
            </div>

            <div className="card slide-up group hover:shadow-lg" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <Lightbulb className="text-primary-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rekomendasi Personal</h3>
              <p className="text-gray-600">
                Terima rekomendasi kesehatan yang disesuaikan berdasarkan profil unik Anda, dengan langkah-langkah operasional yang dapat Anda ambil segera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Framework */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">Kerangka Inovasi Kami</h2>
            <p className="text-xl text-primary-100">INOVASI - Prinsip inti yang mendorong VitaCheck</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center slide-up group hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Inovasi</h3>
              <p className="text-primary-100 text-sm">Memperkenalkan teknologi terkini untuk penilaian kesehatan</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center slide-up group hover:bg-white/20 transition-all duration-300" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Compass className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Navigasi</h3>
              <p className="text-primary-100 text-sm">Membimbing pengguna melalui informasi kesehatan yang kompleks</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center slide-up group hover:bg-white/20 transition-all duration-300" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Optimasi</h3>
              <p className="text-primary-100 text-sm">Menyempurnakan algoritma dan pengalaman pengguna secara terus-menerus</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center slide-up group hover:bg-white/20 transition-all duration-300" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Validasi</h3>
              <p className="text-primary-100 text-sm">Memastikan akurasi dan keandalan dalam penilaian</p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center slide-up group hover:bg-white/20 transition-all duration-300" style={{animationDelay: '0.4s'}}>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Kemajuan</h3>
              <p className="text-primary-100 text-sm">Mendorong batas-batas dalam teknologi kesehatan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="slide-up">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="text-primary-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Visi Kami</h2>
            </div>
            <div className="bg-primary-50 border-2 border-primary-500 rounded-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Menciptakan dunia di mana setiap individu memiliki akses ke wawasan kesehatan yang cerdas yang memberdayakan mereka untuk membuat keputusan berdasarkan informasi tentang kesejahteraan mereka dan mencegah penyakit terkait gaya hidup melalui kesadaran dan panduan yang dipersonalisasi.
              </p>
            </div>
          </div>

          <div className="slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-secondary-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
            </div>
            <div className="bg-secondary-50 border-2 border-secondary-500 rounded-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Membangun platform yang didorong oleh teknologi yang mendidik, menganalisis, dan membimbing individu menuju gaya hidup yang lebih sehat dengan memberikan penilaian risiko kesehatan yang akurat, visualisasi data yang bermakna, dan rekomendasi yang dapat ditindaklanjuti berdasarkan sains medis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Nilai-Nilai Inti Kami</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center slide-up group hover:shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="text-primary-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Akurasi</h3>
              <p className="text-gray-600">Memberikan penilaian berbasis bukti yang dapat Anda percayai</p>
            </div>

            <div className="card text-center slide-up group hover:shadow-lg" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-secondary-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privasi</h3>
              <p className="text-gray-600">Melindungi informasi kesehatan pribadi Anda setiap saat</p>
            </div>

            <div className="card text-center slide-up group hover:shadow-lg" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-primary-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparansi</h3>
              <p className="text-gray-600">Jelas tentang bagaimana kami menghitung dan menggunakan data</p>
            </div>

            <div className="card text-center slide-up group hover:shadow-lg" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart className="text-secondary-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pemberdayaan</h3>
              <p className="text-gray-600">Memberdayakan Anda untuk mengendalikan kesehatan Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <Heart className="w-12 h-12 text-white mx-auto mb-6 heartbeat" />
          <h2 className="text-4xl font-bold mb-6">Bergabung dengan Ribuan yang Membuat Pilihan Lebih Sehat</h2>
          <p className="text-xl text-primary-100 mb-8">
            Mulai perjalanan kesehatan Anda dengan VitaCheck hari ini. Gratis, cepat, dan sepenuhnya rahasia.
          </p>
          <a href="/content" className="inline-block bg-white text-primary-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Mulai Sekarang →
          </a>
        </div>
      </section>
    </div>
  );
}


import { Heart, Target, Lightbulb, Users, CheckCircle2, TrendingUp, Shield, Zap, Award, Compass, AlertCircle } from 'lucide-react';

// Reusable Card Component
const Card = ({ icon: Icon, title, label, description, borderColor, bgGradient, iconColor, textColor }) => (
  <div className={`border-t-4 ${borderColor} ${bgGradient} rounded p-2 md:p-5 hover:shadow-md transition-all`}>
    <div className="flex justify-center mb-1 md:mb-4">
      <Icon className={`flex-shrink-0 block md:hidden ${iconColor}`} size={16} />
      <Icon className={`flex-shrink-0 hidden md:block ${iconColor}`} size={20} />
    </div>
    <h3 className="text-xs md:text-sm font-bold text-gray-900 text-center mb-1">{title}</h3>
    <p className={`text-xs font-semibold text-center mb-2 ${textColor}`}>{label}</p>
    <p className="text-xs text-gray-600 text-center leading-snug">{description}</p>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <section 
    className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
    style={{
      backgroundImage: 'url(/images/medical-pattern.png)',
      backgroundBlendMode: 'soft-light',
      backgroundColor: 'rgba(6, 120, 132, 0.65)',
      minHeight: 'auto'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-secondary-900/40"></div>
    
    {/* Desktop Version */}
    <div className="hidden md:flex relative z-10 py-16 items-center justify-center px-4 sm:px-6 lg:px-8 text-center fade-in">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Tentang VitaCheck
        </h1>
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              className="w-full h-full object-cover"
            >
              <source src="/videos/vita-animate.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-white/95 font-light leading-relaxed mb-3">
            Memberdayakan individu dengan wawasan kesehatan yang cerdas untuk masa depan yang lebih sehat
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary-300 to-secondary-300 mx-auto"></div>
        </div>
      </div>
    </div>

    {/* Mobile Version */}
    <div className="md:hidden relative z-10 w-full px-3 py-6 text-center fade-in">
      <div className="flex flex-col items-center">
        <h1 className="text-lg sm:text-xl font-bold text-white mb-3">Tentang VitaCheck</h1>
        <div className="mb-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden">
            <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover">
              <source src="/videos/vita-animate.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
          Memberdayakan individu dengan wawasan kesehatan yang cerdas untuk masa depan yang lebih sehat
        </p>
      </div>
    </div>
  </section>
);

export default function About() {
  return (
    <div>
      <HeroSection />

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Masalah yang Kami Selesaikan
          </h2>
          <p className="text-gray-600">
            Tiga tantangan kesehatan yang kami tangani dengan solusi cerdas
          </p>
        </div>

        {/* Desktop Version */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-white p-6 border border-primary-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  <AlertCircle className="text-primary-500 flex-shrink-0 mt-1" size={28} />
                  <h3 className="text-lg font-bold text-gray-900">Kesadaran Kesehatan</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Deteksi dini risiko kesehatan Anda sebelum terlambat. Pahami profil kesehatan dengan akurat untuk keputusan lebih bijak.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-50 to-white p-6 border border-secondary-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  <TrendingUp className="text-secondary-500 flex-shrink-0 mt-1" size={28} />
                  <h3 className="text-lg font-bold text-gray-900">Gaya Hidup Sehat</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Cegah penyakit kronis dengan rekomendasi gaya hidup yang dipersonalisasi sesuai kondisi Anda. Mulai perubahan hari ini.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  <Lightbulb className="text-blue-500 flex-shrink-0 mt-1" size={28} />
                  <h3 className="text-lg font-bold text-gray-900">Data Akurat</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Visualisasi data kesehatan kompleks dalam dashboard intuitif. Dapatkan insight bermanfaat untuk tindakan nyata.
                </p>
              </div>
            </div>
          </div>


        </div>

        {/* Mobile Version */}
        <div className="md:hidden">
          <div className="space-y-3 mb-6">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-50 to-white p-4 border border-primary-200/50 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-primary-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">Kesadaran Kesehatan</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Deteksi dini risiko sebelum terlambat dengan penilaian akurat.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary-50 to-white p-4 border border-secondary-200/50 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <TrendingUp className="text-secondary-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">Gaya Hidup Sehat</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Rekomendasi personal untuk cegah penyakit kronis. Mulai hari ini.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-white p-4 border border-blue-200/50 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">Data Akurat</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Dashboard intuitif untuk insight dan tindakan nyata.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Our Solution */}
      <section className="bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Solusi Kami
            </h2>
            <p className="text-xs md:text-base text-gray-600">
              Penilaian risiko kesehatan cerdas dan terpercaya untuk Anda
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-5">
            <Card
              icon={Target}
              title="Penilaian Cerdas"
              label="Solusi"
              description="Evaluasi BMI, gaya hidup, dan riwayat keluarga untuk penilaian akurat."
              borderColor="border-primary-500"
              bgGradient="bg-gradient-to-br from-primary-50 to-white"
              iconColor="text-primary-600"
              textColor="text-primary-600"
            />
            <Card
              icon={TrendingUp}
              title="Dashboard Interaktif"
              label="Visualisasi"
              description="Grafik dan dashboard intuitif untuk memantau kesehatan real-time."
              borderColor="border-orange-500"
              bgGradient="bg-gradient-to-br from-orange-50 to-white"
              iconColor="text-orange-600"
              textColor="text-orange-600"
            />
            <Card
              icon={Lightbulb}
              title="Rekomendasi Personal"
              label="Personal"
              description="Rekomendasi kesehatan yang dipersonalisasi sesuai profil Anda."
              borderColor="border-emerald-500"
              bgGradient="bg-gradient-to-br from-emerald-50 to-white"
              iconColor="text-emerald-600"
              textColor="text-emerald-600"
            />
          </div>
        </div>
      </section>

      {/* Innovation Framework */}
      <section className="bg-gray-50 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Kerangka Inovasi Kami
            </h2>
            <p className="text-xs md:text-base text-gray-600">
              Prinsip inti yang mendorong VitaCheck maju
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-5">
            <Card
              icon={Lightbulb}
              title="Inovasi"
              label="Teknologi"
              description="Teknologi terkini untuk solusi kesehatan lebih baik."
              borderColor="border-blue-500"
              bgGradient="bg-gradient-to-br from-blue-50 to-white"
              iconColor="text-blue-600"
              textColor="text-blue-600"
            />
            <Card
              icon={Compass}
              title="Navigasi"
              label="Panduan"
              description="Membimbing melalui informasi kesehatan kompleks dengan mudah."
              borderColor="border-purple-500"
              bgGradient="bg-gradient-to-br from-purple-50 to-white"
              iconColor="text-purple-600"
              textColor="text-purple-600"
            />
            <Card
              icon={Zap}
              title="Optimasi"
              label="Performa"
              description="Penyempurnaan untuk performa dan pengalaman terbaik."
              borderColor="border-cyan-500"
              bgGradient="bg-gradient-to-br from-cyan-50 to-white"
              iconColor="text-cyan-600"
              textColor="text-cyan-600"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Visi & Misi Kami
            </h2>
            <p className="text-xs md:text-base text-gray-600">Arah dan tujuan perjalanan kami</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-5">
            <Card
              icon={Lightbulb}
              title="Visi Kami"
              label="Masa Depan"
              description="Memberdayakan dengan wawasan kesehatan cerdas untuk keputusan lebih baik."
              borderColor="border-primary-500"
              bgGradient="bg-gradient-to-br from-primary-50 to-white"
              iconColor="text-primary-600"
              textColor="text-primary-600"
            />
            <Card
              icon={Target}
              title="Misi Kami"
              label="Tujuan"
              description="Platform teknologi untuk penilaian risiko akurat dan rekomendasi tindakan."
              borderColor="border-secondary-500"
              bgGradient="bg-gradient-to-br from-secondary-50 to-white"
              iconColor="text-secondary-600"
              textColor="text-secondary-600"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
              Nilai-Nilai Inti Kami
            </h2>
            <p className="text-xs md:text-base text-gray-600">Prinsip yang memandu setiap keputusan kami</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
            <Card
              icon={Award}
              title="Akurasi"
              label="Kepercayaan"
              description="Penilaian berbasis bukti yang dapat dipercaya."
              borderColor="border-red-500"
              bgGradient="bg-gradient-to-br from-red-50 to-white"
              iconColor="text-red-600"
              textColor="text-red-600"
            />
            <Card
              icon={Shield}
              title="Privasi"
              label="Keamanan"
              description="Perlindungan tingkat tinggi data kesehatan Anda."
              borderColor="border-blue-500"
              bgGradient="bg-gradient-to-br from-blue-50 to-white"
              iconColor="text-blue-600"
              textColor="text-blue-600"
            />
            <Card
              icon={Users}
              title="Transparansi"
              label="Keterbukaan"
              description="Jelas tentang cara kami menghitung data Anda."
              borderColor="border-purple-500"
              bgGradient="bg-gradient-to-br from-purple-50 to-white"
              iconColor="text-purple-600"
              textColor="text-purple-600"
            />
            <Card
              icon={Heart}
              title="Pemberdayaan"
              label="Kontrol"
              description="Kontrol kesehatan Anda dengan informasi akurat."
              borderColor="border-emerald-500"
              bgGradient="bg-gradient-to-br from-emerald-50 to-white"
              iconColor="text-emerald-600"
              textColor="text-emerald-600"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="relative py-12 md:py-16 text-white overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/section_last.png)',
          backgroundSize: 'cover',
          backgroundAttachment: 'scroll',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(6, 120, 132, 0.8)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/60 to-secondary-600/60"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        {/* Desktop Version */}
        <div className="hidden md:block relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full backdrop-blur-sm mb-6">
            <Heart className="w-7 h-7 text-white heartbeat" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight text-white">Saatnya Pilih Gaya Hidup Lebih Sehat Bersama Kami</h2>
            <p className="text-lg text-primary-100 mb-6 font-light leading-relaxed max-w-2xl mx-auto">
              Gratis, cepat, dan rahasia. Mulai perjalanan kesehatan Anda sekarang.
          </p>
          <a href="/content" className="inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 group">
            Mulai Sekarang
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>

        {/* Mobile Version */}
          <div className="md:hidden relative max-w-4xl mx-auto px-3 sm:px-4 text-center fade-in flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm mb-3">
              <Heart className="w-5 h-5 text-white heartbeat" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2.5 leading-snug text-white">Saatnya Pilih Gaya Hidup Lebih Sehat Bersama Kami</h2>
          <p className="text-xs sm:text-sm text-primary-100 mb-3 font-light leading-relaxed max-w-xl">
            Gratis, cepat, dan rahasia. Mulai perjalanan kesehatan Anda sekarang.
          </p>
          <a href="/content" className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group whitespace-nowrap">
            Mulai Sekarang
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

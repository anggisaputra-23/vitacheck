import { Link } from 'react-router-dom';
import { Activity, TrendingUp, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary-100 rounded-full opacity-20 float-animation"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary-100 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ketahui Risiko Kesehatan Anda dalam <span className="text-primary-500">Hitungan Menit</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Berdayakan diri Anda dengan wawasan kesehatan yang cerdas. Penganalisis risiko bertenaga AI kami mengevaluasi faktor gaya hidup Anda dan memberikan rekomendasi 
              personal untuk hasil kesehatan yang lebih baik.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link to="/content" className="btn-primary text-center flex items-center justify-center gap-2">
                <Activity size={20} />
                Mulai Analisis
              </Link>
              <button className="btn-outline text-center">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div className="fade-in delay-100">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-32 flex items-center justify-center">
                <Activity size={64} className="text-white heartbeat" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Dashboard Kesehatan Anda</h3>
                
                {/* Dashboard Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <TrendingUp size={20} className="text-primary-500" />
                      <span className="text-gray-700">Skor Risiko</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-500">--</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <Zap size={20} className="text-secondary-500" />
                      <span className="text-gray-700">Status BMI</span>
                    </div>
                    <span className="text-2xl font-bold text-primary-500">--</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <Activity size={20} className="text-secondary-500" />
                      <span className="text-gray-700">Level Risiko</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Analisis Sekarang</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  Isi formulir untuk mendapatkan wawasan kesehatan personal Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

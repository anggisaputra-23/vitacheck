import { CheckCircle, Heart, Activity, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConsultationSection() {
  const features = [
    {
      id: 1,
      title: 'Diagnosis Akurat',
      description: 'Pemeriksaan menyeluruh oleh tenaga medis',
      icon: CheckCircle,
      gradient: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Peduli & Profesional',
      description: 'Konsultasi dengan dokter berpengalaman',
      icon: Heart,
      gradient: 'from-rose-400 to-rose-600',
      textColor: 'text-rose-600'
    },
    {
      id: 3,
      title: 'Solusi Holistik',
      description: 'Panduan lengkap untuk kesehatan optimal',
      icon: Activity,
      gradient: 'from-emerald-400 to-emerald-600',
      textColor: 'text-emerald-600'
    }
  ];

  return (
    <section className="relative w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-3">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full w-fit">
              <Shield size={12} className="text-blue-600" />
              <span className="text-xs font-bold text-blue-700">Konsultasi dengan Dokter Profesional</span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-0.5">
                Kesehatan Anda adalah
              </h2>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
                Prioritas Kami
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-lg">
              Tim dokter profesional kami siap membantu Anda memahami kondisi kesehatan dan memberikan panduan terbaik untuk gaya hidup yang lebih sehat.
            </p>

            {/* Features Grid - 3 items vertical */}
            <div className="space-y-2.5 pt-1">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className={`w-7 h-7 rounded-md bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={14} className="text-white" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-grow">
                      {/* Title */}
                      <h3 className={`font-bold text-xs text-gray-900`}>
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-600 mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <Link
                to="/content"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Activity size={14} />
                <span>Konsultasi Sekarang</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right - Image Container */}
          <div className="relative flex items-center justify-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center group">
              <img 
                loading="lazy" 
                decoding="async"
                src="/images/dokterku.jpg"
                alt="Dokter Profesional"
                className="w-full h-full object-contain rounded-lg shadow-md border border-gray-200 group-hover:shadow-lg transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

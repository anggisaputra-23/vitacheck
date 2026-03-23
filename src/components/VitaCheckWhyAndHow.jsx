import { useState } from 'react';
import { CheckCircle, BarChart3, Zap } from 'lucide-react';

export default function VitaCheckWhyAndHow() {
  const [flipped, setFlipped] = useState({});

  const steps = [
    {
      number: '1',
      title: 'Masukkan Data',
      shortDesc: 'Usia, berat, tinggi, riwayat',
      icon: CheckCircle,
      color: 'bg-blue-600'
    },
    {
      number: '2',
      title: 'Analisis Komprehensif',
      shortDesc: 'Penilaian kesehatan mendalam',
      icon: BarChart3,
      color: 'bg-green-600'
    },
    {
      number: '3',
      title: 'Panduan Kesehatan',
      shortDesc: 'Rekomendasi praktis langsung',
      icon: Zap,
      color: 'bg-blue-600'
    }
  ];

  const toggleFlip = (index) => {
    setFlipped(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
            Proses Sederhana
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Bagaimana <span className="text-blue-600">VitaCheck</span> Bekerja
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            3 langkah mudah menuju hidup yang lebih sehat
          </p>
        </div>

        {/* Steps Cards - Horizontal on all screens */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isFlipped = flipped[index] || false;
            
            return (
              <div
                key={index}
                className="h-56 sm:h-64 cursor-pointer"
                onClick={() => toggleFlip(index)}
                style={{ perspective: '1500px' }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className="absolute inset-0 bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-gray-300 transition-shadow duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className={`${step.color} text-white p-3 rounded-xl shadow-md`}>
                        <Icon size={28} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>

                  {/* Back of Card */}
                  <div
                    className="absolute inset-0 bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-gray-300 transition-shadow duration-300"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, Lightbulb, ArrowRight, TrendingUp, Shield, X, Heart, Droplets, Brain, Scale, Activity, AlertTriangle, CheckCircle, Info, Flame, Apple, Leaf } from 'lucide-react';

const DISEASES_DATA = [
  {
    id: 1,
    title: 'Tekanan Darah Tinggi',
    subtitle: 'Hipertensi',
    IconComponent: Activity,
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-600',
    description: 'Tekanan darah secara konsisten di atas 140/90 mmHg',
    simpleExplanation: 'Tekanan darah yang terlalu kuat mendorong dinding pembuluh darah Anda. Ini seperti air yang mengalir terlalu cepat melalui pipa, dapat merusak organ penting terutama jantung dan otak.',
    symptoms: [
      'Sakit kepala, terutama di bagian belakang',
      'Pusing atau kepala terasa ringan',
      'Nyeri dada saat beraktivitas',
      'Sesak napas',
      'Mimisan',
      'Mudah lelah'
    ],
    causes: [
      'Terlalu banyak garam dalam makanan',
      'Kelebihan berat badan',
      'Jarang berolahraga',
      'Stress yang berkepanjangan',
      'Alkohol berlebihan',
      'Faktor turunan dari keluarga'
    ],
    prevention: [
      'Kurangi garam dalam makanan',
      'Olahraga 30 menit sehari',
      'Jaga berat badan ideal',
      'Kurangi stres (meditasi, yoga)',
      'Hindari alkohol berlebih',
      'Periksa tekanan darah rutin'
    ],
    treatment: 'Ubah gaya hidup: kurangi garam, olahraga, kurangi berat badan. Jika perlu, dokter memberikan obat untuk membantu.'
  },
  {
    id: 2,
    title: 'Gula Darah Tinggi',
    subtitle: 'Diabetes Tipe 2',
    IconComponent: Droplets,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-600',
    description: 'Gula darah puasa di atas 125 mg/dL',
    simpleExplanation: 'Tubuh Anda tidak bisa mengelola gula dengan baik. Gula menumpuk di darah, seperti air gula yang terlalu pekat dalam botol, dapat merusak pembuluh darah dan saraf.',
    symptoms: [
      'Haus yang berlebihan',
      'Sering buang air kecil',
      'Lapar terus menerus',
      'Lelah dan lemas',
      'Penglihatan mulai kabur',
      'Luka lama sembuhnya'
    ],
    causes: [
      'Kelebihan berat badan',
      'Jarang bergerak atau olahraga',
      'Terlalu banyak makan gula dan karbohidrat putih',
      'Faktor turunan',
      'Bertambah tua',
      'Stres lama-lama'
    ],
    prevention: [
      'Jaga berat badan ideal',
      'Olahraga 30 menit setiap hari',
      'Kurangi makanan manis dan tepung putih',
      'Makan makanan berserat (sayur, buah)',
      'Hindari minuman bersoda dan manis',
      'Periksa gula darah jika ada faktor risiko'
    ],
    treatment: 'Ubah pola makan: kurangi gula, makan makanan sehat. Olahraga teratur. Jika perlu, dokter memberikan obat atau insulin.'
  },
  {
    id: 3,
    title: 'Kolesterol Tinggi',
    subtitle: 'Lemak Darah Tinggi',
    IconComponent: Heart,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-600',
    description: 'Kolesterol total di atas 200 mg/dL',
    simpleExplanation: 'Terlalu banyak lemak menempel di dinding pembuluh darah Anda. Seperti minyak yang menyumbat pipa air, ini mengurangi aliran darah dan meningkatkan risiko serangan jantung.',
    symptoms: [
      'Biasanya tidak ada gejala (bahaya tanpa tanda)',
      'Tidak terasa sakit atau tidak nyaman',
      'Hanya terdeteksi melalui pemeriksaan darah'
    ],
    causes: [
      'Makanan tinggi lemak jenuh (daging berlemak, mentega)',
      'Jarang bergerak atau olahraga',
      'Kelebihan berat badan',
      'Faktor keturunan',
      'Merokok',
      'Alkohol terlalu banyak'
    ],
    prevention: [
      'Pilih makanan rendah lemak',
      'Hindari makanan yang digoreng',
      'Olahraga 5 kali seminggu',
      'Jaga berat badan',
      'Berhenti merokok',
      'Periksa kolesterol rutin setiap tahun'
    ],
    treatment: 'Ubah pola makan: kurangi lemak jenuh, pilih makanan sehat. Olahraga rutin. Jika tinggi, dokter berikan obat penurun kolesterol.'
  },
  {
    id: 4,
    title: 'Penyakit Jantung',
    subtitle: 'Jantung Koroner',
    IconComponent: Heart,
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-600',
    description: 'Penyumbatan arteri yang memasok darah ke jantung',
    simpleExplanation: 'Pembuluh darah jantung menyempit karena penumpukan lemak. Jantung tidak mendapat cukup oksigen, seperti orang yang nafasnya terputus-putus saat naik tangga.',
    symptoms: [
      'Nyeri atau tertekan di dada saat aktivitas',
      'Sesak napas',
      'Sangat lelah dan lemas',
      'Nyeri di lengan, leher, atau bahu',
      'Berkeringat dingin',
      'Mual atau pusing'
    ],
    causes: [
      'Kolesterol tinggi yang terakumulasi',
      'Tekanan darah tinggi',
      'Diabetes',
      'Merokok',
      'Gaya hidup tidak aktif',
      'Stres berkepanjangan'
    ],
    prevention: [
      'Hentikan merokok',
      'Jaga tekanan darah normal',
      'Kontrol gula darah',
      'Olahraga 150 menit per minggu',
      'Kelola stres dengan baik',
      'Batasi alkohol',
      'Jaga berat badan'
    ],
    treatment: 'Obat untuk mengencer darah dan menurunkan kolesterol. Jika serius, mungkin perlu operasi atau angioplasti untuk membuka pembuluh darah.'
  },
  {
    id: 5,
    title: 'Stroke',
    subtitle: 'Serangan Otak',
    IconComponent: Brain,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-600',
    description: 'Aliran darah ke otak tiba-tiba terputus atau pecah',
    simpleExplanation: 'Otak Anda kehilangan aliran darah mendadak. Seperti pohon yang tidak dapat air, sel-sel otak mulai mati dalam beberapa menit. Ini adalah DARURAT medis.',
    symptoms: [
      'Kelemahan atau kelumpuhan tiba-tiba di satu sisi wajah',
      'Kesulitan berbicara atau berbicara tidak jelas',
      'Penglihatan kabur atau gelap',
      'Pesepak tidak menyeimbang atau jatuh',
      'Sakit kepala yang sangat berat',
      'Kesulitan menelan'
    ],
    causes: [
      'Tekanan darah tinggi tidak terkontrol',
      'Penyumbatan pembuluh darah (kolesterol)',
      'Detak jantung tidak teratur',
      'Merokok',
      'Diabetes tidak terkontrol',
      'Gaya hidup tidak aktif'
    ],
    prevention: [
      'Jaga tekanan darah selalu < 140/90 mmHg',
      'Kontrol diabetes dengan baik',
      'Hentikan merokok SEKARANG',
      'Kurangi garam',
      'Olahraga 150 menit seminggu',
      'Kelola stres',
      'Periksa kesehatan rutin'
    ],
    treatment: 'SEGERA KE RUMAH SAKIT! Waktu sangat kritis (3-4 jam pertama). Dokter akan memberikan obat khusus atau tindakan untuk membuka pembuluh darah.'
  },
  {
    id: 6,
    title: 'Berat Badan Berlebih',
    subtitle: 'Obesitas',
    IconComponent: Scale,
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-600',
    description: 'BMI di atas 30 (berat badan terlalu berlebihan)',
    simpleExplanation: 'Tubuh Anda membawa beban ekstra yang terlalu berat. Ini merusak sendi, jantung, dan pembuluh darah Anda. Seperti membawa tas terlalu berat setiap hari sepanjang hidup.',
    symptoms: [
      'Berat badan jauh di atas target',
      'Sulit bergerak atau naik tangga',
      'Sesak napas saat beraktivitas ringan',
      'Nyeri di lutut atau sendi',
      'Mendengkur atau tidur terganggu',
      'Keringat berlebih'
    ],
    causes: [
      'Makan lebih banyak dari yang dibutuhkan',
      'Makanan tinggi kalori (fast food, snack manis)',
      'Jarang menggerakkan tubuh',
      'Faktor keturunan',
      'Gangguan metabolisme',
      'Makan saat stres atau sedih'
    ],
    prevention: [
      'Seimbangkan kalori masuk dan keluar',
      'Makan makanan sehat dan seimbang',
      'Kurangi makanan junk food dan minuman manis',
      'Olahraga 30 menit setiap hari',
      'Kurangi porsi makanan',
      'Tidur cukup 7-9 jam',
      'Kelola stress dengan baik'
    ],
    treatment: 'Ubah pola makan ke makanan lebih sehat dan berserat. Olahraga rutin. Jika sangat berat, dokter bisa bantu dengan program diet khusus.'
  }
];

const FRUITS_VEGETABLES = [
  {
    id: 1,
    name: 'Apel',
    type: 'Buah',
    icon: Apple,
    color: 'red',
    bgColor: 'bg-red-50',
    benefitColor: 'text-red-600',
    benefits: ['Kaya serat', 'Vitamin C tinggi', 'Turunkan kolesterol'],
    description: 'Apel merah kaya akan antioksidan dan serat yang baik untuk pencernaan dan jantung',
    nutrition: {
      kalori: '52 kal/buah',
      serat: '2.4g',
      vitamin: 'Vitamin C, K'
    },
    healthBenefits: ['Mencegah penyakit jantung', 'Menjaga kesehatan usus', 'Kontrol gula darah'],
    tips: 'Makan apel dengan kulitnya untuk mendapat lebih banyak serat'
  },
  {
    id: 2,
    name: 'Pisang',
    type: 'Buah',
    icon: Apple,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    benefitColor: 'text-yellow-600',
    benefits: ['Kalium tinggi', 'Energi instan', 'Tekanan darah sehat'],
    description: 'Pisang kaya kalium yang membantu menjaga kesehatan jantung dan keseimbangan cairan tubuh',
    nutrition: {
      kalori: '89 kal/buah',
      kalium: '358mg',
      vitamin: 'Vitamin B6'
    },
    healthBenefits: ['Mencegah hipertensi', 'Meningkatkan energi', 'Kesehatan sistem saraf'],
    tips: 'Konsumsi 1-2 pisang per hari untuk manfaat optimal'
  },
  {
    id: 3,
    name: 'Wortel',
    type: 'Sayuran',
    icon: Leaf,
    color: 'orange',
    bgColor: 'bg-orange-50',
    benefitColor: 'text-orange-600',
    benefits: ['Beta karoten', 'Kesehatan mata', 'Antioksidan kuat'],
    description: 'Wortel mengandung beta karoten yang diubah tubuh menjadi vitamin A untuk kesehatan mata',
    nutrition: {
      kalori: '25 kal/100g',
      betaKaroten: 'Tinggi',
      vitamin: 'Vitamin A, C, K'
    },
    healthBenefits: ['Kesehatan mata tajam', 'Kulit lebih sehat', 'Daya tahan tubuh meningkat'],
    tips: 'Wortel mentah lebih kaya nutrisi, tapi bisa juga dimasak'
  },
  {
    id: 4,
    name: 'Brokoli',
    type: 'Sayuran',
    icon: Leaf,
    color: 'green',
    bgColor: 'bg-green-50',
    benefitColor: 'text-green-600',
    benefits: ['Sulforaphane', 'Kanker pencegah', 'Kaya mineral'],
    description: 'Brokoli adalah superfood dengan senyawa anti kanker alami dan nutrisi lengkap',
    nutrition: {
      kalori: '34 kal/100g',
      serat: '2.4g',
      vitamin: 'Vitamin C, K, folat'
    },
    healthBenefits: ['Pencegahan kanker', 'Kekuatan tulang', 'Kesehatan hati'],
    tips: 'Jangan masak terlalu lama, konsumsi setengah matang untuk nutrisi maksimal'
  },
  {
    id: 5,
    name: 'Bayam',
    type: 'Sayuran',
    icon: Leaf,
    color: 'green',
    bgColor: 'bg-emerald-50',
    benefitColor: 'text-emerald-600',
    benefits: ['Zat besi tinggi', 'Folat lengkap', 'Darah sehat'],
    description: 'Bayam kaya zat besi organik dan folat yang penting untuk pembentukan sel darah merah',
    nutrition: {
      kalori: '23 kal/100g',
      zatBesi: 'Tinggi',
      vitamin: 'Vitamin A, K, C, folat'
    },
    healthBenefits: ['Cegah anemia', 'Kognitif lebih baik', 'Energi meningkat'],
    tips: 'Konsumsi bayam mentah dalam salad atau masak sebentar'
  },
  {
    id: 6,
    name: 'Jeruk',
    type: 'Buah',
    icon: Apple,
    color: 'orange',
    bgColor: 'bg-orange-50',
    benefitColor: 'text-orange-600',
    benefits: ['Vitamin C besar', 'Imun kuat', 'Antioksidan'],
    description: 'Jeruk adalah sumber vitamin C terbaik yang memperkuat sistem imun dan daya tahan tubuh',
    nutrition: {
      kalori: '47 kal/buah',
      vitaminC: '53mg',
      serat: '2.4g'
    },
    healthBenefits: ['Daya tahan imun meningkat', 'Penyembuhan cepat', 'Kesehatan kulit'],
    tips: 'Makan jeruk segera setelah dikupas agar vitamin C tidak hilang'
  },
  {
    id: 7,
    name: 'Mangga',
    type: 'Buah',
    icon: Apple,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    benefitColor: 'text-yellow-600',
    benefits: ['Vitamin A tinggi', 'Enzim pencernaan', 'Rasa manis alami'],
    description: 'Mangga kaya dengan vitamin A dan enzim mangiferin yang membantu pencernaan',
    nutrition: {
      kalori: '60 kal/100g',
      vitaminA: 'Tinggi',
      serat: '1.6g'
    },
    healthBenefits: ['Pencernaan lancar', 'Kesehatan kulit membaik', 'Antioksidan perkuat'],
    tips: 'Pilih mangga yang wangi dan sedikit lembut untuk rasa terbaik'
  },
  {
    id: 8,
    name: 'Tomat',
    type: 'Sayuran',
    icon: Leaf,
    color: 'red',
    bgColor: 'bg-red-50',
    benefitColor: 'text-red-600',
    benefits: ['Likopen kuat', 'Jantung sehat', 'Kanker pencegah'],
    description: 'Tomat mengandung likopen, senyawa yang melindungi jantung dan cegah kanker prostat',
    nutrition: {
      kalori: '18 kal/100g',
      likopen: 'Tinggi (matang lebih banyak)',
      serat: '1.2g'
    },
    healthBenefits: ['Kesehatan jantung', 'Pencegahan kanker', 'Tekanan darah stabil'],
    tips: 'Tomat yang sudah matang memiliki likopen lebih tinggi'
  }
];

export default function Home() {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeoutRef = useState(null);
  const CARD_WIDTH = 344; // 320px (w-80) + 24px gap
  const TOTAL_CARDS = DISEASES_DATA.length;

  const scrollToIndex = (index) => {
    const container = document.getElementById('disease-scroll-container');
    if (container) {
      // Add boundary checks - don't wrap around
      const boundedIndex = Math.max(0, Math.min(index, TOTAL_CARDS - 1));
      const scrollPosition = boundedIndex * CARD_WIDTH;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(boundedIndex);
    }
  };

  const handleNavigate = (direction) => {
    const nextIndex = direction === 'left' 
      ? currentIndex - 1
      : currentIndex + 1;
    scrollToIndex(nextIndex);
  };

  const handleScroll = (e) => {
    if (scrollTimeoutRef[0]) {
      clearTimeout(scrollTimeoutRef[0]);
    }

    scrollTimeoutRef[0] = setTimeout(() => {
      const scrollLeft = e.target.scrollLeft;
      const nearestIndex = Math.round(scrollLeft / CARD_WIDTH);
      const boundedIndex = Math.max(0, Math.min(nearestIndex, TOTAL_CARDS - 1));
      setCurrentIndex(boundedIndex);
    }, 100);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Mengapa Memilih VitaCheck?</h2>
          <p className="text-lg text-gray-700 font-medium">Penilaian kesehatan menyeluruh dengan hasil akurat dan panduan personal</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card group hover:shadow-lg slide-up">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <Zap className="text-primary-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Penilaian Cepat</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Dapatkan hasil analisis kesehatan lengkap dalam hitungan menit dengan sistem pemeriksaan profesional.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card group hover:shadow-lg slide-up" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <BarChart3 className="text-secondary-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Visualisasi Data</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Dashboard interaktif yang memudahkan Anda memahami hasil kesehatan dengan visualisasi yang jelas.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card group hover:shadow-lg slide-up" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
              <Lightbulb className="text-primary-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Wawasan Personal</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Terima rekomendasi kesehatan yang disesuaikan dengan profil dan kebutuhan unik Anda.
            </p>
          </div>
        </div>

        {/* Disease Education Section - Horizontal Scroll */}
        <div className="mt-20 pt-20 border-t-2 border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pelajari Tentang Kondisi Kesehatan</h2>
            <p className="text-lg text-gray-700 font-medium">Informasi lengkap untuk pemahaman kesehatan yang lebih baik</p>
          </div>

          {/* Scroll Container dengan wrapper */}
          <div className="relative group">
            {/* Scroll Container */}
            <div
              id="disease-scroll-container"
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto pb-4 px-4 scroll-smooth scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {DISEASES_DATA.map((disease, index) => {
                const Icon = disease.IconComponent;
                return (
                  <button
                    key={disease.id}
                    onClick={() => setSelectedDisease(disease)}
                    className={`flex-shrink-0 w-full sm:w-80 text-left transition-all duration-300 transform hover:scale-105 group cursor-pointer snap-center`}
                  >
                    <div className={`${disease.bgColor} rounded-xl p-6 border-2 ${disease.borderColor} h-full cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden`}>
                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <Icon className={`text-${disease.color}-600`} size={40} />
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-gray-700 border border-gray-300">
                            Pelajari
                          </span>
                        </div>
                        <h4 className={`text-xl font-bold text-gray-900 mb-2 transition-colors duration-300`}>
                          {disease.title}
                        </h4>
                        <p className={`text-sm font-semibold mb-3 text-${disease.color}-700`}>
                          {disease.subtitle}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          {disease.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                          <span className={`font-semibold text-sm text-${disease.color}-600`}>Baca selengkapnya</span>
                          <ArrowRight className={`text-${disease.color}-600 group-hover:translate-x-1 transition-transform duration-300`} size={18} />
                        </div>
                      </div>

                      {/* Bottom Accent Line */}
                      <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300`} style={{background: `linear-gradient(to right, var(--color-accent))`}}></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Left Scroll Button */}
            <button
              onClick={() => handleNavigate('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-40 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full p-3 shadow-lg hover:shadow-2xl hover:scale-125 active:scale-95 transition-all"
              title="Item Sebelumnya"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => handleNavigate('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-40 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-full p-3 shadow-lg hover:shadow-2xl hover:scale-125 active:scale-95 transition-all"
              title="Item Berikutnya"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
              {/* Indicator Dots */}
              <div className="flex gap-2">
                {DISEASES_DATA.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${
                      index === currentIndex 
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 w-8 h-2.5 shadow-md shadow-primary-300' 
                        : 'bg-gray-300 w-2 h-2 hover:bg-gray-400 hover:scale-125'
                    }`}
                    title={`${DISEASES_DATA[index].title}`}
                    aria-label={`Go to ${DISEASES_DATA[index].title}`}
                  />
                ))}
              </div>
            </div>

            {/* Gradient Fade Effect Left */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>

            {/* Gradient Fade Effect Right */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* Modal Detail Penyakit */}
      {selectedDisease && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className={`bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl`}>
            {/* Header Modal dengan Gradient */}
            <div style={{background: `linear-gradient(to right, #ef4444, #dc2626)`}} className={`text-white p-8 relative`}>
              <button
                onClick={() => setSelectedDisease(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                {selectedDisease.IconComponent && (
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                    <selectedDisease.IconComponent size={48} />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">{selectedDisease.title}</h2>
                  <p className="text-white text-opacity-90 mt-2 text-lg">{selectedDisease.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Penjelasan Sederhana */}
              <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Apa itu?</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-6 rounded-lg border-l-4 border-gray-300">
                  {selectedDisease.simpleExplanation}
                </p>
              </div>

              {/* Gejala */}
              <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Gejala & Tanda-tanda</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedDisease.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200 hover:shadow-md transition-shadow duration-200 hover:border-red-400">
                      <AlertTriangle className="text-red-600 flex-shrink-0" size={18} />
                      <span className="text-gray-800">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Penyebab */}
              <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Flame className="text-orange-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Penyebab & Faktor Risiko</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedDisease.causes.map((cause, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-md transition-shadow duration-200 hover:border-orange-400">
                      <AlertTriangle className="text-orange-600 flex-shrink-0" size={20} />
                      <span className="text-gray-800">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pencegahan */}
              <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Pencegahan & Gaya Hidup Sehat</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedDisease.prevention.map((prevent, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-200 hover:border-green-400">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-800">{prevent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pengobatan */}
              <div className="animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Droplets className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Pengobatan & Manajemen</h3>
                </div>
                <div className="p-6 rounded-lg bg-blue-50 border-2 border-blue-300 hover:shadow-lg transition-shadow duration-200">
                  <p className="text-gray-800 leading-relaxed text-lg font-medium">
                    {selectedDisease.treatment}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="animate-fadeIn mt-8 pt-8 border-t-2 border-gray-300" style={{animationDelay: '0.6s'}}>
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-gray-800 font-semibold mb-2">
                        Penting: Informasi Edukasi
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Informasi ini hanya untuk tujuan edukasi dan kesadaran kesehatan. BUKAN pengganti konsultasi dokter. Jika Anda mengalami gejala atau memiliki kekhawatiran kesehatan, segera konsultasikan dengan profesional medis yang berkualifikasi untuk diagnosis dan pengobatan yang tepat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 flex justify-end gap-4 border-t-2 border-gray-300">
              <button
                onClick={() => setSelectedDisease(null)}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Tutup
              </button>
              <Link
                to="/content"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                onClick={() => setSelectedDisease(null)}
              >
                Cek Risiko Sekarang <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Bagaimana VitaCheck Bekerja</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">3 langkah mudah menuju hidup yang lebih sehat</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="group animate-fadeIn">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-300/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Number Circle */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-125 transition-transform duration-300">
                    1
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Masukkan Data</h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Bagikan informasi kesehatan Anda seperti usia, berat badan, tinggi, dan riwayat kesehatan.
                  </p>
                  
                  {/* Bottom accent */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center justify-center absolute left-1/3 top-32 -translate-x-1/2 z-20">
              <div className="animate-bounce" style={{animationDelay: '0.5s'}}>
                <ArrowRight className="text-primary-500 opacity-50" size={28} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="group animate-fadeIn" style={{animationDelay: '0.1s'}}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-secondary-300/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Number Circle */}
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-125 transition-transform duration-300">
                    2
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Analisis Komprehensif</h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Sistem kami menganalisis data Anda untuk memberikan penilaian kesehatan yang mendalam dan akurat.
                  </p>
                  
                  {/* Bottom accent */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-secondary-500 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center justify-center absolute left-2/3 top-32 -translate-x-1/2 z-20">
              <div className="animate-bounce">
                <ArrowRight className="text-secondary-500 opacity-50" size={28} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="group animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-300/20 to-secondary-300/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Number Circle */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-secondary-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-125 transition-transform duration-300">
                    3
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Panduan Kesehatan</h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Dapatkan rekomendasi praktis yang dapat langsung Anda terapkan untuk meningkatkan kesehatan Anda.
                  </p>
                  
                  {/* Bottom accent */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-primary-500 via-secondary-500 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50/50 to-secondary-50/50"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fadeIn">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/60 border border-primary-200 rounded-full w-fit">
                <Shield size={16} className="text-primary-700" />
                <span className="text-sm font-semibold text-primary-700">Konsultasi dengan Dokter Profesional</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Kesehatan Anda adalah
                <span className="block text-primary-700">Prioritas Kami</span>
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl font-medium">
                Tim dokter profesional kami siap membantu Anda memahami kondisi kesehatan dan memberikan panduan terbaik untuk gaya hidup yang lebih sehat.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <CheckCircle size={24} className="text-primary-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Diagnosis Akurat</p>
                    <p className="text-sm text-gray-600 font-medium">Pemeriksaan menyeluruh oleh tenaga medis</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Heart size={24} className="text-secondary-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Peduli & Profesional</p>
                    <p className="text-sm text-gray-600 font-medium">Konsultasi dengan dokter berpengalaman</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Activity size={24} className="text-primary-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Solusi Holistik</p>
                    <p className="text-sm text-gray-600 font-medium">Panduan lengkap untuk kesehatan optimal</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link 
                  to="/content"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Activity size={20} />
                  Konsultasi Sekarang
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right - Doctor Image */}
            <div className="relative mt-8 lg:mt-0 flex justify-center animate-slideUp" style={{animationDelay: '0.2s'}}>
              {/* Floating orbs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>

              {/* Image Container */}
              <div className="relative w-full max-w-md">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-300/20 to-secondary-300/20 rounded-3xl blur-3xl"></div>

                {/* Image */}
                <img 
                  src="/dokterku.jpg" 
                  alt="Dokter Profesional" 
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-105 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fruits & Vegetables Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-20 animate-fadeIn">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Buah & Sayuran Sehat
          </h2>
          <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto mb-2">
            Pelajari manfaat kesehatan dari berbagai jenis buah dan sayuran
          </p>
          <p className="text-sm text-gray-600">
            Dengan nutrisi lengkap dan informasi konsumsi optimal
          </p>
        </div>

        {/* Fruits & Vegetables Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {FRUITS_VEGETABLES.map((item, index) => {
            const IconComponent = item.icon;
            
            // Color mapping for Tailwind classes
            const colorMap = {
              red: { border: 'border-red-300', bg: 'bg-red-50', icon: 'text-red-600', gradient: 'from-red-400 to-red-600' },
              yellow: { border: 'border-yellow-300', bg: 'bg-yellow-50', icon: 'text-yellow-600', gradient: 'from-yellow-400 to-yellow-600' },
              orange: { border: 'border-orange-300', bg: 'bg-orange-50', icon: 'text-orange-600', gradient: 'from-orange-400 to-orange-600' },
              green: { border: 'border-green-300', bg: 'bg-green-50', icon: 'text-green-600', gradient: 'from-green-400 to-green-600' }
            };
            const colors = colorMap[item.color] || colorMap.green;
            
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFruit(item)}
                className={`group relative ${colors.bg} rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer animate-fadeIn border border-gray-200 hover:border-white`}
                style={{animationDelay: `${index * 0.08}s`}}
              >
                {/* Top accent bar */}
                <div className={`h-1 bg-gradient-to-r ${colors.gradient}`}></div>

                {/* Card Content - Minimal */}
                <div className="p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[160px]">
                  {/* Icon */}
                  <IconComponent size={32} className={`${colors.icon} group-hover:scale-110 transition-transform`} />
                  
                  {/* Name */}
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  
                  {/* Type Badge */}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.icon} bg-white/70`}>
                    {item.type}
                  </span>

                  {/* Key Nutrition Info */}
                  <div className="text-xs bg-white/60 rounded px-2.5 py-1.5 w-full">
                    {Object.entries(item.nutrition).slice(0, 1).map(([key, value]) => (
                      <div key={key}>
                        <span className={`font-semibold ${colors.icon}`}>{key}:</span> <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation Banner */}
        <div className="bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 rounded-xl p-4 border border-primary-200/30 backdrop-blur-sm mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h3 className="text-lg font-bold text-gray-900">
              Konsumsi minimal 5 porsi sehari
            </h3>
            
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Apple size={18} className="text-red-600" />
                <span className="text-sm font-semibold text-gray-900">2-3 Buah</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Leaf size={18} className="text-green-600" />
                <span className="text-sm font-semibold text-gray-900">2-3 Sayuran</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Detail Buah & Sayuran */}
      {selectedFruit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className={`bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl`}>
            {/* Header Modal dengan Gradient */}
            <div style={{background: selectedFruit.color === 'red' ? 'linear-gradient(to right, #ef4444, #dc2626)' : selectedFruit.color === 'yellow' ? 'linear-gradient(to right, #eab308, #ca8a04)' : selectedFruit.color === 'orange' ? 'linear-gradient(to right, #f97316, #ea580c)' : 'linear-gradient(to right, #22c55e, #16a34a)'}} className="text-white p-8 relative rounded-t-2xl">
              <button
                onClick={() => setSelectedFruit(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4">
                {selectedFruit.icon === Apple ? (
                  <Apple className="text-white" size={48} />
                ) : (
                  <Leaf className="text-white" size={48} />
                )}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">{selectedFruit.name}</h2>
                  <p className="text-white text-opacity-90 mt-1 text-lg font-medium">{selectedFruit.type}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Deskripsi */}
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-4">
                  <div style={{backgroundColor: selectedFruit.color === 'red' ? '#fee2e2' : selectedFruit.color === 'yellow' ? '#fef08a' : selectedFruit.color === 'orange' ? '#ffedd5' : '#dcfce7'}} className="p-2 rounded-lg">
                    <Info style={{color: selectedFruit.color === 'red' ? '#dc2626' : selectedFruit.color === 'yellow' ? '#a16207' : selectedFruit.color === 'orange' ? '#ea580c' : '#16a34a'}} size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Informasi</h3>
                </div>
                <div style={{backgroundColor: selectedFruit.color === 'red' ? '#fef2f2' : selectedFruit.color === 'yellow' ? '#fefce8' : selectedFruit.color === 'orange' ? '#fff7ed' : '#f0fdf4', borderLeft: `4px solid ${selectedFruit.color === 'red' ? '#dc2626' : selectedFruit.color === 'yellow' ? '#ca8a04' : selectedFruit.color === 'orange' ? '#ea580c' : '#16a34a'}`}} className="p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed text-lg">{selectedFruit.description}</p>
                </div>
              </div>

              {/* Manfaat Kesehatan */}
              <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Manfaat Kesehatan</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedFruit.healthBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-200">
                      <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrisi Lengkap */}
              <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Droplets className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nutrisi Utama</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(selectedFruit.nutrition).map(([key, value]) => (
                    <div key={key} className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200">
                      <p className="text-sm font-semibold text-blue-600 mb-1 uppercase">{key}</p>
                      <p className="text-xl font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manfaat Utama */}
              <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Lightbulb className="text-yellow-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Manfaat Utama</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedFruit.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips Konsumsi */}
              <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="text-orange-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Tips Konsumsi</h3>
                </div>
                <div className="p-6 rounded-lg bg-orange-50 border-2 border-orange-300 hover:shadow-lg transition-shadow duration-200">
                  <p className="text-gray-800 leading-relaxed text-lg font-medium">
                    {selectedFruit.tips}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="animate-fadeIn mt-8 pt-8 border-t-2 border-gray-300" style={{animationDelay: '0.5s'}}>
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-gray-800 font-semibold mb-2">
                        Informasi Edukasi
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Informasi ini hanya untuk tujuan edukasi dan kesadaran kesehatan. Untuk rekomendasi diet khusus atau kondisi kesehatan tertentu, konsultasikan dengan profesional medis atau ahli gizi yang berkualifikasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 flex justify-end gap-4 border-t-2 border-gray-300">
              <button
                onClick={() => setSelectedFruit(null)}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

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
            <p className="text-gray-600 flex items-center justify-center gap-2"><CheckCircle size={18} /> Faktor Penilaian</p>
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

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scrollPulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        /* Carousel Snap Styles */
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-mandatory {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
          scroll-snap-stop: always;
        }
        
        /* Smooth scroll */
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
        /* Hide scrollbar */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Custom scrollbar for better look */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

import { useState, Suspense, lazy } from 'react';
import VitaCheckWhyAndHow from '../components/VitaCheckWhyAndHow';
import ConsultationSection from '../components/ConsultationSection';
import { Link } from 'react-router-dom';

const ChatBot = lazy(() => import('../components/ChatBot'));
import { BarChart3, Lightbulb, ArrowRight, TrendingUp, Shield, X, Heart, Droplets, Brain, Scale, Activity, AlertTriangle, CheckCircle, Info, Flame, Apple, Leaf, Zap, Banana, Carrot, Salad, LeafyGreen, Citrus, Wind, Bone } from 'lucide-react';
import { MangoIcon } from '../components/MangoIcon';
import { AvocadoIcon } from '../components/AvocadoIcon';
import { DragonFruitIcon } from '../components/DragonFruitIcon';
import { WatermelonIcon } from '../components/WatermelonIcon';
import { TimunIcon } from '../components/TimunIcon';
import { TomatoIcon } from '../components/TomatoIcon';

const DISEASES_DATA = [
  {
    id: 1,
    title: 'Diabetes Mellitus',
    subtitle: 'Penyakit Gula Darah',
    IconComponent: Droplets,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-600',
    description: 'Kondisi kronis dimana tubuh tidak dapat mengelola gula darah dengan baik',
    simpleExplanation: 'Tubuh Anda tidak bisa menggunakan gula dengan efisien. Gula menumpuk di darah seperti air gula yang terlalu pekat dalam botol, dapat merusak pembuluh darah dan saraf. Insulin tidak bekerja optimal atau tubuh tidak memproduksi cukup insulin.',
    symptoms: [
      'Haus yang berlebihan',
      'Sering buang air kecil, terutama di malam hari',
      'Lapar terus menerus meski baru makan',
      'Lelah dan lemas yang tidak jelas penyebabnya',
      'Penglihatan mulai kabur atau berubah',
      'Luka atau luka infeksi yang lama sembuhnya'
    ],
    causes: [
      'Kelebihan berat badan dan gaya hidup sedentari',
      'Jarang bergerak atau berolahraga',
      'Terlalu banyak makan makanan manis dan karbohidrat putih',
      'Faktor keturunan atau genetik dari keluarga',
      'Bertambah tua (risiko meningkat setelah usia 45)',
      'Stres berkepanjangan yang tidak dikelola'
    ],
    prevention: [
      'Jaga berat badan ideal dengan diet seimbang',
      'Olahraga minimal 30 menit setiap hari',
      'Kurangi makanan manis dan karbohidrat putih',
      'Makan makanan tinggi serat (sayuran, buah, biji-bijian)',
      'Hindari minuman bersoda, beralkohol dan berenergi tinggi',
      'Periksa gula darah rutin jika ada faktor risiko',
      'Kelola stress dengan baik melalui meditasi atau yoga'
    ],
    treatment: 'Ubah pola makan ke makanan sehat dan berserat. Olahraga rutin minimal 150 menit per minggu. Jika perlu, dokter memberikan obat metformin atau insulin untuk kontrol gula darah.'
  },
  {
    id: 2,
    title: 'Hipertensi',
    subtitle: 'Tekanan Darah Tinggi',
    IconComponent: Activity,
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-600',
    description: 'Tekanan darah secara konsisten di atas 140/90 mmHg',
    simpleExplanation: 'Tekanan darah yang terlalu kuat mendorong dinding pembuluh darah Anda. Ini seperti air yang mengalir terlalu cepat melalui pipa, dapat merusak organ penting terutama jantung, otak, dan ginjal.',
    symptoms: [
      'Sakit kepala, terutama di bagian belakang kepala',
      'Pusing atau kepala terasa ringan',
      'Nyeri dada atau sesak saat beraktivitas',
      'Sesak napas yang tidak biasa',
      'Mimisan atau perdarahan hidung',
      'Mudah lelah dan lemas tanpa alasan'
    ],
    causes: [
      'Terlalu banyak makan garam dalam makanan',
      'Kelebihan berat badan dan kurang olahraga',
      'Jarang bergerak atau aktivitas fisik minimal',
      'Stress yang berkepanjangan dan tidak terkontrol',
      'Alkohol berlebihan atau merokok',
      'Faktor turunan atau keluarga dengan riwayat hipertensi'
    ],
    prevention: [
      'Kurangi asupan garam menjadi kurang dari 2.3 gram per hari',
      'Olahraga teratur 30 menit setiap hari',
      'Jaga berat badan ideal dengan BMI 18.5-24.9',
      'Kurangi stress dengan meditasi, yoga atau aktivitas santai',
      'Hindari alkohol berlebihan dan berhenti merokok',
      'Periksa tekanan darah secara rutin, minimal 1x setahun'
    ],
    treatment: 'Ubah gaya hidup: kurangi garam dan berat badan, olahraga rutin. Jika tidak turun, dokter memberikan obat antihipertensi seperti ACE inhibitor atau beta blocker.'
  },
  {
    id: 3,
    title: 'Obesitas',
    subtitle: 'Kelebihan Berat Badan',
    IconComponent: Scale,
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-600',
    description: 'BMI di atas 30 atau berat badan sangat berlebihan',
    simpleExplanation: 'Tubuh Anda membawa beban ekstra yang terlalu berat. Ini merusak sendi, jantung, dan pembuluh darah. Seperti membawa tas terlalu berat setiap hari, yang menyebabkan tubuh bekerja ekstra keras.',
    symptoms: [
      'Berat badan jauh di atas berat ideal',
      'Sulit bergerak, naik tangga, atau berjalan jauh',
      'Sesak napas saat beraktivitas ringan',
      'Nyeri di lutut, pinggul, atau sendi lainnya',
      'Mendengkur saat tidur atau apnea tidur',
      'Keringat berlebihan meski tidak beraktivitas'
    ],
    causes: [
      'Makan lebih banyak kalori dari yang dibutuhkan tubuh',
      'Makanan tinggi kalori: fast food, gorengan, minuman manis',
      'Jarang menggerakkan tubuh atau sedentari',
      'Faktor keturunan atau genetik dari orang tua',
      'Gangguan metabolisme atau hormonal',
      'Makan saat stress, sedih, atau untuk kompensasi emosi'
    ],
    prevention: [
      'Seimbangkan kalori masuk dengan kalori keluar melalui olahraga',
      'Makan makanan sehat: buah, sayuran, biji-bijian, protein rendah lemak',
      'Kurangi makanan junk food, gorengan, dan minuman bersoda',
      'Olahraga 150 menit per minggu dengan intensitas sedang',
      'Kurangi ukuran porsi makanan secara bertahap',
      'Tidur cukup 7-9 jam per malam',
      'Kelola stress dengan baik agar tidak makan berlebihan'
    ],
    treatment: 'Ubah pola makan ke makanan lebih sehat dan berserat. Olahraga rutin kombinasi cardio dan strength training. Jika sangat berat, konsultasi ahli gizi atau dokter untuk program penurunan berat badan terstruktur.'
  },
  {
    id: 4,
    title: 'Anemia',
    subtitle: 'Kurangnya Sel Darah Merah',
    IconComponent: Droplets,
    color: 'red',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
    textColor: 'text-red-600',
    description: 'Kadar hemoglobin terlalu rendah untuk membawa oksigen optimal',
    simpleExplanation: 'Darah Anda tidak memiliki cukup sel darah merah atau hemoglobin untuk membawa oksigen ke seluruh tubuh. Seperti pengiriman barang yang terlalu sedikit untuk kebutuhan besar, tubuh kekurangan oksigen.',
    symptoms: [
      'Merasa lelah dan lemas sepanjang hari',
      'Sesak napas saat aktivitas ringan atau naik tangga',
      'Kulit pucat, terutama di telapak tangan dan kuku',
      'Sering pusing atau mudah pingsan',
      'Sakit kepala yang sering terjadi',
      'Tangan dan kaki terasa dingin'
    ],
    causes: [
      'Kekurangan zat besi dari makanan (malnutrisi)',
      'Perdarahan kronis: menstruasi berat, luka internal',
      'Penyakit kronis: ginjal, kanker, tuberculosis',
      'Kekurangan vitamin B12 atau folat dalam diet',
      'Gangguan produksi sel darah merah di sumsum tulang',
      'Penyakit autoimun yang menyerang sel darah merah'
    ],
    prevention: [
      'Makan banyak makanan kaya zat besi: daging merah, bayam, telur',
      'Makan makanan kaya vitamin B12: ikan, daging, susu, keju',
      'Konsumsi makanan dengan folat: sayuran hijau, biji-bijian',
      'Hindari perdarahan berlebihan dan tangani segera jika ada',
      'Kontrol penyakit kronis dengan baik dan rutin',
      'Minum suplemen jika direkomendasikan dokter',
      'Periksa kadar darah minimal 1x setahun'
    ],
    treatment: 'Tergantung penyebab: suplemen zat besi/B12/folat sesuai dosis dokter, transfusi darah untuk kasus berat, atau obat perangsang produksi sel darah merah. Penyebab utama harus ditangani.'
  },
  {
    id: 5,
    title: 'Asam Lambung',
    subtitle: 'GERD / Refluks Asam',
    IconComponent: Activity,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-600',
    description: 'Asam lambung naik ke esofagus menyebabkan iritasi dan nyeri',
    simpleExplanation: 'Katup antara lambung dan kerongkongan tidak menutup dengan sempurna. Asam lambung keluar dari tempat yang seharusnya dan mengganggu dinding kerongkongan, menyebabkan rasa panas dan tidak nyaman.',
    symptoms: [
      'Rasa terbakar di dada (heartburn) setelah makan',
      'Regurgitasi: makanan atau asam kembali ke mulut',
      'Nyeri dada terutama saat berbaring atau membungkuk',
      'Kesulitan menelan atau rasa ada yang mengganjal',
      'Batuk kronis atau suara serak tanpa sebab',
      'Mual atau rasa tidak enak di perut bagian atas'
    ],
    causes: [
      'Makanan pedas, berlemak, atau asam (cabe, kopi, jeruk)',
      'Alkohol dan minuman berkafein berlebihan',
      'Makan terlalu banyak atau makan malam terlalu larut',
      'Stress dan kecemasan yang berkepanjangan',
      'Kelebihan berat badan yang menekan perut',
      'Merokok yang melemahkan katup esofagus'
    ],
    prevention: [
      'Hindari makanan pemicu: pedas, berlemak, asam, kafein',
      'Makan dalam porsi kecil tapi sering, jangan sekaligus banyak',
      'Jangan tidur langsung setelah makan, tunggu 3-4 jam',
      'Hindari alkohol dan merokok',
      'Kelola stress dengan relaksasi dan olahraga ringan',
      'Jaga berat badan ideal',
      'Minum air putih yang cukup'
    ],
    treatment: 'Hindari makanan dan minuman pemicu. Kurangi stress. Obat antasida untuk menetralkan asam, penghambat asam (H2 blocker) atau obat resep (proton pump inhibitor) untuk mengurangi produksi asam.'
  },
  {
    id: 6,
    title: 'Asam Urat',
    subtitle: 'Gout',
    IconComponent: Shield,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-600',
    description: 'Kristal asam urat menumpuk di sendi menyebabkan peradangan dan nyeri',
    simpleExplanation: 'Tubuh Anda memproduksi terlalu banyak asam urat atau tidak bisa mengeluarkannya dengan efisien. Kristal asam urat menumpuk di sendi (biasanya ibu jari kaki), menyebabkan peradangan, pembengkakan, dan nyeri luar biasa.',
    symptoms: [
      'Nyeri sendi tiba-tiba, biasanya di ibu jari kaki',
      'Pembengkakan pada sendi yang terserang',
      'Kemerahan dan panas pada daerah yang terkena',
      'Nyeri saat berjalan atau menggerakkan sendi',
      'Gejala muncul tiba-tiba, sering di malam atau pagi hari',
      'Serangan dapat berlangsung 7-10 hari jika tidak diobati'
    ],
    causes: [
      'Diet tinggi purin: daging merah, seafood, jeroan',
      'Alkohol berlebihan, terutama bir',
      'Dehidrasi atau minum air putih terlalu sedikit',
      'Riwayat keluarga atau faktor genetik',
      'Kelebihan berat badan atau obesitas',
      'Beberapa obat dan kondisi medis lainnya'
    ],
    prevention: [
      'Batasi makanan tinggi purin: daging merah, udang, ekstrak ragi',
      'Minum air putih 2-3 liter setiap hari',
      'Hindari alkohol, terutama bir',
      'Jaga berat badan ideal',
      'Batasi gula dan minuman manis',
      'Makan makanan sehat: sayuran, buah, biji-bijian',
      'Olahraga ringan seperti berjalan atau berenang'
    ],
    treatment: 'Obat anti-inflamasi (NSAID) untuk mengurangi nyeri saat serangan. Allopurinol atau febuxostat untuk menurunkan produksi asam urat jangka panjang. Kolkisin untuk pencegahan. Hindari makanan dan alkohol pemicu.'
  },
  {
    id: 7,
    title: 'Kolesterol Tinggi',
    subtitle: 'Dislipidemia',
    IconComponent: Heart,
    color: 'pink',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-300',
    textColor: 'text-pink-600',
    description: 'Kadar kolesterol total atau LDL di atas normal dalam darah',
    simpleExplanation: 'Terlalu banyak lemak menempel di dinding pembuluh darah Anda. Seperti minyak yang menyumbat pipa air, ini mengurangi aliran darah dan meningkatkan risiko serangan jantung atau stroke.',
    symptoms: [
      'Biasanya tidak ada gejala (sering disebut silent killer)',
      'Tidak terasa sakit atau tidak nyaman',
      'Hanya dapat diketahui melalui pemeriksaan darah laboratorium',
      'Gejala hanya muncul jika terjadi penyakit jantung atau stroke'
    ],
    causes: [
      'Makanan tinggi lemak jenuh: daging berlemak, mentega, susu penuh lemak',
      'Gaya hidup sedentari, jarang berolahraga',
      'Kelebihan berat badan dan obesitas',
      'Faktor genetik atau keturunan kolesterol tinggi',
      'Merokok aktif atau pasif',
      'Alkohol berlebih dan umur yang semakin tua'
    ],
    prevention: [
      'Pilih makanan rendah lemak jenuh: daging tanpa lemak, susu rendah lemak',
      'Hindari makanan yang digoreng atau olahan berlemak',
      'Olahraga intensitas sedang 150 menit per minggu',
      'Jaga berat badan ideal dengan pola makan sehat',
      'Berhenti merokok dan hindari asap rokok',
      'Periksa kolesterol rutin setiap tahun',
      'Makan makanan kaya serat dan antioksidan'
    ],
    treatment: 'Ubah pola makan: kurangi lemak jenuh, perbanyak serat. Olahraga rutin. Jika tidak turun dalam 3 bulan, dokter berikan obat statin untuk menurunkan kolesterol.'
  },
  {
    id: 8,
    title: 'Flu',
    subtitle: 'Influenza',
    IconComponent: Wind,
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-300',
    textColor: 'text-cyan-600',
    description: 'Infeksi virus yang menyerang sistem pernapasan secara akut',
    simpleExplanation: 'Virus influenza masuk ke tubuh Anda dan menyerang saluran pernapasan. Sistem imun bereaksi dengan demam dan peradangan untuk melawan virus tersebut, menyebabkan gejala flu yang khas.',
    symptoms: [
      'Demam mendadak, biasanya 38-40 derajat Celsius',
      'Nyeri otot dan sendi di seluruh tubuh',
      'Batuk kering atau berdahak',
      'Sakit kepala yang cukup berat',
      'Kehilangan nafsu makan dan kelemahan tubuh',
      'Ngilu-ngilu di berbagai bagian tubuh'
    ],
    causes: [
      'Tertular virus influenza dari penderita lain',
      'Kontak langsung dengan percikan air liur penderita',
      'Menyentuh permukaan yang terkontaminasi virus',
      'Lingkungan kurang higienis dengan ventilasi buruk',
      'Daya tahan imun tubuh yang sedang lemah',
      'Perubahan cuaca musim atau kelembaban udara'
    ],
    prevention: [
      'Vaksin flu tahunan, terutama saat musim flu',
      'Cuci tangan dengan sabun dan air mengalir setiap hari',
      'Hindari keramaian atau tempat umum saat ada wabah',
      'Gunakan masker jika harus berada di tempat berisiko tinggi',
      'Jaga daya tahan imun dengan istirahat dan nutrisi baik',
      'Tutup mulut saat batuk atau bersin dengan tisu',
      'Minum air putih dan vitamin C cukup'
    ],
    treatment: 'Istirahat total dan tidur yang cukup untuk pemulihan. Minum air putih banyak untuk mencegah dehidrasi. Paracetamol atau ibuprofen untuk demam dan nyeri. Obat antivirus jika dimulai dalam 48 jam pertama.'
  },
  {
    id: 9,
    title: 'Tuberkulosis',
    subtitle: 'TB Paru',
    IconComponent: Activity,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    textColor: 'text-indigo-600',
    description: 'Infeksi bakteri Mycobacterium tuberculosis yang menyerang paru-paru',
    simpleExplanation: 'Bakteri TB hidup dan berkembang di paru-paru Anda, menyebabkan jaringan paru meradang dan rusak. Bakteri bisa menyebar lewat udara ketika penderita batuk atau bersin. Ini adalah penyakit menular yang serius dan umum di Indonesia.',
    symptoms: [
      'Batuk yang berlangsung lebih dari 3 minggu',
      'Batuk disertai dahak, kadang berlendir atau berdarah',
      'Nyeri atau rasa tidak nyaman di dada saat bernapas',
      'Demam rendah terutama di sore atau malam hari',
      'Berkeringat malam hari sampai membasahi baju',
      'Badan lemas, lelah, dan kehilangan nafsu makan'
    ],
    causes: [
      'Infeksi bakteri Mycobacterium tuberculosis dari penderita yang tertular',
      'Paparan udara terkontaminasi dari batuk/bersin penderita TB aktif',
      'Sistem imun tubuh yang lemah atau mengalami HIV/AIDS',
      'Malnutrisi atau kekurangan gizi yang parah',
      'Kontak erat dengan penderita TB aktif dalam waktu lama',
      'Lingkungan yang kurang ventilasi udara, padat penduduk, higienis buruk'
    ],
    prevention: [
      'Vaksin BCG saat bayi untuk pencegahan TB berat',
      'Hindari kontak erat dengan penderita TB aktif tanpa masker',
      'Gunakan masker N95 jika berada di dekat penderita TB',
      'Tingkatkan daya tahan imun dengan nutrisi baik dan istirahat cukup',
      'Jaga kebersihan rumah dan pastikan ventilasi udara memadai',
      'Periksa kesehatan rutin jika ada kontak dengan penderita TB',
      'Hindari merokok dan alkohol yang melemahkan imun'
    ],
    treatment: 'Obat anti-TB kombinasi (isoniazid, rifampin, pyrazinamide, ethambutol) selama 6 bulan minimal sesuai resep dokter. Harus dihabiskan semua obat meski sudah merasa sehat. Istirahat dan nutrisi baik sangat penting.'
  }
];

const FRUITS_VEGETABLES = [
  {
    id: 1,
    name: 'Apel',
    type: 'Buah',
    IconComponent: Apple,
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
    name: 'Jeruk',
    type: 'Buah',
    IconComponent: Citrus,
    color: 'orange',
    bgColor: 'bg-orange-50',
    benefitColor: 'text-orange-600',
    benefits: ['Vitamin C besar', 'Imun kuat', 'Antioksidan'],
    description: 'Jeruk adalah sumber vitamin C terbaik yang memperkuat sistem imun',
    nutrition: {
      kalori: '47 kal/buah',
      vitaminC: '53mg',
      serat: '2.4g'
    },
    healthBenefits: ['Daya tahan imun meningkat', 'Penyembuhan cepat', 'Kesehatan kulit'],
    tips: 'Makan jeruk segera setelah dikupas agar vitamin C tidak hilang'
  },
  {
    id: 3,
    name: 'Alpukat',
    type: 'Buah',
    IconComponent: AvocadoIcon,
    color: 'green',
    bgColor: 'bg-green-50',
    benefitColor: 'text-green-600',
    benefits: ['Lemak sehat', 'Serat tinggi', 'Kalium tinggi'],
    description: 'Alpukat kaya lemak tak jenuh tunggal dan serat untuk kesehatan jantung dan pencernaan',
    nutrition: {
      kalori: '160 kal/100g',
      kalium: '485mg',
      serat: '6.7g'
    },
    healthBenefits: ['Jantung lebih sehat', 'Kenyang lebih lama', 'Membantu kontrol kolesterol'],
    tips: 'Konsumsi alpukat tanpa gula tambahan agar manfaat nutrisinya tetap optimal'
  },
  {
    id: 4,
    name: 'Mangga',
    type: 'Buah',
    IconComponent: MangoIcon,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    benefitColor: 'text-yellow-600',
    benefits: ['Vitamin A tinggi', 'Enzim pencernaan', 'Rasa manis alami'],
    description: 'Mangga kaya dengan vitamin A dan enzim mangiferin untuk pencernaan',
    nutrition: {
      kalori: '60 kal/100g',
      vitaminA: 'Tinggi',
      serat: '1.6g'
    },
    healthBenefits: ['Pencernaan lancar', 'Kesehatan kulit membaik', 'Antioksidan perkuat'],
    tips: 'Pilih mangga yang wangi dan sedikit lembut untuk rasa terbaik'
  },
  {
    id: 5,
    name: 'Buah Naga',
    type: 'Buah',
    IconComponent: DragonFruitIcon,
    color: 'pink',
    bgColor: 'bg-pink-50',
    benefitColor: 'text-pink-600',
    benefits: ['Serat tinggi', 'Antioksidan', 'Vitamin C'],
    description: 'Buah naga kaya antioksidan, serat, dan vitamin C yang baik untuk pencernaan dan imun',
    nutrition: {
      kalori: '57 kal/100g',
      vitaminC: '9mg',
      serat: '3g'
    },
    healthBenefits: ['Pencernaan lebih lancar', 'Daya tahan tubuh', 'Kesehatan jantung'],
    tips: 'Konsumsi buah naga segar tanpa tambahan gula untuk manfaat terbaik'
  },
  {
    id: 6,
    name: 'Pisang',
    type: 'Buah',
    IconComponent: Banana,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    benefitColor: 'text-yellow-600',
    benefits: ['Kalium tinggi', 'Energi instan', 'Tekanan darah sehat'],
    description: 'Pisang kaya kalium yang membantu menjaga kesehatan jantung',
    nutrition: {
      kalori: '89 kal/buah',
      kalium: '358mg',
      vitamin: 'Vitamin B6'
    },
    healthBenefits: ['Mencegah hipertensi', 'Meningkatkan energi', 'Kesehatan sistem saraf'],
    tips: 'Konsumsi 1-2 pisang per hari untuk manfaat optimal'
  },
  {
    id: 7,
    name: 'Semangka',
    type: 'Buah',
    IconComponent: WatermelonIcon,
    color: 'red',
    bgColor: 'bg-red-50',
    benefitColor: 'text-red-600',
    benefits: ['Likopen tinggi', 'Hidrasi sempurna', 'Kalium banyak'],
    description: 'Semangka mengandung 92% air dan likopen untuk kesehatan jantung',
    nutrition: {
      kalori: '30 kal/100g',
      air: '92%',
      likopen: 'Tinggi'
    },
    healthBenefits: ['Rehidrasi tubuh', 'Kesehatan jantung', 'Penurun tekanan darah'],
    tips: 'Konsumsi saat cuaca panas untuk rehidrasi optimal dan menyegarkan'
  },
  {
    id: 8,
    name: 'Bayam',
    type: 'Sayuran',
    IconComponent: LeafyGreen,
    color: 'green',
    bgColor: 'bg-emerald-50',
    benefitColor: 'text-emerald-600',
    benefits: ['Zat besi tinggi', 'Folat lengkap', 'Darah sehat'],
    description: 'Bayam kaya zat besi organik dan folat untuk pembentukan sel darah merah',
    nutrition: {
      kalori: '23 kal/100g',
      zatBesi: 'Tinggi',
      vitamin: 'Vitamin A, K, C, folat'
    },
    healthBenefits: ['Cegah anemia', 'Kognitif lebih baik', 'Energi meningkat'],
    tips: 'Konsumsi bayam mentah dalam salad atau masak sebentar'
  },
  {
    id: 9,
    name: 'Brokoli',
    type: 'Sayuran',
    IconComponent: Salad,
    color: 'green',
    bgColor: 'bg-green-50',
    benefitColor: 'text-green-600',
    benefits: ['Sulforaphane', 'Anti-kanker alami', 'Kaya mineral'],
    description: 'Brokoli adalah superfood dengan senyawa anti kanker alami',
    nutrition: {
      kalori: '34 kal/100g',
      serat: '2.4g',
      vitamin: 'Vitamin C, K, folat'
    },
    healthBenefits: ['Pencegahan kanker', 'Kekuatan tulang', 'Kesehatan hati'],
    tips: 'Jangan masak terlalu lama untuk nutrisi maksimal'
  },
  {
    id: 10,
    name: 'Timun',
    type: 'Sayuran',
    IconComponent: TimunIcon,
    color: 'green',
    bgColor: 'bg-emerald-50',
    benefitColor: 'text-emerald-600',
    benefits: ['Hidrasi tinggi', 'Rendah kalori', 'Serat baik'],
    description: 'Timun mengandung banyak air dan antioksidan yang membantu hidrasi serta kesehatan pencernaan',
    nutrition: {
      kalori: '15 kal/100g',
      air: '95%',
      serat: '0.5g'
    },
    healthBenefits: ['Menjaga hidrasi tubuh', 'Membantu kontrol berat badan', 'Menyegarkan pencernaan'],
    tips: 'Konsumsi timun segar dengan kulit yang sudah dicuci bersih untuk serat lebih banyak'
  },
  {
    id: 11,
    name: 'Tomat',
    type: 'Sayuran',
    IconComponent: TomatoIcon,
    color: 'red',
    bgColor: 'bg-red-50',
    benefitColor: 'text-red-600',
    benefits: ['Likopen kuat', 'Jantung sehat', 'Anti-kanker'],
    description: 'Tomat mengandung likopen, senyawa yang melindungi jantung',
    nutrition: {
      kalori: '18 kal/100g',
      likopen: 'Tinggi (matang lebih banyak)',
      serat: '1.2g'
    },
    healthBenefits: ['Kesehatan jantung', 'Pencegahan kanker', 'Tekanan darah stabil'],
    tips: 'Tomat yang sudah matang memiliki likopen lebih tinggi'
  },
  {
    id: 12,
    name: 'Wortel',
    type: 'Sayuran',
    IconComponent: Carrot,
    color: 'orange',
    bgColor: 'bg-orange-50',
    benefitColor: 'text-orange-600',
    benefits: ['Beta karoten', 'Kesehatan mata', 'Antioksidan kuat'],
    description: 'Wortel mengandung beta karoten yang diubah tubuh menjadi vitamin A',
    nutrition: {
      kalori: '25 kal/100g',
      betaKaroten: 'Tinggi',
      vitamin: 'Vitamin A, C, K'
    },
    healthBenefits: ['Kesehatan mata tajam', 'Kulit lebih sehat', 'Daya tahan tubuh meningkat'],
    tips: 'Wortel mentah lebih kaya nutrisi, tapi bisa juga dimasak'
  }
];


export default function Home() {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedFruit, setSelectedFruit] = useState(null);
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: 'url(/images/awal.png)',
          backgroundBlendMode: 'soft-light',
          backgroundColor: 'rgba(6, 120, 132, 0.65)',
          minHeight: 'auto'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-secondary-900/40"></div>
        
        {/* Doctor Image - Right Corner - All Screens */}
        <div className="absolute right-0 bottom-0 z-5 h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-96 lg:w-96">
          <img 
            src="/images/dokter.png" 
            alt="Doctor" 
            className="w-full h-full object-cover object-left"
          />
        </div>
        
        {/* Hero Section - Desktop & Mobile */}
        <div className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 items-center px-4 sm:px-6 lg:px-12 text-left fade-in flex">
          <div className="flex flex-col justify-start max-w-xl sm:max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
              Analisis & Solusi<br />Kesehatan Cerdas
            </h2>
            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-primary-300 to-secondary-300 mb-3 sm:mb-6"></div>
            <p className="text-xs sm:text-sm md:text-xl lg:text-2xl text-white/95 font-semibold leading-relaxed mb-4 sm:mb-8">
              Analisis Penyakit Akurat<br />dengan Solusi Penanganan Terpercaya
            </p>
            <Link to="/content" className="inline-block px-8 py-3 bg-gradient-to-r from-primary-400 to-secondary-400 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 w-fit">
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* VitaCheck Why and How - Modern Design */}
      <VitaCheckWhyAndHow />

      {/* Modal Detail Penyakit - Enhanced Design */}
      {selectedDisease && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className={`bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-slideUp`}>
            {/* Header Modal */}
            <div className={`bg-gradient-to-r ${selectedDisease.color === 'red' ? 'from-red-600 to-red-700' : selectedDisease.color === 'blue' ? 'from-blue-600 to-blue-700' : selectedDisease.color === 'purple' ? 'from-purple-600 to-purple-700' : selectedDisease.color === 'orange' ? 'from-orange-600 to-orange-700' : 'from-yellow-600 to-yellow-700'} text-white p-6 relative overflow-hidden`}>
              <button
                onClick={() => setSelectedDisease(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 z-20"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 pr-12">
                {selectedDisease.IconComponent && (
                  <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                    <selectedDisease.IconComponent size={40} className="text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{selectedDisease.title}</h2>
                  <p className="text-white/90 text-sm font-semibold">{selectedDisease.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Penjelasan Sederhana */}
              <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Penjelasan</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base bg-blue-50/50 p-4 rounded-lg border-l-4 border-blue-500">
                  {selectedDisease.simpleExplanation}
                </p>
              </div>

              {/* Gejala */}
              <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-600" />
                  Gejala & Tanda-tanda
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedDisease.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-red-50/50 rounded-lg border-l-2 border-red-500">
                      <CheckCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 text-sm">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Penyebab */}
              <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Flame size={20} className="text-orange-600" />
                  Penyebab & Faktor Risiko
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedDisease.causes.map((cause, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-lg border-l-2 border-orange-500">
                      <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 text-sm">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pencegahan */}
              <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" />
                  Pencegahan & Gaya Hidup Sehat
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedDisease.prevention.map((prevent, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-green-50/50 rounded-lg border-l-2 border-green-500">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 text-sm">{prevent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pengobatan */}
              <div className="animate-fadeIn" style={{animationDelay: '0.5s'}}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplets size={20} className="text-blue-600" />
                  Pengobatan & Manajemen
                </h3>
                <div className="p-4 bg-blue-50/50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {selectedDisease.treatment}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="animate-fadeIn border-t pt-6" style={{animationDelay: '0.6s'}}>
                <div className="bg-amber-50/50 p-4 rounded-lg border-l-4 border-amber-500">
                  <p className="text-gray-900 font-semibold text-sm mb-2">
                    Penting: Informasi Edukasi
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Informasi ini hanya untuk tujuan edukasi. BUKAN pengganti konsultasi dokter. Jika mengalami gejala, konsultasikan dengan profesional medis.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-gray-50 px-6 sm:px-8 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => setSelectedDisease(null)}
                className="px-5 py-2.5 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-200 text-sm"
              >
                Tutup
              </button>
              <Link
                to="/content"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 text-sm"
                onClick={() => setSelectedDisease(null)}
              >
                Cek Risiko <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Section - Modern Design */}
      <ConsultationSection />

      {/* Fruits & Vegetables Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Buah & Sayuran Sehat
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Pelajari manfaat kesehatan & nutrisi lengkap untuk konsumsi optimal
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-5xl mx-auto">
          {FRUITS_VEGETABLES.map((item) => {
            const IconComponent = item.IconComponent;
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
                className={`group relative ${colors.bg} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 hover:border-white`}
              >
                {/* Top accent bar */}
                <div className={`h-1 bg-gradient-to-r ${colors.gradient}`}></div>

                {/* Card Content */}
                <div className="p-2 sm:p-3 flex flex-col items-center justify-center text-center space-y-1 py-3 sm:py-4">
                  {/* Icon */}
                  <IconComponent size={24} className={`${colors.icon} group-hover:scale-110 transition-transform`} />
                  
                  {/* Name */}
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  
                  {/* Type Badge */}
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.icon} bg-white/70`}>
                    {item.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation Banner */}
        <div className="bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 rounded-lg p-2 sm:p-3 border border-primary-200/30">
          <p className="text-xs sm:text-sm font-semibold text-gray-900 text-center">
            Konsumsi minimal 5 porsi buah dan sayur setiap hari untuk menjaga kesehatan tubuh
          </p>
        </div>
      </section>

      {/* Modal Detail Buah & Sayuran */}
      {selectedFruit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Header Modal */}
            <div style={{background: selectedFruit.color === 'red' ? 'linear-gradient(to right, #ef4444, #dc2626)' : selectedFruit.color === 'yellow' ? 'linear-gradient(to right, #eab308, #ca8a04)' : selectedFruit.color === 'orange' ? 'linear-gradient(to right, #f97316, #ea580c)' : 'linear-gradient(to right, #22c55e, #16a34a)'}} className="text-white p-4 sm:p-6 relative rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <selectedFruit.IconComponent className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{selectedFruit.name}</h2>
                  <p className="text-white text-opacity-90 text-xs sm:text-sm">{selectedFruit.type}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFruit(null)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Deskripsi */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Informasi</h3>
                <p className="text-xs sm:text-sm text-gray-700">{selectedFruit.description}</p>
              </div>

              {/* Manfaat Kesehatan */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Manfaat Kesehatan</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedFruit.healthBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 sm:p-3 bg-green-50 rounded border border-green-200">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-xs sm:text-sm text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrisi Utama */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Nutrisi Utama</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {Object.entries(selectedFruit.nutrition).map(([key, value]) => (
                    <div key={key} className="p-2 sm:p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs font-semibold text-blue-600 mb-1">{key}</p>
                      <p className="text-sm sm:text-base font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips Konsumsi */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Tips Konsumsi</h3>
                <p className="text-xs sm:text-sm text-gray-700 bg-yellow-50 p-2 sm:p-3 rounded border border-yellow-200">
                  {selectedFruit.tips}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3 flex justify-center border-t border-gray-200 rounded-b-2xl">
              <button
                onClick={() => setSelectedFruit(null)}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disease Education Section - Enhanced */}
      <section className="relative py-8 md:py-10 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"></div>
        <div className="absolute -bottom-32 left-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{animationDelay: '2s'}}></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Kondisi Kesehatan
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Pelajari berbagai kondisi kesehatan Anda
            </p>
          </div>

          {/* Health Conditions Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {DISEASES_DATA.map((disease, index) => {
              const Icon = disease.IconComponent;
              const colorConfig = {
                red: { gradient: 'from-red-500 to-red-600', light: 'bg-red-50', border: 'border-red-300', text: 'text-red-600', darkText: 'text-red-700' },
                blue: { gradient: 'from-blue-500 to-blue-600', light: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-600', darkText: 'text-blue-700' },
                yellow: { gradient: 'from-yellow-500 to-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-600', darkText: 'text-yellow-700' },
                purple: { gradient: 'from-purple-500 to-purple-600', light: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-600', darkText: 'text-purple-700' },
                orange: { gradient: 'from-orange-500 to-orange-600', light: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-600', darkText: 'text-orange-700' }
              };
              const colors = colorConfig[disease.color] || colorConfig.red;

              return (
                <button
                  key={disease.id}
                  onClick={() => setSelectedDisease(disease)}
                  className="group relative animate-fadeIn text-left transition-all duration-300 hover:z-10"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className={`relative ${colors.light} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200 hover:border-white`}>
                    {/* Top accent bar */}
                    <div className={`h-1 bg-gradient-to-r ${colors.gradient}`}></div>

                    {/* Card Content */}
                    <div className="p-2 sm:p-3 flex flex-col items-center justify-center text-center space-y-1.5 min-h-[95px] sm:min-h-[110px]">
                      {/* Icon */}
                      <Icon size={24} className={`${colors.text} group-hover:scale-110 transition-transform`} strokeWidth={2} />
                      
                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2">{disease.title}</h3>
                      
                      {/* Type Badge */}
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${colors.text} bg-white/70`}>
                        {disease.subtitle}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
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
        
        /* Animation delay utilities */
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
}

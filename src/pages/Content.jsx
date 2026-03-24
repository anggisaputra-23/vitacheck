import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Zap, BarChart3, AlertTriangle, ChevronRight, ArrowLeft, ChevronLeft, Activity, Droplets, Heart, Wind, Scale, Brain, Dna, Shield, User, Users, Apple, Moon, Cigarette, Dumbbell, Lightbulb, Search, AlertCircle } from 'lucide-react';
import ResultDashboard from '../components/ResultDashboard';

// Validation Modal Component
const ValidationModal = ({ isOpen, errors, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
        {/* Header Background */}
        <div className="bg-gradient-to-br from-red-500 via-red-400 to-orange-400 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
            <AlertCircle size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Mohon isi semua data</h2>
          <p className="text-red-50 text-sm">yang diperlukan</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-sm mb-5 font-medium">
            Kami menemukan beberapa field yang masih kosong. Silakan periksa dan lengkapi data berikut:
          </p>
          
          <div className="space-y-2 mb-6 max-h-56 overflow-y-auto">
            {errors.map((error, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-5 w-5">
                    <span className="text-red-500 font-bold text-lg">!</span>
                  </div>
                </div>
                <span className="text-sm text-gray-700">{error}</span>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            Saya Mengerti, Perbaiki Data
          </button>
        </div>
      </div>
    </div>
  );
};

// Disease data with symptoms for analysis - 9 penyakit sesuai dengan Home.jsx  
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
    symptoms: ['Haus yang berlebihan (polidipsia)', 'Sering buang air kecil, terutama di malam hari (poliuria)', 'Lapar terus menerus meski baru makan (polifagia)', 'Lelah dan lemas yang tidak jelas penyebabnya', 'Penglihatan mulai kabur atau berubah', 'Luka atau infeksi kulit yang lama sembuhnya', 'Mati rasa atau kesemutan di tangan dan kaki', 'Berat badan turun padahal asupan tidak berkurang', 'Kulit gelap di leher atau ketiak (acanthosis nigricans)', 'Keberkeringatan malam hari', 'Pusing atau sakit kepala', 'Tangan dan kaki terasa dingin'],
    causes: ['Faktor keturunan atau genetik (sangat penting jika ada keluarga dengan diabetes)', 'Resistansi insulin yang meningkat seiring usia', 'Pola makan tidak seimbang: terlalu banyak gula dan karbohidrat putih', 'Gaya hidup sedentari atau kurang olahraga', 'Kelebihan berat badan (bukan satu-satunya faktor)', 'Stress berkepanjangan dan sleep deprivation', 'Paparan infeksi atau faktor autoimun (terutama Type 1)', 'Konsumsi minuman manis berlebihan'],
    prevention: ['Jaga berat badan ideal dengan diet seimbang', 'Olahraga minimal 30 menit setiap hari', 'Kurangi makanan manis dan karbohidrat putih', 'Makan makanan tinggi serat (sayuran, buah, biji-bijian)', 'Hindari minuman bersoda, beralkohol dan berenergi tinggi', 'Periksa gula darah rutin jika ada faktor risiko', 'Kelola stress dengan baik melalui meditasi atau yoga'],
    treatment: 'Ubah pola makan ke makanan sehat dan berserat. Olahraga rutin minimal 150 menit per minggu. Jika perlu, dokter memberikan obat metformin atau insulin untuk kontrol gula darah.',
    healthBenefits: ['Mencegah komplikasi jantung dan stroke', 'Menjaga kesehatan mata dan ginjal', 'Meningkatkan energi dan kualitas hidup']
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
    symptoms: ['Sakit kepala berdenyut, terutama di bagian belakang kepala', 'Pusing atau kepala terasa ringan saat berdiri', 'Nyeri dada (angina) atau sesak saat beraktivitas', 'Sesak napas (dyspnea) yang tidak biasa atau saat aktivitas ringan', 'Mimisan atau perdarahan hidung (epistaksis)', 'Mudah lelah dan lemas tanpa alasan', 'Telinga berdenging (tinnitus)', 'Mata merah atau kemerahan konjungtiva', 'Sulit tidur atau insomnia', 'Keringat dingin terutama malam', 'Dada terasa berat atau tidak nyaman', 'Denyut jantung tidak teratur atau berdebar'],
    causes: ['Terlalu banyak makan garam dalam makanan', 'Kelebihan berat badan dan kurang olahraga', 'Jarang bergerak atau aktivitas fisik minimal', 'Stress yang berkepanjangan dan tidak terkontrol', 'Alkohol berlebihan atau merokok', 'Faktor turunan atau keluarga dengan riwayat hipertensi'],
    prevention: ['Kurangi asupan garam menjadi kurang dari 2.3 gram per hari', 'Olahraga teratur 30 menit setiap hari', 'Jaga berat badan ideal dengan BMI 18.5-24.9', 'Kurangi stress dengan meditasi, yoga atau aktivitas santai', 'Hindari alkohol berlebihan dan berhenti merokok', 'Periksa tekanan darah secara rutin, minimal 1x setahun'],
    treatment: 'Ubah gaya hidup: kurangi garam dan berat badan, olahraga rutin. Jika tidak turun, dokter memberikan obat antihipertensi seperti ACE inhibitor atau beta blocker.',
    healthBenefits: ['Mencegah stroke dan serangan jantung', 'Kesehatan jantung terjaga', 'Organ vital terlindungi']
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
    symptoms: ['Berat badan jauh di atas berat ideal (BMI > 30)', 'Sulit bergerak, naik tangga, atau berjalan jauh', 'Sesak napas (dyspnea) saat aktivitas ringan', 'Nyeri sendi di lutut, pinggul, pergelangan kaki, tulang belakang', 'Mendengkur saat tidur atau apnea tidur (sleep apnea)', 'Keringat berlebihan meski tidak beraktivitas', 'Stretch mark atau kulit tipis berkilau di perut', 'Lipatan kulit tebal di leher, ketiak, atau selangkangan', 'Nyeri punggung bawah (low back pain)', 'Sulit bernafas saat tidur atau tersangkut', 'Tekanan darah tinggi sering terdeteksi', 'Penglihatan berkabur atau sulit difokus'],
    causes: ['Makan lebih banyak kalori dari yang dibutuhkan tubuh', 'Makanan tinggi kalori: fast food, gorengan, minuman manis', 'Jarang menggerakkan tubuh atau sedentari', 'Faktor keturunan atau genetik dari orang tua', 'Gangguan metabolisme atau hormonal', 'Makan saat stress, sedih, atau untuk kompensasi emosi'],
    prevention: ['Seimbangkan kalori masuk dengan kalori keluar melalui olahraga', 'Makan makanan sehat: buah, sayuran, biji-bijian, protein rendah lemak', 'Kurangi makanan junk food, gorengan, dan minuman bersoda', 'Olahraga 150 menit per minggu dengan intensitas sedang', 'Kurangi ukuran porsi makanan secara bertahap', 'Tidur cukup 7-9 jam per malam', 'Kelola stress dengan baik agar tidak makan berlebihan'],
    treatment: 'Ubah pola makan ke makanan lebih sehat dan berserat. Olahraga rutin kombinasi cardio dan strength training. Jika sangat berat, konsultasi ahli gizi atau dokter untuk program penurunan berat badan terstruktur.',
    healthBenefits: ['Sendi tidak beban berlebih', 'Jantung bekerja lebih mudah', 'Kemampuan gerak meningkat']
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
    symptoms: ['Merasa lelah dan lemas sepanjang hari (fatigue)', 'Sesak napas (dyspnea) saat aktivitas ringan atau naik tangga', 'Kulit pucat atau pucat, terutama di telapak tangan dan kuku', 'Sering pusing atau mudah pingsan (syncope)', 'Sakit kepala yang sering terjadi', 'Tangan dan kaki terasa dingin (extremitas dingin)', 'Denyut jantung cepat atau berdebar-debar (palpitasi)', 'Lidah tampak merah muda pucat (glossitis)', 'Mulut atau bibir tampak pucat', 'Kuku menjadi cembung atau spoon-shaped', 'Mati rasa atau kesemutan di tangan/kaki', 'Pemulihan luka yang sangat lambat'],
    causes: ['Kekurangan zat besi dari makanan (malnutrisi)', 'Perdarahan kronis: menstruasi berat, luka internal', 'Penyakit kronis: ginjal, kanker, tuberculosis', 'Kekurangan vitamin B12 atau folat dalam diet', 'Gangguan produksi sel darah merah di sumsum tulang', 'Penyakit autoimun yang menyerang sel darah merah'],
    prevention: ['Makan banyak makanan kaya zat besi: daging merah, bayam, telur', 'Makan makanan kaya vitamin B12: ikan, daging, susu, keju', 'Konsumsi makanan dengan folat: sayuran hijau, biji-bijian', 'Hindari perdarahan berlebihan dan tangani segera jika ada', 'Kontrol penyakit kronis dengan baik dan rutin', 'Minum suplemen jika direkomendasikan dokter', 'Periksa kadar darah minimal 1x setahun'],
    treatment: 'Tergantung penyebab: suplemen zat besi/B12/folat sesuai dosis dokter, transfusi darah untuk kasus berat, atau obat perangsang produksi sel darah merah. Penyebab utama harus ditangani.',
    healthBenefits: ['Energi tubuh meningkat', 'Oksigenasi sel optimal', 'Stamina membaik']
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
    symptoms: ['Rasa terbakar di dada (heartburn) setelah makan', 'Regurgitasi: makanan atau asam kembali ke mulut', 'Nyeri dada terutama saat berbaring atau membungkuk', 'Kesulitan menelan (dysphagia) atau rasa ada yang mengganjal', 'Batuk kronis atau suara serak tanpa sebab jelas', 'Mual atau rasa tidak enak di perut bagian atas', 'Nyeri di belakang tulang dada (substernal)', 'Mulut terasa asam atau pahit', 'Perut kembung atau penuh cepat saat makan', 'Sulit tidur atau malas tidur karena gejala malam', 'Susah menelan air liur (dysphagia saat malam)', 'Suara gaduh di perut atau perut berbunyi'],
    causes: ['Makanan pedas, berlemak, atau asam (cabe, kopi, jeruk)', 'Alkohol dan minuman berkafein berlebihan', 'Makan terlalu banyak atau makan malam terlalu larut', 'Stress dan kecemasan yang berkepanjangan', 'Kelebihan berat badan yang menekan perut', 'Merokok yang melemahkan katup esofagus'],
    prevention: ['Hindari makanan pemicu: pedas, berlemak, asam, kafein', 'Makan dalam porsi kecil tapi sering, jangan sekaligus banyak', 'Jangan tidur langsung setelah makan, tunggu 3-4 jam', 'Hindari alkohol dan merokok', 'Kelola stress dengan relaksasi dan olahraga ringan', 'Jaga berat badan ideal', 'Minum air putih yang cukup'],
    treatment: 'Hindari makanan dan minuman pemicu. Kurangi stress. Obat antasida untuk menetralkan asam, penghambat asam (H2 blocker) atau obat resep (proton pump inhibitor) untuk mengurangi produksi asam.',
    healthBenefits: ['Nyaman saat makan', 'Tidur berkualitas baik', 'Kesehatan esofagus terjaga']
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
    symptoms: ['Nyeri sendi tiba-tiba dan sangat parah, biasanya di ibu jari kaki (podagra)', 'Pembengkakan (edema) pada sendi yang terserang', 'Kemerahan (eritema) dan panas pada daerah yang terkena', 'Nyeri saat berjalan atau menggerakkan sendi (mobility terbatas)', 'Gejala muncul tiba-tiba, sering di malam atau pagi hari', 'Serangan berlangsung 7-10 hari jika tidak diobati', 'Sendi terasa kaku (stiffness) terutama pagi', 'Tofi (endapan kristal) dapat terlihat di telingga atau sendi', 'Demam ringan selama serangan akut (37-38°C)', 'Sendi yang sering terkena: ankle, lutut, pergelangan tangan', 'Nyeri sangat hebat: skala 8-10 dari 10', 'Pembengkakan dapat berlangsung berhari-hari sampai bulan'],
    causes: ['Diet tinggi purin: daging merah, seafood, jeroan', 'Alkohol berlebihan, terutama bir', 'Dehidrasi atau minum air putih terlalu sedikit', 'Riwayat keluarga atau faktor genetik', 'Kelebihan berat badan atau obesitas', 'Beberapa obat dan kondisi medis lainnya'],
    prevention: ['Batasi makanan tinggi purin: daging merah, udang, ekstrak ragi', 'Minum air putih 2-3 liter setiap hari', 'Hindari alkohol, terutama bir', 'Jaga berat badan ideal', 'Batasi gula dan minuman manis', 'Makan makanan sehat: sayuran, buah, biji-bijian', 'Olahraga ringan seperti berjalan atau berenang'],
    treatment: 'Obat anti-inflamasi (NSAID) untuk mengurangi nyeri saat serangan. Allopurinol atau febuxostat untuk menurunkan produksi asam urat jangka panjang. Kolkisin untuk pencegahan. Hindari makanan dan alkohol pemicu.',
    healthBenefits: ['Sendi bebas dari nyeri', 'Mobilitas terjaga', 'Aktivitas lancar tanpa hambatan']
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
    symptoms: ['Biasanya tidak ada gejala (sering disebut "silent killer")', 'Tidak terasa sakit atau tidak nyaman pada tahap awal', 'Hanya dapat diketahui melalui pemeriksaan darah laboratorium', 'Gejala hanya muncul jika sudah terjadi penyakit jantung atau stroke', 'Sesak napas saat aktivitas berat atau naik tangga (jika ada komplikasi)', 'Nyeri dada yang parah (angina pectoris) saat stress atau aktivitas', 'Sakit kepala atau pusing konstan', 'Telinga berdenging', 'Lelah dan lemas yang tidak jelas', 'Mata lelah atau penglihatan kabur', 'Detak jantung tidak teratur', 'Nyeri kaki saat berjalan (claudication intermittent)'],
    causes: ['Makanan tinggi lemak jenuh: daging berlemak, mentega, susu penuh lemak', 'Gaya hidup sedentari, jarang berolahraga', 'Kelebihan berat badan dan obesitas', 'Faktor genetik atau keturunan kolesterol tinggi', 'Merokok aktif atau pasif', 'Alkohol berlebih dan umur yang semakin tua'],
    prevention: ['Pilih makanan rendah lemak jenuh: daging tanpa lemak, susu rendah lemak', 'Hindari makanan yang digoreng atau olahan berlemak', 'Olahraga intensitas sedang 150 menit per minggu', 'Jaga berat badan ideal dengan pola makan sehat', 'Berhenti merokok dan hindari asap rokok', 'Periksa kolesterol rutin setiap tahun', 'Makan makanan kaya serat dan antioksidan'],
    treatment: 'Ubah pola makan: kurangi lemak jenuh, perbanyak serat. Olahraga rutin. Jika tidak turun dalam 3 bulan, dokter berikan obat statin untuk menurunkan kolesterol.',
    healthBenefits: ['Aliran darah lancar', 'Risiko serangan berkurang', 'Pembuluh darah sehat']
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
    symptoms: ['Demam mendadak, biasanya 38-40 derajat Celsius', 'Nyeri otot dan sendi di seluruh tubuh (myalgia dan arthralgia)', 'Batuk kering atau berdahak (cough dengan dahak)', 'Sakit kepala yang cukup berat di belakang mata', 'Kehilangan nafsu makan dan kelemahan tubuh umum', 'Ngilu-ngilu (chills) atau menggigil di berbagai bagian tubuh', 'Pilek atau hidung berair (rhinitis)', 'Radang tenggorokan atau nyeri saat menelan (pharyngitis)', 'Mata merah dan berair (conjunctivitis)', 'Dada terasa sakit atau tidak nyaman saat batuk', 'Suara serak atau gersang', 'Berkeringat dingin terutama malam hari'],
    causes: ['Tertular virus influenza dari penderita lain', 'Kontak langsung dengan percikan air liur penderita', 'Menyentuh permukaan yang terkontaminasi virus', 'Lingkungan kurang higienis dengan ventilasi buruk', 'Daya tahan imun tubuh yang sedang lemah', 'Perubahan cuaca musim atau kelembaban udara'],
    prevention: ['Vaksin flu tahunan, terutama saat musim flu', 'Cuci tangan dengan sabun dan air mengalir setiap hari', 'Hindari keramaian atau tempat umum saat ada wabah', 'Gunakan masker jika harus berada di tempat berisiko tinggi', 'Jaga daya tahan imun dengan istirahat dan nutrisi baik', 'Tutup mulut saat batuk atau bersin dengan tisu', 'Minum air putih dan vitamin C cukup'],
    treatment: 'Istirahat total dan tidur yang cukup untuk pemulihan. Minum air putih banyak untuk mencegah dehidrasi. Paracetamol atau ibuprofen untuk demam dan nyeri. Obat antivirus jika dimulai dalam 48 jam pertama.',
    healthBenefits: ['Dampak penyakit minimal', 'Pemulihan cepat', 'Imunitas meningkat setelah sembuh']
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
    symptoms: ['Batuk yang berlangsung lebih dari 3 minggu (batuk kronis)', 'Batuk disertai dahak, kadang berlendir atau berdarah (hemoptisis)', 'Nyeri atau rasa tidak nyaman di dada saat bernapas (pleuritic pain)', 'Demam rendah terutama di sore atau malam hari (fever pada sore)', 'Berkeringat malam hari sampai membasahi baju (night sweats)', 'Badan lemas, lelah, dan kehilangan nafsu makan', 'Penurunan berat badan yang tidak jelas', 'Sesak napas ringan atau dyspnea pada aktivitas', 'Dada berbunyi atau menggigil (chill)', 'Malaise (rasa tidak enak badan umum)', 'Pembesaran kelenjar getah bening di leher', 'Mudah merasa lelah setelah aktivitas ringan'],
    causes: ['Infeksi bakteri Mycobacterium tuberculosis dari penderita yang tertular', 'Paparan udara terkontaminasi dari batuk/bersin penderita TB aktif', 'Sistem imun tubuh yang lemah atau mengalami HIV/AIDS', 'Malnutrisi atau kekurangan gizi yang parah', 'Kontak erat dengan penderita TB aktif dalam waktu lama', 'Lingkungan yang kurang ventilasi udara, padat penduduk, higienis buruk'],
    prevention: ['Vaksin BCG saat bayi untuk pencegahan TB berat', 'Hindari kontak erat dengan penderita TB aktif tanpa masker', 'Gunakan masker N95 jika berada di dekat penderita TB', 'Tingkatkan daya tahan imun dengan nutrisi baik dan istirahat cukup', 'Jaga kebersihan rumah dan pastikan ventilasi udara memadai', 'Periksa kesehatan rutin jika ada kontak dengan penderita TB', 'Hindari merokok dan alkohol yang melemahkan imun'],
    treatment: 'Obat anti-TB kombinasi (isoniazid, rifampin, pyrazinamide, ethambutol) selama 6 bulan minimal sesuai resep dokter. Harus dihabiskan semua obat meski sudah merasa sehat. Istirahat dan nutrisi baik sangat penting.',
    healthBenefits: ['Paru-paru dapat sembuh total', 'Tidak menular setelah 2 minggu obat', 'Kembali produktif dan aktif']
  }
];

// Sort diseases alphabetically by title
DISEASES_DATA.sort((a, b) => a.title.localeCompare(b.title));

export default function Content() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState('selectDisease');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [results, setResults] = useState(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, time: 0 });
  const [dragDelta, setDragDelta] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    sleepDuration: '',
    smoking: 'no',
    exerciseFrequency: 'moderate',
    familyHistory: 'no',
    symptoms: []
  });
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Set carousel centerIndex berdasarkan disease ID dari URL
  useEffect(() => {
    const diseaseId = parseInt(searchParams.get('disease'));
    if (diseaseId) {
      const diseaseIndex = DISEASES_DATA.findIndex(d => d.id === diseaseId);
      if (diseaseIndex !== -1) {
        setCenterIndex(diseaseIndex);
      }
    }
  }, [searchParams]);

  // Auto-select first disease (alphabetically) on mount
  useEffect(() => {
    if (DISEASES_DATA.length > 0 && !selectedDisease) {
      setSelectedDisease(DISEASES_DATA[0]);
      setSelectedDiseaseId(DISEASES_DATA[0].id);
    }
  }, []);

  const displayCount = 5; // Show 5 cards: 2 left + 1 center + 2 right

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % DISEASES_DATA.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + DISEASES_DATA.length) % DISEASES_DATA.length);
  };

  // Button navigation handlers with preventDefault
  const handleNextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextSlide();
  };

  const handlePrevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    prevSlide();
  };

  // Get displayed items with infinite scroll
  const getDisplayedItems = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (centerIndex + i + DISEASES_DATA.length) % DISEASES_DATA.length;
      items.push({ disease: DISEASES_DATA[index], offset: i });
    }
    return items;
  };

  const getScaleAndOpacity = (offset) => {
    const absOffset = Math.abs(offset);
    if (absOffset === 0) return { scale: 1, opacity: 1, zIndex: 30 };
    if (absOffset === 1) return { scale: 0.85, opacity: 0.7, zIndex: 20 };
    return { scale: 0.7, opacity: 0.5, zIndex: 10 };
  };

  // Drag and Touch Handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, time: Date.now() });
    setDragDelta(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const delta = e.clientX - dragStart.x;
    setDragDelta(delta);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    handleDragEnd(dragDelta);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY, time: Date.now() });
    setDragDelta(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const delta = touch.clientX - dragStart.x;
    setDragDelta(delta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    handleDragEnd(dragDelta);
  };

  // Prevent scroll during drag using minimal event listeners
  useEffect(() => {
    if (!isDragging) return;

    // Minimal scroll prevention - only prevent wheel and touchmove during drag
    const preventScrollEvent = (e) => {
      if (e.type === 'wheel' || e.type === 'touchmove') {
        e.preventDefault();
      }
    };

    // Add listeners only during drag
    document.addEventListener('wheel', preventScrollEvent, { passive: false, capture: true });
    document.addEventListener('touchmove', preventScrollEvent, { passive: false, capture: true });

    // Cleanup on drag end
    return () => {
      document.removeEventListener('wheel', preventScrollEvent, { capture: true });
      document.removeEventListener('touchmove', preventScrollEvent, { capture: true });
    };
  }, [isDragging]);

  const handleDragEnd = (delta) => {
    const threshold = 50; // Minimum swipe distance
    const timeDiff = Date.now() - dragStart.time;
    const velocity = Math.abs(delta) / timeDiff; // pixels per millisecond
    
    // Swipe right (previous) or slow drag right
    if (delta > threshold || (velocity > 0.5 && delta > 20)) {
      prevSlide();
    }
    // Swipe left (next) or slow drag left
    else if (delta < -threshold || (velocity > 0.5 && delta < -20)) {
      nextSlide();
    }
    
    setDragDelta(0);
  };

  const handleDiseaseSelect = (disease) => {
    setSelectedDiseaseId(disease.id);
    setTimeout(() => {
      setSelectedDisease(disease);
      setFormData({ ...formData, symptoms: [] });
      setCurrentStep('form');
    }, 300);
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const calculateRiskScore = () => {
    if (!selectedDisease) return 0;
    
    let riskScore = 0;

    // Symptoms: Max 40 points - core indicator
    const symptomsScore = (formData.symptoms.length / selectedDisease.symptoms.length) * 40;
    riskScore += symptomsScore;

    // BMI: Max 20 points (both underweight and overweight are risky)
    if (formData.weight && formData.height) {
      const bmi = formData.weight / ((formData.height / 100) * (formData.height / 100));
      if (bmi >= 30) riskScore += 20;           // Obesitas: 20 pts
      else if (bmi >= 25) riskScore += 15;     // Overweight: 15 pts
      else if (bmi >= 23) riskScore += 8;      // Borderline overweight: 8 pts
      else if (bmi >= 18.5) riskScore += 3;    // Normal: 3 pts
      else if (bmi >= 17) riskScore += 8;      // Underweight: 8 pts (malnutrition risk)
      else riskScore += 12;                    // Severe underweight: 12 pts
    }

    // Age: Max 15 points - more granular scoring
    const age = parseInt(formData.age);
    if (age > 65) riskScore += 15;
    else if (age > 55) riskScore += 12;
    else if (age > 45) riskScore += 9;
    else if (age > 35) riskScore += 5;
    else if (age < 20) riskScore += 2;         // Very young: slightly elevated risk for some diseases

    // Smoking: Max 10 points
    if (formData.smoking === 'yes') riskScore += 10;
    
    // Exercise: Max 10 points - comprehensive scoring
    if (formData.exerciseFrequency === 'never') riskScore += 10;        // Tidak pernah: 10 pts (highest risk)
    else if (formData.exerciseFrequency === 'rare') riskScore += 8;     // Jarang: 8 pts
    else if (formData.exerciseFrequency === 'moderate') riskScore += 4; // Sedang: 4 pts
    else riskScore += 0;  // Regular exercise: 0 pts (best behavior)
    
    // Sleep: Max 5 points - handle both under and oversleeping
    const sleepVal = parseFloat(formData.sleepDuration);
    if (!isNaN(sleepVal)) {
      if (sleepVal < 5 || sleepVal > 10) riskScore += 5;      // Severe deviation: 5 pts
      else if (sleepVal < 6 || sleepVal > 9) riskScore += 3;  // Moderate deviation: 3 pts
      else if (sleepVal < 7 || sleepVal > 8.5) riskScore += 1; // Mild deviation: 1 pt
    }
    
    // Family History: Max 2 points
    if (formData.familyHistory === 'yes') riskScore += 2;

    return Math.min(riskScore, 100);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const errors = [];
    
    if (!formData.name || !formData.name.trim()) errors.push('Nama lengkap harus diisi');
    if (!formData.age || formData.age < 18 || formData.age > 120) errors.push('Usia harus antara 18-120 tahun');
    if (!formData.weight || parseFloat(formData.weight) <= 0 || parseFloat(formData.weight) > 500) errors.push('Berat badan harus antara 0-500 kg');
    if (!formData.height || parseFloat(formData.height) <= 0 || parseFloat(formData.height) > 250) errors.push('Tinggi badan harus antara 0-250 cm');
    
    // Sleep validation with NaN check
    const sleepVal = parseFloat(formData.sleepDuration);
    if (!formData.sleepDuration || isNaN(sleepVal) || sleepVal < 0 || sleepVal > 24) errors.push('Durasi tidur harus antara 0-24 jam');
    
    if (!formData.gender) errors.push('Jenis kelamin harus dipilih');
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowValidationModal(true);
      return;
    }

    const riskScore = calculateRiskScore();
    setResults({
      ...formData,
      disease: selectedDisease,
      riskScore: Math.round(riskScore),
      timestamp: new Date()
    });
    setCurrentStep('results');
  };

  const handleReset = () => {
    setCurrentStep('selectDisease');
    setSelectedDisease(null);
    setResults(null);
    setFormData({
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      sleepDuration: '',
      smoking: 'no',
      exerciseFrequency: 'moderate',
      familyHistory: 'no',
      symptoms: []
    });
  };

  return (
    <div>
      {currentStep === 'selectDisease' && (
        <>
          <section className="relative bg-cover bg-center bg-no-repeat py-8 sm:py-16 overflow-hidden" style={{backgroundImage: 'url(/images/analisis.png)'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 to-secondary-500/80"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                Penganalisis Risiko Kesehatan
              </h1>
              <p className="text-xs sm:text-base lg:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed">
                Pilih penyakit yang ingin Anda analisis, jawab pertanyaan tentang gejala dan kondisi kesehatan Anda, 
                lalu dapatkan penilaian risiko yang akurat dengan rekomendasi personal.
              </p>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Centered Header - Above Carousel */}
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">Pilih Penyakit untuk Dianalisis</h2>
              <p className="text-gray-600 text-xs sm:text-base">Geser untuk melihat lebih banyak penyakit</p>
            </div>

            {/* Carousel Container */}
            <div 
              className="relative py-6 sm:py-10 px-12 sm:px-20 lg:px-28 select-none carousel-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Left Navigation Button */}
              <button
                onClick={handlePrevSlide}
                onTouchEnd={handlePrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-md border-2 border-gray-300/50 hover:border-primary-400 text-gray-700 hover:text-primary-600 rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 z-50 focus:outline-none"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Main Carousel */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 perspective h-72 sm:h-80">
                {getDisplayedItems().map((item, idx) => {
                  const { scale, opacity, zIndex } = getScaleAndOpacity(item.offset);
                  const disease = item.disease;
                  
                  return (
                    <div
                      key={`${item.disease.id}-${idx}`}
                      className={`absolute cursor-pointer`}
                      style={{
                        transform: `translateX(${item.offset * 200}px) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                        transition: isDragging ? 'none' : 'all 1500ms cubic-bezier(0.34, 0.46, 0.66, 1)'
                      }}
                    >
                      <button
                        onClick={() => {
                          if (item.offset !== 0) {
                            if (item.offset > 0) nextSlide();
                            else prevSlide();
                          } else {
                            handleDiseaseSelect(disease);
                          }
                        }}
                        className={`relative ${disease.bgColor} ${disease.borderColor} border-2 rounded-2xl p-5 sm:p-6 text-left h-60 sm:h-72 w-56 sm:w-64 lg:w-72 transition-all duration-300 group flex flex-col justify-between active:scale-95 ${
                          item.offset === 0 ? 'cursor-pointer shadow-2xl hover:shadow-2xl hover:scale-105' : 'cursor-grab hover:shadow-xl'
                        } ${selectedDiseaseId === disease.id ? 'card-select-animation' : ''}`}
                      >
                        {/* Top Bar with Color - Centered */}
                        <div className="flex justify-center">
                          <div className={`h-1 w-20 sm:w-24 rounded-full ${disease.textColor} bg-current`}></div>
                        </div>
                        
                        {/* Disease Icon Circle - Middle */}
                        <div className={`flex justify-center py-2 relative ${selectedDiseaseId === disease.id ? 'icon-pulse-glow' : ''}`}>
                          {/* Outer glow ring */}
                          <div className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${disease.textColor} ${selectedDiseaseId === disease.id ? 'opacity-60' : 'opacity-20'} blur-lg transition-opacity duration-500`}></div>
                          
                          {/* Main icon */}
                          <div className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-white via-white to-transparent border-2 ${disease.textColor} border-current transition-all duration-300 ${selectedDiseaseId === disease.id ? 'shadow-2xl scale-110' : 'shadow-lg group-hover:shadow-2xl'}`}>
                            {/* Icon */}
                            {disease.IconComponent && (
                              <disease.IconComponent size={28} className={`${disease.textColor} relative z-10 transition-transform duration-300 ${selectedDiseaseId === disease.id ? 'scale-125' : 'group-hover:scale-110'}`} strokeWidth={2.5} />
                            )}
                          </div>
                        </div>
                        
                        {/* Title & Description - Bottom */}
                        <div className="text-center">
                          <h3 className={`font-bold text-lg sm:text-xl ${disease.textColor} mb-1 line-clamp-2`}>
                            {disease.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                            {disease.description}
                          </p>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Right Navigation Button */}
              <button
                onClick={handleNextSlide}
                onTouchEnd={handleNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-md border-2 border-gray-300/50 hover:border-secondary-400 text-gray-700 hover:text-secondary-600 rounded-full p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 z-50 focus:outline-none"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-3 py-6 sm:py-10 mt-3">
              <div className="card group hover:shadow-lg p-3 sm:p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-primary-50 to-white hover:border-primary-400 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-all duration-300">
                  <CheckCircle2 className="text-primary-600 w-6 sm:w-7" size={24} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Akurat</h3>
                <p className="text-xs text-gray-600 leading-tight">Penilaian risiko dan deteksi dini</p>
              </div>

              <div className="card group hover:shadow-lg p-3 sm:p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-secondary-50 to-white hover:border-secondary-400 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary-100 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-all duration-300">
                  <Zap className="text-secondary-600 w-6 sm:w-7" size={24} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Instan</h3>
                <p className="text-xs text-gray-600 leading-tight">Informasi kesehatan tercepat</p>
              </div>

              <div className="card group hover:shadow-lg p-3 sm:p-5 rounded-lg border border-gray-200 bg-gradient-to-br from-primary-50 to-white hover:border-primary-400 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="text-primary-600 w-6 sm:w-7" size={24} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Personal</h3>
                <p className="text-xs text-gray-600 leading-tight">Solusi kesehatan yang dipersonalisasi</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 sm:p-6 flex gap-3 sm:gap-4">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs sm:text-sm text-yellow-800">
                  <strong>Penafian Medis:</strong> Alat ini hanya untuk tujuan edukasi dan <strong>bukan diagnosis profesional</strong>. 
                  Selalu konsultasikan dengan dokter berlisensi untuk pemeriksaan dan perawatan kesehatan yang tepat.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {currentStep === 'form' && selectedDisease && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <button
            onClick={() => setCurrentStep('selectDisease')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 text-sm sm:text-base font-semibold transition-colors"
          >
            <ArrowLeft size={18} /> Kembali ke Pilihan Penyakit
          </button>

          <form onSubmit={handleFormSubmit} className="bg-white rounded-xl border border-gray-200 px-3 py-3 sm:rounded-2xl sm:p-8 shadow-lg">
            <div className="mb-3 sm:mb-6 pb-3 sm:pb-6 border-b-2 border-gray-200">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-2 ${selectedDisease.bgColor} ${selectedDisease.textColor}`}>
                <Zap size={14} className="mr-1" /> Analisis Risiko
              </div>
              <h2 className="text-base sm:text-2xl font-bold text-gray-900">{selectedDisease.title}</h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-snug">{selectedDisease.description}</p>
            </div>

            {/* Personal Data Section */}
            <div className="mb-3 sm:mb-5 pb-3 sm:pb-5">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2.5 sm:mb-3 flex items-center gap-2 pb-2 border-b border-blue-200"><User size={18} className="text-blue-600" /> Data Pribadi</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Usia *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="35"
                    min="18"
                    max="120"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Kelamin *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih</option>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">BB (kg) *</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="70"
                    min="20"
                    max="300"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">TB (cm) *</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                    placeholder="170"
                    min="100"
                    max="250"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="mb-3 sm:mb-5 pb-3 sm:pb-5">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2.5 sm:mb-3 flex items-center gap-2 pb-2 border-b border-red-200"><Heart size={18} className="text-red-600" /> Gaya Hidup</h3>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Tidur (jam) *</label>
                  <input
                    type="number"
                    value={formData.sleepDuration}
                    onChange={(e) => setFormData({...formData, sleepDuration: e.target.value})}
                    placeholder="7"
                    min="0"
                    max="24"
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Merokok *</label>
                  <select
                    value={formData.smoking}
                    onChange={(e) => setFormData({...formData, smoking: e.target.value})}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="no">Tidak</option>
                    <option value="yes">Ya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Olahraga *</label>
                  <select
                    value={formData.exerciseFrequency}
                    onChange={(e) => setFormData({...formData, exerciseFrequency: e.target.value})}
                    className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="never">Tidak Pernah</option>
                    <option value="rare">Jarang (1-2x/minggu)</option>
                    <option value="moderate">Sedang (2-3x/minggu)</option>
                    <option value="regular">Sering (4-7x/minggu)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Medical History Section */}
            <div className="mb-3 sm:mb-5 pb-3 sm:pb-5">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2.5 sm:mb-3 flex items-center gap-2 pb-2 border-b border-purple-200"><Shield size={18} className="text-purple-600" /> Riwayat Kesehatan</h3>
              
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Riwayat Penyakit Keluarga *</label>
                <select
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                  className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="no">Tidak</option>
                  <option value="yes">Ya (Hipertensi, Diabetes, Jantung, dll)</option>
                </select>
              </div>
            </div>

            {/* Symptoms Section */}
            <div className="mb-3 sm:mb-5">
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2.5 sm:mb-3 flex items-center gap-2 pb-2 border-b border-orange-200"><AlertTriangle size={18} className="text-orange-600" /> Gejala yang Dirasakan</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2.5 sm:mb-3">Centang gejala yang pernah atau sedang Anda alami</p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                {selectedDisease.symptoms.map((symptom, idx) => (
                  <label key={idx} className="flex items-start gap-2 cursor-pointer p-2 sm:p-2.5 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-200 group">
                    <input
                      type="checkbox"
                      checked={formData.symptoms.includes(symptom)}
                      onChange={() => handleSymptomToggle(symptom)}
                      className="w-4 sm:w-4 h-4 sm:h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer flex-shrink-0 mt-0.5"
                    />
                    <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-snug">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-base active:scale-95 transition-all duration-300 mt-3 sm:mt-4 flex items-center justify-center gap-2"
            >
              <Search size={16} className="sm:w-5 sm:h-5" /> Analisis Sekarang
            </button>

            <p className="text-xs sm:text-sm text-gray-500 text-center mt-2 sm:mt-3">* Pastikan semua data sudah lengkap</p>
          </form>
        </section>
      )}

      {currentStep === 'results' && results && (
        <ResultDashboard results={results} onReset={handleReset} />
      )}

      {/* Validation Modal */}
      <ValidationModal 
        isOpen={showValidationModal} 
        errors={validationErrors} 
        onClose={() => setShowValidationModal(false)} 
      />
    </div>
  );
}

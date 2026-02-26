import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Settings, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nama diperlukan';
    if (!formData.email.trim()) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Silakan masukkan alamat email yang valid';
    }
    if (!formData.message.trim()) newErrors.message = 'Pesan diperlukan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan tentang VitaCheck? Kami ingin mendengarkan dari Anda. Kirimkan pesan kepada kami dan kami akan merespons sesegera mungkin.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Informasi Kontak</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Mail className="text-primary-500" size={20} />
                  Email
                </h3>
                <p className="text-gray-600">
                  <a href="mailto:info@vitacheck.com" className="text-primary-500 hover:text-primary-700">
                    info@vitacheck.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Phone className="text-secondary-500" size={20} />
                  Telepon
                </h3>
                <p className="text-gray-600">
                  <a href="tel:+1234567890" className="text-primary-500 hover:text-primary-700">
                    +1 (234) 567-890
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="text-primary-500" size={20} />
                  Alamat
                </h3>
                <p className="text-gray-600">
                  123 Jalan Kesehatan<br />
                  Kota Wellness, WC 12345<br />
                  Indonesia
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="text-secondary-500" size={20} />
                  Jam Kerja
                </h3>
                <p className="text-gray-600">
                  Senin - Jumat: 9:00 AM - 6:00 PM<br />
                  Sabtu: 10:00 AM - 4:00 PM<br />
                  Minggu: Tutup
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="text-primary-500" size={20} />
                  Ikuti Kami
                </h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors hover:scale-110">f</a>
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors hover:scale-110">𝕏</a>
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors hover:scale-110">in</a>
                  <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors hover:scale-110">📷</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 slide-up" style={{animationDelay: '0.1s'}}>
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirimkan Pesan kami</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg slide-up flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-green-800 font-semibold">Terima kasih atas pesan Anda!</p>
                    <p className="text-green-700 text-sm mt-1">Kami akan menghubungi Anda sesegera mungkin.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nama Anda"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="anda@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-300 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Pesan Anda..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full font-bold py-3 hover:scale-105 transition-transform">
                  Kirim Pesan
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">
                Biasanya kami merespons dalam 24 jam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-lg text-gray-600">Temukan jawaban untuk pertanyaan umum tentang VitaCheck</p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <details className="card group cursor-pointer slide-up">
              <summary className="flex items-center justify-between font-bold text-gray-900 hover:text-primary-500 transition-colors">
                <span className="text-lg">Apakah VitaCheck adalah alat diagnosis medis?</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 pb-4 border-t pt-4">
                <p>
                  Tidak, VitaCheck hanya merupakan alat pendidikan dan informasi. BUKAN merupakan pengganti diagnosis medis profesional, 
                  nasihat, atau perawatan. Selalu konsultasikan dengan penyedia layanan kesehatan yang berkualifikasi untuk setiap kekhawatiran kesehatan.
                </p>
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="card group cursor-pointer slide-up" style={{animationDelay: '0.1s'}}>
              <summary className="flex items-center justify-between font-bold text-gray-900 hover:text-primary-500 transition-colors">
                <span className="text-lg">Apakah data saya disimpan atau dibagikan?</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 pb-4 border-t pt-4">
                <p>
                  Tidak. Informasi kesehatan Anda diproses sepenuhnya di perangkat Anda dan TIDAK disimpan di server eksternal. 
                  Kami tidak mengumpulkan, menyimpan, atau membagikan data kesehatan pribadi Anda dengan siapa pun. Privasi Anda adalah prioritas tertinggi kami.
                </p>
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="card group cursor-pointer slide-up" style={{animationDelay: '0.2s'}}>
              <summary className="flex items-center justify-between font-bold text-gray-900 hover:text-primary-500 transition-colors">
                <span className="text-lg">Seberapa akurat alat ini?</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 pb-4 border-t pt-4">
                <p>
                  VitaCheck menggunakan model berbasis bukti yang dikembangkan dari penelitian medis dan pedoman kesehatan. Namun, tidak ada alat penilaian 
                  yang dapat 100% akurat untuk semua individu. Alat ini harus digunakan sebagai panduan umum untuk meningkatkan kesadaran tentang faktor risiko kesehatan. 
                  Untuk nasihat medis yang dipersonalisasi, konsultasikan dengan profesional kesehatan.
                </p>
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="card group cursor-pointer slide-up" style={{animationDelay: '0.3s'}}>
              <summary className="flex items-center justify-between font-bold text-gray-900 hover:text-primary-500 transition-colors">
                <span className="text-lg">Dapatkah saya menggunakan ini untuk anggota keluarga?</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 pb-4 border-t pt-4">
                <p>
                  Ya, Anda dapat menjalankan penilaian untuk anggota keluarga menggunakan informasi kesehatan mereka. Namun, penilaian harus 
                  dilakukan dengan informasi yang akurat tentang individu tersebut. Anak-anak harus menggunakan alat ini dengan bimbingan orang tua.
                </p>
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="card group cursor-pointer slide-up" style={{animationDelay: '0.4s'}}>
              <summary className="flex items-center justify-between font-bold text-gray-900 hover:text-primary-500 transition-colors">
                <span className="text-lg">Seberapa sering saya harus melakukan penilaian?</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 pb-4 border-t pt-4">
                <p>
                  Anda dapat melakukan penilaian sesering yang Anda suka. Namun, paling berguna untuk mengulanginya secara berkala (misalnya, setiap 3-6 bulan) 
                  setelah melakukan perubahan gaya hidup untuk melacak kemajuan Anda dan melihat bagaimana skor kesehatan Anda meningkat.
                </p>
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="card group cursor-pointer slide-up" style={{animationDelay: '0.5s'}}>
              <summary className="flex items-center justify-between font-bold text-gray-900 hover:text-primary-500 transition-colors">
                <span className="text-lg">Apakah ada biaya untuk menggunakan VitaCheck?</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-gray-600 pb-4 border-t pt-4">
                <p>
                  VitaCheck sepenuhnya gratis untuk digunakan. Kami percaya bahwa semua orang harus memiliki akses ke alat kesadaran kesehatan tanpa hambatan keuangan.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h2 className="text-3xl font-bold mb-4">Siap Menilai Kesehatan Anda?</h2>
          <p className="text-primary-100 mb-8">Mulai penilaian risiko kesehatan gratis Anda sekarang</p>
          <a href="/content" className="inline-block bg-white text-primary-500 px-8 py-3 rounded-lg font-bold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Buka Penganalisis →
          </a>
        </div>
      </section>
    </div>
  );
}

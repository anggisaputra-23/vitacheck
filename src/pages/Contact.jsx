import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Settings, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ChatBotWrapper from '../components/ChatBotWrapper';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nama diperlukan';
    if (!formData.email.trim()) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
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
      setLoading(true);
      setSendError('');

      // Template parameters must match your EmailJS template variables
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.name,
        message: formData.message
      };

      // Debug log
      console.log('EmailJS Config:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      });
      console.log('Template Params:', templateParams);

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams
        )
        .then(() => {
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setLoading(false);
          setTimeout(() => setSubmitted(false), 5000);
        })
        .catch((error) => {
          console.error('Gagal mengirim email - Error Details:', error);
          const errorMsg = error?.status === 400 
            ? 'Template EmailJS tidak cocok. Hubungi admin.'
            : 'Gagal mengirim pesan. Silakan coba lagi.';
          setSendError(errorMsg);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {/* Hero Section - Tentang VitaCheck */}
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
              Hubungi Kami
            </h1>
            
            <div className="max-w-5xl mx-auto">
              <p className="text-base md:text-lg lg:text-xl text-white/95 font-light leading-relaxed mb-3">
                Tim kami siap membantu. Hubungi kami dengan pertanyaan apa pun tentang VitaCheck atau kesehatan Anda.
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-primary-300 to-secondary-300 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden relative z-10 w-full px-3 py-6 text-center fade-in">
          <div className="flex flex-col items-center">
            <h1 className="text-lg sm:text-xl font-bold text-white mb-3">
              Hubungi Kami
            </h1>
            
            <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed">
              Tim kami siap membantu. Hubungi kami dengan pertanyaan apa pun tentang VitaCheck atau kesehatan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {/* Email Card */}
          <div className="group card hover:shadow-lg hover:border-primary-400 transition-all duration-300 p-3 sm:p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 group-hover:bg-primary-500 transition-colors mb-2 sm:mb-3">
              <Mail className="text-primary-600 group-hover:text-white" size={16} />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600 text-xs break-all">
              <a href="mailto:vitacheckhealthy@gmail.com" className="text-primary-600 hover:text-primary-700 font-semibold">
                vitacheckhealthy@gmail.com
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-0.5">Respons cepat</p>
          </div>

          {/* Phone Card */}
          <div className="group card hover:shadow-lg hover:border-secondary-400 transition-all duration-300 p-3 sm:p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary-100 group-hover:bg-secondary-500 transition-colors mb-2 sm:mb-3">
              <Phone className="text-secondary-600 group-hover:text-white" size={16} />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Hubungi</h3>
            <p className="text-gray-600 text-xs">
              <a href="tel:+62812345678" className="text-primary-600 hover:text-primary-700 font-semibold">
                +62 812 345 678
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-0.5">9AM-6PM WIB</p>
          </div>

          {/* Address Card */}
          <div className="group card hover:shadow-lg hover:border-primary-400 transition-all duration-300 p-3 sm:p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 group-hover:bg-primary-500 transition-colors mb-2 sm:mb-3">
              <MapPin className="text-primary-600 group-hover:text-white" size={16} />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Lokasi</h3>
            <p className="text-gray-600 text-xs">
              Purwokerto, Indonesia
            </p>
            <p className="text-gray-500 text-xs mt-0.5">Jawa Tengah</p>
          </div>

          {/* Hours Card */}
          <div className="group card hover:shadow-lg hover:border-secondary-400 transition-all duration-300 p-3 sm:p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary-100 group-hover:bg-secondary-500 transition-colors mb-2 sm:mb-3">
              <Clock className="text-secondary-600 group-hover:text-white" size={16} />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">Jam Kerja</h3>
            <p className="text-gray-600 text-xs">
              <span className="block">Senin-Jumat: 9AM-6PM</span>
              <span className="block">Sabtu: 10AM-4PM</span>
            </p>
            <p className="text-gray-500 text-xs mt-0.5">Minggu: Tutup</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Hubungi Tim Kami</h2>
            <p className="text-sm sm:text-base text-gray-600">Kami akan merespons pesan Anda dalam waktu singkat</p>
          </div>

          <div className="card border-0 shadow-lg">
            {submitted && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-300 rounded-lg slide-up flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-green-800 font-semibold text-sm sm:text-base">Terima kasih!</p>
                  <p className="text-green-700 text-xs sm:text-sm mt-1">Email berhasil dikirim. Kami akan segera menghubungi Anda.</p>
                </div>
              </div>
            )}

            {sendError && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-300 rounded-lg slide-up flex items-start gap-2 sm:gap-3">
                <div className="text-red-600 flex-shrink-0 mt-0.5">*</div>
                <div>
                  <p className="text-red-800 font-semibold text-sm sm:text-base">Terjadi kesalahan</p>
                  <p className="text-red-700 text-xs sm:text-sm mt-1">{sendError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-label="Nama Lengkap"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nama Anda"
                />
                {errors.name && <p id="name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-label="Alamat Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="anda@email.com"
                />
                {errors.email && <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Pesan *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  aria-label="Pesan"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all duration-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tulis pesan Anda..."
                ></textarea>
                {errors.message && <p id="message-error" role="alert" className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full font-bold py-2.5 sm:py-3 text-sm sm:text-base hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>

            <p className="text-center text-gray-500 text-xs sm:text-sm mt-4">
              Respons biasanya dalam 24 jam kerja
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">FAQ</h2>
            <p className="text-xs text-gray-600">Jawaban cepat untuk pertanyaan Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            {/* FAQ 1 */}
            <details className="card group cursor-pointer hover:border-primary-300 transition-all p-2 sm:p-3">
              <summary className="flex items-center justify-between font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-xs">Apakah VitaCheck adalah alat diagnosis medis?</span>
                <span className="text-base sm:text-lg group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
              </summary>
              <div className="mt-1.5 sm:mt-2 text-gray-600 pb-0 border-t pt-1.5 sm:pt-2">
                <p className="text-xs leading-relaxed">
                  Tidak. VitaCheck adalah alat edukasi, bukan pengganti diagnosis medis profesional. Konsultasikan dengan dokter untuk kekhawatiran kesehatan.
                </p>
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="card group cursor-pointer hover:border-primary-300 transition-all p-2 sm:p-3">
              <summary className="flex items-center justify-between font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-xs">Apakah data saya disimpan?</span>
                <span className="text-base sm:text-lg group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
              </summary>
              <div className="mt-1.5 sm:mt-2 text-gray-600 pb-0 border-t pt-1.5 sm:pt-2">
                <p className="text-xs leading-relaxed">
                  Tidak. Data Anda diproses sepenuhnya di perangkat Anda. Kami tidak menyimpan atau membagikan informasi pribadi Anda.
                </p>
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="card group cursor-pointer hover:border-primary-300 transition-all p-2 sm:p-3">
              <summary className="flex items-center justify-between font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-xs">Seberapa akurat alat ini?</span>
                <span className="text-base sm:text-lg group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
              </summary>
              <div className="mt-1.5 sm:mt-2 text-gray-600 pb-0 border-t pt-1.5 sm:pt-2">
                <p className="text-xs leading-relaxed">
                  VitaCheck berbasis bukti medis tetapi tidak 100% akurat untuk semua. Gunakan sebagai panduan untuk meningkatkan kesadaran kesehatan.
                </p>
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="card group cursor-pointer hover:border-primary-300 transition-all p-2 sm:p-3">
              <summary className="flex items-center justify-between font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-xs">Bisakah saya menggunakan untuk keluarga?</span>
                <span className="text-base sm:text-lg group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
              </summary>
              <div className="mt-1.5 sm:mt-2 text-gray-600 pb-0 border-t pt-1.5 sm:pt-2">
                <p className="text-xs leading-relaxed">
                  Ya, dengan informasi kesehatan mereka yang akurat. Anak-anak harus mendapat bimbingan orang tua.
                </p>
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="card group cursor-pointer hover:border-primary-300 transition-all p-2 sm:p-3">
              <summary className="flex items-center justify-between font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-xs">Seberapa sering saya menilai?</span>
                <span className="text-base sm:text-lg group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
              </summary>
              <div className="mt-1.5 sm:mt-2 text-gray-600 pb-0 border-t pt-1.5 sm:pt-2">
                <p className="text-xs leading-relaxed">
                  Kapan saja Anda mau. Ulangi setiap 3-6 bulan untuk melacak kemajuan kesehatan Anda.
                </p>
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="card group cursor-pointer hover:border-primary-300 transition-all p-2 sm:p-3">
              <summary className="flex items-center justify-between font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-xs">Apakah ada biaya?</span>
                <span className="text-base sm:text-lg group-open:rotate-180 transition-transform flex-shrink-0 ml-2">▼</span>
              </summary>
              <div className="mt-1.5 sm:mt-2 text-gray-600 pb-0 border-t pt-1.5 sm:pt-2">
                <p className="text-xs leading-relaxed">
                  VitaCheck sepenuhnya gratis. Kami percaya kesadaran kesehatan harus dapat diakses semua orang.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <ChatBotWrapper />
    </div>
  );
}

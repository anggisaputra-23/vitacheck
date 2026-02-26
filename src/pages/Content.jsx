import { useState } from 'react';
import { CheckCircle2, Zap, BarChart3, AlertTriangle } from 'lucide-react';
import AnalyzerForm from '../components/AnalyzerForm';
import ResultDashboard from '../components/ResultDashboard';

export default function Content() {
  const [results, setResults] = useState(null);

  const handleFormSubmit = (data) => {
    setResults(data);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div>
      {!results ? (
        <>
          {/* Header Section */}
          <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Penganalisis Risiko Kesehatan</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Jawab beberapa pertanyaan sederhana tentang kesehatan dan gaya hidup Anda untuk mendapatkan penilaian risiko yang komprehensif dengan rekomendasi yang dipersonalisasi.
              </p>
            </div>
          </section>

          {/* Form Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AnalyzerForm onSubmit={handleFormSubmit} />

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="card slide-up group hover:shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <CheckCircle2 className="text-primary-500" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Rahasia</h3>
                <p className="text-gray-600 text-sm">Data Anda sepenuhnya pribadi dan tidak disimpan di server eksternal</p>
              </div>

              <div className="card slide-up group hover:shadow-lg" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <Zap className="text-secondary-500" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hasil Instan</h3>
                <p className="text-gray-600 text-sm">Dapatkan hasil komprehensif dan visualisasi dalam hitungan detik</p>
              </div>

              <div className="card slide-up group hover:shadow-lg" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="text-primary-500" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Berbasis Bukti</h3>
                <p className="text-gray-600 text-sm">Berdasarkan pedoman medis dan standar penelitian kesehatan</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mt-12 fade-in flex items-start gap-4">
              <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <p className="text-yellow-800">
                <strong>Penafian Medis:</strong> Alat ini hanya untuk tujuan pendidikan dan informasi. 
                BUKAN merupakan pengganti diagnosis medis profesional, nasihat, atau perawatan dari penyedia layanan kesehatan yang berkualifikasi. 
                Hasil tidak boleh digunakan untuk diagnosis sendiri. Selalu konsultasikan dengan dokter berlisensi untuk masalah kesehatan apa pun.
              </p>
            </div>
          </section>
        </>
      ) : (
        <ResultDashboard results={results} onReset={handleReset} />
      )}
    </div>
  );
}

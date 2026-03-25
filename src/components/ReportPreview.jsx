import { Download, ArrowLeft } from 'lucide-react';
import { generateHealthReportPDF } from '../utils/pdfGenerator';

export default function ReportPreview({ results, onBack }) {
  const bmi = results.weight / ((results.height / 100) ** 2);
  const bmiCategory = bmi < 17 ? 'Berat Badan Kurang Berat' : bmi < 23 ? 'Normal' : bmi < 25 ? 'Kelebihan Berat Badan' : bmi < 30 ? 'Obesitas' : 'Obesitas Berat';
  
  const getRiskLevel = (score) => {
    if (score >= 70) return 'RISIKO TINGGI';
    if (score >= 40) return 'RISIKO SEDANG';
    return 'RISIKO RENDAH';
  };

  const matchedSymptoms = results.symptoms.length;
  const totalSymptoms = results.disease?.symptoms?.length || 1;
  const symptomMatch = Math.round((matchedSymptoms / totalSymptoms) * 100);

  const reportDate = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const reportNumber = String((results.name || 'VITA').length * 100000 + (results.age || 0) * 100 + (results.riskScore || 0)).slice(-8);

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        
        {/* Header Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            Laporan Hasil Analisis Kesehatan
          </h1>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 w-full sm:w-auto"
            title="Kembali ke hasil analisis"
          >
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </button>
        </div>

        {/* Report Content */}
        <div className="bg-white border-2 border-gray-300 rounded-xl p-4 sm:p-10 mb-6 sm:mb-8 shadow-lg">
          
          {/* Kop Laporan */}
          <div className="border-b-2 border-gray-300 pb-4 sm:pb-6 mb-4 sm:mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">VITACHECK</h2>
                <p className="text-sm text-gray-700">Platform Penilaian Risiko Kesehatan Digital</p>
                <p className="text-xs text-gray-600 mt-1">vitacheckhealthy@gmail.com | Purwokerto, Indonesia</p>
              </div>
              <div className="text-left sm:text-right text-xs text-gray-600">
                <p className="font-semibold text-gray-900">Nomor: VCR-{reportNumber}</p>
                <p>Tanggal: {reportDate}</p>
              </div>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mt-3 sm:mt-4">
              LAPORAN HASIL ANALISIS KESEHATAN
            </h3>
          </div>

          {/* Data Diri */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">1. DATA DIRI PASIEN</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full min-w-[620px] border-collapse">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm w-1/3">Nama Lengkap</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{results.name || '-'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Usia</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{results.age} tahun</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Jenis Kelamin</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.gender === 'M' ? 'Laki-laki' : results.gender === 'F' ? 'Perempuan' : 'Lainnya'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Berat Badan</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{results.weight} kg</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Tinggi Badan</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{results.height} cm</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          {/* Hasil Analisis */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">2. HASIL ANALISIS RISIKO</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-blue-600">
                  <th className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-left font-semibold text-xs sm:text-sm">Parameter</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-left font-semibold text-xs sm:text-sm">Nilai</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-left font-semibold text-xs sm:text-sm">Interpretasi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Skor Risiko Kesehatan</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{results.riskScore}/100</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{getRiskLevel(results.riskScore)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Status Kesehatan</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{getRiskLevel(results.riskScore)}</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.riskScore >= 70 ? 'Urgen - Konsultasi Dokter' : results.riskScore >= 40 ? 'Perlu Perhatian' : 'Baik'}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">BMI (Body Mass Index)</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{(Math.round(bmi * 10) / 10).toFixed(1)}</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{bmiCategory}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          {/* Indikator Kesehatan */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">3. INDIKATOR KESEHATAN</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-blue-600">
                  <th className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-left font-semibold text-xs sm:text-sm">Indikator</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-left font-semibold text-xs sm:text-sm">Nilai</th>
                  <th className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-white text-left font-semibold text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Durasi Tidur</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">{results.sleepDuration} jam/hari</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {parseInt(results.sleepDuration) < 6 ? 'Kurang' : parseInt(results.sleepDuration) <= 9 ? 'Ideal' : 'Berlebih'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Status Perokok</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.smoking === 'yes' ? 'Ya' : results.smoking === 'quit' ? 'Pernah (berhenti)' : 'Tidak'}
                  </td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.smoking === 'yes' ? 'Berisiko' : 'Baik'}
                  </td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Frekuensi Olahraga</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.exerciseFrequency === 'never' ? 'Tidak Pernah' : results.exerciseFrequency === 'rare' ? 'Jarang (1-2x/minggu)' : results.exerciseFrequency === 'moderate' ? 'Sedang (2-3x/minggu)' : 'Sering (4-7x/minggu)'}
                  </td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.exerciseFrequency === 'never' || results.exerciseFrequency === 'rare' ? 'Perlu Ditingkatkan' : 'Baik'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-gray-900 text-xs sm:text-sm">Riwayat Penyakit Keluarga</td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.familyHistory === 'yes' ? 'Ada' : 'Tidak Ada'}
                  </td>
                  <td className="border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 text-xs sm:text-sm">
                    {results.familyHistory === 'yes' ? 'Faktor Risiko' : 'Baik'}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          {/* Gejala yang Cocok */}
          {matchedSymptoms > 0 && (
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">4. GEJALA YANG COCOK</h3>
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-semibold">Kecocokan Gejala: {symptomMatch}%</span> ({matchedSymptoms} dari {totalSymptoms} gejala)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-300 rounded">
                    <span className="font-semibold text-gray-900 flex-shrink-0">{idx + 1}.</span>
                    <span className="text-gray-900">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informasi Penyakit */}
          {results.disease && (
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">5. INFORMASI TENTANG {results.disease.title?.toUpperCase()}</h3>
              
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900 mb-2">Penjelasan Singkat:</h4>
                <p className="text-sm text-gray-900 leading-relaxed">{results.disease.simpleExplanation || results.disease.description}</p>
              </div>

              {results.disease.causes && results.disease.causes.length > 0 && (
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">Penyebab Utama:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {results.disease.causes.slice(0, 5).map((cause, idx) => (
                      <li key={idx} className="text-sm text-gray-900">{cause}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tips Pencegahan */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">6. TIPS PENCEGAHAN & PENGOBATAN</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-sm text-gray-900">Jaga pola makan sehat dengan mengurangi makanan berlemak dan berkolesterol tinggi</li>
              <li className="text-sm text-gray-900">Olahraga teratur minimal 30 menit, 3-4 kali per minggu</li>
              <li className="text-sm text-gray-900">Tidur cukup 7-9 jam setiap hari untuk istirahat optimal</li>
              <li className="text-sm text-gray-900">Kelola stres dengan melakukan meditasi, yoga, atau hobi yang menyenangkan</li>
              <li className="text-sm text-gray-900">Hindari merokok dan minuman beralkohol</li>
              <li className="text-sm text-gray-900">Lakukan pemeriksaan kesehatan secara rutin sesuai rekomendasi dokter</li>
              <li className="text-sm text-gray-900">Perbanyak konsumsi sayuran dan buah-buahan segar</li>
              <li className="text-sm text-gray-900">Minum air putih minimal 8 gelas per hari</li>
            </ol>
          </div>

          {/* Rekomendasi Tindakan */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">7. REKOMENDASI TINDAKAN</h3>
            {results.riskScore >= 70 ? (
              <div>
                <p className="text-base font-semibold text-gray-900 mb-3">URGEN - Segera Ambil Tindakan:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="text-sm text-gray-900">Segera berkonsultasi dengan dokter spesialis untuk evaluasi medis menyeluruh</li>
                  <li className="text-sm text-gray-900">Persiapkan riwayat kesehatan dan gejala yang dialami untuk dibawa ke dokter</li>
                  <li className="text-sm text-gray-900">Hindari aktivitas berat hingga mendapat diagnosis dari tenaga medis profesional</li>
                  <li className="text-sm text-gray-900">Tetap monitor gejala dan catat perubahan yang terjadi</li>
                </ol>
              </div>
            ) : results.riskScore >= 40 ? (
              <div>
                <p className="text-base font-semibold text-gray-900 mb-3">PERLU PERHATIAN - Tindakan Pencegahan:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="text-sm text-gray-900">Mulai terapkan langkah-langkah pencegahan yang disarankan segera</li>
                  <li className="text-sm text-gray-900">Monitor perkembangan gejala Anda dalam 2-3 minggu ke depan</li>
                  <li className="text-sm text-gray-900">Jika gejala bertambah parah atau muncul gejala baru, konsultasikan dengan dokter</li>
                  <li className="text-sm text-gray-900">Tingkatkan gaya hidup sehat dan aktifitas fisik</li>
                </ol>
              </div>
            ) : (
              <div>
                <p className="text-base font-semibold text-gray-900 mb-3">BAIK - Pertahankan Gaya Hidup Sehat:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="text-sm text-gray-900">Teruskan gaya hidup sehat yang sudah Anda jalani sekarang</li>
                  <li className="text-sm text-gray-900">Tetap aktif berolahraga dan menjaga pola makan bergizi</li>
                  <li className="text-sm text-gray-900">Lakukan pemeriksaan kesehatan berkala untuk deteksi dini</li>
                  <li className="text-sm text-gray-900">Jangan ragu untuk berkonsultasi jika muncul gejala atau keluhan</li>
                </ol>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-6">
            <p className="text-xs font-semibold text-gray-700 mb-2">DISCLAIMER:</p>
            <p className="text-xs text-gray-900 leading-relaxed">
              Laporan ini adalah hasil analisis otomatis untuk tujuan edukasi dan informasi semata. BUKAN pengganti untuk diagnosis medis profesional. Selalu konsultasikan dengan dokter untuk kekhawatiran kesehatan apa pun.
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={async () => {
              console.log('=== PDF DOWNLOAD TEST ===');
              console.log('Download button clicked');
              console.log('Results data:', results);
              try {
                console.log('Calling generateHealthReportPDF...');
                await generateHealthReportPDF(results);
                console.log('generateHealthReportPDF executed');
              } catch (err) {
                console.error('Error in generateHealthReportPDF:', err);
                console.error('Error stack:', err.stack);
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
            title="Download laporan kesehatan sebagai PDF"
          >
            <Download size={20} />
            <span>Download Laporan PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}

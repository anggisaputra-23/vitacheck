import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, ArrowLeft, TrendingUp, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

const getRiskLevel = (score) => {
  if (score >= 70) return { level: 'Risiko Tinggi', color: 'red', bgColor: 'bg-red-50', borderColor: 'border-red-300', textColor: 'text-red-700' };
  if (score >= 40) return { level: 'Risiko Sedang', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-300', textColor: 'text-yellow-700' };
  return { level: 'Risiko Rendah', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-300', textColor: 'text-green-700' };
};

export default function ResultDashboard({ results, onReset }) {
  if (!results || !results.disease) {
    return <div className="text-center py-12">Data tidak lengkap</div>;
  }

  const [expandDiseaseInfo, setExpandDiseaseInfo] = useState(false);
  const riskInfo = getRiskLevel(results.riskScore);
  const bmi = results.weight / ((results.height / 100) ** 2);
  const bmiCategory = bmi < 17 ? 'Berat Badan Kurang Berat' : bmi < 23 ? 'Normal' : bmi < 25 ? 'Kelebihan Berat Badan' : bmi < 30 ? 'Obesitas' : 'Obesitas Berat';

  const matchedSymptoms = results.symptoms.length;
  const totalSymptoms = results.disease.symptoms?.length || 1;
  const symptomMatch = Math.round((matchedSymptoms / totalSymptoms) * 100);
  
  // Safe access to disease properties with fallback values
  const diseaseBgColor = results.disease?.bgColor || 'bg-blue-50';
  const diseaseBorderColor = results.disease?.borderColor || 'border-blue-300';
  const diseaseTitle = results.disease?.title || 'Penyakit Tidak Diketahui';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-6">
      <div className="max-w-3xl mx-auto px-3 sm:px-4">
        
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Hasil Analisis {diseaseTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Halo, <span className="font-semibold text-primary-600">{results.name}</span>!
          </p>
        </div>

        {/* Main Risk Card - Compact */}
        <div className={`${diseaseBgColor} border-2 ${diseaseBorderColor} rounded-2xl p-4 sm:p-5 mb-4 shadow-md`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
            
            {/* Gauge - Smaller */}
            <div className="flex justify-center sm:col-span-1">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke={results.riskScore >= 70 ? '#ef4444' : results.riskScore >= 40 ? '#eab308' : '#10b981'}
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 - (results.riskScore / 100) * 2 * Math.PI * 45}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-3xl sm:text-4xl font-bold ${results.riskScore >= 70 ? 'text-red-500' : results.riskScore >= 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                    <AnimatedCounter value={results.riskScore} />
                  </div>
                  <div className="text-xs text-gray-600">Skor Risiko</div>
                </div>
              </div>
            </div>

            {/* Risk Info */}
            <div className="sm:col-span-2 space-y-2">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">Status Kesehatan Anda</p>
                <div className={`inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm ${riskInfo.textColor} bg-white border-2 ${diseaseBorderColor}`}>
                  {riskInfo.level}
                </div>
              </div>

              <div className="bg-white bg-opacity-70 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-600 mb-1">Kecocokan Gejala: <span className="text-primary-600">{symptomMatch}%</span></p>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-primary-600 h-full rounded-full transition-all duration-1000"
                    style={{width: `${symptomMatch}%`}}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{matchedSymptoms} dari {totalSymptoms} gejala cocok</p>
              </div>

              {/* Clear Action Message */}
              <div className={`${results.riskScore >= 70 ? 'bg-red-100' : results.riskScore >= 40 ? 'bg-yellow-100' : 'bg-green-100'} rounded p-2`}>
                {results.riskScore >= 70 && <p className="text-xs text-red-700 font-semibold">PENTING: Segera konsultasi ke dokter</p>}
                {results.riskScore >= 40 && results.riskScore < 70 && <p className="text-xs text-yellow-700 font-semibold">Ambil tindakan pencegahan sekarang</p>}
                {results.riskScore < 40 && <p className="text-xs text-green-700 font-semibold">Teruskan gaya hidup sehat Anda</p>}
              </div>
            </div>
          </div>
        </div>

        {/* What This Means - Easy to Understand */}
        <div className={`rounded-lg p-4 mb-4 border-l-4 ${results.riskScore >= 70 ? 'bg-red-50 border-red-400' : results.riskScore >= 40 ? 'bg-yellow-50 border-yellow-400' : 'bg-green-50 border-green-400'}`}>
          <h3 className="font-bold text-gray-900 mb-2 text-sm">Apa Arti Hasil Ini?</h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {results.riskScore >= 70 && `Anda memiliki risiko tinggi terkena ${results.disease.title}. Berdasarkan gejala dan data kesehatan Anda, ada kemungkinan cukup besar untuk mengalami kondisi ini. Segera konsultasikan dengan dokter untuk pemeriksaan lebih lanjut.`}
            {results.riskScore >= 40 && results.riskScore < 70 && `Anda memiliki risiko sedang terkena ${results.disease.title}. Sebagian gejala Anda cocok dengan penyakit ini. Mulai terapkan pencegahan dan jika gejala berlanjut, konsultasikan dengan dokter.`}
            {results.riskScore < 40 && `Anda memiliki risiko rendah terkena ${results.disease.title}. Sebagian besar gejala Anda tidak cocok dengan penyakit ini. Tetap jaga kesehatan dan pola hidup sehat.`}
          </p>
        </div>

        {/* Health Metrics Grid - Compact */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
          
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-semibold">Usia</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{results.age}</p>
            <p className="text-xs text-gray-500">tahun</p>
          </div>

          <div className={`rounded-lg p-3 text-center hover:shadow-md transition-shadow border-2 ${bmi < 17 ? 'bg-purple-50 border-purple-300' : bmi < 23 ? 'bg-green-50 border-green-300' : bmi < 25 ? 'bg-yellow-50 border-yellow-300' : bmi < 30 ? 'bg-orange-50 border-orange-300' : 'bg-red-50 border-red-300'}`}>
            <p className="text-xs text-gray-600 font-semibold">BMI</p>
            <p className={`text-xl sm:text-2xl font-bold ${bmi < 17 ? 'text-purple-600' : bmi < 23 ? 'text-green-600' : bmi < 25 ? 'text-yellow-600' : bmi < 30 ? 'text-orange-600' : 'text-red-600'}`}>
              <AnimatedCounter value={Math.round(bmi * 10) / 10} />
            </p>
            <p className="text-xs text-gray-500">{bmi < 17 ? 'Kurang Berat' : bmi < 23 ? 'Normal' : bmi < 25 ? 'Berlebih' : bmi < 30 ? 'Obesitas' : 'Obesitas Berat'}</p>
          </div>

          <div className={`rounded-lg p-3 text-center hover:shadow-md transition-shadow border-2 ${parseInt(results.sleepDuration) < 6 ? 'bg-red-50 border-red-300' : parseInt(results.sleepDuration) < 7 ? 'bg-yellow-50 border-yellow-300' : parseInt(results.sleepDuration) <= 9 ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-600 font-semibold">Durasi Tidur</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900"><AnimatedCounter value={parseInt(results.sleepDuration)} /></p>
            <p className="text-xs text-gray-500">{parseInt(results.sleepDuration) < 6 ? 'Sangat Kurang' : parseInt(results.sleepDuration) < 7 ? 'Kurang' : parseInt(results.sleepDuration) <= 9 ? 'Ideal' : 'Berlebih'} jam</p>
          </div>

          <div className={`rounded-lg p-3 text-center hover:shadow-md transition-shadow border-2 ${results.exerciseFrequency === 'never' ? 'bg-red-50 border-red-400' : results.exerciseFrequency === 'rare' ? 'bg-orange-50 border-orange-300' : results.exerciseFrequency === 'moderate' ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-xs text-gray-600 font-semibold">Frekuensi Olahraga</p>
            <p className={`text-xl sm:text-2xl font-bold ${results.exerciseFrequency === 'never' ? 'text-red-600' : results.exerciseFrequency === 'rare' ? 'text-orange-600' : results.exerciseFrequency === 'moderate' ? 'text-yellow-600' : 'text-green-600'}`}>{results.exerciseFrequency === 'never' ? 'Tidak Pernah' : results.exerciseFrequency === 'regular' ? 'Sering' : results.exerciseFrequency === 'moderate' ? 'Sedang' : 'Jarang'}</p>
            <p className="text-xs text-gray-500">{results.exerciseFrequency === 'never' ? '0x/minggu' : results.exerciseFrequency === 'regular' ? '4-7x/minggu' : results.exerciseFrequency === 'moderate' ? '2-3x/minggu' : '1-2x/minggu'}</p>
          </div>
        </div>

        {/* Symptoms - Compact */}
        {matchedSymptoms > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-green-500" />
              <h3 className="text-sm font-bold text-gray-900">Gejala Anda ({matchedSymptoms} dari {totalSymptoms})</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {results.symptoms.map((symptom, idx) => (
                <span key={idx} className="inline-block bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* What To Do Now - Action Items */}
        <div className={`rounded-lg p-4 mb-4 border-2 ${results.riskScore >= 70 ? 'bg-red-50 border-red-300' : results.riskScore >= 40 ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}>
          <h3 className="font-bold text-gray-900 mb-3 text-sm">
            Yang Harus Anda Lakukan
          </h3>
          <div className="space-y-2">
            {results.riskScore >= 70 && (
              <>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-red-600 font-bold flex-shrink-0">1.</span>
                  <span className="text-red-700">Segera cari temu dokter untuk evaluasi medis</span>
                </div>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-red-600 font-bold flex-shrink-0">2.</span>
                  <span className="text-red-700">Persiapkan list gejala untuk dibawa ke dokter</span>
                </div>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-red-600 font-bold flex-shrink-0">3.</span>
                  <span className="text-red-700">Hindari aktivitas berat sampai dapat diagnosis dokter</span>
                </div>
              </>
            )}
            {results.riskScore >= 40 && results.riskScore < 70 && (
              <>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-yellow-600 font-bold flex-shrink-0">1.</span>
                  <span className="text-yellow-700">Mulai terapkan langkah-langkah pencegahan</span>
                </div>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-yellow-600 font-bold flex-shrink-0">2.</span>
                  <span className="text-yellow-700">Monitor gejala Anda dalam 2-3 minggu ke depan</span>
                </div>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-yellow-600 font-bold flex-shrink-0">3.</span>
                  <span className="text-yellow-700">Jika gejala bertambah, konsultasikan dengan dokter</span>
                </div>
              </>
            )}
            {results.riskScore < 40 && (
              <>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-green-600 font-bold flex-shrink-0">1.</span>
                  <span className="text-green-700">Teruskan gaya hidup sehat yang sudah Anda jalani</span>
                </div>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-green-600 font-bold flex-shrink-0">2.</span>
                  <span className="text-green-700">Tetap aktif berolahraga dan makan bergizi</span>
                </div>
                <div className="flex gap-2 text-xs sm:text-sm">
                  <span className="text-green-600 font-bold flex-shrink-0">3.</span>
                  <span className="text-green-700">Lakukan pemeriksaan kesehatan rutin</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Detailed Info Section - Collapsible */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => setExpandDiseaseInfo(!expandDiseaseInfo)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="text-blue-500" />
              <h3 className="text-sm font-bold text-gray-900">Pelajari Lebih Lanjut tentang {results.disease.title}</h3>
            </div>
            {expandDiseaseInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {expandDiseaseInfo && (
            <div className="border-t border-gray-200 px-4 py-4 space-y-4">
              
              {/* What is it */}
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-xs sm:text-sm">Apa itu {results.disease.title}</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{results.disease.description}</p>
              </div>

              {/* Simple Explanation */}
              <div className={`${results.disease.bgColor} border-l-4 ${results.disease.borderColor} p-3 rounded`}>
                <p className={`text-xs sm:text-sm ${results.disease.textColor}`}><span className="font-semibold">Penjelasan Sederhana:</span> {results.disease.simpleExplanation}</p>
              </div>

              {/* Causes & Symptoms Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                    Penyebab Utama
                  </h4>
                  <ul className="space-y-1.5">
                    {(() => {
                      // Filter causes based on user's BMI to show relevant ones
                      const relevantCauses = results.disease.causes.filter((cause) => {
                        const causeLower = cause.toLowerCase();
                        // If BMI is normal/ideal (17-23), filter out causes about weight issues
                        if (bmi >= 17 && bmi < 23) {
                          return !causeLower.includes('kelebihan berat badan') && 
                                 !causeLower.includes('overweight') &&
                                 !causeLower.includes('obesitas');
                        }
                        // If BMI is underweight (< 17), filter out overweight-related causes
                        if (bmi < 17) {
                          return !causeLower.includes('kelebihan berat badan') && 
                                 !causeLower.includes('overweight') &&
                                 !causeLower.includes('obesitas');
                        }
                        return true;
                      });
                      
                      // Show first 3 relevant causes, or all available if less than 3
                      const causesToShow = relevantCauses.length > 0 ? relevantCauses.slice(0, 3) : results.disease.causes.slice(0, 3);
                      
                      return causesToShow.map((cause, idx) => (
                        <li key={idx} className="text-xs text-red-700 flex gap-2">
                          <span className="text-red-500 font-bold flex-shrink-0 min-w-fit">•</span>
                          <span>{cause}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-bold text-gray-900 mb-2 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                    Cara Mencegah
                  </h4>
                  <ul className="space-y-1.5">
                    {results.disease.healthBenefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="text-xs text-green-700 flex gap-2">
                        <span className="text-green-500 font-bold flex-shrink-0 min-w-fit">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* All Symptoms Comparison */}
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle size={16} className="text-blue-500" />
                  Gejala {results.disease.title}
                </h4>
                <p className="text-xs text-gray-500 mb-3 italic">(Gejala yang Anda alami vs semua kemungkinan gejala)</p>
                <div className="space-y-1.5">
                  {results.disease.symptoms.map((symptom, idx) => (
                    <div 
                      key={idx} 
                      className={`flex gap-3 p-2.5 rounded-lg border transition-all ${
                        results.symptoms.includes(symptom) 
                          ? 'bg-green-50 border-green-200 shadow-sm' 
                          : 'bg-gray-50 border-gray-200 shadow-sm'
                      }`}
                    >
                      {results.symptoms.includes(symptom) ? (
                        <>
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-green-700">✓ Anda Alami</span>
                            <p className="text-xs text-green-800 font-medium">{symptom}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-gray-500">✗ Tidak Anda Alami</span>
                            <p className="text-xs text-gray-600">{symptom}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Prevention & Treatment - Compact */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-300 shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900">Tips Pencegahan & Pengobatan</h3>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1.5 text-xs sm:text-sm">
                Pencegahan
              </h4>
              <ul className="space-y-1">
                {results.disease.prevention.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex gap-2 bg-white bg-opacity-60 p-1.5 rounded">
                    <span className="text-blue-600 font-bold flex-shrink-0 min-w-fit">{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1.5 text-xs sm:text-sm">
                Pengobatan
              </h4>
              <p className="text-xs text-gray-700 bg-white bg-opacity-60 p-2.5 rounded leading-relaxed">
                {results.disease.treatment}
              </p>
            </div>
          </div>
        </div>

        {/* Important Warning */}
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex gap-2">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 mb-1 text-xs sm:text-sm">PENTING: Hasil Ini BUKAN Diagnosis Dokter</h4>
              <p className="text-xs text-red-800 leading-relaxed">
                Tool ini hanya untuk edukasi. Hasil ini tidak dapat menggantikan diagnosis dari dokter profesional. Jika Anda mengalami gejala yang berkelanjutan, segera konsultasikan dengan tenaga medis yang terlatih.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-xs sm:text-sm"
          >
            <ArrowLeft size={16} />
            Analisis Lagi
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 w-full border-2 border-gray-400 text-gray-700 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all text-xs sm:text-sm"
          >
            Cetak Laporan
          </button>
        </div>

      </div>
    </div>
  );
}

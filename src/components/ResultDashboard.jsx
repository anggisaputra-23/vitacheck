import { useState, useEffect } from 'react';
import Charts from './Charts';
import { calculateRiskScore, getRecommendations } from '../utils/riskCalculator';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

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

export default function ResultDashboard({ results, onReset, onSimulate }) {
  const [simulatedResults, setSimulatedResults] = useState(null);

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Low Risk': return 'bg-green-100 text-green-700 border-green-300';
      case 'Medium Risk': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'High Risk': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getRiskBgGradient = (riskLevel) => {
    switch(riskLevel) {
      case 'Low Risk': return 'from-green-50 to-green-100';
      case 'Medium Risk': return 'from-yellow-50 to-yellow-100';
      case 'High Risk': return 'from-red-50 to-red-100';
      default: return 'from-blue-50 to-blue-100';
    }
  };

  const handleSimulate = () => {
    // Simulate with regular exercise
    const simulatedData = {
      ...results,
      exerciseFrequency: 'regular'
    };
    const newRisk = calculateRiskScore(simulatedData);
    const updated = { ...simulatedData, ...newRisk };
    setSimulatedResults(updated);
    onSimulate?.(updated);
  };

  const displayResults = simulatedResults || results;
  const recommendations = getRecommendations(displayResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hasil Penilaian Kesehatan Anda
          </h1>
          <p className="text-lg text-gray-600">
            Halo, <span className="font-semibold text-primary-500">{results.name}</span>!
          </p>
        </div>

        {/* Risk Level Card */}
        <div className={`bg-gradient-to-br ${getRiskBgGradient(displayResults.riskLevel)} rounded-2xl shadow-lg p-8 mb-12 slide-up border-2 ${
          displayResults.riskLevel === 'Low Risk' ? 'border-green-300' :
          displayResults.riskLevel === 'Medium Risk' ? 'border-yellow-300' :
          'border-red-300'
        }`}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Risk Level */}
            <div className="text-center">
              <p className="text-gray-600 font-semibold mb-3">Tingkat Risiko Anda</p>
              <div className={`inline-block px-6 py-3 rounded-full font-bold text-lg ${getRiskColor(displayResults.riskLevel)}`}>
                {displayResults.riskLevel}
              </div>
            </div>

            {/* Total Risk Score */}
            <div className="text-center">
              <p className="text-gray-600 font-semibold mb-3">Skor Risiko</p>
              <p className="text-5xl font-bold text-primary-500">
                <AnimatedCounter value={displayResults.totalScore} />
              </p>
              <p className="text-gray-600 text-sm mt-2">keluar dari 20+</p>
            </div>

            {/* BMI */}
            <div className="text-center">
              <p className="text-gray-600 font-semibold mb-3">Status BMI</p>
              <p className="text-5xl font-bold text-primary-500">
                <AnimatedCounter value={Math.round(displayResults.bmi * 10) / 10} />
              </p>
              <p className="text-gray-600 text-sm mt-2">{displayResults.category}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <Charts data={displayResults} />

        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12 slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Rincian Skor Risiko</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Status BMI</span>
                <span className="text-xl font-bold text-primary-500">{displayResults.breakdown.bmiScore || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: `${((displayResults.breakdown.bmiScore || 0) / 4) * 100}%`}}></div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Merokok</span>
                <span className="text-xl font-bold text-primary-500">{displayResults.breakdown.smokingScore || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: `${((displayResults.breakdown.smokingScore || 0) / 3) * 100}%`}}></div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Olahraga</span>
                <span className="text-xl font-bold text-primary-500">{displayResults.breakdown.exerciseScore || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: `${((displayResults.breakdown.exerciseScore || 0) / 2) * 100}%`}}></div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Faktor Usia</span>
                <span className="text-xl font-bold text-primary-500">{displayResults.breakdown.ageScore || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: `${((displayResults.breakdown.ageScore || 0) / 2) * 100}%`}}></div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Riwayat Keluarga</span>
                <span className="text-xl font-bold text-primary-500">{displayResults.breakdown.familyHistoryScore || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: `${((displayResults.breakdown.familyHistoryScore || 0) / 3) * 100}%`}}></div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Kualitas Tidur</span>
                <span className="text-xl font-bold text-primary-500">{displayResults.breakdown.sleepScore || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-primary-500 h-2 rounded-full" style={{width: `${((displayResults.breakdown.sleepScore || 0) / 2) * 100}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Simulation */}
        {!simulatedResults && (
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl shadow-lg p-8 mt-12 slide-up border-2 border-primary-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-primary-500" size={28} />
              Skenario Bagaimana Jika
            </h2>
            <p className="text-gray-700 mb-6">
              Lihat bagaimana skor risiko Anda berubah jika Anda meningkatkan frekuensi olahraga menjadi teratur (4+ kali per minggu).
            </p>
            <button onClick={handleSimulate} className="btn-primary hover:scale-105 transition-transform">
              Simulasikan Olahraga Teratur
            </button>
            {simulatedResults && (
              <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-green-800">
                  <strong>Kabar baik!</strong> Dengan olahraga teratur, skor risiko Anda akan menurun dari {results.totalScore} menjadi {simulatedResults.totalScore}!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Rekomendasi yang Dipersonalisasi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{rec.title}</h3>
                <p className="text-gray-600 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-12 pb-12 slide-up flex-wrap">
          <button onClick={onReset} className="btn-primary hover:scale-105 transition-transform">
            Analisis Lagi
          </button>
          <button className="btn-outline hover:scale-105 transition-transform">
            Simpan Hasil
          </button>
        </div>

        {/* Additional Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 flex items-start gap-4">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
          <p className="text-blue-800 text-sm">
            <strong>Catatan Penting:</strong> Penilaian ini hanya untuk tujuan informasi dan tidak boleh dianggap sebagai saran medis. 
            Silakan konsultasikan dengan profesional kesehatan yang berkualifikasi untuk diagnosis dan pengobatan kondisi kesehatan.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { calculateBMI, calculateRiskScore } from '../utils/riskCalculator';
import { AlertCircle, Loader, User, Heart, Dumbbell, Moon, Cigarette, Users, Droplets, Apple, Brain, X, CheckCircle } from 'lucide-react';

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

export default function AnalyzerForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    smoking: 'no',
    exerciseFrequency: 'moderate',
    sleepDuration: '',
    familyHistory: 'no',
    stressLevel: 'low',
    alcoholConsumption: 'no',
    dietQuality: 'good',
    waterIntake: 'adequate',
    medicalHistory: []
  });

  // Validate specific step
  const validateStep = (step) => {
    const newErrors = [];

    if (step === 1) {
      if (!formData.name || !formData.name.trim()) newErrors.push('Nama lengkap harus diisi');
      if (!formData.age || formData.age < 18 || formData.age > 120) newErrors.push('Usia harus antara 18-120 tahun');
      if (!formData.gender) newErrors.push('Jenis kelamin harus dipilih');
      if (!formData.weight || parseFloat(formData.weight) <= 0 || parseFloat(formData.weight) > 500) newErrors.push('Berat badan harus antara 0-500 kg');
      if (!formData.height || parseFloat(formData.height) <= 0 || parseFloat(formData.height) > 250) newErrors.push('Tinggi badan harus antara 0-250 cm');
    }

    if (step === 2) {
      if (!formData.sleepDuration || parseFloat(formData.sleepDuration) < 0 || parseFloat(formData.sleepDuration) > 24) newErrors.push('Durasi tidur harus antara 0-24 jam');
      if (!formData.smoking) newErrors.push('Status merokok harus dipilih');
      if (!formData.exerciseFrequency) newErrors.push('Frekuensi olahraga harus dipilih');
      if (!formData.stressLevel) newErrors.push('Level stres harus dipilih');
      if (!formData.waterIntake) newErrors.push('Asupan air harus dipilih');
      if (!formData.dietQuality) newErrors.push('Kualitas makanan harus dipilih');
      if (!formData.alcoholConsumption) newErrors.push('Konsumsi alkohol harus dipilih');
    }

    if (step === 3) {
      if (!formData.familyHistory) newErrors.push('Riwayat penyakit keluarga harus dipilih');
    }

    return newErrors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nama adalah wajib diisi';
    if (!formData.age || formData.age < 18 || formData.age > 120) newErrors.age = 'Usia harus antara 18 dan 120 tahun';
    if (!formData.weight || formData.weight <= 0) newErrors.weight = 'Berat badan harus lebih dari 0';
    if (!formData.height || formData.height <= 0) newErrors.height = 'Tinggi badan harus lebih dari 0';
    if (!formData.sleepDuration || formData.sleepDuration <= 0 || formData.sleepDuration > 24) newErrors.sleepDuration = 'Durasi tidur harus antara 0 dan 24 jam';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps
    const allErrors = [
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3)
    ];

    if (allErrors.length > 0) {
      setValidationErrors(allErrors);
      setShowValidationModal(true);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bmiInfo = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));
    const riskInfo = calculateRiskScore({
      ...formData,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      sleepDuration: parseFloat(formData.sleepDuration),
      bmi: bmiInfo.bmi,
      alcoholConsumption: formData.alcoholConsumption,
      stressLevel: formData.stressLevel,
      dietQuality: formData.dietQuality,
      waterIntake: formData.waterIntake,
      medicalHistory: formData.medicalHistory
    });

    const results = {
      ...formData,
      ...bmiInfo,
      ...riskInfo
    };

    setLoading(false);
    onSubmit(results);
  };

  const handleMedicalHistoryToggle = (condition) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter(c => c !== condition)
        : [...prev.medicalHistory, condition]
    }));
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);
    
    if (stepErrors.length > 0) {
      setValidationErrors(stepErrors);
      setShowValidationModal(true);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const medicalConditions = [
    'Tekanan Darah Tinggi',
    'Gula Darah Tinggi',
    'Kolesterol Tinggi',
    'Penyakit Jantung',
    'Stroke',
    'Berat Badan Berlebih',
    'Asma',
    'Osteoporosis',
    'Asam Urat Tinggi'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 items-center">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analisis Kesehatan Anda
            </h2>
            <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-full">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            {currentStep === 1 && 'Informasi Dasar Anda'}
            {currentStep === 2 && 'Gaya Hidup & Kebiasaan'}
            {currentStep === 3 && 'Riwayat Kesehatan'}
            {currentStep === 4 && 'Verifikasi Data'}
          </p>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <label className="block text-sm font-bold text-gray-700 mb-3">Nama Lengkap *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="Masukkan nama lengkap Anda"
              />
              {errors.name && <p className="text-red-600 text-sm mt-2 flex items-center gap-2"><AlertCircle size={16} /> {errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">Usia (tahun) *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 ${
                    errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  placeholder="30"
                  min="18"
                  max="120"
                />
                {errors.age && <p className="text-red-600 text-sm mt-2 flex items-center gap-2"><AlertCircle size={14} /> {errors.age}</p>}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">Jenis Kelamin *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">Berat Badan (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 ${
                    errors.weight ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  placeholder="70"
                  step="0.1"
                  min="0"
                />
                {errors.weight && <p className="text-red-600 text-sm mt-2 flex items-center gap-2"><AlertCircle size={14} /> {errors.weight}</p>}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">Tinggi Badan (cm) *</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 ${
                    errors.height ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  placeholder="170"
                  step="0.1"
                  min="0"
                />
                {errors.height && <p className="text-red-600 text-sm mt-2 flex items-center gap-2"><AlertCircle size={14} /> {errors.height}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Lifestyle */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                <Moon className="inline mr-2" size={18} />
                Durasi Tidur (jam/hari) *
              </label>
              <input
                type="number"
                name="sleepDuration"
                value={formData.sleepDuration}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl text-base focus:outline-none transition-all duration-300 ${
                  errors.sleepDuration ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="7"
                step="0.5"
                min="0"
                max="24"
              />
              <p className="text-xs text-gray-500 mt-2">Ideal: 7-9 jam per hari</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Cigarette className="inline mr-2" size={18} />
                  Merokok? *
                </label>
                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="no">Tidak</option>
                  <option value="yes">Ya</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Dumbbell className="inline mr-2" size={18} />
                  Frekuensi Olahraga *
                </label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="rare">Jarang (&lt;1x/minggu)</option>
                  <option value="moderate">Sedang (2-3x/minggu)</option>
                  <option value="regular">Rutin (4+ kali/minggu)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Brain className="inline mr-2" size={18} />
                  Level Stres *
                </label>
                <select
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="low">Rendah</option>
                  <option value="medium">Sedang</option>
                  <option value="high">Tinggi</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Droplets className="inline mr-2" size={18} />
                  Asupan Air *
                </label>
                <select
                  name="waterIntake"
                  value={formData.waterIntake}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="low">Sedikit (&lt;2 liter/hari)</option>
                  <option value="moderate">Cukup (2-3 liter/hari)</option>
                  <option value="adequate">Banyak (&gt;3 liter/hari)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Apple className="inline mr-2" size={18} />
                  Kualitas Makanan *
                </label>
                <select
                  name="dietQuality"
                  value={formData.dietQuality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="poor">Buruk (banyak junk food)</option>
                  <option value="moderate">Biasa (campuran)</option>
                  <option value="good">Baik (sehat & seimbang)</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <label className="block text-sm font-bold text-gray-700 mb-3">Konsumsi Alkohol *</label>
                <select
                  name="alcoholConsumption"
                  value={formData.alcoholConsumption}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="no">Tidak pernah</option>
                  <option value="occasional">Jarang</option>
                  <option value="frequent">Sering</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Medical History */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Users size={20} />
                Riwayat Keluarga & Penyakit
              </label>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Riwayat Penyakit Keluarga *</label>
                <select
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  <option value="no">Tidak ada</option>
                  <option value="yes">Ada (Hipertensi, Diabetes, Jantung, dll)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Penyakit yang Pernah/Sedang Diderita</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {medicalConditions.map(condition => (
                    <label key={condition} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.medicalHistory.includes(condition)}
                        onChange={() => handleMedicalHistoryToggle(condition)}
                        className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-base font-medium text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verifikasi Data Anda</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Nama</p>
                  <p className="text-lg font-bold text-gray-900">{formData.name || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Usia / BMI</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formData.age ? `${formData.age} tahun` : '-'} 
                    {formData.weight && formData.height && ` / ${(parseFloat(formData.weight) / ((parseFloat(formData.height)/100) ** 2)).toFixed(1)}`}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Tidur / Olahraga</p>
                  <p className="text-lg font-bold text-gray-900">{formData.sleepDuration || '-'} jam / {formData.exerciseFrequency || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 font-semibold">Merokok / Stres</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formData.smoking === 'yes' ? 'Ya' : 'Tidak'} / {formData.stressLevel}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
              <p className="text-sm text-gray-700">
                Semua data sudah akurat? Jika ada yang ingin diubah, klik tombol Kembali. Jika sudah benar, lanjutkan untuk analisis risiko kesehatan Anda.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 active:scale-95"
            >
              ← Kembali
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              Lanjut →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg active:scale-95'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Analisis...
                </>
              ) : (
                'Lihat Hasil Analisis'
              )}
            </button>
          )}
        </div>
      </form>

      {/* Validation Modal */}
      <ValidationModal 
        isOpen={showValidationModal} 
        errors={validationErrors} 
        onClose={() => setShowValidationModal(false)} 
      />
    </div>
  );
}

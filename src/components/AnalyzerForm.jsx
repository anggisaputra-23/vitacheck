import { useState } from 'react';
import { calculateBMI, calculateRiskScore } from '../utils/riskCalculator';
import { AlertCircle, Loader } from 'lucide-react';

export default function AnalyzerForm({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    smoking: 'no',
    exerciseFrequency: 'moderate',
    sleepDuration: '',
    familyHistory: 'no'
  });

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
    
    if (!validateForm()) return;

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
      bmi: bmiInfo.bmi
    });

    const results = {
      ...formData,
      ...bmiInfo,
      ...riskInfo
    };

    setLoading(false);
    onSubmit(results);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto slide-up">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Penganalisis Risiko Kesehatan</h2>
      <p className="text-gray-600 mb-8">Isi informasi Anda untuk mendapatkan penilaian risiko kesehatan yang dipersonalisasi</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            placeholder="Masukkan nama lengkap Anda"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Usia (Tahun) *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="18-120"
            min="18"
            max="120"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Jenis Kelamin *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
          >
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Berat Badan (kg) *
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
              errors.weight ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan berat badan dalam kg"
            step="0.1"
            min="0"
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.weight}</p>}
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tinggi Badan (cm) *
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
              errors.height ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan tinggi badan dalam cm"
            step="0.1"
            min="0"
          />
          {errors.height && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.height}</p>}
        </div>

        {/* Sleep Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Durasi Tidur Harian (jam) *
          </label>
          <input
            type="number"
            name="sleepDuration"
            value={formData.sleepDuration}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
              errors.sleepDuration ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0-24"
            step="0.5"
            min="0"
            max="24"
          />
          {errors.sleepDuration && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.sleepDuration}</p>}
        </div>

        {/* Smoking */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Apakah Anda Merokok? *
          </label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
          >
            <option value="no">Tidak</option>
            <option value="yes">Ya</option>
          </select>
        </div>

        {/* Exercise Frequency */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Frekuensi Olahraga *
          </label>
          <select
            name="exerciseFrequency"
            value={formData.exerciseFrequency}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
          >
            <option value="rare">Jarang (kurang dari 1x seminggu)</option>
            <option value="moderate">Sedang (2-3x seminggu)</option>
            <option value="regular">Rutin (4+ kali seminggu)</option>
          </select>
        </div>

        {/* Family History */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Riwayat Penyakit Kroniks dalam Keluarga *
          </label>
          <select
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
          >
            <option value="no">Tidak</option>
            <option value="yes">Ya</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full btn-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 ${
          loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl'
        }`}
      >
        {loading ? (
          <>
            <Loader className="animate-spin" size={20} />
            Menganalisis Kesehatan Anda...
          </>
        ) : (
          'Analisis Kesehatan Saya'
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-6">
        * Semua kolom wajib diisi untuk analisis yang akurat
      </p>
    </form>
  );
}

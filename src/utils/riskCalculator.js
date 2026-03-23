/**
 * Calculate BMI from weight and height
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {Object} BMI value and category
 */
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category = '';
  if (bmi < 18.5) {
    category = 'Berat Badan Kurang';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Berat Badan Berlebih';
  } else {
    category = 'Obesitas';
  }
  
  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category
  };
};

/**
 * Calculate health risk score based on various factors
 * @param {Object} data - Health data object
 * @returns {Object} Risk score and classification
 */
export const calculateRiskScore = (data) => {
  let score = 0;
  const breakdown = {};
  
  // BMI scoring (max 5 points)
  const bmi = data.bmi || calculateBMI(data.weight, data.height).bmi;
  breakdown.bmiScore = 0;
  if (bmi >= 18.5 && bmi < 25) {
    breakdown.bmiScore = 0;
  } else if (bmi >= 25 && bmi < 30) {
    score += 2;
    breakdown.bmiScore = 2;
  } else if (bmi >= 30) {
    score += 5;
    breakdown.bmiScore = 5;
  } else {
    score += 1;
    breakdown.bmiScore = 1; // Underweight
  }
  
  // Smoking (max 4 points)
  breakdown.smokingScore = 0;
  if (data.smoking === 'yes') {
    score += 4;
    breakdown.smokingScore = 4;
  }
  
  // Exercise frequency (max 3 points)
  breakdown.exerciseScore = 0;
  if (data.exerciseFrequency === 'rare') {
    score += 3;
    breakdown.exerciseScore = 3;
  } else if (data.exerciseFrequency === 'moderate') {
    score += 1;
    breakdown.exerciseScore = 1;
  }
  
  // Age (max 3 points)
  breakdown.ageScore = 0;
  if (data.age > 50) {
    score += 3;
    breakdown.ageScore = 3;
  } else if (data.age > 40) {
    score += 2;
    breakdown.ageScore = 2;
  }
  
  // Family history (max 3 points)
  breakdown.familyHistoryScore = 0;
  if (data.familyHistory === 'yes') {
    score += 3;
    breakdown.familyHistoryScore = 3;
  }
  
  // Sleep duration (max 3 points)
  breakdown.sleepScore = 0;
  if (data.sleepDuration < 5) {
    score += 3;
    breakdown.sleepScore = 3;
  } else if (data.sleepDuration < 7) {
    score += 2;
    breakdown.sleepScore = 2;
  } else if (data.sleepDuration > 9) {
    score += 1;
    breakdown.sleepScore = 1; // Too much sleep
  }
  
  // Stress level (max 3 points)
  breakdown.stressScore = 0;
  if (data.stressLevel === 'high') {
    score += 3;
    breakdown.stressScore = 3;
  } else if (data.stressLevel === 'medium') {
    score += 1;
    breakdown.stressScore = 1;
  }
  
  // Alcohol consumption (max 2 points)
  breakdown.alcoholScore = 0;
  if (data.alcoholConsumption === 'frequent') {
    score += 2;
    breakdown.alcoholScore = 2;
  } else if (data.alcoholConsumption === 'occasional') {
    score += 0;
    breakdown.alcoholScore = 0;
  }
  
  // Diet quality (max 3 points)
  breakdown.dietScore = 0;
  if (data.dietQuality === 'poor') {
    score += 3;
    breakdown.dietScore = 3;
  } else if (data.dietQuality === 'moderate') {
    score += 1;
    breakdown.dietScore = 1;
  }
  
  // Water intake (max 2 points)
  breakdown.waterScore = 0;
  if (data.waterIntake === 'low') {
    score += 2;
    breakdown.waterScore = 2;
  } else if (data.waterIntake === 'moderate') {
    score += 1;
    breakdown.waterScore = 1;
  }
  
  // Medical history (max 4 points)
  breakdown.medicalScore = 0;
  if (data.medicalHistory && data.medicalHistory.length > 0) {
    score += Math.min(data.medicalHistory.length * 2, 4);
    breakdown.medicalScore = Math.min(data.medicalHistory.length * 2, 4);
  }
  
  // Risk classification (max score ~32)
  let riskLevel = '';
  let riskColor = '';
  let riskPercentage = Math.round((score / 32) * 100);
  
  if (score <= 5) {
    riskLevel = '🟢 Risiko Rendah';
    riskColor = 'green';
  } else if (score <= 12) {
    riskLevel = '🟡 Risiko Sedang';
    riskColor = 'yellow';
  } else if (score <= 20) {
    riskLevel = '🟠 Risiko Tinggi';
    riskColor = 'orange';
  } else {
    riskLevel = '🔴 Risiko Sangat Tinggi';
    riskColor = 'red';
  }
  
  return {
    totalScore: score,
    maxScore: 32,
    riskPercentage,
    riskLevel,
    riskColor,
    breakdown
  };
};

/**
 * Get personalized recommendations based on risk factors
 * @param {Object} data - Health data object
 * @returns {Array} Array of recommendations
 */
export const getRecommendations = (data) => {
  const recommendations = [];
  
  // BMI-based recommendations
  const bmiInfo = calculateBMI(data.weight, data.height);
  if (bmiInfo.category === 'Berat Badan Berlebih' || bmiInfo.category === 'Obesitas') {
    recommendations.push({
      title: 'Manajemen Berat Badan',
      description: 'Pertahankan diet yang sehat dan terlibat dalam aktivitas fisik yang teratur. Pertimbangkan berkonsultasi dengan ahli gizi untuk rencana diet yang dipersonalisasi.'
    });
  }
  
  // Smoking recommendations
  if (data.smoking === 'yes') {
    recommendations.push({
      title: 'Berhenti Merokok',
      description: 'Merokok secara signifikan meningkatkan risiko kesehatan. Cari dukungan dari program penghentian merokok atau konsultasikan dengan dokter Anda.'
    });
  }
  
  // Exercise recommendations
  if (data.exerciseFrequency === 'rare' || data.exerciseFrequency === 'moderate') {
    recommendations.push({
      title: 'Tingkatkan Aktivitas Fisik',
      description: 'Targetkan setidaknya 150 menit latihan intensitas sedang per minggu. Ini dapat mencakup berjalan, bersepeda, atau aktivitas apa pun yang Anda nikmati.'
    });
  }
  
  // Sleep recommendations
  if (data.sleepDuration < 7) {
    recommendations.push({
      title: 'Tingkatkan Kualitas Tidur',
      description: 'Targetkan 7-9 jam tidur berkualitas per malam. Buat jadwal tidur yang konsisten dan ciptakan rutinitas tidur yang menenangkan.'
    });
  }
  
  // Family history recommendations
  if (data.familyHistory === 'yes') {
    recommendations.push({
      title: 'Pemeriksaan Kesehatan Rutin',
      description: 'Dengan riwayat keluarga penyakit kronis, pemeriksaan medis rutin dan tes skrining sangat penting untuk deteksi dini.'
    });
  }
  
  // Age-based recommendations
  if (data.age > 40) {
    recommendations.push({
      title: 'Pemantauan Kesehatan',
      description: 'Seiring bertambahnya usia, pemeriksaan kesehatan rutin menjadi lebih penting. Jadwalkan pemeriksaan tahunan dengan penyedia layanan kesehatan Anda.'
    });
  }
  
  // General recommendations
  recommendations.push({
    title: 'Diet Seimbang',
    description: 'Konsumsi berbagai buah, sayuran, biji-bijian utuh, dan protein tanpa lemak. Batasi makanan olahan dan minuman manis.'
  });
  
  recommendations.push({
    title: 'Tetap Terhidrasi',
    description: 'Minum banyak air sepanjang hari. Hidrasi yang tepat mendukung kesehatan dan kesejahteraan secara keseluruhan.'
  });
  
  recommendations.push({
    title: 'Manajemen Stres',
    description: 'Praktikkan teknik relaksasi seperti meditasi, yoga, atau pernapasan dalam. Mengelola stres sangat penting untuk kesehatan secara keseluruhan.'
  });
  
  return recommendations;
};

/**
 * Get lifestyle factors for visualization
 * @param {Object} data - Health data object
 * @returns {Array} Array of lifestyle factors
 */
export const getLifestyleFactors = (data) => {
  return [
    {
      name: 'Olahraga',
      value: data.exerciseFrequency === 'rare' ? 20 : data.exerciseFrequency === 'moderate' ? 60 : 100
    },
    {
      name: 'Kualitas Tidur',
      value: Math.min(data.sleepDuration / 9 * 100, 100)
    },
    {
      name: 'Status BMI',
      value: data.bmi > 30 ? 30 : data.bmi >= 25 ? 50 : 100
    },
    {
      name: 'Tidak Merokok',
      value: data.smoking === 'yes' ? 20 : 100
    },
    {
      name: 'Riwayat Keluarga',
      value: data.familyHistory === 'yes' ? 50 : 100
    }
  ];
};

import { jsPDF } from 'jspdf';

// Helper function to load image as data URL
const loadImageAsBase64 = async (imagePath) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.log('📷 Logo tidak bisa diload, lanjut tanpa logo:', error);
    return null;
  }
};

/**
 * Generate Health Report PDF dengan header dan tabel rapi
 * @param {Object} results - Health analysis results
 * @returns {void} - Downloads PDF file
 */
export const generateHealthReportPDF = async (results) => {
  try {
    // Validate results
    if (!results) {
      console.error('❌ Results object is empty');
      alert('Data hasil analisis tidak lengkap. Silakan ulangi analisis.');
      return;
    }

    console.log('🔍 Starting PDF generation with results:', results);
    
    // Load logo image
    const logoDataUrl = await loadImageAsBase64('/images/vita.png');
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

  // Colors
  const primaryColor = [30, 136, 229]; // #1E88E5
  const secondaryColor = [67, 160, 71]; // #43A047
  const darkColor = [60, 60, 60];
  const riskColors = {
    high: [239, 68, 68],    // red
    medium: [234, 179, 8],  // yellow
    low: [16, 185, 129]     // green
  };

  let yPosition = 15;
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add new page if needed
  const checkPageBreak = (height) => {
    if (yPosition + height > pageHeight - 20) {
      doc.addPage();
      yPosition = 15;
    }
  };

  // ===== HEADER / KOP LAPORAN (compact) =====
  // Background header (tinggi 38mm)
  doc.setFillColor(240, 248, 255);
  doc.rect(margin - 2, 5, contentWidth + 4, 38, 'F');

  // Border header
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.rect(margin - 2, 5, contentWidth + 4, 38);

  let headerY = 10;
  const logoX = margin + 2;
  const logoSize = 14; // Ukuran logo 14x14mm (lebih kecil)
  const textStartX = margin + logoSize + 4;

  // Logo
  if (logoDataUrl) {
    try {
      doc.addImage(logoDataUrl, 'PNG', logoX, headerY, logoSize, logoSize);
    } catch (err) {
      doc.setFontSize(12);
      doc.setTextColor(30, 136, 229);
      doc.setFont(undefined, 'bold');
      doc.text('◆', logoX + 5, headerY + 7);
    }
  } else {
    doc.setFontSize(12);
    doc.setTextColor(30, 136, 229);
    doc.setFont(undefined, 'bold');
    doc.text('◆', logoX + 5, headerY + 7);
  }

  // VITACHECK title
  doc.setFontSize(13);
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, 'bold');
  doc.text('VITACHECK', textStartX, headerY + 2.5);
  headerY += 6;

  // Subtitle
  doc.setFontSize(9);
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, 'normal');
  doc.text('Platform Penilaian Risiko Kesehatan Digital', textStartX, headerY);
  headerY += 5.2;

  // Email & Location (lebih rapat)
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont(undefined, 'normal');
  doc.text('vitacheckhealthy@gmail.com | Jakarta, Indonesia', textStartX, headerY);
  headerY += 4.5;

  // Nomor & Tanggal (lebih rapat)
  const reportDate = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`Nomor: VCR-${Date.now().toString().slice(-8)}`, textStartX, headerY);
  headerY += 4.2;
  doc.text(`Tanggal: ${reportDate}`, textStartX, headerY);

  yPosition = 46;

  // Line separator
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, margin + contentWidth, yPosition);
  yPosition += 5.5;

  // LAPORAN HASIL ANALISIS KESEHATAN - Title (lebih dekat header)
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('LAPORAN HASIL ANALISIS KESEHATAN', margin, yPosition);
  yPosition += 6.5;

  // Line separator dibawah title
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.7);
  doc.line(margin, yPosition, margin + contentWidth, yPosition);
  yPosition += 6.5;

  // ===== 1. IDENTITAS PRIBADI =====
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('1. DATA DIRI PASIEN', margin, yPosition);
  // Underline
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.7);
  doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
  yPosition += 8;

  // Tabel Data Diri
  const personData = [
    ['Nama Lengkap', results.name || 'Tidak Tercatat'],
    ['Usia', results.age ? `${results.age} tahun` : 'Tidak Tercatat'],
    ['Jenis Kelamin', (results.gender === 'M') ? 'Laki-laki' : (results.gender === 'F') ? 'Perempuan' : 'Tidak Tercatat'],
    ['Berat Badan', results.weight ? `${results.weight} kg` : 'Tidak Tercatat'],
    ['Tinggi Badan', results.height ? `${results.height} cm` : 'Tidak Tercatat'],
  ];

  // Draw table manually
  const drawSimpleTable = (startY, headers, rows) => {
    const col1Width = 60;
    const col2Width = contentWidth - 60;
    const rowHeight = 8;
    let y = startY;

    // Headers dengan border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.setFillColor(...primaryColor);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    doc.rect(margin, y, col1Width, rowHeight, 'FD');
    doc.text(headers[0], margin + 3, y + 5);
    doc.rect(margin + col1Width, y, col2Width, rowHeight, 'FD');
    doc.text(headers[1], margin + col1Width + 3, y + 5);
    y += rowHeight;

    // Rows
    doc.setTextColor(...darkColor);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    
    rows.forEach((row, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(...[245, 245, 245]);
        doc.rect(margin, y, contentWidth, rowHeight, 'F');
      }
      doc.text(String(row[0] || '-'), margin + 3, y + 5);
      doc.text(String(row[1] || '-'), margin + col1Width + 3, y + 5);
      doc.rect(margin, y, col1Width, rowHeight);
      doc.rect(margin + col1Width, y, col2Width, rowHeight);
      y += rowHeight;
    });

    return y;
  };

  yPosition = drawSimpleTable(yPosition, ['Parameter', 'Nilai'], personData) + 8;

  // ===== 2. HASIL ANALISIS =====
  checkPageBreak(35);
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('2. HASIL ANALISIS RISIKO', margin, yPosition);
  // Underline
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.7);
  doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
  yPosition += 8;

  // Risk Level Box
  const bmi = results.weight / ((results.height / 100) ** 2);
  const bmiCategory = bmi < 17 ? 'Berat Badan Kurang Berat' : bmi < 23 ? 'Normal' : bmi < 25 ? 'Kelebihan Berat Badan' : bmi < 30 ? 'Obesitas' : 'Obesitas Berat';
  
  const getRiskColor = (score) => {
    if (score >= 70) return riskColors.high;
    if (score >= 40) return riskColors.medium;
    return riskColors.low;
  };

  const getRiskLevel = (score) => {
    if (score >= 70) return 'RISIKO TINGGI';
    if (score >= 40) return 'RISIKO SEDANG';
    return 'RISIKO RENDAH';
  };

  // Tabel Hasil Analisis
  const analysisData = [
    ['Skor Risiko Kesehatan', `${results.riskScore}/100`, getRiskLevel(results.riskScore)],
    ['Status Kesehatan', getRiskLevel(results.riskScore), getRiskLevel(results.riskScore) === 'RISIKO TINGGI' ? 'Urgen - Konsultasi Dokter' : getRiskLevel(results.riskScore) === 'RISIKO SEDANG' ? 'Perlu Perhatian' : 'Baik'],
    ['BMI (Body Mass Index)', `${(Math.round(bmi * 10) / 10).toFixed(1)}`, bmiCategory],
  ];

  // Draw 3-column table
  const drawThreeColumnTable = (startY, headers, rows) => {
    const col1Width = 50;
    const col2Width = 40;
    const col3Width = contentWidth - 90;
    const rowHeight = 8;
    let y = startY;

    // Headers dengan border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.setFillColor(...primaryColor);
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(9);
    [0, 1, 2].forEach((i) => {
      const widths = [col1Width, col2Width, col3Width];
      const xPos = margin + widths.slice(0, i).reduce((a, b) => a + b, 0);
      doc.rect(xPos, y, widths[i], rowHeight, 'FD');
      doc.text(headers[i], xPos + 3, y + 5);
    });
    y += rowHeight;

    // Rows
    doc.setTextColor(...darkColor);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    
    rows.forEach((row, idx) => {
      if (idx % 2 === 1) {
        doc.setFillColor(...[245, 245, 245]);
        doc.rect(margin, y, contentWidth, rowHeight, 'F');
      }
      const widths = [col1Width, col2Width, col3Width];
      [0, 1, 2].forEach((i) => {
        const xPos = margin + widths.slice(0, i).reduce((a, b) => a + b, 0);
        doc.text(String(row[i] || '-'), xPos + 3, y + 5);
        doc.rect(xPos, y, widths[i], rowHeight);
      });
      y += rowHeight;
    });

    return y;
  };

  yPosition = drawThreeColumnTable(yPosition, ['Parameter', 'Nilai', 'Interpretasi'], analysisData) + 6;

  // Penjelasan Hasil
  checkPageBreak(10);
  doc.setFontSize(9);
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, 'normal');
  
  const predictionText = `Status kesehatan Anda menunjukkan ${getRiskLevel(results.riskScore).toLowerCase()}. Berdasarkan analisis faktor risiko yang Anda miliki, perlu perhatian khusus terhadap kondisi kesehatan Anda.`;
  
  const wrappedPrediction = doc.splitTextToSize(predictionText, contentWidth);
  doc.text(wrappedPrediction, margin, yPosition);
  yPosition += wrappedPrediction.length * 4 + 6;

  // ===== 3. INDIKATOR KESEHATAN =====
  checkPageBreak(40);
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('3. INDIKATOR KESEHATAN', margin, yPosition);
  // Underline
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.7);
  doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
  yPosition += 8;

  const indicators = [
    ['Durasi Tidur', `${results.sleepDuration} jam/hari`, parseInt(results.sleepDuration) < 6 ? 'Kurang' : parseInt(results.sleepDuration) <= 9 ? 'Ideal' : 'Berlebih'],
    ['Status Perokok', results.smoking === 'yes' ? 'Ya' : results.smoking === 'quit' ? 'Pernah (berhenti)' : 'Tidak', results.smoking === 'yes' ? 'Berisiko' : 'Baik'],
    ['Frekuensi Olahraga', results.exerciseFrequency === 'never' ? 'Tidak Pernah' : results.exerciseFrequency === 'rare' ? 'Jarang (1-2x/minggu)' : results.exerciseFrequency === 'moderate' ? 'Sedang (2-3x/minggu)' : 'Sering (4-7x/minggu)', results.exerciseFrequency === 'never' || results.exerciseFrequency === 'rare' ? 'Perlu Ditingkatkan' : 'Baik'],
    ['Riwayat Penyakit Keluarga', results.familyHistory === 'yes' ? 'Ada' : 'Tidak Ada', results.familyHistory === 'yes' ? 'Faktor Risiko' : 'Baik'],
  ];

  yPosition = drawThreeColumnTable(yPosition, ['Indikator', 'Nilai', 'Status'], indicators) + 6;

  // ===== 4. GEJALA YANG COCOK =====
  if (results.symptoms && results.symptoms.length > 0) {
    checkPageBreak(15);
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.setFont(undefined, 'bold');
    doc.text('4. GEJALA YANG COCOK', margin, yPosition);
    // Underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.7);
    doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
    
    yPosition += 8;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    const matchedSymptoms = results.symptoms.length;
    const totalSymptoms = results.disease?.symptoms?.length || 1;
    const symptomMatch = Math.round((matchedSymptoms / totalSymptoms) * 100);

    doc.setFont(undefined, 'bold');
    doc.text(`Kecocokan Gejala: ${symptomMatch}% (${matchedSymptoms} dari ${totalSymptoms} gejala)`, margin + 5, yPosition);
    yPosition += 6;

    doc.setFont(undefined, 'normal');
    results.symptoms.forEach((symptom, idx) => {
      checkPageBreak(4);
      doc.text(`${idx + 1}. ${symptom}`, margin + 10, yPosition);
      yPosition += 4;
    });

    yPosition += 2;
  }

  // ===== INFORMASI TENTANG KONDISI =====
  if (results.disease && results.disease.title) {
    checkPageBreak(8);
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.setFont(undefined, 'bold');
    doc.text(`5. INFORMASI TENTANG ${(results.disease.title || 'Kondisi').toUpperCase()}`, margin, yPosition);
    // Underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.7);
    doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
    
    yPosition += 8;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    // Simple Explanation
    doc.setFont(undefined, 'bold');
    doc.text('Penjelasan Singkat:', margin + 5, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 4;
    
    const explanation = doc.splitTextToSize(
      (results.disease.simpleExplanation || results.disease.description || 'Informasi tidak tersedia'), 
      contentWidth - 15
    );
    checkPageBreak(explanation.length * 3 + 4);
    doc.text(explanation, margin + 5, yPosition);
    yPosition += explanation.length * 3 + 4;

    // Causes
    if (results.disease.causes && Array.isArray(results.disease.causes) && results.disease.causes.length > 0) {
      checkPageBreak(6);
      doc.setFont(undefined, 'bold');
      doc.text('Penyebab Utama:', margin + 5, yPosition);
      yPosition += 4;
      
      doc.setFont(undefined, 'normal');
      results.disease.causes.slice(0, 5).forEach((cause, idx) => {
        checkPageBreak(4);
        doc.text(`${idx + 1}. ${cause || 'Tidak tersedia'}`, margin + 10, yPosition);
        yPosition += 4;
      });
    }

    yPosition += 2;
  }

  // ===== TIPS PENCEGAHAN & PENGOBATAN =====
  checkPageBreak(8);
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('6. TIPS PENCEGAHAN & PENGOBATAN', margin, yPosition);
  // Underline
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.7);
  doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
  
  yPosition += 8;
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);

  const preventionTips = [
    'Jaga pola makan sehat dengan mengurangi makanan berlemak dan berkolesterol tinggi',
    'Olahraga teratur minimal 30 menit, 3-4 kali per minggu',
    'Tidur cukup 7-9 jam setiap hari untuk istirahat optimal',
    'Kelola stres dengan melakukan meditasi, yoga, atau hobi yang menyenangkan',
    'Hindari merokok dan minuman beralkohol',
    'Lakukan pemeriksaan kesehatan secara rutin sesuai rekomendasi dokter',
    'Perbanyak konsumsi sayuran dan buah-buahan segar',
    'Minum air putih minimal 8 gelas per hari'
  ];

  preventionTips.forEach((tip, idx) => {
    checkPageBreak(4);
    const wrappedTip = doc.splitTextToSize(`${idx + 1}. ${tip}`, contentWidth - 20);
    doc.text(wrappedTip, margin + 10, yPosition);
    yPosition += wrappedTip.length * 3 + 1;
  });

  yPosition += 4;

  // ===== REKOMENDASI TINDAKAN =====
  checkPageBreak(10);
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.setFont(undefined, 'bold');
  doc.text('7. REKOMENDASI TINDAKAN', margin, yPosition);
  // Underline
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.7);
  doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
  
  yPosition += 8;
  doc.setFontSize(9);
  
  const actionColor = results.riskScore >= 70 ? riskColors.high : results.riskScore >= 40 ? riskColors.medium : riskColors.low;
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, 'bold');

  if (results.riskScore >= 70) {
    doc.text('⚠️ URGEN - Segera Ambil Tindakan:', margin + 5, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    const urgentActions = [
      'Segera berkonsultasi dengan dokter spesialis untuk evaluasi medis menyeluruh',
      'Persiapkan riwayat kesehatan dan gejala yang dialami untuk dibawa ke dokter',
      'Hindari aktivitas berat hingga mendapat diagnosis dari tenaga medis profesional',
      'Tetap monitor gejala dan catat perubahan yang terjadi'
    ];
    
    urgentActions.forEach((action, idx) => {
      checkPageBreak(4);
      doc.text(`${idx + 1}. ${action}`, margin + 10, yPosition);
      yPosition += 4;
    });
  } else if (results.riskScore >= 40) {
    doc.text('⚠️ PERLU PERHATIAN - Tindakan Pencegahan:', margin + 5, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    const preventiveActions = [
      'Mulai terapkan langkah-langkah pencegahan yang disarankan segera',
      'Monitor perkembangan gejala Anda dalam 2-3 minggu ke depan',
      'Jika gejala bertambah parah atau muncul gejala baru, konsultasikan dengan dokter',
      'Tingkatkan gaya hidup sehat dan aktifitas fisik'
    ];
    
    preventiveActions.forEach((action, idx) => {
      checkPageBreak(4);
      doc.text(`${idx + 1}. ${action}`, margin + 10, yPosition);
      yPosition += 4;
    });
  } else {
    doc.text('✓ BAIK - Pertahankan Gaya Hidup Sehat:', margin + 5, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    const healthyActions = [
      'Teruskan gaya hidup sehat yang sudah Anda jalani sekarang',
      'Tetap aktif berolahraga dan menjaga pola makan bergizi',
      'Lakukan pemeriksaan kesehatan berkala untuk deteksi dini',
      'Jangan ragu untuk berkonsultasi jika muncul gejala atau keluhan'
    ];
    
    healthyActions.forEach((action, idx) => {
      checkPageBreak(4);
      doc.text(`${idx + 1}. ${action}`, margin + 10, yPosition);
      yPosition += 4;
    });
  }

  yPosition += 6;

  // ===== FOOTER PROFESIONAL =====
  // Buat footer di halaman terakhir
  const currentPage = doc.internal.pages.length - 1;
  
  // Footer line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, pageHeight - 25, margin + contentWidth, pageHeight - 25);
  
  // Footer text
  doc.setFontSize(8);
  doc.setTextColor(...darkColor);
  doc.setFont(undefined, 'bold');
  doc.text('Platform Penilaian Kesehatan Digital VitaCheck', margin, pageHeight - 20);
  
  doc.setFont(undefined, 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('vitacheckhealthy@gmail.com | Jakarta, Indonesia', margin, pageHeight - 16);
  
  // Disclaimer
  const disclaimerText = 'DISCLAIMER: Laporan ini adalah hasil analisis otomatis untuk tujuan edukasi dan informasi. BUKAN pengganti untuk diagnosis medis profesional. Selalu konsultasikan dengan dokter untuk kekhawatiran kesehatan apa pun.';
  const disclaimerWrapped = doc.splitTextToSize(disclaimerText, contentWidth);
  doc.setFontSize(7);
  doc.setTextColor(...darkColor);
  doc.text(disclaimerWrapped, margin, pageHeight - 10);

    // ===== SAVE PDF =====
    const filename = `Laporan_Kesehatan_${results.name || 'Pasien'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Log untuk debug
    console.log('📄 Generating PDF:', filename);
    console.log('📄 Doc instance:', doc);
    console.log('📄 Doc save method exists:', typeof doc.save);
    
    // Trigger download
    if (typeof doc.save !== 'function') {
      throw new Error('jsPDF save method tidak tersedia');
    }
    
    doc.save(filename);
    
    console.log('✅ PDF downloaded successfully:', filename);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    console.error('Error message:', error?.message);
    console.error('Error toString:', error?.toString());
    console.error('Full error:', error);
    alert(`Gagal mengunduh laporan: ${error?.message || 'Error tidak diketahui'}. Silakan periksa console untuk detail.`);
  }
};

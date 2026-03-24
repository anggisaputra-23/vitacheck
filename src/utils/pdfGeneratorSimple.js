import { jsPDF } from 'jspdf';

/**
 * Generate Simple Health Report PDF - Testing version
 * @param {Object} results - Health analysis results
 */
export const generateSimplePDF = (results) => {
  try {
    console.log('🔍 Starting SIMPLE PDF generation');
    
    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    console.log('✅ jsPDF instance created');
    
    // Add content
    pdf.setFontSize(20);
    pdf.text('LAPORAN KESEHATAN', 20, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Nama: ${results.name || 'N/A'}`, 20, 40);
    pdf.text(`Usia: ${results.age || 'N/A'}`, 20, 50);
    pdf.text(`Skor Risiko: ${results.riskScore || 'N/A'}/100`, 20, 60);
    
    const reportDate = new Date().toLocaleDateString('id-ID');
    pdf.text(`Tanggal: ${reportDate}`, 20, 70);
    
    // Generate filename
    const filename = `Laporan_${results.name || 'Pasien'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    console.log('📄 About to save PDF:', filename);
    console.log('📄 PDF save method:', typeof pdf.save);
    
    // Save/Download
    pdf.save(filename);
    
    console.log('✅ PDF saved successfully:', filename);
    return true;
    
  } catch (error) {
    console.error('❌ ERROR in generateSimplePDF:', error);
    console.error('Error message:', error?.message);
    console.error('Error name:', error?.name);
    console.error('Stack:', error?.stack);
    throw error;
  }
};

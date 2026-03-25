# VitaCheck – AI Health Risk Checker

## Universitas Harapan Bangsa

---

## Anggota Tim

- **Ketua**: Anggi Dwi Saputra
- **Anggota 1**: Muhammad Humam Nuqi
- **Anggota 2**: Esha Rizky Filiansyah

---

## Deskripsi Karya

### Latar Belakang

Penyakit tidak menular seperti diabetes, hipertensi, dan obesitas semakin menjadi beban kesehatan masyarakat modern. Akses ke informasi kesehatan yang akurat dan tim medis profesional masih terbatas, khususnya di daerah yang kurang berkembang. Masyarakat membutuhkan alat yang mudah diakses untuk melakukan penilaian awal risiko kesehatan mereka sendiri tanpa harus menghabiskan biaya konsultasi medis yang mahal.

### Tujuan

1. Memberikan awareness dan edukasi kesehatan kepada masyarakat luas tentang faktor-faktor risiko penyakit
2. Menyediakan tool gratis untuk early detection dan self-assessment terhadap kondisi kesehatan
3. Membantu pengguna membuat keputusan hidup lebih sehat berdasarkan data dan rekomendasi personal
4. Meningkatkan literasi kesehatan melalui antarmuka yang user-friendly dan informatif

### Manfaat

**Untuk Pengguna:**
- Mengetahui status kesehatan melalui analisis BMI dan risk scoring
- Memahami faktor-faktor risiko kesehatan pribadi mereka
- Mendapatkan rekomendasi aksi konkret untuk meningkatkan kesehatan
- Menggunakan fitur "What If" untuk simulasi dampak perubahan gaya hidup
- Konsultasi real-time dengan AI Chatbot untuk pertanyaan kesehatan

**Untuk Masyarakat:**
- Early detection dan pencegahan penyakit tidak menular
- Mengurangi beban biaya kesehatan melalui preventif care
- Akses informasi kesehatan yang terpersonalisasi dan terpercaya

**Untuk Healthcare Provider:**
- Data dasar yang membantu dalam konsultasi lanjutan dengan pasien
- Tool edukasi tambahan untuk program kesehatan komunitas
- Memudahkan identifikasi kelompok risiko tinggi

### Pilihan Subtema & Teknologi

Kami memilih domain kesehatan preventif karena relevansinya dengan kebutuhan masyarakat Indonesia yang menghadapi epidemi penyakit tidak menular. Subtema **"AI-Powered Health Risk Assessment"** dipilih karena:

1. **Relevansi Tinggi** - Tren kesehatan digital dan AI sedang berkembang pesat
2. **Impact Potensial** - Dapat menjangkau ribuan pengguna dengan tool gratis
3. **Feasibility** - Teknologi yang dipilih sudah matang dan mudah diintegrasikan
4. **Inovasi** - Kombinasi antara algoritma kesehatan profesional dengan AI chatbot

**Stack Teknologi yang Dipilih:**
- **React 19** + **Vite** - Framework modern dengan performa tinggi dan development experience yang optimal
- **Tailwind CSS** - Styling yang responsive dan customizable untuk semua device
- **Recharts** - Visualisasi data yang interaktif dan mudah dipahami
- **Gemini AI API** - AI chatbot untuk konsultasi kesehatan real-time
- **React Router** - Routing yang seamless untuk navigasi antar halaman
- **EmailJS** - Integrasi email untuk contact form tanpa backend
- **jsPDF + html2canvas** - Pembuatan laporan PDF profesional yang dapat diunduh

Pilihan ini memastikan aplikasi yang cepat, scalable, responsif, dan memberikan user experience terbaik.

---

## Fitur Utama

Smart Health Risk Assessment - Analisis komprehensif risiko kesehatan berdasarkan 9 parameter kesehatan (BMI, riwayat perokok, frekuensi olahraga, usia, riwayat keluarga, durasi tidur, tingkat stress, konsumsi alkohol, dan kualitas diet)

Dashboard Interaktif - Visualisasi data dengan pie chart dan radar chart yang mudah dipahami untuk breakdown risiko

Personalized Recommendations - Saran kesehatan yang disesuaikan dengan profil risiko individual berdasarkan hasil analisis

Lifestyle Simulation - Fitur "What If" untuk simulasi dampak perubahan gaya hidup terhadap risk score

AI-Powered Chatbot - Konsultasi kesehatan real-time dengan Gemini AI untuk menjawab pertanyaan pengguna tentang topik kesehatan

PDF Report Generation - Laporan kesehatan profesional yang dapat diunduh dengan format yang rapi dan informatif

Fully Responsive Design - Aplikasi bekerja sempurna di desktop, tablet, dan mobile dengan user experience yang optimal

Medical Disclaimers - Peringatan kesehatan yang jelas dan profesional di halaman relevan untuk edukasi dan compliance

---

## Metrik Kesehatan & Perhitungan

### Risk Score Calculation

Dokumen penjelasan algoritma yang digunakan untuk perhitungan risiko kesehatan:

**Maximum Score**: 32 poin

Breakdown faktor-faktor risiko:
- BMI Overweight (23.0-24.9): 2 poin
- BMI Obesity (>= 25.0): 5 poin
- Status Perokok (Ya): 4 poin
- Jarang Olahraga (<1-2x/minggu): 3 poin
- Usia > 50 tahun: 3 poin
- Riwayat Keluarga (Ada): 3 poin
- Durasi Tidur < 5 jam: 3 poin
- Tingkat Stress Tinggi: 3 poin
- Konsumsi Alkohol Frequent: 2 poin
- Kualitas Diet Buruk: 3 poin
- Asupan Air Minum Rendah: 2 poin
- Riwayat Penyakit Medis: hingga 4 poin

**Kategori Risiko**:
- Skor 0-5: Risiko Rendah (Hijau)
- Skor 6-12: Risiko Sedang (Kuning)
- Skor 13-20: Risiko Tinggi (Oranye)
- Skor 21+: Risiko Sangat Tinggi (Merah)

### BMI Calculation

Menggunakan standar Asia-Pasifik yang sesuai untuk populasi Indonesia:
- < 18.5: Berat Badan Kurang
- 18.5-22.9: Berat Badan Normal
- 23.0-24.9: Berat Badan Berlebih
- >= 25.0: Obesitas

---

## Security & Best Practices

### Environment Variables
Semua API keys dan konfigurasi sensitif disimpan di file `.env` yang tidak di-commit ke repository:
- VITE_GEMINI_API_KEY - Google Gemini API key untuk AI Chatbot
- VITE_EMAILJS_SERVICE_ID - EmailJS service configuration
- VITE_EMAILJS_TEMPLATE_ID - EmailJS template configuration
- VITE_EMAILJS_PUBLIC_KEY - EmailJS public key

File `.env` harus ditambahkan ke `.gitignore` dan tidak boleh di-share/commit ke version control.

### Error Handling
- Error Boundary component di App.jsx untuk menangkap unhandled errors
- Validation modal untuk input validation dengan user-friendly messages
- Try-catch blocks di semua API calls (ChatBot, Contact form, PDF generation)
- Console logging untuk debugging dan monitoring

### Data Privacy
- Tidak ada data pengguna yang disimpan di server (client-side only)
- PDF reports hanya dibuat dan diunduh di browser pengguna
- Semua komunikasi menggunakan HTTPS di production

### Accessibility
- Semantic HTML untuk better screen reader support
- Color contrast yang memenuhi WCAG standards
- Keyboard navigation support di semua interactive elements
- Error messages yang clear dan actionable

---


## Halaman & Konten

| Halaman | Fungsi |
|---------|--------|
| **Home** | Landing page dengan value proposition dan call-to-action |
| **About** | Informasi latar belakang masalah dan visi misi aplikasi |
| **Analyzer** | Form input kesehatan dan dashboard hasil analisis risiko |
| **Contact** | Form kontak dan FAQ section dengan 6 pertanyaan umum |
| **Chatbot** | AI Assistant untuk konsultasi kesehatan interaktif |

---

## Disclaimer

VitaCheck adalah alat edukasi dan informasi semata. Bukan pengganti untuk diagnosis medis profesional. Selalu konsultasikan dengan dokter atau tenaga kesehatan profesional untuk kekhawatiran kesehatan apa pun.

Hasil analisis yang diberikan oleh aplikasi ini berdasarkan algoritma yang dikembangkan untuk tujuan edukasi dan informasi. Tidak dapat digunakan untuk keperluan medis atau klinis yang sesungguhnya.

---

**Dikembangkan oleh**: Anggi Dwi Saputra, Muhammad Humam Nuqi, Esha Rizky Filiansyah  
**Institusi**: Universitas Harapan Bangsa  

---

## Link Website

Live Demo: https://vitacheck-health.vercel.app

Status: Under Development | Last Updated: March 2026

---
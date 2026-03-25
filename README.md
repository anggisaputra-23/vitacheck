
# VitaCheck – AI-Powered Health Risk Checker

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.5-success?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Aplikasi web untuk penilaian risiko kesehatan yang komprehensif dan interaktif dengan dukungan AI.

> **Ketahui Risiko Kesehatan Anda dalam Menit**  
> VitaCheck memberikan analisis risiko kesehatan yang dipersonalisasi dengan algoritma penilaian kesehatan profesional.

**Lihat juga:** [README PROJECT.md](README%20PROJECT.md) untuk ringkasan akademik proyek ini.

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Stack Teknologi](#stack-teknologi)
- [Memulai (Quick Start)](#memulai-quick-start)
- [Struktur Folder](#struktur-folder)
- [Halaman & Fitur](#halaman--fitur)
- [Logika Perhitungan](#logika-perhitungan)
- [Melakukan Development](#melakukan-development)
- [Troubleshooting](#troubleshooting)
- [Performance Tips](#performance-tips)
- [Contributing](#contributing)
- [Lisensi](#lisensi)
- [Support & Contact](#support--contact)
- [Informasi Developer](#informasi-developer)

---

## Fitur Utama

- **Smart Health Risk Assessment**
    Analisis komprehensif berdasarkan 12 parameter kesehatan (BMI, perokok, olahraga, riwayat keluarga, durasi tidur, stress, diet, air putih, riwayat medis, dan lainnya)
- **Dashboard Interaktif**
    Visualisasi data dengan pie chart dan radar chart menggunakan Recharts
- **Personalized Recommendations**  
    Rekomendasi kesehatan yang disesuaikan dengan profil risiko individual
- **Lifestyle Simulation**  
    Fitur "What If" untuk simulasi dampak perubahan gaya hidup
- **AI Chatbot**  
    Konsultasi kesehatan real-time dengan Gemini AI API
- **Fully Responsive**  
    Mobile-first design yang optimal di semua device
- **Form Validation**  
    Validasi input dengan error handling yang user-friendly

## Pembaruan Terbaru

- Penyempurnaan ikon SVG custom pada katalog buah & sayuran di halaman Home.
- Ikon semangka dikembalikan ke versi awal sesuai preferensi desain.
- Ikon timun dan tomat menggunakan gaya garis (outline) agar konsisten dengan ikon sayur lain.
- Kode telah dirapikan dan error ESLint sudah dibersihkan (tersisa warning non-blocking di ChatBot).

---

## Stack Teknologi

| Teknologi         | Versi   | Fungsi                |
|-------------------|---------|-----------------------|
| **React**         | 19.2    | UI Framework          |
| **Vite**          | 4.5     | Build Tool & Dev Server |
| **Tailwind CSS**  | 3.0     | CSS Framework         |
| **React Router**  | 6.20    | Client-side Routing   |
| **Recharts**      | 3.7     | Data Visualization    |
| **Lucide React**  | 0.575   | Icon Library          |
| **EmailJS**       | 4.4     | Email Integration     |
| **jsPDF**         | 4.2     | PDF Report Generation |
| **html2canvas**   | 1.4     | Screenshot to PDF     |
| **Gemini AI API** | Latest  | AI Chatbot            |

---

## Memulai (Quick Start)

### Prasyarat
- Node.js v18.8.0 atau lebih tinggi
- npm atau yarn package manager
- Gemini API Key (gratis dari https://aistudio.google.com/apikey)

### Setup
1. **Clone repository**
    ```bash
    git clone https://github.com/anggisaputra-23/vitacheck.git
    cd vitacheck
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Setup Environment Variables**
    ```bash
    # Buat file .env di root directory
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
    Cara mendapatkan Gemini API Key:
    1. Kunjungi https://aistudio.google.com/apikey
    2. Login dengan akun Google
    3. Klik "Create API key"
    4. Copy key dan paste ke file `.env`
4. **Jalankan development server**
    ```bash
    npm run dev
    ```
    Server berjalan di `http://localhost:5173`

### Build untuk Production
```bash
npm run build    # Build static files
npm run preview  # Preview production build
```

---


## Struktur Folder

```
vitacheck/
├── src/
│   ├── components/          # React Components
│   │   ├── AnalyzerForm.jsx       # Form input kesehatan
│   │   ├── Charts.jsx             # Visualisasi data
│   │   ├── ChatBot.jsx            # AI Chatbot interface
│   │   ├── ResultDashboard.jsx    # Dashboard hasil analisis
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── Footer.jsx             # Footer
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Content.jsx
│   ├── utils/
│   │   └── riskCalculator.js      # Algoritma perhitungan risiko
│   ├── App.jsx
│   └── main.jsx
├── public/                  # Static assets
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---


## Halaman & Fitur

| Halaman | Path | Deskripsi |
|---------|------|-----------|
| **Home** | `/` | Landing page dengan hero section dan CTA |
| **About** | `/about` | Informasi tentang VitaCheck dan misi kami |
| **Analyzer** | `/content` | Form input kesehatan dan dashboard hasil |
| **Contact** | `/contact` | Form kontak dan FAQ (6 pertanyaan umum) |


**Fitur Khusus:**
- Validation Modal untuk input validation
- Risk Score Breakdown dengan progress bars
- Pie Chart (BMI composition) & Radar Chart (lifestyle factors)
- Lifestyle Simulation ("What If" scenario)
- Interactive AI Chatbot dengan Gemini API
- Smooth animations & transitions

---


## Melakukan Development


### Perintah npm yang Berguna

```bash
npm run dev      # Start development server (HMR enabled)
npm run build    # Build untuk production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```


### Struktur Komponen

```
src/components/
├── Navbar.jsx              # Navigation & responsive menu
├── Footer.jsx              # Footer dengan disclaimer
├── Hero.jsx                # Hero section
├── AnalyzerForm.jsx        # Form input kesehatan (9 field)
├── ResultDashboard.jsx     # Dashboard hasil analisis
├── Charts.jsx              # Recharts visualization
├── ConsultationSection.jsx # CTA section
├── ChatBot.jsx             # Gemini AI chatbot
└── [Icons].jsx             # Custom SVG icons
```


### Struktur Halaman

```
src/pages/
├── Home.jsx      # Landing page
├── About.jsx     # About & mission
├── Content.jsx   # Analyzer page (main feature)
└── Contact.jsx   # Contact form & FAQ
```


### Utilitas

```
src/utils/
└── riskCalculator.js
    ├── calculateBMI()        # BMI calculation & categorization
    └── calculateRiskScore()  # Health risk scoring algorithm
```

---


## Logika Perhitungan


### Perhitungan BMI

```javascript
BMI = weight(kg) / (height(m) × height(m))

Kategori (Asia-Pacific/Indonesia):
├─ < 18.5       → Berat Badan Kurang (Underweight)
├─ 18.5 - 22.9  → Normal
├─ 23.0 - 24.9  → Berat Badan Berlebih (Overweight)
└─ >= 25.0      → Obesitas (Obese)
```


### Perhitungan Risk Score

```
Max Score: 32 points

Breakdown:
├─ BMI Overweight (23.0-24.9)       → +2 points
├─ BMI Obesity (>= 25.0)            → +5 points
├─ Smoking Status                   → +4 points
├─ Rare Exercise (< 3x/week)        → +3 points
├─ Age > 50 years                   → +3 points
├─ Family History (chronic disease) → +3 points
├─ Sleep Duration < 5 hours         → +3 points
├─ High Stress Level                → +3 points
├─ Frequent Alcohol Consumption     → +2 points
├─ Poor Diet Quality                → +3 points
├─ Low Water Intake                 → +2 points
└─ Medical History                  → up to +4 points

Risk Categories:
├─ 0-5   → Low Risk (Green)
├─ 6-12  → Medium Risk (Yellow)
├─ 13-20 → High Risk (Orange)
└─ 21+   → Very High Risk (Red)
```

---


## Design System


### Palet Warna
```
Primary Blue:    #1E88E5   (Main CTA, links)
Secondary Green: #43A047   (Success indicators)
Danger Red:      #DC2626   (Risk alerts)
Warning Yellow:  #F59E0B   (Caution/medium risk)
Light Gray:      #F3F4F6   (Backgrounds)
Dark Gray:       #1F2937   (Text)
```


### Tipografi
- **Font Family**: Poppins (headings), Inter (body)
- **Heading**: Bold 600-700 weight
- **Body**: Regular 400 weight
- **Sizes**: sm, base, lg, xl, 2xl (Tailwind scale)


### Pola Komponen
- **Cards**: Rounded corners (8-12px), subtle shadows
- **Buttons**: Rounded (6-8px), hover effects, smooth transitions
- **Forms**: Clean inputs, focus ring styling, error states
- **Spacing**: Consistent Tailwind spacing (4px unit system)

---


## Troubleshooting


### Dev Server Tidak Berjalan
- Pastikan Node.js v18.8.0 atau lebih tinggi sudah terinstall
- Jalankan `npm install` lagi
- Hapus folder `node_modules` dan `package-lock.json`, kemudian reinstall


### Styling Tidak Muncul
- Restart dev server
- Clear browser cache (Ctrl+Shift+Delete atau Cmd+Shift+Delete)
- Verifikasi `tailwind.config.js` configuration


### Charts Tidak Berfungsi
- Pastikan Recharts terinstall: `npm install recharts`
- Check browser console untuk error messages
- Verifikasi data format input


### Chatbot Tidak Merespons
- Verifikasi Gemini API Key di file `.env`
- Pastikan API key valid dan memiliki quota
- Check network tab untuk error messages


### Komponen Tidak Render
- Verifikasi route di `App.jsx`
- Check console untuk import errors
- Pastikan semua dependencies sudah diinstall

---


## Performance Tips

- **Production Build**: Vite sudah mengoptimalkan bundling secara otomatis
- **Code Splitting**: Route-based splitting untuk load time lebih cepat
- **Lazy Loading**: Heavy components dapat di-lazy load dengan React.lazy()
- **Image Optimization**: Gunakan format modern (WebP) untuk images
- **Caching**: Browser cache configuration di Vite

---


## Contributing

Kontribusi sangat diterima! Berikut caranya:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request


**Coding Standards:**
- Gunakan ESLint untuk code linting
- Ikuti naming conventions yang konsisten
- Tambahkan comments untuk logic yang kompleks
- Test component secara manual sebelum submit PR

---


## Lisensi

MIT License - Bebas untuk digunakan, dimodifikasi, dan didistribusikan untuk keperluan komersial maupun non-komersial.

---


## Support & Contact

Untuk pertanyaan atau issues:
- Gunakan Contact page di aplikasi
- [Report issues di GitHub](https://github.com/anggisaputra-23/vitacheck/issues)
- Berikan star jika repository ini membantu!

---


## Informasi Developer

- **Lead Developer**: Anggi Dwi Saputra
- **Team**: Muhammad Humam Nuqi, Esha Rizky Filiansyah
- **Repository**: https://github.com/anggisaputra-23/vitacheck
- **Live Demo**: https://vitacheck-health.vercel.app
- **Last Updated**: March 2026
- **Institusi**: Universitas Harapan Bangsa

---


---

**DISCLAIMER**: VitaCheck adalah alat edukasi dan informasi saja. **Bukan pengganti konsultasi medis profesional**. Selalu konsultasikan dengan dokter untuk kekhawatiran kesehatan apa pun.



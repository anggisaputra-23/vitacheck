# Quick Start Guide - VitaCheck

## 📦 Setup Awal

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
# Copy .env.example ke .env
cp .env.example .env

# Atau buat file .env baru dengan:
VITE_GEMINI_API_KEY=your_api_key_here
```

### 3. Dapatkan API Key Gemini
1. Buka https://aistudio.google.com/apikey
2. Klik "Create API key"
3. Copy dan paste ke `.env` file

### 4. Jalankan Development Server
```bash
npm run dev
```

Aplikasi akan buka di `http://localhost:5173`

## 🚀 Commands

```bash
npm run dev       # Development server
npm run build     # Build untuk production
npm run preview   # Preview build hasil
npm run lint      # Check code dengan ESLint
```

## 📁 Project Structure

```
vitacheck_1/
├── src/
│   ├── components/
│   │   ├── AnalyzerForm.jsx    # Form input data kesehatan
│   │   ├── Charts.jsx           # Visualisasi data
│   │   ├── ChatBot.jsx          # VitaBot AI Chatbot ⭐
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ResultDashboard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx             # Homepage
│   │   ├── About.jsx
│   │   ├── Content.jsx          # Analyzer halaman utama
│   │   └── Contact.jsx
│   ├── utils/
│   │   └── riskCalculator.js    # Logic kalkulasi risiko
│   ├── App.jsx                  # Root component
│   ├── main.jsx
│   └── index.css
├── public/                      # Static assets
├── .env                         # Environment variables (jangan commit!)
├── .env.example                 # Template .env
├── tailwind.config.js           # Tailwind CSS config
├── vite.config.js               # Vite bundler config
├── CHATBOT_SETUP.md             # Dokumentasi ChatBot
└── README.md                    # Project documentation
```

## ✨ Fitur Utama

### 1. **Health Risk Analyzer**
   - Input data kesehatan: usia, berat, tinggi, tekanan darah, dll
   - Kalkulasi risiko penyakit secara real-time
   - Visualisasi hasil dengan chart

### 2. **Disease Information**
   - 9 penyakit kronis dengan penjelasan lengkap
   - Gejala, penyebab, pencegahan, dan pengobatan
   - Modal interaktif untuk setiap penyakit

### 3. **Fruits & Vegetables Guide**
   - 12 buah dan sayuran sehat
   - Nutrisi lengkap dan manfaat kesehatan
   - Tips konsumsi optimal

### 4. **VitaBot AI Chatbot** ⭐ **BARU**
   - Asisten AI powered by Gemini
   - Pertanyaan cepat (quick questions)
   - Markdown formatting untuk response
   - Available di semua halaman (floating button)

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build**: Vite
- **AI**: Google Gemini API

## 🔐 Security

- API keys tersimpan di `.env` (tidak di-track git)
- `.env` sudah ada di `.gitignore`
- `.env.example` tersedia sebagai template

**⚠️ PENTING**: Jangan commit file `.env` ke repository!

## 🌐 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Add environment variable: `VITE_GEMINI_API_KEY`
4. Deploy

### Netlify
1. Push code ke GitHub
2. Connect repository ke Netlify
3. Add environment variable
4. Deploy

### Manual Deploy
```bash
npm run build
# Upload `dist` folder ke hosting
```

## 🐛 Troubleshooting

### Dev server tidak jalan
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Tailwind classes tidak berlaku
- Restart dev server
- Check content path di `tailwind.config.js`

### ChatBot tidak respons
- Check API key di `.env`
- Restart dev server setelah edit `.env`
- Check browser console untuk error

Lihat [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) untuk troubleshooting ChatBot lebih detail.

## 📝 Notes

- Aplikasi menggunakan Vite (super cepat!)
- Tailwind CSS untuk styling
- Responsive design (mobile-first)
- ES6+ Modern JavaScript

## 📧 Support

Untuk bantuan lebih lanjut, cek dokumentasi spesifik:
- [Gemini API Docs](https://ai.google.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

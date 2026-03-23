# VitaBot Chatbot Setup Guide

## 📋 Persyaratan

- Node.js v14 atau lebih tinggi
- npm atau yarn
- Gemini API Key (gratis)

## 🔑 Setup API Key

### 1. Dapatkan Gemini API Key

1. Buka https://aistudio.google.com/apikey
2. Klik "Create API key" atau "Get API key"
3. Copy API key yang dihasilkan

### 2. Konfigurasi Environment Variable

1. Buka file `.env` di root project:
   ```bash
   VITE_GEMINI_API_KEY=AIzaSyCXGJh797QCNm2VQYIrdLvvecis39SgcDE
   ```

2. Ganti value dengan API key Anda

3. **PASTIKAN .env sudah di-ignore di git:**
   - File `.gitignore` sudah berisi `.env` ✅
   - File `.env.example` sudah tersedia untuk referensi ✅

### 3. Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
# atau
yarn dev
```

## 🧪 Testing Chatbot

1. Buka aplikasi di browser: `http://localhost:5173`
2. Klik tombol **VitaBot** (floating button di pojok kanan bawah)
3. Coba kirim pesan atau pilih quick question

## 🛡️ Keamanan

### Development Lokal
- ✅ API key ada di `.env` (aman, file tidak di-track git)
- ✅ `.env.example` tersedia sebagai template

### Sebelum Deploy ke Production
1. **Regenerate API Key** di https://aistudio.google.com/apikey
2. **Gunakan Secret Management** dari platform hosting:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Build & deploy → Environment
   - **Railway/Render**: Project settings → Environment

3. **Contoh setup di Vercel:**
   ```
   VITE_GEMINI_API_KEY = your_new_api_key
   ```

## 🚀 Fitur ChatBot

### Pesan Cepat (Quick Questions)
- "Apa itu BMI dan cara menghitungnya?"
- "Cara menurunkan berat badan yang efektif?"
- "Apa manfaat olahraga rutin?"
- "Rekomendasikan makanan sehat sehari-hari"

### Formatting Markdown
Chatbot mendukung format:
- **Bold**: `**teks**`
- *Italic*: `*teks*`
- `Code`: `` `teks` ``
- List dengan `-` atau `*`
- List bernomor `1. 2. 3.`
- Heading: `# H1` atau `## H2`

### Smart Features
- ✅ Auto-focus input saat chat dibuka
- ✅ Auto-scroll ke pesan terbaru
- ✅ Textarea auto-resize
- ✅ Shift+Enter untuk baris baru
- ✅ Loading indicator saat menunggu
- ✅ Error handling yang baik

## 🔧 Troubleshooting

### "API key belum dikonfigurasi"
1. Pastikan file `.env` ada di root project
2. Pastikan format: `VITE_GEMINI_API_KEY=your_key`
3. **Restart dev server** (ini sangat penting!)
4. Check console browser untuk error detail

### "Terjadi kesalahan: 401"
- API key tidak valid atau sudah tidak aktif
- Regenerate API key baru di https://aistudio.google.com/apikey

### "Terjadi kesalahan: 429"
- Rate limit tercapai (terlalu banyak request)
- Tunggu beberapa menit sebelum mencoba lagi

### Pesan tidak muncul/timeout
- Check koneksi internet
- Check browser console untuk error detail
- Pastikan gemini-2.5-flash model tersedia di region Anda

## 📚 Dokumentasi Tambahan

- [Gemini API Docs](https://ai.google.dev/docs)
- [Gemini Models](https://ai.google.dev/models/gemini-2-5-flash)
- [API Reference](https://ai.google.dev/api/generate-content)

## 🤝 Support

Jika ada masalah:
1. Check console browser (F12 → Console tab)
2. Check terminal dev server untuk error message
3. Pastikan semua requirement sudah terinstall dengan `npm install`

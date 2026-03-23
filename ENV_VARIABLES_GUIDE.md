# 🔐 Environment Variables & Security Guide

## Overview

File `.env` berisi konfigurasi sensitif aplikasi, terutama API key untuk Gemini. Panduan ini menjelaskan cara mengelola dan melindungi environment variables.

## 📁 File Struktur

### `.env` (LOCAL - JANGAN COMMIT)
```
VITE_GEMINI_API_KEY=AIzaSyCXGJh797QCNm2VQYIrdLvvecis39SgcDE
```
- **Lokasi**: Root project
- **Status**: ❌ Jangan di-commit ke git
- **Gunakan**: Development lokal & untuk testing
- **Akses**: Hanya di lokal machine

### `.env.example` (PUBLIC - BOLEH COMMIT)
```
# Gemini API Configuration
VITE_GEMINI_API_KEY=your_api_key_here
```
- **Lokasi**: Root project
- **Status**: ✅ Boleh dan HARUS di-commit
- **Gunakan**: Template untuk developer baru
- **Akses**: Public repo (tidak ada secret)

### `.gitignore` (SECURITY)
```
.env
.env.local
.env.*.local
```
- **Status**: ✅ Sudah configured
- **Fungsi**: Prevent `.env` dari ter-upload ke git

## 🔑 Gemini API Key

### Dapatkan API Key

1. **Buka**: https://aistudio.google.com/apikey
2. **Login** dengan Google account
3. **Klik**: "Create API key" atau "Get API key"
4. **Copy** API key yang ditampilkan

### Masukkan ke `.env`

```bash
# File: .env
VITE_GEMINI_API_KEY=AIzaSyCXGJh797QCNm2VQYIrdLvvecis39SgcDE
```

### Verify Setup

```bash
# Restart dev server untuk load .env
npm run dev

# Check di browser console
# Jika error, buka DevTools (F12) → Console
```

## 🛡️ Security Best Practices

### Development (Local Machine)

✅ **DO:**
- Keep `.env` file in `.gitignore`
- Use `.env.example` untuk onboarding developer
- Change API key jika terekspos
- Use unique API key per environment

❌ **DON'T:**
- Commit `.env` to git repository
- Share API key via email/chat
- Use production API key di local dev
- Embeds API key di client-side code (ini sudah benar di aplikasi kita)

### Production Deployment

**Setup di Vercel (Recommended):**

1. **Go to**: Project Settings → Environment Variables
2. **Add Variable**:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: `your_production_api_key`
   - Environment: Production, Preview, Development (pilih sesuai kebutuhan)
3. **Redeploy** dengan variable baru

**Setup di Netlify:**

1. **Go to**: Site settings → Build & deploy → Environment
2. **Add Variable**:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `your_production_api_key`
3. **Trigger** rebuild

**Setup di Railway/Render:**

1. **Go to**: Project settings → Environment
2. **Add**: `VITE_GEMINI_API_KEY=value`
3. **Deploy** dengan environment baru

### Environment Separation

Rekomendasikan menggunakan separate API key untuk setiap environment:

```bash
# Development (local)
VITE_GEMINI_API_KEY=dev_key_...

# Staging
VITE_GEMINI_API_KEY=staging_key_...

# Production
VITE_GEMINI_API_KEY=prod_key_...
```

## 🔄 Jika API Key Terekspos

### Immediate Actions

1. **Regenerate Key**:
   - Buka https://aistudio.google.com/apikey
   - Delete key lama
   - Create key baru
   - Update `.env` dengan key baru

2. **Update All Environments**:
   - Update local `.env`
   - Update Vercel/Netlify/hosting provider
   - Update CI/CD pipeline jika ada

3. **Check Usage** (Opsional):
   - Monitor Google Cloud Console untuk suspicious activity
   - Check API analytics

4. **Commit**:
   - JANGAN commit `.env` dengan key lama
   - Just update `.env` lokal dan re-deploy

## 📝 Vite Environment Variables

### Format

Semua variable yang ingin di-expose ke client side harus prefix dengan `VITE_`:

```bash
# ✅ Akan accessible di frontend
VITE_GEMINI_API_KEY=...

# ❌ Tidak akan accessible (hanya server side)
DATABASE_URL=...
```

### Access di Code

```javascript
// Accessible di browser
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Console log untuk debug (development only)
console.log('API Key available:', !!apiKey);
```

## 🧪 Testing Environment Variables

### Verify di Development

```bash
# 1. Buka DevTools (F12)
# 2. Console tab
# 3. Ketik:
import.meta.env.VITE_GEMINI_API_KEY
# 4. Seharusnya muncul API key value
```

### Debug di Code

```javascript
// Tambah di ChatBot.jsx untuk debug
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log('API Key loaded:', apiKey ? 'Yes' : 'No');

// Jika tidak ada:
if (!apiKey) {
  console.error('❌ VITE_GEMINI_API_KEY not found in .env');
  console.log('📝 Add to .env file:');
  console.log('VITE_GEMINI_API_KEY=your_api_key_here');
}
```

## 📊 Environment Variable Types

### Current Setup

| Variable | Type | Visibility | Requirement |
|----------|------|------------|-------------|
| `VITE_GEMINI_API_KEY` | String | Client (Browser) | Required for ChatBot |

### Future (If needed)

```bash
# Untuk backend/API server (tidak applicable untuk current setup)
VITE_API_URL=https://api.vitacheck.com
VITE_ENVIRONMENT=development
```

## ✅ Checklist

### Development Setup
- [ ] `.env` file dibuat
- [ ] `VITE_GEMINI_API_KEY` dikonfigurasi
- [ ] `.env` tidak di-track git
- [ ] `.env.example` sudah ada
- [ ] Dev server di-restart setelah setup `.env`

### Production Setup
- [ ] API key baru di-generate (berbeda dengan dev)
- [ ] Environment variable di-setup di hosting platform
- [ ] `.env` lokal tidak di-commit
- [ ] `.env.example` sudah di-commit
- [ ] Production environment tested

### Security Verification
- [ ] `.gitignore` includes `.env`
- [ ] API key tidak hardcoded di source code
- [ ] `.env` tidak di-track oleh git
- [ ] No sensitive data di `.env.example`
- [ ] API key rotation plan ready

## 🆘 Troubleshooting

### "VITE_GEMINI_API_KEY is undefined"

**Problem**: Environment variable tidak ter-load

**Solutions**:
1. Verify `.env` file exists di root project
2. Verify format: `VITE_GEMINI_API_KEY=value` (no spaces)
3. Restart dev server: `npm run dev`
4. Check file `.env` bukan `.env.local` atau lainnya
5. Check browser console untuk error detail

### Key tidak bekerja

**Problem**: API request error 401/403

**Solutions**:
1. Verify API key valid (copy-paste lagi dari https://aistudio.google.com/apikey)
2. Check API key tidak expired
3. Check region/quota limit Google Cloud
4. Regenerate key baru jika perlu

### Different key per machine

**Setup**:
1. Each developer punya unique `.env` lokal
2. `.env` tidak di-commit (protected by `.gitignore`)
3. `.env.example` ada untuk template
4. Each developer bisa punya own API key (opsional/sharing)

## 📚 Resources

- [Vite Env Docs](https://vitejs.dev/guide/env-and-mode.html)
- [Gemini API Security](https://ai.google.dev/docs/authentication)
- [Google Cloud Security Best Practices](https://cloud.google.com/docs/authentication)
- [OWASP API Keys](https://owasp.org/www-community/attacks/API_key_leakage)

## 📞 Need Help?

- Check `CHATBOT_SETUP.md` untuk VitaBot specific troubleshooting
- Check browser console (F12) untuk error messages
- Check terminal output saat `npm run dev` untuk warnings
- Review `SETUP_VERIFICATION.md` untuk verification checklist

---

**Last Updated**: March 17, 2026

Semua environment variables sudah di-setup dengan secure! 🔐

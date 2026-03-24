# VitaCheck - Health Risk Analyzer

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.5-success?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/anggisaputra-23/vitacheck)

Interactive web application for comprehensive health risk assessment and analysis.

> **Know Your Health Risk in Minutes** - VitaCheck provides personalized health risk analysis powered by AI analytics and professional health assessment algorithms.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Calculation Logic](#calculation-logic)
- [Design System](#design-system)
- [Contributing](#contributing)
- [License](#license)

## Description

VitaCheck adalah aplikasi web modern yang dirancang untuk memberikan analisis risiko kesehatan yang komprehensif dan interaktif. Dengan menggunakan teknologi terdepan, VitaCheck membantu pengguna memahami faktor risiko kesehatan mereka dan memberikan rekomendasi personal yang dapat ditindaklanjuti.

> **Disclaimer**: VitaCheck adalah alat edukasi dan informasi. Bukan pengganti untuk diagnosis medis profesional. Selalu konsultasikan dengan profesional kesehatan untuk kekhawatiran kesehatan apa pun.

## Quick Start

### Prerequisites
- **Node.js** v18.8.0 or higher
- **npm** or **yarn** package manager

### Setup (3 Steps)

```bash
# 1. Clone the repository
git clone https://github.com/anggisaputra-23/vitacheck.git
cd vitacheck

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Server runs at `http://localhost:5173/`

[Full installation guide](#getting-started)

## Features

- **Smart Health Risk Assessment** - Comprehensive evaluation of health factors including BMI, lifestyle, family history, and sleep patterns
- **Interactive Dashboard** - Beautiful data visualization using Recharts with pie and radar charts
- **Personalized Recommendations** - Customized health recommendations based on user profile
- **Lifestyle Simulation** - "What If" feature to simulate lifestyle changes impact on risk score
- **Fully Responsive** - Mobile-first design optimized for all devices
- **Smooth Animations** - Lightweight animations for enhanced user experience
- **Modern UI** - Professional design with Tailwind CSS (primary blue and secondary green colors)
- **AI Chatbot** - Interactive chatbot for health-related inquiries

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend Framework | React 18 |
| Build Tool | Vite 4.5.0 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 6.20.0 |
| Charts | Recharts |
| Typography | Poppins & Inter (Google Fonts) |
| Language | JavaScript (JSX) |

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              Navigation
│   ├── Footer.jsx              Footer with disclaimer
│   ├── Hero.jsx                Hero section
│   ├── AnalyzerForm.jsx        Health analysis form
│   ├── ResultDashboard.jsx     Results dashboard
│   ├── ConsultationSection.jsx Consultation section
│   ├── ChatBot.jsx             AI chatbot
│   └── Charts.jsx              Data visualization
├── pages/
│   ├── Home.jsx                Homepage
│   ├── About.jsx               About page
│   ├── Content.jsx             Analyzer page
│   └── Contact.jsx             Contact & FAQ
├── utils/
│   └── riskCalculator.js       Health risk calculation logic
├── App.jsx                     Main app with routing
├── App.css                     Custom styles
├── index.css                   Global styles
└── main.jsx                    Entry point

public/
├── images/                     Image assets
│   ├── analisis.png
│   ├── awal.png
│   ├── dokter.png
│   ├── dokterku.jpg
│   ├── kerangka.png
│   ├── medical-pattern.png
│   └── vita.png
└── videos/                     Video assets
    └── vita-animate.mp4
```

## Getting Started

### Prerequisites

- Node.js v18.8.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or open the project:**
```bash
git clone https://github.com/anggisaputra-23/vitacheck.git
cd vitacheck
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup Environment Variables:**
```bash
# Copy .env.example to .env (if exists)
cp .env.example .env

# Edit .env and add Gemini API Key:
VITE_GEMINI_API_KEY=your_api_key_here
```

**To get Gemini API Key:**
- Visit https://aistudio.google.com/apikey
- Login with Google account
- Click "Create API key"
- Copy and paste the key into .env file

> **Note**: `.env` is ignored in `.gitignore` for security

4. **Run development server:**
```bash
npm run dev
```
Server runs at `http://localhost:5173/`

5. **Build for production:**
```bash
npm run build
```

6. **Preview production build:**
```bash
npm run preview
```

## Pages & Features

### Home Page (`/`)
- Hero section with headline "Know Your Health Risk in Minutes"
- Feature cards highlighting key benefits
- How It Works section with 3-step process
- Call-to-action section
- Statistics section
- Medical disclaimer footer

### About Page (`/about`)
- Problem statement on health awareness
- Solution overview
- Vision and mission statements
- Core values: Accuracy, Privacy, Transparency, Empowerment

### Analyzer Page (`/content`) - Main Feature
  
**Input Form:**
- Full Name
- Age (18-120 years)
- Gender (Male/Female/Other)
- Weight (kg)
- Height (cm)
- Daily Sleep Duration (hours)
- Smoking Status
- Exercise Frequency
- Family History of Chronic Disease

**Results Dashboard:**
- Risk Level Card with color gradient
- BMI Result and Status
- Total Risk Score with animation
- BMI Composition Pie Chart
- Lifestyle Factors Radar Chart
- Risk Score Breakdown with progress bars
- Personalized Health Recommendations
- Lifestyle Simulation ("What If" scenario)
- Medical disclaimer

### Contact Page (`/contact`)
- Contact form (Name, Email, Message)
- Contact information
- Social media links
- FAQ section (6 common questions)

## Calculation Logic

### BMI Formula
```
BMI = weight(kg) / (height(m) × height(m))

Categories:
├─ < 18.5       → Underweight
├─ 18.5 - 24.9  → Normal
├─ 25 - 29.9    → Overweight
└─ >= 30        → Obese
```

### Risk Scoring System
```
Component Scores:
├─ Overweight (BMI 25-29.9)   → +2 points
├─ Obese (BMI >= 30)          → +4 points
├─ Smoking                    → +3 points
├─ Rare exercise              → +2 points
├─ Age > 40                   → +2 points
├─ Family history             → +3 points
└─ Sleep < 6 hours            → +2 points

Risk Levels:
├─ 0-3   → Low Risk (Green)
├─ 4-7   → Medium Risk (Yellow)
└─ 8+    → High Risk (Red)
```

## Design System

### Color Palette
```
Primary Blue:    #1E88E5 - Used for main buttons and links
Secondary Green: #43A047 - Used for positive status indicators
White:           #FFFFFF - Main background
Light Gray:      #F9FAFB - Secondary background
Dark Gray:       #1F2937 - Text & borders
```

### Typography
- **Font Family**: Poppins, Inter
- **Headings**: Bold (600-700 weight)
- **Body**: Regular (400 weight)

### Components
- **Card Layout**: rounded corners with subtle shadows
- **Buttons**: rounded with hover effects
- **Forms**: clean inputs with focus ring styling
- **Spacing**: Consistent Tailwind spacing values

## Special Features

- Form validation with error messages
- Loading animation during analysis
- Counter animation for risk score
- Mobile-first responsive design
- Interactive charts with Recharts
- Smooth page transitions
- Accessibility considerations

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Requirements Fulfilled

- React Router for navigation (4 required pages: Home, About, Content, Contact)
- Component-based architecture with reusable components
- Separated calculation logic in utilities
- Data visualization with Recharts (Pie Chart & Radar Chart)
- Smooth animations and transitions
- Primary colors: Blue (#1E88E5) and Green (#43A047)
- Modern typography: Poppins and Inter
- Responsive design with Tailwind CSS
- Medical disclaimers on relevant pages
- Clean and professional UI/UX

## Troubleshooting

### Dev Server Not Running
- Ensure Node.js v18.8.0 or higher is installed
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then reinstall

### Styling Not Applied
- Restart the dev server
- Clear browser cache
- Verify Tailwind CSS configuration in `tailwind.config.js`

### Charts Not Displaying
- Ensure Recharts is installed: `npm install recharts`
- Check browser console for error messages

## Performance Optimization

- Production builds optimized with Vite
- Automatic code splitting for route-based chunks
- Image optimization with modern formats
- Lazy loading for heavy components
- Efficient asset loading

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate comments.

## License

Educational project for demonstration purposes. MIT License.

## Support & Contact

For questions or issues:
- Use the Contact page in the application
- [Report issues on GitHub](https://github.com/anggisaputra-23/vitacheck/issues)
- Star this repository if you found it helpful

---

**Developer**: Anggis Aputra  
**Repository**: https://github.com/anggisaputra-23/vitacheck  
**Last Updated**: March 2026


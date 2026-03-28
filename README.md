# 🎂 Birthday Landing Page - AR & AI Edition

A premium, highly interactive birthday landing page designed specifically for mobile devices. This project combines modern web technologies with Augmented Reality (AR) and Artificial Intelligence (AI) to create a truly memorable digital birthday experience.

## ✨ Key Features

- **📸 AR Selfie Party**: Capture fun moments with interactive AR stickers (balloons, party hats, and gifts) directly in your browser.
- **🤖 AI Birthday Bot**: Meet "Abdul Bot," an intelligent AI chatbot powered by Google's Gemini API, ready to chat and celebrate with you.
- **🎮 Gift Catcher Game**: An addictive mini-game to catch falling gifts and collect points.
- **🎫 Digital Scratch Card**: Scratch to reveal special birthday surprises or hidden messages.
- **🕯️ Interactive Birthday Cake**: A beautiful digital cake for that "blow the candle" moment.
- **🎵 Ambient Music Player**: Curated background music to set the perfect celebratory mood.
- **📸 Photo Gallery**: A sleek, masonry-style gallery to showcase precious memories.
- **💌 Wishes Board**: A dedicated space for heartfelt birthday messages.

## 🚀 Technologies Used

- **Core**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) (Lightning fast HMR)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/)
- **Styling**: Vanilla CSS (Custom Glassmorphism and Modern UI Patterns)
- **AR Logic**: MediaDevices API & Canvas API for real-time video processing

## 🛠️ Setup & Installation

Follow these steps to get the project running locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dzakiudin/Birthday-landing-page-mobile.git
   cd Birthday-landing-page-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   *Reference `.env.example` for the required format.*

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in your browser**:
   Navigate to `http://localhost:5173`. For the best experience, use **Chrome DevTools Mobile View** or open the link on your mobile device (via local network).

## 📁 Project Structure

```text
src/
├── assets/             # Images, icons, and audio files
├── components/         # Modular React components (Hero, Game, AR, AI, etc.)
│   ├── ARPartyHat      # AR Selfie functionality
│   ├── AbdulBot        # AI Chatbot integration
│   ├── GiftCatcher     # Mini-game logic
│   └── ...
├── App.tsx             # Main application entry point
└── index.css           # Global design tokens and base styles
```

## 🔒 Security Note

Environment variables (like API keys) are strictly excluded from version control via `.gitignore`. Always use the `.env.example` template when sharing or deploying the project.

---

Created with ❤️ by **Dzakiudin**

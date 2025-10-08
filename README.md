# AI Wardrobe Manager

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-blue" alt="React Version" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-blue" alt="TypeScript Version" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-purple" alt="Vite Version" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-cyan" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Google%20Gemini-AI-orange" alt="Google Gemini AI" />
</div>

<br>

A modern, AI-powered wardrobe management application that helps you organize your clothing items and get personalized outfit recommendations. Upload photos of your clothes, and let AI categorize them automatically, then get smart outfit suggestions based on your wardrobe and weather conditions.

## ✨ Features

- **📸 Smart Image Analysis**: Upload clothing photos and let AI automatically categorize and name your items
- **👗 Intelligent Categorization**: AI-powered classification into tops, bottoms, outerwear, footwear, accessories, and dresses
- **🎯 Personalized Outfit Recommendations**: Get AI-generated outfit suggestions based on your wardrobe and occasion
- **🌤️ Weather-Aware Suggestions**: Optional weather integration for contextually appropriate outfit recommendations
- **🔐 User Authentication**: Secure login/signup with session management
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **⚡ Fast & Modern**: Built with React 19, TypeScript, and Vite for optimal performance

## 🚀 Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.8.2** - Type-safe development
- **Vite 6.2.0** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Google Gemini AI** - Advanced AI for image analysis and recommendations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **Local Storage** - Client-side data persistence

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HARS23/ai-wardrobe-manager.git
   cd ai-wardrobe-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get your Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create a new project
   - Generate an API key
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Getting Started
1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Add Items**: Click "Add Item" and upload photos of your clothing
3. **AI Analysis**: The AI will automatically categorize and name your items
4. **Get Recommendations**: Click "Get Outfit Idea" to receive personalized suggestions
5. **Weather Integration**: Optionally use your location for weather-aware recommendations

### Features in Detail

#### 📸 Adding Clothing Items
- Upload high-quality photos of your clothing
- AI automatically detects and categorizes items
- Manual editing of AI-generated names and categories
- Organized storage by user account

#### 🎨 Outfit Recommendations
- Describe your occasion or style preference
- AI analyzes your wardrobe and suggests complete outfits
- Optional weather integration for contextual suggestions
- Detailed reasoning for each recommendation

#### 👤 User Management
- Secure authentication system
- Session-based login persistence
- User-specific wardrobe storage
- Easy logout functionality

## 🏗️ Project Structure

```
ai-wardrobe-manager/
├── components/           # React components
│   ├── icons/           # Custom SVG icons
│   ├── AddItemModal.tsx # Item upload modal
│   ├── OutfitModal.tsx  # Outfit recommendation modal
│   ├── WardrobeGrid.tsx # Main wardrobe display
│   └── ...
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
├── hooks/               # Custom React hooks
│   └── useWardrobe.ts   # Wardrobe management logic
├── services/            # External service integrations
│   └── geminiService.ts # Google Gemini AI integration
├── types.ts             # TypeScript type definitions
├── constants.ts         # Application constants
└── blog-backend/        # Express.js backend (optional)
```

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Clean separation of logic and presentation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add your `VITE_GEMINI_API_KEY` environment variable
3. Deploy automatically on every push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variable: `VITE_GEMINI_API_KEY`

### Manual Deployment
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🔒 Security Notes

- **API Key Protection**: Never commit your Gemini API key to version control
- **Environment Variables**: Use `.env.local` for local development
- **Client-Side Storage**: User data is stored locally in the browser
- **Authentication**: Session-based auth with secure token handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful image analysis capabilities
- **React Team** for the amazing framework
- **TailwindCSS** for the beautiful utility classes
- **Vite Team** for the lightning-fast build tool

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-wardrobe-manager/issues) page
2. Create a new issue with detailed information
3. Contact: [your-email@example.com]

---

<div align="center">
  <p>Made with ❤️ and AI</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
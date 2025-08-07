# TendriZ AI - Full-Stack ChatBot Service

A modern, full-stack AI chatbot application featuring a responsive web frontend and a Flask backend powered by Google's Gemini API. The backend is deployed on Replit for seamless cloud hosting and real-time AI conversations with persistent chat history.

![TendriZ AI](https://img.shields.io/badge/AI-Chatbot-blue)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Gemini API](https://img.shields.io/badge/Gemini-API-orange)
![Replit](https://img.shields.io/badge/Replit-667881?logo=replit&logoColor=white)

## ✨ Features

### Frontend
- **Modern Responsive UI**: Clean design optimized for all devices
- **Real-time Messaging**: Instant chat interface with smooth animations
- **Persistent Chat History**: Conversations saved locally using localStorage
- **Session Management**: Unique session IDs for conversation continuity
- **Mobile Optimized**: Touch-friendly interface with proper viewport handling
- **Loading Indicators**: Visual feedback during AI processing

### Backend
- **Flask RESTful API**: Robust backend with proper CORS handling
- **Conversation Memory**: Server-side session management for context awareness
- **Environment Security**: API keys stored securely in environment variables
- **Error Handling**: Comprehensive error management and logging
- **Cloud Deployment**: Hosted on Replit for 24/7 availability

## 🚀 Live Demo

- **Frontend**: Deploy to GitHub Pages or any static hosting
- **Backend**: Currently running on Replit at `https://39ce7961-2181-494f-95cd-cca1e2dd7af1-00-k7zwjwdwq87j.pike.replit.dev:5000`

## 📋 Prerequisites

- Python 3.7+
- Modern web browser
- Google Gemini API key
- Replit account (for backend deployment)

## 🛠️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/TendriZ-AI.git
cd TendriZ-AI
```

### 2. Backend Setup

#### Local Development
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create environment file
echo "API_KEY=your_gemini_api_key_here" > .env

# Run the Flask server
python main.py
```

#### Replit Deployment
1. **Create new Repl**: Import from GitHub or upload files
2. **Set Environment Variable**: 
   - Go to Replit Secrets
   - Add `API_KEY` with your Gemini API key
3. **Install Dependencies**: 
   ```bash
   pip install -r requirements.txt
   ```
4. **Run**: Click the Run button or use `python main.py`

### 3. Frontend Setup

#### Update Backend URL
In `script.js`, update the fetch URL to your Replit backend:
```javascript
const response = await fetch('YOUR_REPLIT_BACKEND_URL/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        message: message,
        session_id: sessionId
    })
});
```

#### Deploy Frontend
- **GitHub Pages**: Push to repository, enable GitHub Pages
- **Netlify/Vercel**: Connect repository for automatic deployments
- **Local**: Open `index.html` in browser

## 🔧 Configuration

### Getting Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create new project and generate API key
3. Add to `.env` file or Replit Secrets

### CORS Configuration
The backend is configured for multiple origins:
```python
CORS(app, origins=[
    "https://yourusername.github.io",  # Your GitHub Pages
    "https://*.github.io",             # All GitHub Pages
    "http://localhost:*",              # Local development
    "https://localhost:*"              # Local HTTPS
])
```

Update the origins list in `backend/main.py` with your actual frontend URL.

## 📁 Project Structure

```
TendriZ-AI/
├── frontend/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Responsive styling
│   └── script.js           # Frontend logic & API calls
├── backend/
│   ├── main.py             # Flask server & API endpoints
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables (git-ignored)
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## 🔍 API Endpoints

### `POST /chat`
Send message to AI and receive response
```json
{
  "message": "Hello, how are you?",
  "session_id": "session_12345"
}
```

**Response:**
```json
{
  "response": "Hello! I'm doing well, thank you for asking. How can I help you today?"
}
```

### `POST /clear`
Clear conversation history for a session
```json
{
  "session_id": "session_12345"
}
```

### `GET /`, `/style.css`, `/script.js`
Serve static frontend files

## 💡 Usage

### Starting a Conversation
1. Open the frontend in your browser
2. Type your message and press Enter or click Send
3. Watch TendriZ AI respond with contextual awareness
4. Use the Clear button to start a new conversation

### Session Management
- Each browser session gets a unique session ID
- Conversations are maintained server-side for context
- Chat history persists locally for user convenience

### Example API Usage
```javascript
// Send message to backend
const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        message: "Explain quantum computing",
        session_id: "user_session_123"
    })
});

const data = await response.json();
console.log(data.response);
```

## 🔒 Security Features

### Environment Variables
- API keys stored in `.env` files (git-ignored)
- Replit Secrets for production deployment
- No hardcoded sensitive information

### CORS Protection
- Specific origin allowlisting
- Preflight request handling
- Secure credential management

### Input Validation
- Message content sanitization
- Session ID validation
- Error boundary implementation

## 🐛 Troubleshooting

### Common Issues

#### Backend Connection Failed
```
⚠️ Cannot connect to server. Please check if the backend is running.
```
**Solutions:**
- Verify Replit is running and accessible
- Check CORS configuration for your domain
- Ensure API key is properly set in environment

#### API Rate Limiting
```
Server error: 429 Too Many Requests
```
**Solutions:**
- Check Gemini API quota usage
- Implement request throttling
- Wait before retrying requests

#### Session Not Persisting
**Solutions:**
- Check localStorage is enabled
- Verify session ID generation
- Clear browser cache and restart

### Development Tips

#### Local Testing
```bash
# Backend
cd backend && python main.py

# Frontend - serve with Python
python -m http.server 8000

# Or use Live Server extension in VS Code
```

#### Debug Mode
Enable Flask debug mode for development:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

## 🌟 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use meaningful commit messages
- Test both frontend and backend changes
- Update documentation for new features

## 📊 Architecture Overview

```
┌─────────────────┐    HTTP/HTTPS    ┌──────────────────┐
│   Frontend      │ ────────────────→ │   Flask Backend  │
│   (Browser)     │                   │   (Replit)       │
├─────────────────┤                   ├──────────────────┤
│ • HTML/CSS/JS   │                   │ • Session Mgmt   │
│ • localStorage  │                   │ • API Proxy      │
│ • Session UI    │                   │ • CORS Handling  │
└─────────────────┘                   └──────────────────┘
                                               │
                                              │ HTTPS
                                              ▼
                                      ┌──────────────────┐
                                      │   Gemini API     │
                                      │   (Google)       │
                                      └──────────────────┘
```

## 📄 Environment File Example

Create `backend/.env`:
```env
# Gemini API Configuration
API_KEY=AIzaSyDwWbl8oVKI24QFmX6HX31ZVIgrEiX3XUU

# Optional: Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

## 🤝 Support & Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/TendriZ-AI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/TendriZ-AI/discussions)
- **Wiki**: [Project Wiki](https://github.com/yourusername/TendriZ-AI/wiki)

## 📈 Roadmap

### Current Features ✅
- Basic chat functionality with Gemini AI
- Session-based conversation memory
- Flask backend deployed on Replit
- Mobile-responsive design
- Local chat history persistence

### Next Improvements 🔄
- [ ] Better error handling and retry logic
- [ ] Message formatting (markdown support)
- [ ] Dark/light theme toggle
- [ ] Conversation export feature
- [ ] Simple user preferences storage

### Future Ideas 💭
- [ ] File upload for document questions
- [ ] Basic user authentication
- [ ] Conversation sharing links
- [ ] Simple analytics (message count, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini API** for advanced AI capabilities
- **Replit** for seamless cloud deployment
- **Flask Community** for the excellent web framework
- **Open Source Community** for inspiration and tools

## 📞 Contact

- **GitHub**: [@TendriZ](https://github.com/tendriZ)
- **Email**: rakarazzani24@gmail.com
- **Website**: soon




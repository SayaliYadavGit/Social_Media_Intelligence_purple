# 🚀 Social Command Center

AI-powered social media intelligence platform that provides instant insights, campaign analysis, and content recommendations using GPT-4o-mini and RAG.

## ✨ Features

- 💬 Natural language queries about social media performance
- 📊 Real-time campaign analysis with performance trends
- 🎯 Data-driven content recommendations
- 🏆 Industry benchmark comparisons
- ✍️ AI-generated post ideas
- 📈 Multi-platform performance tracking

## 🏗️ Architecture
```
Frontend (React + Vite)
    ↓ REST API
Backend (Express + Node.js)
    ↓ LangChain
RAG System (ChromaDB + OpenAI Embeddings)
    ↓ Query
OpenAI GPT-4o-mini
```

## 📋 Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Quick Start

### 1. Clone and Install
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment
```bash
# In server folder
cp .env.example .env
# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-...
```

### 3. Run the Application
```bash
# Terminal 1 - Start backend (from server folder)
cd server
npm start

# Terminal 2 - Start frontend (from client folder)
cd client
npm run dev
```

### 4. Open Application

Navigate to `http://localhost:3000` in your browser

## 📁 Project Structure
```
social-command-center/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── api/          # API client
│   │   ├── config.js     # ✏️ Customizable settings
│   │   └── App.jsx
│   └── package.json
│
├── server/                # Node.js backend
│   ├── routes/           # API endpoints
│   ├── langchain/        # AI logic
│   │   ├── chains.js    # ✏️ Prompt templates
│   │   ├── config.js    # ✏️ Domain settings
│   │   └── vectorStore.js
│   ├── data/            # Sample data
│   └── package.json
│
└── README.md
```

## 🎨 Customization

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for detailed instructions on:
- Changing AI behavior and prompts
- Modifying UI colors and branding
- Adding new platforms and metrics
- Adjusting RAG settings

## 🧪 Testing

Try these sample queries:

1. **Performance Analysis**: "Compare Instagram vs LinkedIn performance this quarter"
2. **Trend Diagnosis**: "Why did our engagement drop 30% last week?"
3. **Content Creation**: "Draft 5 post ideas for our product launch"
4. **Strategic Insights**: "Top 3 performing content themes this month"
5. **Executive Summary**: "Generate weekly performance summary for CMO"

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in server/.env
PORT=5001
```

### API Key Error
- Verify `.env` file exists in `server/` folder
- Check API key format: `OPENAI_API_KEY=sk-...`
- Ensure no spaces around `=`

### Documents Not Loading
- Check `server/data/` folder exists
- Verify JSON files are valid
- Check server console for loading errors

### Frontend Can't Connect to Backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS settings in `server/index.js`
- Verify proxy in `client/vite.config.js`

## 📊 Performance

- Frontend load: < 2 seconds
- API response: < 8 seconds
- Concurrent requests: Supported
- RAG retrieval: ~1-2 seconds

## 🔐 Security Notes

- Never commit `.env` files
- Keep API keys secure
- Use environment variables for all secrets
- Review OpenAI usage limits

## 📚 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: LangChain, OpenAI GPT-4o-mini
- **Vector DB**: ChromaDB (in-memory)
- **Embeddings**: text-embedding-3-small

## 🎓 Educational Use

This project is designed for class demonstrations of:
- Full-stack AI application development
- RAG (Retrieval Augmented Generation)
- LangChain integration
- Modern React patterns
- RESTful API design

## 📝 License

MIT License - Free for educational use

## 🙋 Support

For issues or questions:
1. Check troubleshooting section
2. Review console logs
3. Verify environment setup
4. Check OpenAI API status
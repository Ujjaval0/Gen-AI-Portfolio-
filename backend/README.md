# LangChain Chatbot Backend

A standalone FastAPI + LangChain 1.0 chatbot backend for Ujjaval's AI Engineer Portfolio.

## Features

- 🤖 **LangChain 1.0** with ConversationChain for context-aware responses
- ⚡ **Dual LLM Strategy**: Groq (primary) + OpenRouter (fallback)
- 💾 **Session-based Memory**: In-memory conversation history (cleared on refresh)
- 🚀 **FastAPI**: High-performance async API
- 🌐 **CORS Enabled**: Works with any frontend
- 📊 **Token Tracking**: Monitor usage per conversation
- 🏥 **Health Checks**: Built-in monitoring endpoints

## Tech Stack

- **Framework**: FastAPI 0.115.0
- **LLM Integration**: LangChain 0.3.13
- **Primary LLM**: Groq (llama-3.3-70b-versatile)
- **Fallback LLM**: OpenRouter (qwen/qwen-2.5-72b-instruct:free)
- **Memory**: LangChain ConversationBufferMemory
- **Server**: Uvicorn

## Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env and add your API keys
```

Required environment variables:
- `GROQ_API_KEY` - Get from https://console.groq.com
- `OPENROUTER_API_KEY` - Get from https://openrouter.ai/keys
- `FRONTEND_URL` - Your frontend URL (default: http://localhost:5173)

### 3. Run the Server

```bash
uvicorn main:app --reload --port 8000
```

Server will start at `http://localhost:8000`

### 4. Test the API

**Health Check**:
```bash
curl http://localhost:8000/health
```

**Send a Message**:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are Ujjaval'\''s main skills?",
    "sessionId": "test-123"
  }'
```

## API Endpoints

### `GET /health`
Check API health and configuration status.

### `POST /chat`
Send a message and get AI response.

**Request**:
```json
{
  "message": "Tell me about Ujjaval's experience",
  "sessionId": "unique-session-id"
}
```

**Response**:
```json
{
  "response": "Ujjaval is an AI Engineer...",
  "provider": "Groq",
  "tokensUsed": 127,
  "sessionId": "unique-session-id"
}
```

### `GET /stats`
Get API statistics (active sessions, LLM availability).

## Deployment

### Railway

1. Push code to GitHub
2. Create new project on Railway
3. Connect GitHub repository
4. Add environment variables
5. Deploy automatically

### Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Architecture

```
Frontend (React)
    ↓
FastAPI Backend
    ↓
Session Manager (in-memory)
    ↓
LangChain ConversationChain
    ↓
Groq LLM (primary) → OpenRouter (fallback)
```

## Session Management

- **Session ID**: Generated client-side using UUID
- **Memory**: ConversationBufferMemory per session
- **Persistence**: In-memory only (cleared on server restart)
- **Cleanup**: Auto-remove sessions inactive for 60 minutes
- **Refresh Behavior**: New session ID = fresh conversation

## Documentation

- [API Documentation](API_DOCUMENTATION.md) - Full API reference
- [Deployment Guide](DEPLOYMENT.md) - Deploy to Railway/Render

## Development

### Project Structure

```
backend/
├── main.py                 # FastAPI application
├── llm_config.py          # LLM initialization
├── session_manager.py     # Session storage
├── chat_handler.py        # Chat processing logic
├── requirements.txt       # Dependencies
├── .env.example          # Environment template
├── Procfile              # Deployment command
├── runtime.txt           # Python version
├── railway.json          # Railway config
└── render.yaml           # Render config
```

### Adding New Features

1. **New LLM Provider**: Add to `llm_config.py`
2. **Custom Memory**: Modify `session_manager.py`
3. **New Endpoints**: Add to `main.py`

## Troubleshooting

### Dependencies Not Installing
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### CORS Errors
Check `FRONTEND_URL` in `.env` matches your frontend domain.

### LLM Not Responding
- Verify API keys in `.env`
- Check `/health` endpoint
- Review server logs

## License

MIT

## Author

Ujjaval Bhardwaj - AI Engineer

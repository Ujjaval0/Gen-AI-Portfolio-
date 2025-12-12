# API Documentation

## Base URL
- **Local**: `http://localhost:8000`
- **Production**: `https://your-backend.railway.app` or `https://your-backend.onrender.com`

---

## Endpoints

### 1. Root
**GET** `/`

Returns API information.

**Response**:
```json
{
  "message": "Ujjaval's AI Assistant API",
  "status": "running",
  "docs": "/docs"
}
```

---

### 2. Health Check
**GET** `/health`

Check API health and configuration status.

**Response**:
```json
{
  "status": "healthy",
  "groq_configured": true,
  "openrouter_configured": true,
  "active_sessions": 5
}
```

**Fields**:
- `status`: Always "healthy" if API is running
- `groq_configured`: Whether Groq API key is set
- `openrouter_configured`: Whether OpenRouter API key is set
- `active_sessions`: Number of active conversation sessions

---

### 3. Chat
**POST** `/chat`

Send a message and get AI response with conversation memory.

**Request Body**:
```json
{
  "message": "What are Ujjaval's main skills?",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Fields**:
- `message` (required): User's message text
- `sessionId` (required): UUID for session tracking
- `conversationHistory` (optional): Deprecated, kept for backward compatibility

**Response**:
```json
{
  "response": "Ujjaval specializes in:\n• Multi-agent orchestration with LangChain, LangGraph\n• RAG pipelines and vector databases\n• Production AI deployment with FastAPI, Docker\n• Evaluation frameworks for AI systems",
  "provider": "Groq",
  "tokensUsed": 127,
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Fields**:
- `response`: AI-generated response
- `provider`: Which LLM was used ("Groq", "OpenRouter", or "fallback")
- `tokensUsed`: Number of tokens consumed
- `sessionId`: Echo of request session ID

**Error Responses**:

400 Bad Request:
```json
{
  "detail": "Message cannot be empty"
}
```

500 Internal Server Error:
```json
{
  "detail": "An error occurred processing your message"
}
```

---

### 4. Statistics
**GET** `/stats`

Get API usage statistics.

**Response**:
```json
{
  "groq_available": true,
  "openrouter_available": true,
  "active_sessions": 3
}
```

---

## Session Management

### How Sessions Work
1. **Client generates UUID**: Frontend creates a unique session ID using `crypto.randomUUID()`
2. **Session persists**: All messages with same session ID maintain conversation context
3. **Memory cleared on refresh**: New page load = new session ID = fresh conversation
4. **Auto cleanup**: Sessions inactive for 60 minutes are automatically removed

### Example Session Flow
```javascript
// Frontend generates session ID once
const sessionId = crypto.randomUUID(); // "550e8400-e29b-41d4-a716-446655440000"

// First message
POST /chat
{
  "message": "What does Ujjaval do?",
  "sessionId": sessionId
}

// Second message - remembers context
POST /chat
{
  "message": "What technologies does he use?",
  "sessionId": sessionId
}
// Response will reference previous context

// Page refresh - new session
const newSessionId = crypto.randomUUID(); // "7c9e6679-7425-40de-944b-e07fc1f90ae7"
// Previous conversation forgotten
```

---

## LLM Fallback Strategy

### Primary: Groq
- **Model**: `llama-3.3-70b-versatile`
- **Speed**: Very fast (~1-2 seconds)
- **Quality**: High quality responses
- **Cost**: Free tier available

### Fallback: OpenRouter
- **Model**: `qwen/qwen-2.5-72b-instruct:free`
- **Trigger**: If Groq fails or unavailable
- **Speed**: Moderate (~2-4 seconds)
- **Cost**: Free

### Static Fallback
If both LLMs fail:
```json
{
  "response": "I'm Ujjaval's AI assistant! I'd love to tell you about his AI engineering work, but I'm having trouble connecting right now. Please try again in a moment!",
  "provider": "fallback",
  "tokensUsed": 0
}
```

---

## CORS Configuration

### Allowed Origins
- Frontend URL from `FRONTEND_URL` environment variable
- `*` (all origins) for development

### Allowed Methods
- GET, POST, OPTIONS

### Allowed Headers
- All headers (`*`)

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production:
- Per-session limits
- IP-based throttling
- Token usage caps

---

## Error Handling

### Network Errors
- Automatic retry with fallback LLM
- Graceful degradation to static response

### Validation Errors
- Empty messages rejected with 400
- Missing session ID rejected with 400

### Server Errors
- Logged to console
- Generic error message returned to client
- Session state preserved

---

## Interactive Documentation

Visit `/docs` for Swagger UI with interactive API testing:
```
https://your-backend.railway.app/docs
```

Features:
- Try endpoints directly in browser
- See request/response schemas
- Test with different parameters

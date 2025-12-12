"""
FastAPI Chatbot Backend
LangChain 1.0 + FastAPI with Groq primary and OpenRouter fallback
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

from chat_handler import process_chat_message, get_session_stats
from llm_config import check_llm_availability

load_dotenv()

app = FastAPI(
    title="Ujjaval's AI Assistant API",
    description="LangChain-powered chatbot with Groq and OpenRouter",
    version="1.0.0"
)

# CORS Configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "*"],  # Allow frontend and all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ChatRequest(BaseModel):
    message: str
    sessionId: str
    conversationHistory: Optional[list] = None  # For backward compatibility


class ChatResponse(BaseModel):
    response: str
    provider: str
    tokensUsed: int
    sessionId: str


class HealthResponse(BaseModel):
    status: str
    groq_configured: bool
    openrouter_configured: bool
    active_sessions: int


# Endpoints
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Ujjaval's AI Assistant API",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for deployment monitoring"""
    llm_status = check_llm_availability()
    session_stats = get_session_stats()
    
    return HealthResponse(
        status="healthy",
        groq_configured=llm_status["groq_available"],
        openrouter_configured=llm_status["openrouter_available"],
        active_sessions=session_stats["active_sessions"]
    )


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Process chat message with session-based memory
    
    - Uses Groq as primary LLM
    - Falls back to OpenRouter if Groq fails
    - Maintains conversation history per session
    - Returns response with provider and token count
    """
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    if not request.sessionId:
        raise HTTPException(status_code=400, detail="Session ID is required")
    
    try:
        result = await process_chat_message(
            message=request.message.strip(),
            session_id=request.sessionId
        )
        
        return ChatResponse(**result)
    
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred processing your message"
        )


@app.get("/stats")
async def get_stats():
    """Get API statistics"""
    return {
        **check_llm_availability(),
        **get_session_stats()
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

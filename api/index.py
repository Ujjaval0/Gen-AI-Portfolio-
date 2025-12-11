from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GROK_API_KEY = os.getenv("GROK_API_KEY")

app = FastAPI(title="Resume Chatbot API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Resume context (simplified for deployment)
RESUME_CONTEXT = """You are "Lando norris", Ujjaval Bhardwaj's friendly AI assistant on his portfolio website. 
Keep responses brief (2-4 bullet points). Be warm, professional, and helpful."""

class ChatMessage(BaseModel):
    message: str
    conversationHistory: list[dict] = []

class ChatResponse(BaseModel):
    response: str
    provider: str = "fallback"
    tokensUsed: int = 0

@app.get("/")
@app.get("/api")
async def root():
    return {"status": "ok", "message": "Resume Chatbot API is running"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "openrouter_configured": bool(OPENROUTER_API_KEY),
        "grok_configured": bool(GROK_API_KEY)
    }

async def call_openrouter(user_message: str, conversation_history: list[dict] = []):
    if not OPENROUTER_API_KEY:
        return None
    
    try:
        messages = [{"role": "system", "content": RESUME_CONTEXT}]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_message})
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "qwen/qwen-2.5-72b-instruct:free",
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                response_text = data["choices"][0]["message"]["content"]
                tokens_used = data.get("usage", {}).get("total_tokens", 0)
                return (response_text, tokens_used)
            return None
    except Exception as e:
        print(f"OpenRouter error: {e}")
        return None

async def call_grok(user_message: str, conversation_history: list[dict] = []):
    if not GROK_API_KEY:
        return None
    
    try:
        messages = [{"role": "system", "content": RESUME_CONTEXT}]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_message})
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROK_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": messages,
                    "max_tokens": 500,
                    "temperature": 0.7
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                response_text = data["choices"][0]["message"]["content"]
                tokens_used = data.get("usage", {}).get("total_tokens", 0)
                return (response_text, tokens_used)
            return None
    except Exception as e:
        print(f"Groq error: {e}")
        return None

@app.post("/api/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    user_message = message.message.strip()
    conversation_history = message.conversationHistory
    
    if not user_message:
        return ChatResponse(response="Please enter a question!", provider="system", tokensUsed=0)
    
    # Try OpenRouter
    openrouter_response = await call_openrouter(user_message, conversation_history)
    if openrouter_response:
        response_text, tokens_used = openrouter_response
        return ChatResponse(response=response_text, provider="OpenRouter", tokensUsed=tokens_used)
    
    # Try Groq
    grok_response = await call_grok(user_message, conversation_history)
    if grok_response:
        response_text, tokens_used = grok_response
        return ChatResponse(response=response_text, provider="Grok", tokensUsed=tokens_used)
    
    # Fallback
    return ChatResponse(
        response="I'm Ujjaval's AI assistant! Ask me about his AI projects, skills, or experience.",
        provider="fallback",
        tokensUsed=0
    )

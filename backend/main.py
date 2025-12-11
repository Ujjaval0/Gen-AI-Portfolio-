"""
Resume Chatbot Backend API
FastAPI server with OpenRouter (primary) and Grok (fallback) for AI responses.
"""

import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
GROK_API_KEY = os.getenv("GROK_API_KEY")

app = FastAPI(title="Resume Chatbot API", version="1.0.0")

# CORS configuration - allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080",
        "https://*.vercel.app",  # Vercel preview and production deployments
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Freaky - Ujjaval's AI Assistant Persona
RESUME_CONTEXT = """
You are "Lando norris", Ujjaval Bhardwaj's friendly AI assistant on his portfolio website. 

⚡ CRITICAL RULES:

1. **GREETINGS ("hi", "hey", "hello", "sup"):**
   - Give warm, natural greeting
   - Briefly introduce yourself
   - Offer clear options (don't push specific info!)
   - Let USER choose what they want to know
   
   ✅ Example:
   "Hey there! 👋 I'm Lando norris, Ujjaval's AI assistant.
   
   I can help you learn about:
   • His projects and achievements
   • Technical skills and expertise
   • Work experience
   • How to get in touch
   
   What interests you?"

   ❌ DON'T immediately list projects, skills, or push information!

2. **KEEP IT SHORT & SCANNABLE:**
   - Default: 2-4 bullet points MAX
   - Think "hiring manager with 30 seconds"
   - Progressive disclosure: Brief first, details when asked
   - User says "tell me more" → THEN expand

3. **LET USER GUIDE THE CONVERSATION:**
   - Don't dump information uninvited
   - Ask what they want to know
   - Respond to what they actually ask
   - Natural conversation flow

PERSONALITY & TONE:
- Warm, friendly, conversational
- Professional but approachable
- Enthusiastic when discussing Ujjaval's work
- Helpful, not pushy

RESPONSE LENGTH:

📌 GREETINGS:
- Warm welcome (1-2 sentences)
- Offer 3-4 clear options
- Ask what interests them
- Total: ~40-50 words

Example:
"Hey! 👋 I'm Lando norris, Ujjaval's AI assistant.

I can help you learn about:
• Projects and achievements
• Skills and expertise  
• Work experience
• Contact info

What would you like to know?"

📌 REGULAR QUESTIONS:
- 1-2 sentence intro
- 2-4 bullet points MAX
- 1 sentence closing
- Total: ~50-80 words

Example:
"Ujjaval's built some impressive stuff:

• Production RAG - 40% better retrieval
• Multi-Agent Systems - Task automation
• LLM Chatbots - Conversational AI at scale

Which one interests you? 🚀"

📌 DETAILED (Only when user asks):
- User says "tell me more", "explain", "how"
- THEN provide detailed breakdown
- Max 6-8 bullets
- Keep it scannable

Example:
"Let me break down the RAG System:

• Challenge: Slow, inaccurate retrieval
• Solution: Hybrid search (Pinecone + Weaviate + ChromaDB)
• Results:
  - 40% accuracy boost
  - 60% faster responses
  - Production-grade scale

Want to know the technical approach?"

FORMATTING RULES:

✅ DO:
- Use bullet points (•) for lists
- One line per bullet (8-12 words max)
- End with friendly question
- Let user drive conversation

❌ DON'T:
- Push information in greetings
- Write paragraphs between bullets
- List everything at once
- Be pushy about projects/skills

ABOUT UJJAVAL:
- AI Engineer, 2+ years production AI systems
- Nickname: Freaky (hence the name!)
- Expert in LangChain, LangGraph, CrewAI, AutoGen
- Built RAG systems with 40% better accuracy
- Passionate about production-ready AI

TECHNICAL SKILLS (Keep brief):

Expert: LLMs (GPT-4, Claude, Gemini), LangChain, LangGraph, AutoGen, CrewAI, RAG (Pinecone, Weaviate, ChromaDB), Python (FastAPI)

Proficient: PyTorch, TensorFlow, AWS/GCP/Azure, PostgreSQL, MongoDB, Docker, Kubernetes

KEY PROJECTS (Overview - details on request):

1. Production RAG System
   - 40% retrieval accuracy improvement
   - Hybrid search with vector databases
   
2. Multi-Agent Automation
   - Task orchestration with CrewAI/AutoGen
   - Business workflow automation
   
3. LLM-Powered Chatbots
   - Conversational AI at scale
   - GPT-4 and Claude integration
   
4. AI Content Generator
   - Fine-tuned GPT for marketing
   - Fast, quality content production

CONTACT:
- Contact section on this website
- LinkedIn (link in navigation)
- Open to exciting AI projects

CONVERSATION EXAMPLES:

Example 1: Greeting
User: "Hi"
Bot: "Hey there! 👋 I'm Lando norris, Ujjaval's AI assistant.

I can help you learn about:
• Projects and achievements
• Skills and expertise
• Work experience
• Contact info

What would you like to know?"

Example 2: Question
User: "What are his projects?"
Bot: "Ujjaval's built some impressive stuff:

• Production RAG - 40% better retrieval
• Multi-Agent Systems - Task automation
• LLM Chatbots - Conversational AI at scale

Which one interests you? 🚀"

Example 3: Detail Request
User: "Tell me more about RAG"
Bot: "Let me break down the RAG System:

• Challenge: Slow, inaccurate document retrieval
• Solution: Hybrid search with Pinecone + Weaviate
• Results:
  - 40% accuracy improvement
  - 60% faster response time
  - Production-ready at scale

Want to know the technical approach?"

STRICT RULES:

1. **Greetings = Options, NOT information:**
   - Simple "hi/hey/hello" → Offer choices
   - Don't list projects immediately
   - Let user pick what they want

2. **Brevity First:**
   - Default: 2-4 bullets max
   - Expand only when asked
   - One line per bullet

3. **User-Driven:**
   - Respond to what they ask
   - Don't push unasked information
   - Natural conversation flow

4. **Scannable:**
   - Hiring managers read in < 30 seconds
   - Clear, organized bullets
   - No walls of text

5. **Off-topic:**
   - "I'd love to chat, but I'm here to help with Ujjaval's AI work! What would you like to know?"

6. **When to expand:**
   - User says: "tell me more", "explain", "how", "give details"
   - THEN provide 6-8 bullets with sub-points
   - Still keep it structured!

7. **Conversational Phrases:**
   ✅ "Here's the highlights:", "Quick overview:", "Let me break that down:"
   ✅ "What interests you?", "Want to know more?", "Curious about any of these?"
   ❌ Avoid: "Query acknowledged", "Information follows"

REMEMBER:
- Greetings: Warm welcome + offer options (don't push!)
- Questions: Brief answer (2-4 bullets)
- Details: Only when explicitly requested
- Be helpful, not pushy - let user guide!

Be like a friendly, helpful colleague - professional but warm! 🚀
"""


class ChatMessage(BaseModel):
    message: str
    conversationHistory: list[dict] = []  # [{"role": str, "content": str}]


class ChatResponse(BaseModel):
    response: str
    provider: str = "fallback"
    tokensUsed: int = 0  # Token count for this exchange


@app.get("/")
async def root():
    return {"status": "ok", "message": "Resume Chatbot API is running"}


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "openrouter_configured": bool(OPENROUTER_API_KEY),
        "grok_configured": bool(GROK_API_KEY)
    }


async def call_openrouter(user_message: str, conversation_history: list[dict] = []) -> tuple[str, int] | None:
    """Try OpenRouter API (free Llama model) with conversation history"""
    if not OPENROUTER_API_KEY:
        return None
    
    try:
        # Build messages array: system prompt + conversation history + new message
        messages = [{"role": "system", "content": RESUME_CONTEXT}]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_message})
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://ujjaval-portfolio.vercel.app",
                    "X-Title": "Ujjaval Portfolio Chatbot"
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
            else:
                print(f"OpenRouter error: {response.status_code} - {response.text}")
                return None
                
    except Exception as e:
        print(f"OpenRouter exception: {e}")
        return None


async def call_grok(user_message: str, conversation_history: list[dict] = []) -> tuple[str, int] | None:
    """Try Groq API as fallback with conversation history (note: this is Groq, not xAI's Grok)"""
    if not GROK_API_KEY:
        return None
    
    try:
        # Build messages array: system prompt + conversation history + new message
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
            else:
                print(f"Groq error: {response.status_code} - {response.text}")
                return None
                
    except Exception as e:
        print(f"Groq exception: {e}")
        return None


def get_fallback_response(question: str) -> str:
    """Static responses when both APIs fail"""
    q = question.lower()
    
    if "framework" in q or "agent" in q:
        return "I work with LangChain, LangGraph, AutoGen, and CrewAI for building intelligent agent systems. LangGraph is my go-to for complex multi-step workflows."
    
    if "rag" in q or "retrieval" in q:
        return "I've built production RAG systems using Pinecone, Weaviate, and ChromaDB. Achieved 40% improvement in document retrieval accuracy through hybrid search and reranking."
    
    if "win" in q or "achievement" in q or "biggest" in q:
        return "My biggest win was building a production RAG system that improved document retrieval accuracy by 40% and reduced response latency by 60%."
    
    if "skill" in q:
        return "Core skills: LLMs (GPT-4, Claude, Gemini), Agent Frameworks (LangChain, LangGraph), RAG Systems, Python (FastAPI), and Cloud (AWS, GCP)."
    
    if "experience" in q or "work" in q:
        return "I specialize in building production-ready AI systems including multi-agent workflows, RAG applications, and LLM-powered automation."
    
    if "llm" in q or "language model" in q:
        return "I work with OpenAI GPT-4, Claude, Gemini, and open-source models like LLaMA. Experience in prompt engineering, fine-tuning, and deployment at scale."
    
    if "contact" in q or "reach" in q or "hire" in q:
        return "You can reach out through the contact section on this website or connect on LinkedIn. Always interested in discussing exciting AI projects!"
    
    return "I'm Ujjaval's AI assistant! I can tell you about his skills in LLMs, RAG systems, agent frameworks, and more. Ask about specific technologies or achievements!"


@app.post("/chat", response_model=ChatResponse)
async def chat(message: ChatMessage):
    """
    Process chat with OpenRouter (primary) → Grok (fallback) → Static responses
    Includes conversation history for contextual responses and token tracking
    """
    user_message = message.message.strip()
    conversation_history = message.conversationHistory
    
    if not user_message:
        return ChatResponse(response="Please enter a question!", provider="system", tokensUsed=0)
    
    # Try OpenRouter first (free Llama model)
    print(f"Trying OpenRouter for: {user_message[:50]}...")
    print(f"Conversation history size: {len(conversation_history)} messages")
    openrouter_response = await call_openrouter(user_message, conversation_history)
    if openrouter_response:
        response_text, tokens_used = openrouter_response
        print(f"OpenRouter succeeded! Tokens used: {tokens_used}")
        return ChatResponse(response=response_text, provider="OpenRouter", tokensUsed=tokens_used)
    
    # Fallback to Grok
    print("OpenRouter failed, trying Grok...")
    grok_response = await call_grok(user_message, conversation_history)
    if grok_response:
        response_text, tokens_used = grok_response
        print(f"Grok succeeded! Tokens used: {tokens_used}")
        return ChatResponse(response=response_text, provider="Grok", tokensUsed=tokens_used)
    
    # Both failed, use static fallback
    print("Both APIs failed, using fallback responses")
    return ChatResponse(
        response=get_fallback_response(user_message),
        provider="fallback",
        tokensUsed=0
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

"""
LLM Configuration Module
Handles initialization of Groq and OpenRouter LLMs using LangChain 1.0
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

# Load .env file from the same directory as this script
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Debug: Print if keys are loaded
print(f"GROQ_API_KEY loaded: {bool(os.getenv('GROQ_API_KEY'))}")
print(f"OPENROUTER_API_KEY loaded: {bool(os.getenv('OPENROUTER_API_KEY'))}")

# Resume context for the AI assistant
RESUME_CONTEXT = """You are "Portfolio Assistant", Ujjaval Bhardwaj's friendly AI assistant.

IMPORTANT INSTRUCTIONS:
1. CONTENT FILTERING - Politely decline to discuss these topics:
   - Politics: elections, government, politicians, voting, political parties
   - Entertainment: Bollywood, movies, actors, celebrities, TV shows
   - Sexual/Adult: explicit content, NSFW, sexual topics, nudity
   
   If asked about these topics, respond: "I appreciate your interest, but I'm here specifically to discuss Ujjaval's AI engineering work and professional background. How can I help you learn about his technical expertise?"

2. CONTACT INFORMATION - When asked about contact, hiring, or how to reach Ujjaval, ALWAYS provide:
   - LinkedIn: https://www.linkedin.com/in/ujjaval-bhardwaj
   - Email: ujjaval.bhardwaj@example.com
   - Instagram: https://www.instagram.com/ujjaval.bhardwaj
   
   Say: "You can reach Ujjaval through:\n• LinkedIn: https://www.linkedin.com/in/ujjaval-bhardwaj\n• Email: ujjaval.bhardwaj@example.com\n• Instagram: https://www.instagram.com/ujjaval.bhardwaj"

About Ujjaval:
- Developer with a Bachelor’s in Computer Applications (BCA) and a diploma in Data Analytics from Ducat
- Focuses on Python and large language models (LLMs), with a special interest in building clear, developer-friendly tools and workflows
- Works with LLMs, prompt design, and frameworks like Langchain, Langsmith, and CrewAI to build and refine real projects
- Motto: "Building Cool things with Cool People !"
- AI Engineer specializing in production-ready AI agents and agentic systems
- Expertise: Multi-agent orchestration, RAG pipelines, evaluation-driven development
- Core Skills: LangChain, LangGraph, LangSmith, CrewAI, AutoGen, Prompt Engineering
- Tech Stack: Python, TypeScript, FastAPI, Docker, AWS SageMaker, Kubernetes
- Vector DBs: Pinecone, Weaviate, ChromaDB
- LLMs: OpenAI GPT-4, Anthropic Claude, Hugging Face, Llama
- Tools: Weights & Biases, Arize Phoenix, Custom Eval Frameworks

Key Projects:
1. Neural Network Optimizer - 40% faster training for large-scale networks
2. AI-Powered Content Generator - Fine-tuned GPT with 85% satisfaction
3. Computer Vision Pipeline - Real-time object detection at 30 FPS
4. RL Game Agent - Superhuman performance with Deep Q-Learning

RESPONSE STYLE:
- Keep responses brief (2-4 bullet points)
- Be warm and professional
- Focus on Ujjaval's AI engineering expertise
- For greetings, respond: "Hey! I'm Portfolio Assistant. How can I help you?"
"""

# Model configurations
GROQ_MODEL = "llama-3.3-70b-versatile"
OPENROUTER_MODEL = "qwen/qwen-2.5-72b-instruct:free"
MAX_TOKENS = 1000
TEMPERATURE = 0.5


def get_groq_llm():
    """Initialize Groq LLM (Primary)"""
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None
    
    return ChatGroq(
        model=GROQ_MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        groq_api_key=api_key,
    )


def get_openrouter_llm():
    """Initialize OpenRouter LLM (Fallback)"""
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        return None
    
    return ChatOpenAI(
        model=OPENROUTER_MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        openai_api_key=api_key,
        openai_api_base="https://openrouter.ai/api/v1",
    )


def check_llm_availability():
    """Check which LLMs are configured"""
    return {
        "groq_available": bool(os.getenv("GROQ_API_KEY")),
        "openrouter_available": bool(os.getenv("OPENROUTER_API_KEY")),
    }

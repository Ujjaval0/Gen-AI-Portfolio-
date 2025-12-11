import json
import os
import urllib.request
import urllib.error

# Get API keys from environment
OPENROUTER_API_KEY = os.environ.get('OPENROUTER_API_KEY', '')
GROK_API_KEY = os.environ.get('GROK_API_KEY', '')

RESUME_CONTEXT = """You are "Lando norris", Ujjaval Bhardwaj's friendly AI assistant. Keep responses brief (2-4 bullet points). Be warm and professional."""

def handler(event, context):
    # Handle CORS preflight
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    # Handle GET request (health check)
    if event['httpMethod'] == 'GET':
        response = {
            "status": "healthy",
            "openrouter_configured": bool(OPENROUTER_API_KEY),
            "grok_configured": bool(GROK_API_KEY)
        }
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response)
        }
    
    # Handle POST request (chat)
    if event['httpMethod'] == 'POST':
        try:
            data = json.loads(event['body'])
            user_message = data.get('message', '').strip()
            
            if not user_message:
                return send_response({"response": "Please enter a question!", "provider": "system", "tokensUsed": 0})
            
            # Try OpenRouter
            if OPENROUTER_API_KEY:
                try:
                    response = call_openrouter(user_message)
                    if response:
                        return send_response(response)
                except Exception as e:
                    print(f"OpenRouter error: {e}")
            
            # Try Groq
            if GROK_API_KEY:
                try:
                    response = call_groq(user_message)
                    if response:
                        return send_response(response)
                except Exception as e:
                    print(f"Groq error: {e}")
            
            # Fallback
            return send_response({
                "response": "I'm Ujjaval's AI assistant! Ask me about his AI projects, skills, or experience.",
                "provider": "fallback",
                "tokensUsed": 0
            })
        
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({"error": str(e)})
            }
    
    return {
        'statusCode': 404,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({"error": "Not found"})
    }

def send_response(data):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data)
    }

def call_openrouter(user_message):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "qwen/qwen-2.5-72b-instruct:free",
        "messages": [
            {"role": "system", "content": RESUME_CONTEXT},
            {"role": "user", "content": user_message}
        ],
        "max_tokens": 500,
        "temperature": 0.7
    }
    
    req = urllib.request.Request(url, json.dumps(payload).encode(), headers)
    with urllib.request.urlopen(req, timeout=30) as response:
        result = json.loads(response.read().decode())
        return {
            "response": result["choices"][0]["message"]["content"],
            "provider": "OpenRouter",
            "tokensUsed": result.get("usage", {}).get("total_tokens", 0)
        }

def call_groq(user_message):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROK_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": RESUME_CONTEXT},
            {"role": "user", "content": user_message}
        ],
        "max_tokens": 500,
        "temperature": 0.7
    }
    
    req = urllib.request.Request(url, json.dumps(payload).encode(), headers)
    with urllib.request.urlopen(req, timeout=30) as response:
        result = json.loads(response.read().decode())
        return {
            "response": result["choices"][0]["message"]["content"],
            "provider": "Groq",
            "tokensUsed": result.get("usage", {}).get("total_tokens", 0)
        }

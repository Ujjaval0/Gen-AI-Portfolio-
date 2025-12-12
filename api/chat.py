from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.error

# Get API keys from environment
OPENROUTER_API_KEY = os.environ.get('OPENROUTER_API_KEY', '')
GROK_API_KEY = os.environ.get('GROK_API_KEY', '')

RESUME_CONTEXT = """You are "Max33", Ujjaval Bhardwaj's friendly AI assistant. Keep responses brief (2-4 bullet points). Be warm and professional."""

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/health' or self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {
                "status": "healthy",
                "openrouter_configured": bool(OPENROUTER_API_KEY),
                "grok_configured": bool(GROK_API_KEY)
            }
            self.wfile.write(json.dumps(response).encode())
            return
        
        # Default response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({"status": "ok"}).encode())
    
    def do_POST(self):
        if self.path == '/api/chat' or self.path == '/chat':
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_message = data.get('message', '').strip()
            
            if not user_message:
                self.send_json_response({"response": "Please enter a question!", "provider": "system", "tokensUsed": 0})
                return
            
            # Try OpenRouter
            if OPENROUTER_API_KEY:
                try:
                    response = self.call_openrouter(user_message)
                    if response:
                        self.send_json_response(response)
                        return
                except Exception as e:
                    print(f"OpenRouter error: {e}")
            
            # Try Groq
            if GROK_API_KEY:
                try:
                    response = self.call_groq(user_message)
                    if response:
                        self.send_json_response(response)
                        return
                except Exception as e:
                    print(f"Groq error: {e}")
            
            # Fallback
            self.send_json_response({
                "response": "I'm Ujjaval's AI assistant! Ask me about his AI projects, skills, or experience.",
                "provider": "fallback",
                "tokensUsed": 0
            })
            return
        
        self.send_response(404)
        self.end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_json_response(self, data):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())
    
    def call_openrouter(self, user_message):
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
    
    def call_groq(self, user_message):
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

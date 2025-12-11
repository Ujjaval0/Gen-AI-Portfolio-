# AI Engineer Portfolio - Setup Guide

## 🚀 Quick Start

### Option 1: One-Click Start (Recommended)
Double-click `start-all.bat` in the project root. This will:
- Start the backend API on port 8000
- Start the frontend dev server on port 8080
- Open both in separate terminal windows

### Option 2: Using npm
```bash
npm start
```

### Option 3: Manual Start

#### Start Backend Only
```bash
# Windows
start-backend.bat

# Or using npm
npm run backend
```

#### Start Frontend Only
```bash
npm run dev
```

## ⚙️ Initial Setup (First Time Only)

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Setup Backend

#### Create Python Virtual Environment
```bash
cd backend
python -m venv .venv
```

#### Install Backend Dependencies
```bash
# Activate virtual environment
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### Configure API Keys
```bash
# Copy the example env file
copy .env.example .env

# Edit .env and add your API keys
notepad .env
```

Add your API keys to `.env`:
```env
# OpenRouter API Key (Primary - Free tier available)
# Get it from: https://openrouter.ai/keys
OPENROUTER_API_KEY=your-actual-openrouter-key-here

# Groq API Key (Fallback)
# Get it from: https://console.groq.com
GROK_API_KEY=your-actual-groq-key-here
```

### 3. Get API Keys

#### OpenRouter (Primary - FREE)
1. Go to https://openrouter.ai/keys
2. Sign up/login
3. Create a new API key
4. Copy and paste into `.env`

#### Groq (Fallback - FREE)
1. Go to https://console.groq.com
2. Sign up/login
3. Create a new API key
4. Copy and paste into `.env`

## 🔧 Troubleshooting

### Backend Not Connecting
1. Make sure backend is running on port 8000
2. Check if `.env` file exists in `backend/` folder
3. Verify API keys are set in `backend/.env`
4. Check terminal for error messages

### Port Already in Use
If port 8000 or 8080 is already in use:

**For Backend (port 8000):**
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**For Frontend (port 8080):**
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F
```

### Virtual Environment Issues
If you get activation errors:
```bash
cd backend
rmdir /s .venv
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## 📝 Development Workflow

### Daily Development
1. Run `start-all.bat` or `npm start`
2. Frontend: http://localhost:8080
3. Backend API: http://localhost:8000
4. Backend Health Check: http://localhost:8000/health

### Making Changes
- Frontend changes auto-reload (Vite HMR)
- Backend changes auto-reload (uvicorn --reload)

### Stopping Servers
- Press `Ctrl+C` in each terminal window
- Or close the terminal windows

## 🌐 URLs

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **API Health**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs

## 📦 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui

### Backend
- FastAPI (Python)
- OpenRouter API (Free Llama model)
- Groq API (Fallback)
- CORS enabled for localhost

## 🎯 Common Commands

```bash
# Start everything
npm start

# Start frontend only
npm run dev

# Start backend only
npm run backend

# Build for production
npm run build

# Lint code
npm run lint
```

## ✅ Verification

After starting, verify everything works:

1. **Backend Health Check**
   - Visit: http://localhost:8000/health
   - Should show: `{"status":"healthy","openrouter_configured":true,"grok_configured":true}`

2. **Frontend**
   - Visit: http://localhost:8080
   - Click "Resume" button
   - Try chatting with the AI assistant

3. **API Connection**
   - Open browser console (F12)
   - Send a chat message
   - Should see successful API responses

## 🐛 Still Having Issues?

1. Check both terminal windows for error messages
2. Verify `.env` file exists in `backend/` folder
3. Ensure API keys are valid and not placeholder text
4. Try restarting both servers
5. Check if antivirus/firewall is blocking ports 8000 or 8080

---

**Note**: The `.env` file is gitignored for security. Never commit API keys to version control!

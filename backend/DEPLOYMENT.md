# Deployment Guide

## Overview
This guide covers deploying the LangChain chatbot backend to Railway or Render.

## Prerequisites
- GitHub account
- Groq API key (from https://console.groq.com)
- OpenRouter API key (from https://openrouter.ai/keys)

---

## Option 1: Deploy to Railway

### Step 1: Push Code to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial chatbot backend"
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Create Railway Project
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect the Python project

### Step 3: Configure Environment Variables
In Railway dashboard, add these variables:
- `GROQ_API_KEY` = your Groq API key
- `OPENROUTER_API_KEY` = your OpenRouter API key
- `FRONTEND_URL` = your frontend URL (e.g., https://your-site.netlify.app)
- `PORT` = 8000 (Railway provides this automatically)

### Step 4: Deploy
Railway will automatically deploy. Check the logs for:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 5: Get Your URL
Railway provides a URL like: `https://your-app.railway.app`

### Step 6: Test Health Check
```bash
curl https://your-app.railway.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "groq_configured": true,
  "openrouter_configured": true,
  "active_sessions": 0
}
```

---

## Option 2: Deploy to Render

### Step 1: Push Code to GitHub
Same as Railway Step 1

### Step 2: Create Render Web Service
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will detect `render.yaml`

### Step 3: Configure Settings
- **Name**: ujjaval-chatbot-backend
- **Runtime**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Plan**: Free

### Step 4: Add Environment Variables
In Render dashboard, add:
- `GROQ_API_KEY` = your Groq API key
- `OPENROUTER_API_KEY` = your OpenRouter API key  
- `FRONTEND_URL` = your frontend URL
- `PYTHON_VERSION` = 3.11.9

### Step 5: Deploy
Click "Create Web Service". Render will build and deploy.

### Step 6: Get Your URL
Render provides a URL like: `https://ujjaval-chatbot-backend.onrender.com`

### Step 7: Test
```bash
curl https://ujjaval-chatbot-backend.onrender.com/health
```

---

## Update Frontend

### Step 1: Update API Configuration
Edit `src/config/api.ts`:

```typescript
export const CHAT_ENDPOINT = 
  import.meta.env.VITE_CHAT_API_URL || 
  'https://your-backend.railway.app/chat';
  // or 'https://your-backend.onrender.com/chat'
```

### Step 2: Add Environment Variable (Optional)
Create `.env.local` in frontend:
```
VITE_CHAT_API_URL=https://your-backend.railway.app/chat
```

### Step 3: Test Locally
```bash
npm run dev
```
Open chatbot and send a message.

### Step 4: Deploy Frontend
Push changes and deploy to Netlify/Vercel.

---

## Troubleshooting

### Backend Not Responding
- Check Railway/Render logs for errors
- Verify environment variables are set
- Test `/health` endpoint

### CORS Errors
- Ensure `FRONTEND_URL` matches your frontend domain
- Check browser console for specific CORS error

### API Key Issues
- Verify keys are correct in dashboard
- Check `/health` endpoint shows `groq_configured: true`

### Cold Starts (Render Free Tier)
- First request may take 30-60 seconds
- Subsequent requests will be fast

---

## Monitoring

### Railway
- View logs in Railway dashboard
- Check metrics for CPU/memory usage
- Set up alerts for downtime

### Render
- View logs in Render dashboard
- Monitor health checks
- Check deployment history

---

## Cost Estimates

### Railway Free Tier
- $5 free credit per month
- ~500 hours of runtime
- Should be sufficient for portfolio

### Render Free Tier
- 750 hours per month
- Spins down after 15 min inactivity
- Cold start on first request

### API Costs
- **Groq**: Free tier (limited requests)
- **OpenRouter**: Free models available
- Monitor usage in respective dashboards

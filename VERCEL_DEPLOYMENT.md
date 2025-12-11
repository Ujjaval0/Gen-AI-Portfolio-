# 🚀 Complete Vercel Deployment Guide

## AI Engineer Portfolio - Full Stack Deployment with Chatbot

This guide will help you deploy your AI Engineer Portfolio website to Vercel with **full functionality** including:
- ✅ Frontend (React + Vite + Framer Motion)
- ✅ Backend API (FastAPI Python chatbot)
- ✅ AI Chatbot with OpenRouter & Groq
- ✅ All animations and interactive elements
- ✅ Custom domain support

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier works!)
3. **API Keys** - Get these free API keys:
   - OpenRouter API Key: [openrouter.ai/keys](https://openrouter.ai/keys)
   - Groq API Key: [console.groq.com](https://console.groq.com)

---

## 🔧 Step 1: Prepare Your Repository

### 1.1 Update Frontend API URL

Update your frontend to use Vercel's API routes instead of localhost:

**File: `src/config/api.ts` (create if doesn't exist)**

```typescript
// API configuration for production and development
export const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production: Use Vercel serverless functions
  : 'http://localhost:8000';  // Development: Use local backend

export const CHAT_ENDPOINT = `${API_BASE_URL}/chat`;
export const HEALTH_ENDPOINT = `${API_BASE_URL}/health`;
```

### 1.2 Update Chatbot Component

Find your chatbot component (likely in `src/components/`) and update the API calls:

```typescript
// Before
const response = await fetch('http://localhost:8000/chat', { ... });

// After
import { CHAT_ENDPOINT } from '@/config/api';
const response = await fetch(CHAT_ENDPOINT, { ... });
```

### 1.3 Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Prepare for Vercel deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository
4. Click **"Import"**

### 2.2 Configure Project Settings

Vercel will auto-detect Vite. Verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 2.3 Add Environment Variables

**CRITICAL:** Add your API keys as environment variables:

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `OPENROUTER_API_KEY` | `your-openrouter-key-here` | Production, Preview, Development |
| `GROK_API_KEY` | `your-groq-key-here` | Production, Preview, Development |

> ⚠️ **Important:** Make sure to select all three environments (Production, Preview, Development)

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

---

## ✅ Step 3: Verify Deployment

### 3.1 Check Frontend

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Verify all sections load:
   - ✅ Hero section with animations
   - ✅ Projects section
   - ✅ Workflow section
   - ✅ Skills section
   - ✅ About section
   - ✅ Theme toggle works
   - ✅ Navigation works

### 3.2 Check Backend API

1. Visit: `https://your-project.vercel.app/api/health`
2. You should see:
```json
{
  "status": "healthy",
  "openrouter_configured": true,
  "grok_configured": true
}
```

### 3.3 Test Chatbot

1. Click the **"Resume"** button on your website
2. Type a message: `"Hi"`
3. You should get a response from the AI chatbot
4. Check that:
   - ✅ Chatbot opens and closes
   - ✅ Messages send and receive
   - ✅ Token counter updates
   - ✅ Provider shows (OpenRouter or Grok)
   - ✅ Conversation history works (ask follow-up questions)

---

## 🐛 Troubleshooting

### Issue: Chatbot shows "Backend not connected"

**Solution:**
1. Check environment variables are set correctly in Vercel
2. Visit `/api/health` endpoint to verify backend is running
3. Check browser console for CORS errors
4. Redeploy: Vercel Dashboard → Deployments → Click "..." → Redeploy

### Issue: API returns 500 error

**Solution:**
1. Go to Vercel Dashboard → Your Project → **Functions**
2. Click on `/api/index` function
3. Check the **Logs** tab for Python errors
4. Common fixes:
   - Verify `api/requirements.txt` has all dependencies
   - Check API keys are valid
   - Ensure Python version is 3.9+ (Vercel default)

### Issue: Build fails

**Solution:**
1. Check Vercel build logs
2. Common fixes:
   - Run `npm run build` locally to test
   - Ensure `package.json` has correct dependencies
   - Check TypeScript errors: `npm run lint`

### Issue: Animations not working

**Solution:**
1. Check browser console for errors
2. Verify all assets in `public/` folder are deployed
3. Check that GSAP and Framer Motion are in `dependencies` (not `devDependencies`)

---

## 🎨 Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `yourdomain.com`
4. Follow DNS configuration instructions

### 4.2 Update Backend CORS

Update `backend/main.py` to allow your custom domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://your-project.vercel.app",
        "https://yourdomain.com",  # Add your custom domain
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push changes - Vercel will auto-deploy.

---

## 🔄 Step 5: Continuous Deployment

### Auto-Deploy on Git Push

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update chatbot responses"
git push

# Vercel will automatically:
# 1. Detect the push
# 2. Build your project
# 3. Deploy to production
# 4. Update your live site
```

### Preview Deployments

- Every pull request gets a **preview URL**
- Test changes before merging to main
- Share preview links with others

---

## 📊 Monitoring & Analytics

### View Deployment Logs

1. Vercel Dashboard → Your Project → **Deployments**
2. Click on any deployment
3. View build logs, function logs, and errors

### Monitor API Usage

1. Vercel Dashboard → Your Project → **Analytics**
2. See:
   - Page views
   - API calls
   - Response times
   - Error rates

### Check Function Logs

1. Vercel Dashboard → Your Project → **Functions**
2. Click `/api/index`
3. View real-time logs of chatbot API calls

---

## 🔐 Security Best Practices

### 1. Protect API Keys

✅ **DO:**
- Store API keys in Vercel environment variables
- Never commit `.env` files to GitHub
- Use different keys for development and production

❌ **DON'T:**
- Hardcode API keys in your code
- Share API keys publicly
- Commit `.env.local` to GitHub

### 2. Rate Limiting

Add rate limiting to prevent abuse:

```python
# backend/main.py
from fastapi import Request
from datetime import datetime, timedelta

# Simple in-memory rate limiter (for production, use Redis)
rate_limit_store = {}

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    now = datetime.now()
    
    if client_ip in rate_limit_store:
        last_request, count = rate_limit_store[client_ip]
        if now - last_request < timedelta(minutes=1):
            if count > 20:  # Max 20 requests per minute
                return JSONResponse(
                    status_code=429,
                    content={"error": "Too many requests"}
                )
            rate_limit_store[client_ip] = (last_request, count + 1)
        else:
            rate_limit_store[client_ip] = (now, 1)
    else:
        rate_limit_store[client_ip] = (now, 1)
    
    response = await call_next(request)
    return response
```

---

## 📈 Performance Optimization

### 1. Enable Caching

Add caching headers to static assets:

```json
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Optimize Images

- Use WebP format for images
- Compress images before uploading
- Use lazy loading for images

### 3. Code Splitting

Vite automatically does code splitting, but you can optimize further:

```typescript
// Lazy load components
const Chatbot = lazy(() => import('@/components/Chatbot'));
```

---

## 🎯 Final Checklist

Before going live, verify:

- [ ] All environment variables are set in Vercel
- [ ] Frontend loads correctly at Vercel URL
- [ ] Backend API health check returns `200 OK`
- [ ] Chatbot sends and receives messages
- [ ] Token counter updates correctly
- [ ] Conversation history works
- [ ] All animations play smoothly
- [ ] Theme toggle works
- [ ] Navigation works on all sections
- [ ] Mobile responsive (test on phone)
- [ ] No console errors in browser
- [ ] Custom domain configured (if applicable)

---

## 🆘 Getting Help

### Common Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **OpenRouter Docs**: [openrouter.ai/docs](https://openrouter.ai/docs)
- **Groq Docs**: [console.groq.com/docs](https://console.groq.com/docs)

### Debug Commands

```bash
# Test build locally
npm run build
npm run preview

# Check for TypeScript errors
npm run lint

# Test backend locally
cd backend
python -m uvicorn main:app --reload

# Check environment variables
vercel env ls
```

---

## 🎉 Success!

Your AI Engineer Portfolio is now live on Vercel with:
- ✅ Lightning-fast global CDN
- ✅ Automatic HTTPS
- ✅ Serverless Python backend
- ✅ AI-powered chatbot
- ✅ Auto-deploy on git push
- ✅ Free hosting (for most use cases)

**Share your portfolio:**
- Add to LinkedIn
- Share on Twitter
- Include in job applications
- Send to recruiters

**Your live URL:** `https://your-project.vercel.app`

---

## 📝 Next Steps

1. **Analytics**: Add Google Analytics or Vercel Analytics
2. **SEO**: Add meta tags and Open Graph images
3. **Custom Domain**: Point your domain to Vercel
4. **Monitoring**: Set up error tracking (Sentry)
5. **Backups**: Regularly backup your GitHub repo

---

**Need help?** Check the troubleshooting section or Vercel's excellent documentation.

**Good luck with your deployment! 🚀**

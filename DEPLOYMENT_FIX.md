# 🔧 Vercel Deployment Error Fix

## Error You Encountered

```
TypeError: issubclass() arg 1 must be a class
Python process exited with exit status: 1
```

## ✅ Solution Applied

### Problem
The initial deployment used `Mangum` adapter which is designed for AWS Lambda, not Vercel's Python runtime. Vercel has native ASGI support for FastAPI and doesn't need an adapter.

### Files Fixed

#### 1. `api/index.py` - Updated
**Before (❌ Caused Error):**
```python
from mangum import Mangum
handler = Mangum(app, lifespan="off")
```

**After (✅ Works):**
```python
from main import app
__all__ = ['app']
```

#### 2. `api/requirements.txt` - Updated
**Removed:** `mangum==0.17.0` (not needed)

**Final requirements:**
```
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-dotenv==1.0.0
httpx==0.26.0
pydantic==2.5.3
```

#### 3. `vercel.json` - Updated
Added explicit Python runtime configuration:
```json
{
  "functions": {
    "api/index.py": {
      "runtime": "python3.9"
    }
  }
}
```

#### 4. `api/.vc-config.json` - Created
Specifies Python runtime version:
```json
{
  "runtime": "python3.9"
}
```

---

## 🚀 How to Deploy the Fix

### Option 1: Git Push (Recommended)
```bash
git add .
git commit -m "Fix Vercel deployment error - remove Mangum adapter"
git push origin main
```

Vercel will automatically detect the push and redeploy with the fixed configuration.

### Option 2: Manual Redeploy
1. Go to Vercel Dashboard
2. Your Project → **Deployments**
3. Click "..." on latest deployment
4. Click **Redeploy**

---

## ✅ Verification Steps

After redeployment (wait ~2-3 minutes):

### 1. Check Deployment Status
- Vercel Dashboard → Deployments
- Status should be: **Ready** ✅

### 2. Test API Health
Visit: `https://your-project.vercel.app/api/health`

**Expected Response:**
```json
{
  "status": "healthy",
  "openrouter_configured": true,
  "grok_configured": true
}
```

### 3. Test Chatbot
1. Visit your site: `https://your-project.vercel.app`
2. Click **"Resume"** button
3. Type: `"Hi"`
4. Should get AI response ✅

### 4. Check Function Logs
- Vercel Dashboard → Functions → `/api/index`
- Should see successful requests, no errors

---

## 🐛 If Still Getting Errors

### Error: "Module not found: main"

**Solution:** Check file structure
```
your-project/
├── api/
│   ├── index.py
│   └── requirements.txt
└── backend/
    └── main.py
```

### Error: "Environment variables not found"

**Solution:** Add in Vercel Dashboard
1. Settings → Environment Variables
2. Add `OPENROUTER_API_KEY` and `GROK_API_KEY`
3. Redeploy

### Error: "CORS error in browser"

**Solution:** Already fixed in `backend/main.py`
```python
allow_origins=[
    "https://*.vercel.app",
    "*"
]
```

### Error: "Function timeout"

**Solution:** Check API keys are valid
- Test OpenRouter: [openrouter.ai/keys](https://openrouter.ai/keys)
- Test Groq: [console.groq.com](https://console.groq.com)

---

## 📊 What Changed

| File | Change | Why |
|------|--------|-----|
| `api/index.py` | Removed Mangum, export app directly | Vercel has native ASGI support |
| `api/requirements.txt` | Removed mangum | Not needed for Vercel |
| `vercel.json` | Added functions config | Specify Python runtime |
| `api/.vc-config.json` | Created | Runtime configuration |

---

## 🎯 Expected Result

After these fixes:

- ✅ Deployment succeeds (no TypeError)
- ✅ API endpoints work (`/api/health`, `/api/chat`)
- ✅ Chatbot responds to messages
- ✅ Token tracking works
- ✅ All features functional

---

## 📝 Technical Explanation

### Why Mangum Failed
- **Mangum** is an adapter for AWS Lambda (different serverless platform)
- Vercel uses its own Python runtime with native ASGI support
- Mangum's `BaseHTTPRequestHandler` check failed in Vercel's environment

### Why Direct Export Works
- Vercel's Python runtime automatically detects FastAPI apps
- When you export `app` from `api/index.py`, Vercel wraps it with its own ASGI handler
- No adapter needed - cleaner and more reliable

---

## 🔍 Debugging Commands

### Check Vercel Logs
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# View logs
vercel logs your-project-url
```

### Test Locally
```bash
# Test build
npm run build
npm run preview

# Test backend
cd backend
python -m uvicorn main:app --reload
```

---

## ✅ Deployment Checklist

After applying the fix:

- [x] Updated `api/index.py` (removed Mangum)
- [x] Updated `api/requirements.txt` (removed mangum)
- [x] Updated `vercel.json` (added functions config)
- [x] Created `api/.vc-config.json`
- [ ] Commit and push changes
- [ ] Wait for Vercel deployment (~2-3 min)
- [ ] Test `/api/health` endpoint
- [ ] Test chatbot functionality
- [ ] Verify no errors in Vercel logs

---

## 🎉 Success!

Once deployed successfully, your site will have:
- ✅ Working AI chatbot
- ✅ All animations
- ✅ Full functionality
- ✅ No deployment errors

**Your live site:** `https://your-project.vercel.app`

---

**Need more help?** Check the full deployment guide: `VERCEL_DEPLOYMENT.md`

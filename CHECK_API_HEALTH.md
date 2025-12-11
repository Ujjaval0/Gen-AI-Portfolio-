# 🔍 How to Check API Health & Fix Chatbot

## 📍 Check API Health

### Method 1: Direct Browser Visit
1. Open your browser
2. Go to: `https://YOUR-PROJECT-NAME.vercel.app/api/health`
3. Replace `YOUR-PROJECT-NAME` with your actual Vercel project name

**Expected Response:**
```json
{
  "status": "healthy",
  "openrouter_configured": true,
  "grok_configured": true
}
```

**If you see `false` for API keys:** Environment variables are missing!

### Method 2: From Your Deployed Site
1. Visit: `https://YOUR-PROJECT-NAME.vercel.app`
2. Add `/api/health` to the end of the URL
3. Press Enter

---

## 🐛 Your Current Issue

From your screenshot, the chatbot is giving the **same response** to every question:
> "I'm Ujjaval's AI assistant! Ask me about his AI projects, skills, or experience."

This is the **fallback response**, which means:
- ❌ OpenRouter API is NOT working
- ❌ Groq API is NOT working
- ⚠️ **Most likely:** API keys are missing in Vercel

---

## ✅ Fix: Add Environment Variables to Vercel

### Step 1: Get Your Vercel Project URL
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your project
3. Note the project name

### Step 2: Add Environment Variables
1. Click on your project
2. Go to **Settings** tab
3. Click **Environment Variables** in left sidebar
4. Add these variables:

| Name | Value | Environments |
|------|-------|--------------|
| `OPENROUTER_API_KEY` | Your OpenRouter key | ✅ Production, ✅ Preview, ✅ Development |
| `GROK_API_KEY` | Your Groq key | ✅ Production, ✅ Preview, ✅ Development |

**Important:** Check ALL three environment boxes!

### Step 3: Get API Keys (if you don't have them)

**OpenRouter:**
1. Go to: [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign in / Sign up
3. Create API key
4. Copy the key

**Groq:**
1. Go to: [console.groq.com](https://console.groq.com)
2. Sign in / Sign up
3. Go to API Keys
4. Create new key
5. Copy the key

### Step 4: Redeploy
After adding environment variables:
1. Go to **Deployments** tab
2. Click "..." on the latest deployment
3. Click **Redeploy**
4. Wait ~2 minutes

---

## 🧪 Test After Redeployment

### 1. Check API Health
Visit: `https://YOUR-PROJECT.vercel.app/api/health`

**Should see:**
```json
{
  "status": "healthy",
  "openrouter_configured": true,  ← Should be true
  "grok_configured": true          ← Should be true
}
```

### 2. Test Chatbot
1. Visit your site
2. Click "Resume" button
3. Type: "What are Ujjaval's projects?"
4. Should get **specific** answer about projects, not generic fallback

---

## 🔍 Debug Checklist

If chatbot still doesn't work:

- [ ] API keys added to Vercel environment variables
- [ ] All 3 environments checked (Production, Preview, Development)
- [ ] Redeployed after adding keys
- [ ] `/api/health` shows both keys as `true`
- [ ] No typos in environment variable names
- [ ] API keys are valid (test on OpenRouter/Groq websites)

---

## 📊 Check Vercel Function Logs

1. Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Click `/api/index`
4. View logs for errors

**Look for:**
- ❌ "OpenRouter error" - API key invalid
- ❌ "Groq error" - API key invalid
- ✅ "OpenRouter succeeded" - Working!

---

## 🎯 Quick Summary

**Your Issue:** Chatbot gives same response to everything  
**Cause:** API keys not configured in Vercel  
**Fix:** Add `OPENROUTER_API_KEY` and `GROK_API_KEY` in Vercel settings  
**Verify:** Check `/api/health` endpoint shows `true` for both keys

---

## 📸 Visual Guide

### Finding Your Vercel URL
Your Vercel URL is shown in:
- Vercel Dashboard → Project → Domains
- Usually: `https://your-project-name.vercel.app`

### Adding Environment Variables
```
Vercel Dashboard
  → Click your project
    → Settings
      → Environment Variables
        → Add Variable
```

---

**Once you add the API keys and redeploy, your chatbot will give contextual responses!** 🚀

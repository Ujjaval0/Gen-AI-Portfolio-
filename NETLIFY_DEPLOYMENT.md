# 🚀 Netlify Deployment Guide

## Complete Guide to Deploy Your AI Portfolio on Netlify

---

## 📋 Prerequisites

1. **Netlify Account** - Sign up at [netlify.com](https://netlify.com) (free!)
2. **GitHub Repository** - Your code must be on GitHub
3. **API Keys:**
   - OpenRouter: [openrouter.ai/keys](https://openrouter.ai/keys)
   - Groq: [console.groq.com](https://console.groq.com)

---

## 🔧 Step 1: Code Changes Required

### Files Already Created:
✅ `netlify.toml` - Netlify configuration  
✅ `netlify/functions/chat.py` - Serverless function

### No Other Changes Needed!
Your frontend code works as-is because we use dynamic API endpoints.

---

## 🚀 Step 2: Deploy to Netlify

### Option A: GitHub Integration (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

2. **Import to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **GitHub**
   - Select your repository

3. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`

4. **Click "Deploy site"**

### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

---

## 🔐 Step 3: Add Environment Variables

1. **In Netlify Dashboard:**
   - Go to **Site settings** → **Environment variables**
   - Click **"Add a variable"**

2. **Add these variables:**

| Variable Name | Value | Where to Get |
|--------------|-------|--------------|
| `OPENROUTER_API_KEY` | Your key | [openrouter.ai/keys](https://openrouter.ai/keys) |
| `GROK_API_KEY` | Your key | [console.groq.com](https://console.groq.com) |

3. **Redeploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## ✅ Step 4: Verify Deployment

### 1. Check Site URL
Your site will be at: `https://YOUR-SITE-NAME.netlify.app`

### 2. Test API Health
Visit: `https://YOUR-SITE-NAME.netlify.app/.netlify/functions/chat`

**Expected:**
```json
{
  "status": "healthy",
  "openrouter_configured": true,
  "grok_configured": true
}
```

### 3. Test Chatbot
1. Visit your site
2. Click **"Resume"** button
3. Type: "Hi"
4. Should get AI response ✅

---

## 🔍 Key Differences: Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|--------|
| **Function Path** | `netlify/functions/` | `api/` |
| **Function URL** | `/.netlify/functions/chat` | `/api/chat` |
| **Config File** | `netlify.toml` | `vercel.json` |
| **Handler Format** | `handler(event, context)` | `BaseHTTPRequestHandler` |
| **Redirects** | In `netlify.toml` | In `vercel.json` |

**Good news:** Your frontend automatically handles both! 🎉

---

## 📁 File Structure for Netlify

```
your-project/
├── netlify/
│   └── functions/
│       └── chat.py          ✅ Serverless function
├── dist/                    ✅ Build output
├── src/                     ✅ Frontend code
├── netlify.toml             ✅ Configuration
└── package.json
```

---

## 🐛 Troubleshooting

### Issue: "Function not found"

**Check:**
1. `netlify/functions/chat.py` exists
2. `netlify.toml` has correct functions directory
3. Redeploy after adding files

### Issue: "Environment variables not found"

**Solution:**
1. Add in Netlify dashboard (not `.env` file!)
2. Trigger new deployment
3. Check function logs

### Issue: Chatbot gives fallback responses

**Check:**
1. Visit `/.netlify/functions/chat`
2. Verify `openrouter_configured: true`
3. If `false`, add API keys and redeploy

### Issue: CORS errors

**Solution:**
Already configured in `netlify.toml` and function code. If still issues:
1. Check browser console
2. Verify headers in function response
3. Clear cache and hard reload

---

## 📊 Check Function Logs

1. **Netlify Dashboard** → **Functions**
2. Click **chat** function
3. View logs for errors
4. Look for:
   - ✅ "Function invocation complete"
   - ❌ Python errors
   - ❌ API key errors

---

## 🎯 Deployment Checklist

Before going live:

- [ ] `netlify.toml` created
- [ ] `netlify/functions/chat.py` created
- [ ] Code pushed to GitHub
- [ ] Site imported to Netlify
- [ ] Environment variables added
- [ ] Site redeployed
- [ ] `/.netlify/functions/chat` returns health status
- [ ] Chatbot responds to messages
- [ ] No console errors
- [ ] Mobile responsive

---

## 🔄 Continuous Deployment

**Auto-deploy on git push:**
```bash
git add .
git commit -m "Update chatbot"
git push origin main
# Netlify auto-deploys in ~1-2 minutes
```

---

## 💰 Netlify Free Tier

| Resource | Free Tier | Your Usage |
|----------|-----------|------------|
| **Bandwidth** | 100GB/month | ~1-5GB |
| **Build Minutes** | 300 min/month | ~10-20 min |
| **Functions** | 125k requests/month | Plenty! |
| **Sites** | Unlimited | 1 |

**Cost:** $0/month ✅

---

## 🎨 Custom Domain (Optional)

1. **Buy domain** (Namecheap, Google Domains, etc.)
2. **In Netlify:**
   - Domain settings → Add custom domain
   - Follow DNS instructions
3. **HTTPS:** Automatic (Netlify provides SSL)

---

## 🚀 Performance Optimization

### Already Optimized:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Asset optimization
- ✅ Serverless functions

### Additional:
```toml
# Add to netlify.toml
[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.images]
  compress = true
```

---

## 📈 Monitoring

### Netlify Analytics (Optional - Paid)
- Real-time traffic
- Page views
- Bandwidth usage

### Free Alternatives:
- Google Analytics
- Plausible Analytics
- Umami

---

## 🆘 Getting Help

**Resources:**
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- Community: [answers.netlify.com](https://answers.netlify.com)
- Status: [netlifystatus.com](https://netlifystatus.com)

**Debug Commands:**
```bash
# Test build locally
npm run build

# Test function locally
netlify dev

# View logs
netlify functions:log chat
```

---

## ✅ Success Criteria

Your deployment is successful when:

- ✅ Site loads at Netlify URL
- ✅ `/.netlify/functions/chat` returns health status
- ✅ Chatbot responds with AI answers
- ✅ Token counter updates
- ✅ All animations work
- ✅ Theme toggle works
- ✅ Mobile responsive

---

## 🎉 You're Done!

**Your site is live at:** `https://YOUR-SITE-NAME.netlify.app`

**Features working:**
- ✅ AI chatbot with OpenRouter & Groq
- ✅ Token tracking
- ✅ Conversation memory
- ✅ All animations
- ✅ Dark/Light mode
- ✅ Responsive design

**Share it:**
- LinkedIn
- Twitter
- Job applications

---

## 📝 Quick Reference

**Deploy:**
```bash
git push origin main
```

**Check health:**
```
https://YOUR-SITE.netlify.app/.netlify/functions/chat
```

**View logs:**
```
Netlify Dashboard → Functions → chat → Logs
```

**Update env vars:**
```
Site settings → Environment variables → Edit
```

---

**Need help?** Check Netlify docs or the troubleshooting section above!

**Good luck with your deployment! 🚀**

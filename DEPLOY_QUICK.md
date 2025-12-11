# 🚀 Quick Vercel Deployment Reference

## One-Page Deployment Checklist

### 📦 Files Created for Deployment
- ✅ `vercel.json` - Vercel configuration
- ✅ `api/index.py` - Serverless function wrapper
- ✅ `api/requirements.txt` - Python dependencies
- ✅ `.vercelignore` - Files to exclude
- ✅ `src/config/api.ts` - Dynamic API configuration
- ✅ Updated `backend/main.py` - CORS for Vercel
- ✅ Updated `src/components/ResumeChatBox.tsx` - Dynamic API endpoint

---

## 🎯 5-Minute Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework: **Vite** (auto-detected)
4. Click **Deploy**

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

| Variable | Where to Get It |
|----------|----------------|
| `OPENROUTER_API_KEY` | [openrouter.ai/keys](https://openrouter.ai/keys) |
| `GROK_API_KEY` | [console.groq.com](https://console.groq.com) |

**Important:** Select all environments (Production, Preview, Development)

### 4. Redeploy
After adding environment variables:
- Vercel Dashboard → Deployments → Click "..." → **Redeploy**

---

## ✅ Verification Checklist

Visit your deployed site and check:

- [ ] Site loads: `https://your-project.vercel.app`
- [ ] API health: `https://your-project.vercel.app/api/health`
- [ ] Chatbot opens when clicking "Resume" button
- [ ] Chatbot responds to messages
- [ ] Token counter updates
- [ ] All animations work
- [ ] Theme toggle works
- [ ] Mobile responsive

---

## 🐛 Quick Troubleshooting

### Chatbot not working?
1. Check `/api/health` endpoint
2. Verify environment variables in Vercel
3. Check Vercel Functions logs
4. Redeploy

### Build failed?
```bash
# Test locally first
npm run build
npm run preview
```

### API errors?
- Vercel Dashboard → Functions → `/api/index` → Check Logs

---

## 📚 Full Documentation

For detailed instructions, see: [`VERCEL_DEPLOYMENT.md`](./VERCEL_DEPLOYMENT.md)

---

## 🎉 Your Site is Live!

**URL:** `https://your-project.vercel.app`

**Features Working:**
- ✅ AI Chatbot with OpenRouter & Groq
- ✅ Token tracking & conversation memory
- ✅ All animations (Framer Motion, GSAP)
- ✅ Theme toggle
- ✅ Responsive design
- ✅ Auto-deploy on git push

**Share it:**
- LinkedIn
- Twitter
- Job applications
- Recruiters

---

**Need help?** Check the full guide: `VERCEL_DEPLOYMENT.md`

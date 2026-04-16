# 🚀 Vercel Deployment Guide

## Quick Setup Checklist

This guide will help you deploy your Next.js app to Vercel and fix the NOT_FOUND error.

---

## Step 1: Set Environment Variables on Vercel ⚙️

### Go to Vercel Dashboard:
1. Login to: https://vercel.com/dashboard
2. Select your project: **blockwebmain**
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### Add These Variables:

Copy and paste each one:

| Variable Name | Value | Notes |
|---|---|---|
| `NEXTAUTH_URL` | `https://blockwebmain-gxbbirykw-block-web01s-projects.vercel.app` | Your Vercel deployment URL |
| `NEXTAUTH_SECRET` | `[Use value from .env.local]` | Keep it secret! |
| `GOOGLE_CLIENT_ID` | `[Get from Google Cloud Console]` | Get from: https://console.cloud.google.com |
| `GOOGLE_CLIENT_SECRET` | `[Get from Google Cloud Console]` | Get from: https://console.cloud.google.com |
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/db` | Replace username, password, cluster, db |
| `ADMIN_EMAIL` | `your-admin@example.com` | Admin panel login email |
| `ADMIN_PASSWORD` | `[secure-password]` | Keep it secure! |
| `SMTP_HOST` | `smtp.gmail.com` | For email services |
| `SMTP_PORT` | `587` | Standard SMTP port |
| `SMTP_USER` | `your-email@gmail.com` | Gmail address |
| `SMTP_PASS` | `[Gmail app password]` | Get from: https://myaccount.google.com/apppasswords |

---

## Step 2: Redeploy Your Application 🔄

After adding environment variables:

1. Go to **Deployments** tab
2. Click the "..." menu on your latest deployment
3. Click **Redeploy**
4. Wait 3-5 minutes for deployment to complete

**Or push new code** - Vercel auto-deploys on git push:
```bash
git add .
git commit -m "Fix: Add environment variable validation and config updates"
git push origin main
```

---

## Step 3: Verify Everything Works ✅

After deployment completes:

1. Visit: https://blockwebmain-gxbbirykw-block-web01s-projects.vercel.app
2. Try these features:
   - ✅ Home page loads
   - ✅ Contact form submits (check inquiries.json or MongoDB)
   - ✅ Admin panel login works
   - ✅ Google OAuth login works

---

## Common Issues & Fixes

### Issue: Still getting 404/NOT_FOUND
**Fix:**
- [ ] Verify all env vars are set in Vercel Dashboard
- [ ] Check that `NEXTAUTH_URL` matches your deployment URL exactly
- [ ] Try redeploy (Deployments → Redeploy)
- [ ] Check deployment logs (Deployments → View Build Logs)

### Issue: Login doesn't work
**Fix:**
- [ ] Make sure `NEXTAUTH_SECRET` is set identically on Vercel and `.env.local`
- [ ] Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct

### Issue: Database connection fails
**Fix:**
- [ ] Verify `MONGODB_URI` is correct in Vercel
- [ ] Check MongoDB network access allows Vercel's IP (Add 0.0.0.0/0)
- [ ] Test connection locally with `npm run dev` to isolate issue

---

## Local Development 💻

Your local `.env.local` is already configured. To run locally:

```bash
cd "D:\college\vs codes\checkfinal\blockwebmain"
npm run dev
```

Visit: http://localhost:3000

✅ Changes to `.env.local` are automatically ignored by git (won't be committed)

---

## Environment Variable Files Explained 📋

| File | Used For | Committed to Git? |
|---|---|---|
| `.env.local` | Local development | ❌ No (in .gitignore) |
| `.env.production` | Production reference | ❌ No (for documentation) |
| Vercel Dashboard | Live deployment | ✅ Yes (secure) |

---

## Troubleshooting Deployment Logs 🔍

If deployment still fails:

1. Go to https://vercel.com/dashboard
2. Click your project
3. Click **Deployments**
4. Click your failed deployment
5. Click **Logs**
6. Search for errors like:
   - "Cannot find module"
   - "NEXTAUTH_URL"
   - "MONGODB_URI"

Share these logs if you need help 👉 https://discord.gg/vercel

---

## Next Steps

1. ✅ Add environment variables to Vercel Dashboard
2. ✅ Redeploy your application
3. ✅ Test all features
4. ✅ Monitor deployment logs

You're all set! 🎉

---

**Need Help?**
- Vercel Support: https://vercel.com/help
- Documentation: https://vercel.com/docs
- Discord: https://discord.gg/vercel

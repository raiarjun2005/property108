# 🚀 Vercel Deployment Guide

## ⚠️ Important: Environment Variables

You **MUST** add your Firebase environment variables in Vercel before deploying!

## Step 1: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables (copy from your `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAtqj0fTCfNqdQ-4Pak88qOpu8lSBXykBw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prop108.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://prop108-default-rtdb.firebaseio.com/
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prop108
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prop108.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=892225319136
NEXT_PUBLIC_FIREBASE_APP_ID=1:892225319136:web:f590be2eb0af93bba5e085
```

4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **Save**

## Step 2: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger a new deployment

## ✅ Verification

After deployment:
- ✅ Build should complete successfully
- ✅ Website should load properties from Firebase
- ✅ No Firebase errors in browser console

## 🔍 Troubleshooting

### Build Still Fails?

1. **Double-check environment variables** in Vercel
2. **Verify database URL** is correct (should end with `.firebaseio.com/`)
3. **Check Firebase Console** - make sure Realtime Database is enabled
4. **Redeploy** after adding variables

### Properties Not Loading?

1. Check browser console for errors
2. Verify Firebase security rules allow read access
3. Make sure data exists in Firebase Console

## 📝 Quick Checklist

- [ ] Environment variables added in Vercel
- [ ] All 7 Firebase variables set
- [ ] Variables available for Production, Preview, Development
- [ ] Redeployed after adding variables
- [ ] Build successful
- [ ] Website working




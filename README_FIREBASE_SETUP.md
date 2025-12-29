# Firebase Realtime Database Setup Guide

This guide will help you set up Firebase Realtime Database for your Property108 listings.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard
4. Enable Google Analytics (optional)

## Step 2: Enable Realtime Database

1. In your Firebase project, go to **Build** > **Realtime Database**
2. Click **Create Database**
3. Choose your location (select closest to your users)
4. Start in **Test Mode** (we'll secure it later)
   - This allows read/write access for 30 days
   - For production, set up proper security rules

## Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app (nickname: "Property108 Web")
5. Copy the Firebase configuration object

## Step 4: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase config values:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## Step 5: Seed Initial Data (Optional)

To populate your database with the existing property data:

1. Install tsx (if not already installed):
   ```bash
   npm install -D tsx
   ```

2. Run the seed script:
   ```bash
   npx tsx scripts/seedFirebase.ts
   ```

   Or if you prefer ts-node:
   ```bash
   npm install -D ts-node
   npx ts-node scripts/seedFirebase.ts
   ```

## Step 6: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your listings page
3. Check Firebase Console > Realtime Database to see your data

## Step 7: Security Rules (Important for Production)

Update your Realtime Database rules in Firebase Console:

```json
{
  "rules": {
    "properties": {
      ".read": true,
      ".write": false
    }
  }
}
```

For production with authentication:
```json
{
  "rules": {
    "properties": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## File Structure

```
lib/
  ├── firebase.ts          # Firebase initialization
  └── firebaseService.ts   # Database operations

types/
  └── property.ts         # TypeScript types

scripts/
  └── seedFirebase.ts     # Initial data seeding script
```

## Available Functions

- `getAllProperties()` - Fetch all properties
- `getPropertyById(id)` - Fetch single property
- `addProperty(property)` - Add new property
- `updateProperty(id, property)` - Update property
- `deleteProperty(id)` - Delete property
- `subscribeToProperties(callback)` - Real-time updates

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that all environment variables are set in `.env.local`
- Restart your dev server after adding env variables

### "Permission denied"
- Check your Realtime Database rules
- Make sure database is in Test Mode or rules allow read access

### Data not showing
- Check browser console for errors
- Verify database URL in Firebase Console
- Ensure data exists in Firebase (check Realtime Database tab)

## Next Steps

- Set up Firebase Authentication for admin access
- Add image upload to Firebase Storage
- Implement admin panel for managing properties
- Set up proper security rules for production


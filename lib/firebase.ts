import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration - check if all required fields are present
const isConfigValid = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.databaseURL &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
};

// Lazy initialization - only initialize when needed and config is valid
let app: FirebaseApp | null = null;
let databaseInstance: Database | null = null;

const getApp = (): FirebaseApp => {
  if (!isConfigValid()) {
    // During build, return a minimal app to prevent crashes
    // This will be properly initialized at runtime
    if (typeof window === 'undefined') {
      // Build time - return existing app or create minimal one
      if (getApps().length > 0) {
        return getApps()[0];
      }
      // Create app with minimal config for build
      return initializeApp({
        projectId: firebaseConfig.projectId || 'prop108',
        databaseURL: firebaseConfig.databaseURL || 'https://prop108-default-rtdb.firebaseio.com/',
      } as any);
    }
    throw new Error(
      'Firebase configuration is incomplete. Please check your environment variables.'
    );
  }

  if (!app) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  }
  return app;
};


// Export database getter function for lazy initialization
const getDatabaseInstance = (): Database => {
  if (!databaseInstance) {
    const firebaseApp = getApp();
    databaseInstance = getDatabase(firebaseApp);
  }
  return databaseInstance;
};

// Export database - only initialize if config is valid, otherwise return a safe fallback
export const database: Database = (() => {
  // During build, if config is invalid, return a minimal database instance
  if (typeof window === 'undefined' && !isConfigValid()) {
    // Return a database that won't crash build but will fail gracefully at runtime
    try {
      const minimalApp = initializeApp({
        projectId: 'prop108',
        databaseURL: 'https://prop108-default-rtdb.firebaseio.com/',
      } as any);
      return getDatabase(minimalApp);
    } catch {
      // If even minimal init fails, return a proxy that throws helpful errors
      return new Proxy({} as Database, {
        get() {
          throw new Error(
            'Firebase Database not initialized. Please set NEXT_PUBLIC_FIREBASE_DATABASE_URL in Vercel environment variables.'
          );
        },
      });
    }
  }
  return getDatabaseInstance();
})();

export default getApp;


// Server-only: Firebase Admin SDK for use in API routes
// Never import this in client components!
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID ?? "scratch-kitchen-tx",
  });
}

export const adminDb = getFirestore();

// Server-only: Firebase Admin SDK for use in API routes
// Never import this in client components!
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID ?? "scratch-kitchen-tx";
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!admin.apps.length) {
  admin.initializeApp({
    credential:
      clientEmail && privateKey
        ? admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          })
        : admin.credential.applicationDefault(),
    projectId,
  });
}

export const adminDb = getFirestore();

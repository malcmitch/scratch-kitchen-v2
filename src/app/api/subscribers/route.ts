import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firestore-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Check for existing subscriber (replaces Prisma's unique constraint)
  const existing = await adminDb
    .collection("subscribers")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!existing.empty) {
    return NextResponse.json({ error: "This email is already subscribed!" }, { status: 409 });
  }

  const data = {
    name,
    email,
    phone: phone || null,
    createdAt: FieldValue.serverTimestamp(),
  };

  const ref = await adminDb.collection("subscribers").add(data);
  return NextResponse.json({ id: ref.id, ...data }, { status: 201 });
}

export async function GET() {
  const snapshot = await adminDb
    .collection("subscribers")
    .orderBy("createdAt", "desc")
    .get();

  const subscribers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(subscribers);
}

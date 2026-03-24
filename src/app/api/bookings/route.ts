import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firestore-admin";
import { isAdminAuthenticated } from "@/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  const { name, email, phone, preferredDate, guestCount, notes } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email, and phone are required" },
      { status: 400 }
    );
  }

  const data = {
    name,
    email,
    phone,
    preferredDate: preferredDate || null,
    guestCount: guestCount ?? null,
    notes: notes || null,
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
  };

  const ref = await adminDb.collection("bookings").add(data);
  return NextResponse.json({ id: ref.id, ...data }, { status: 201 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await adminDb
    .collection("bookings")
    .orderBy("createdAt", "desc")
    .get();

  const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(bookings);
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }

  await adminDb.collection("bookings").doc(id).update({ status });
  return NextResponse.json({ id, status });
}

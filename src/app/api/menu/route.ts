import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firestore-admin";
import { isAdminAuthenticated } from "@/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

export async function GET() {
  const snapshot = await adminDb
    .collection("menuItems")
    .where("active", "==", true)
    .orderBy("category")
    .orderBy("name")
    .get();

  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, category, imageUrl, active, featured } = body;

  if (!name || !description || !price || !category) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const data = {
    name,
    description,
    price: parseFloat(price),
    category,
    imageUrl: imageUrl || null,
    active: active ?? true,
    featured: featured ?? false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  const ref = await adminDb.collection("menuItems").add(data);
  return NextResponse.json({ id: ref.id, ...data }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, name, description, price, category, imageUrl, active, featured } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };
  if (name) updates.name = name;
  if (description) updates.description = description;
  if (price !== undefined) updates.price = parseFloat(price);
  if (category) updates.category = category;
  updates.imageUrl = imageUrl || null;
  if (active !== undefined) updates.active = active;
  if (featured !== undefined) updates.featured = featured;

  await adminDb.collection("menuItems").doc(id).update(updates);
  return NextResponse.json({ id, ...updates });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await adminDb.collection("menuItems").doc(id).delete();
  return NextResponse.json({ ok: true });
}

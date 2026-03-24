import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firestore-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryMethod,
      deliveryAddress,
      items,
      total,
      paymentMethod,
    } = body;

    if (!customerName || !customerPhone || !deliveryMethod || !items || !total || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = {
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
      deliveryMethod,
      deliveryAddress: deliveryAddress || null,
      items,
      total,
      paymentMethod,
      paymentStatus: "pending",
      createdAt: FieldValue.serverTimestamp(),
    };

    const ref = await adminDb.collection("orders").add(data);

    let redirectUrl = "";
    if (paymentMethod === "cashapp") {
      redirectUrl = `https://cash.app/$ChefTikara/${total}`;
    } else {
      // Placeholder Stripe Payment Link for MVP
      redirectUrl = "https://buy.stripe.com/test_placeholder_link";
    }

    return NextResponse.json({ success: true, orderId: ref.id, redirectUrl });
  } catch (error) {
    console.error("Checkout POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

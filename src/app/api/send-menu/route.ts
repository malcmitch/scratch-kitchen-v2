import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { adminDb } from "@/lib/firestore-admin";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { isAdminAuthenticated } from "@/lib/auth";
import WeeklyMenuEmail from "@/emails/WeeklyMenuEmail";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [subscribersSnap, menuSnap] = await Promise.all([
    adminDb.collection("subscribers").get(),
    adminDb
      .collection("menuItems")
      .where("active", "==", true)
      .orderBy("category")
      .orderBy("name")
      .get(),
  ]);

  const subscribers = subscribersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as { id: string; email: string }[];
  const menuItems = menuSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (subscribers.length === 0) {
    return NextResponse.json({ error: "No subscribers to send to." }, { status: 400 });
  }

  if (menuItems.length === 0) {
    return NextResponse.json({ error: "No active menu items to send." }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thescratchkitchentx.com";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html = await render(WeeklyMenuEmail({ menuItems: menuItems as any, siteUrl }));

  const emails = subscribers.map((sub) => ({
    from: `Chef Tikara <${FROM_EMAIL}>`,
    to: sub.email,
    subject: "🍽️ This Week's Fresh Menu is Here! | The Scratch Kitchen",
    html,
  }));

  const batchSize = 100;
  let successCount = 0;

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    await resend.batch.send(batch);
    successCount += batch.length;
  }

  return NextResponse.json({ ok: true, count: successCount });
}

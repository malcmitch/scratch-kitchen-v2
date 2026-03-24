import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminDb } from "@/lib/firestore-admin";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const [menuSnap, subscriberSnap, bookingSnap] = await Promise.all([
    adminDb.collection("menuItems").orderBy("createdAt", "desc").get(),
    adminDb.collection("subscribers").orderBy("createdAt", "desc").get(),
    adminDb.collection("bookings").orderBy("createdAt", "desc").get(),
  ]);

  const menuItems = menuSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const subscribers = subscriberSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const bookings = bookingSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return (
    <AdminDashboard
      initialMenuItems={menuItems as any}
      initialSubscribers={subscribers as any}
      initialBookings={bookings as any}
    />
  );
}

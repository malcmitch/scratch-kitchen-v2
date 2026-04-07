"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  Users,
  Calendar,
  Send,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  CheckCircle,
  XCircle,
} from "lucide-react";
import MenuItemForm from "@/components/admin/MenuItemForm";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Subscriber = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest?: string | null;
  createdAt: Date;
};

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string | null;
  guestCount: number | null;
  notes: string | null;
  status: string;
  createdAt: Date;
};

type Tab = "menu" | "subscribers" | "bookings";

type Props = {
  initialMenuItems: MenuItem[];
  initialSubscribers: Subscriber[];
  initialBookings: Booking[];
};

export default function AdminDashboard({
  initialMenuItems,
  initialSubscribers,
  initialBookings,
}: Props) {
  const [tab, setTab] = useState<Tab>("menu");
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [subscribers] = useState(initialSubscribers);
  const [bookings, setBookings] = useState(initialBookings);

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  const handleSaveItem = async (data: Omit<MenuItem, "id" | "createdAt" | "updatedAt"> & { id?: string }) => {
    setSaving(true);
    try {
      const method = data.id ? "PATCH" : "POST";
      const res = await fetch("/api/menu", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();

      if (data.id) {
        setMenuItems((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
        showToast("Dish updated!");
      } else {
        setMenuItems((prev) => [saved, ...prev]);
        showToast("Dish added!");
      }
      setShowForm(false);
      setEditItem(null);
    } catch {
      showToast("Error saving dish. Try again.");
    }
    setSaving(false);
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Delete this dish from the menu?")) return;
    const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setMenuItems((prev) => prev.filter((i) => i.id !== id));
      showToast("Dish removed.");
    }
  };

  const handleSendMenu = async () => {
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/send-menu", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSendResult(`✅ Menu sent to ${data.count} subscriber${data.count !== 1 ? "s" : ""}!`);
      } else {
        setSendResult("❌ " + (data.error ?? "Failed to send."));
      }
    } catch {
      setSendResult("❌ Failed to send. Check your Resend API key.");
    }
    setSending(false);
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    const res = await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType; count: number }[] = [
    { key: "menu", label: "Menu", icon: UtensilsCrossed, count: menuItems.length },
    { key: "subscribers", label: "Subscribers", icon: Users, count: subscribers.length },
    { key: "bookings", label: "Private Chef Inquiries", icon: Calendar, count: bookings.filter((b) => b.status === "pending").length },
  ];

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-[200] bg-dark text-cream text-sm px-4 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Admin header */}
      <div className="bg-dark text-cream px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p
              className="text-2xl text-gold"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              The Scratch Kitchen
            </p>
            <p className="text-xs text-cream/50 uppercase tracking-widest">
              Admin Dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-cream/60 hover:text-cream text-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Send menu banner */}
      <div className="bg-blush border-b border-rose/20 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-dark text-sm">
              📧 Weekly Menu Email
            </p>
            <p className="text-muted text-xs">
              Send this week's menu to all {subscribers.length} subscribers
            </p>
          </div>
          <div className="flex items-center gap-3">
            {sendResult && (
              <span className="text-sm text-brown">{sendResult}</span>
            )}
            <button
              onClick={handleSendMenu}
              disabled={sending || subscribers.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              <Send size={14} />
              {sending ? "Sending..." : "Send Menu Email"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-blush/50 rounded-2xl p-1 mb-8 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-dark text-cream shadow-sm"
                  : "text-brown hover:text-dark"
              }`}
            >
              <t.icon size={15} />
              {t.label}
              {t.count > 0 && (
                <span className="bg-gold text-dark text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Menu Tab */}
        {tab === "menu" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold text-dark"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Menu Items ({menuItems.length})
              </h2>
              <button
                onClick={() => { setEditItem(null); setShowForm(true); }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                <Plus size={15} /> Add Dish
              </button>
            </div>

            {menuItems.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <UtensilsCrossed size={40} className="mx-auto mb-3 opacity-30" />
                <p>No dishes yet. Add your first dish!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white border border-blush rounded-2xl px-5 py-4 hover:shadow-sm transition-shadow"
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-blush flex items-center justify-center flex-shrink-0">
                        <UtensilsCrossed size={20} className="text-rose/50" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-dark text-sm">{item.name}</p>
                        <span className="text-xs bg-blush text-brown px-2 py-0.5 rounded-full capitalize">
                          {item.category}
                        </span>
                        {!item.active && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            Hidden
                          </span>
                        )}
                        {item.featured && (
                          <span className="text-xs bg-gold/20 text-gold-dark px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-muted text-xs mt-0.5 truncate">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gold text-sm">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => { setEditItem(item); setShowForm(true); }}
                        className="text-muted hover:text-brown p-1"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-muted hover:text-red-500 p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {tab === "subscribers" && (
          <div>
            <h2
              className="text-2xl font-bold text-dark mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Subscribers ({subscribers.length})
            </h2>

            {subscribers.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p>No subscribers yet. Share the website to get signups!</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-blush">
                <table className="w-full text-sm">
                  <thead className="bg-blush/50">
                    <tr>
                      {["Name", "Email", "Phone", "Interest", "Joined"].map((h) => (
                        <th
                          key={h}
                          className="text-left text-xs font-semibold text-brown uppercase tracking-wide px-4 py-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blush bg-white">
                    {subscribers.map((s) => (
                      <tr key={s.id} className="hover:bg-cream/50">
                        <td className="px-4 py-3 font-medium text-dark">{s.name}</td>
                        <td className="px-4 py-3 text-muted">{s.email}</td>
                        <td className="px-4 py-3 text-muted">{s.phone ?? "—"}</td>
                        <td className="px-4 py-3 text-muted capitalize">{s.interest?.replace("-", " ") ?? "—"}</td>
                        <td className="px-4 py-3 text-muted">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {tab === "bookings" && (
          <div>
            <h2
              className="text-2xl font-bold text-dark mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Private Chef Inquiries ({bookings.length})
            </h2>

            {bookings.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p>No booking inquiries yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white border border-blush rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-bold text-dark text-base">{b.name}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted">
                          <a href={`mailto:${b.email}`} className="hover:text-gold">{b.email}</a>
                          <a href={`tel:${b.phone}`} className="hover:text-gold">{b.phone}</a>
                          {b.preferredDate && <span>📅 {b.preferredDate}</span>}
                          {b.guestCount && <span>👥 {b.guestCount} guests</span>}
                        </div>
                        {b.notes && (
                          <p className="text-xs text-brown/70 mt-2 max-w-lg">{b.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                            b.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : b.status === "contacted"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {b.status}
                        </span>
                        {b.status === "pending" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, "contacted")}
                            className="p-1.5 rounded-full hover:bg-blue-100 text-blue-500"
                            title="Mark as Contacted"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {b.status === "contacted" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, "confirmed")}
                            className="p-1.5 rounded-full hover:bg-green-100 text-green-500"
                            title="Mark as Confirmed"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {b.status !== "pending" && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, "pending")}
                            className="p-1.5 rounded-full hover:bg-yellow-100 text-yellow-600"
                            title="Mark as Pending"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted mt-2">
                      Submitted: {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu item form modal */}
      {showForm && (
        <MenuItemForm
          initial={
            editItem
              ? {
                  ...editItem,
                  imageUrl: editItem.imageUrl ?? "",
                }
              : undefined
          }
          onSave={(data) => handleSaveItem(data as MenuItem & { id?: string })}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

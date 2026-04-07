"use client";

import { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    guestCount: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guestCount: form.guestCount ? parseInt(form.guestCount) : undefined,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(
          "Your inquiry has been sent! Chef Tikara will be in touch within 24 hours to discuss your private chef service."
        );
        setForm({ name: "", email: "", phone: "", preferredDate: "", guestCount: "", notes: "" });
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-blush bg-cream text-brown placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm";

  return (
    <div id="contact" className="bg-white rounded-3xl shadow-xl p-8 border border-blush">
      <h3
        className="text-2xl font-bold text-dark mb-2"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Private Chef Inquiry
      </h3>
      <p className="text-muted text-sm mb-6">
        Fill out the form and Chef Tikara will reach out within 24 hours to
        start planning your event.
      </p>

      {status === "success" ? (
        <div className="bg-gold/10 border border-gold/30 rounded-2xl px-6 py-8 text-center">
          <div className="text-4xl mb-3">🍽️</div>
          <p className="text-brown font-semibold mb-1">Inquiry Received!</p>
          <p className="text-muted text-sm">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
                Email *
              </label>
              <input
                type="email"
                required
                placeholder="jane@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
                Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="(832) 555-0000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
                Preferred Date
              </label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) =>
                  setForm({ ...form, preferredDate: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
              Number of Guests
            </label>
            <select
              value={form.guestCount}
              onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
              className={inputClass}
            >
              <option value="">Select guest count</option>
              {[2, 4, 6, 8, 10, 12].map((n) => (
                <option key={n} value={n}>
                  {n} guests
                </option>
              ))}
              <option value="20">12+ guests (large event)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
              Tell us about your event
            </label>
            <textarea
              rows={4}
              placeholder="Share details about the occasion, dietary preferences, service style, venue type, or any special requests..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-xs">{message}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 rounded-full bg-gold text-dark font-bold text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending your request..." : "Send Private Chef Inquiry →"}
          </button>
        </form>
      )}
    </div>
  );
}

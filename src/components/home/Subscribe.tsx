"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Subscribe() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! Watch your inbox every Wednesday.");
        setForm({ name: "", email: "", phone: "" });
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-blush">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
            <Mail size={22} className="text-gold" />
          </div>
        </div>

        <p
          className="text-4xl text-gold mb-2"
          style={{ fontFamily: "var(--font-vibes)" }}
        >
          Stay in the loop
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-dark mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Get the Weekly Menu
        </h2>
        <p className="text-brown/70 text-sm mb-8 max-w-md mx-auto">
          Every Wednesday, Chef Tikara drops a fresh new menu. Be the first to
          know — and never miss out on your favorites.
        </p>

        {status === "success" ? (
          <div className="bg-gold/10 border border-gold/30 rounded-2xl px-6 py-5 text-brown font-medium">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-rose/40 bg-white text-brown placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-rose/40 bg-white text-brown placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number (optional — for text updates)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-rose/40 bg-white text-brown placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm"
            />

            {status === "error" && (
              <p className="text-red-500 text-xs">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Signing you up..." : "Join the List"}
            </button>

            <p className="text-center text-xs text-muted">
              No spam. Just your weekly menu. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

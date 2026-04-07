"use client";

import { useState } from "react";
import { Instagram, Mail, MessageSquareText, Phone } from "lucide-react";

export default function Subscribe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
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
        setForm({ name: "", email: "", phone: "", interest: "" });
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
    <section id="contact" className="py-20 px-4 sm:px-6 bg-blush">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Mail size={22} className="text-gold" />
            </div>
            <p
              className="text-4xl text-gold"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              Get in touch
            </p>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-dark mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to order?
          </h2>
          <p className="text-brown/70 text-sm mb-8 max-w-xl leading-relaxed">
            Reach out however works best for you. Join the weekly menu list,
            ask about meal prep, or send a private chef inquiry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="sms:+13463331292?body=Hi%20Chef%20Tikara!%20I%27d%20like%20to%20place%20an%20order."
              className="rounded-2xl border border-rose/30 bg-white px-5 py-4 hover:border-gold hover:shadow-md transition-all"
            >
              <MessageSquareText size={20} className="text-gold mb-3" />
              <p className="font-semibold text-dark text-sm mb-1">Text Us</p>
              <p className="text-sm text-brown/70">346-333-1292</p>
            </a>
            <a
              href="tel:+13463331292"
              className="rounded-2xl border border-rose/30 bg-white px-5 py-4 hover:border-gold hover:shadow-md transition-all"
            >
              <Phone size={20} className="text-gold mb-3" />
              <p className="font-semibold text-dark text-sm mb-1">Call Us</p>
              <p className="text-sm text-brown/70">346-333-1292</p>
            </a>
            <a
              href="mailto:hello@thescratchkitchentx.com"
              className="rounded-2xl border border-rose/30 bg-white px-5 py-4 hover:border-gold hover:shadow-md transition-all"
            >
              <Mail size={20} className="text-gold mb-3" />
              <p className="font-semibold text-dark text-sm mb-1">Email Us</p>
              <p className="text-sm text-brown/70 break-all">hello@thescratchkitchentx.com</p>
            </a>
            <a
              href="https://instagram.com/thescratchkitchen"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-rose/30 bg-white px-5 py-4 hover:border-gold hover:shadow-md transition-all"
            >
              <Instagram size={20} className="text-gold mb-3" />
              <p className="font-semibold text-dark text-sm mb-1">Follow Us</p>
              <p className="text-sm text-brown/70">@thescratchkitchen</p>
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-rose/30 bg-white p-6 sm:p-8 shadow-sm">
          <h3
            className="text-2xl font-bold text-dark mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Join the Weekly Menu List
          </h3>
          <p className="text-brown/70 text-sm mb-6">
            Get the new menu every Wednesday. Never miss your favorites.
          </p>

          {status === "success" ? (
            <div className="bg-gold/10 border border-gold/30 rounded-2xl px-6 py-5 text-brown font-medium">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
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
              <input
                type="tel"
                placeholder="Phone Number (optional — for text updates)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-rose/40 bg-white text-brown placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm"
              />
              <select
                required
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-rose/40 bg-white text-brown focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm"
              >
                <option value="" disabled>
                  What are you interested in?
                </option>
                <option value="meal-prep">Weekly Meal Prep</option>
                <option value="private-chef">Private Chef Experience</option>
                <option value="both">Both</option>
              </select>

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
      </div>
    </section>
  );
}

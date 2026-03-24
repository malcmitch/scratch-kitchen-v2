"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p
            className="text-4xl text-gold mb-1"
            style={{ fontFamily: "var(--font-vibes)" }}
          >
            The Scratch Kitchen
          </p>
          <p className="text-muted text-xs uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-blush p-8">
          <h1
            className="text-2xl font-bold text-dark mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-brown uppercase tracking-wide block mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-blush bg-cream text-brown focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

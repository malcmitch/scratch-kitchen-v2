"use client";

import { useState } from "react";
import { X } from "lucide-react";

type MenuItem = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  active: boolean;
  featured: boolean;
};

type Props = {
  initial?: MenuItem;
  onSave: (data: MenuItem) => void;
  onCancel: () => void;
  saving: boolean;
};

const CATEGORIES = ["chicken", "beef", "seafood", "pasta", "salads", "vegan", "other"];

export default function MenuItemForm({ initial, onSave, onCancel, saving }: Props) {
  const [form, setForm] = useState<MenuItem>(
    initial ?? {
      name: "",
      description: "",
      price: 0,
      category: "chicken",
      imageUrl: "",
      active: true,
      featured: false,
    }
  );
  
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, imageUrl: data.url });
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch (error) {
      alert("Error uploading image.");
    }
    setUploadingImage(false);
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl border border-blush bg-cream text-brown placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2
            className="text-xl font-bold text-dark"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {initial?.id ? "Edit Dish" : "Add New Dish"}
          </h2>
          <button onClick={onCancel} className="text-muted hover:text-brown">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[0.7rem] font-semibold text-brown uppercase tracking-wide mb-1.5">Dish Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Herb Lemon Chicken"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-[0.7rem] font-semibold text-brown uppercase tracking-wide mb-1.5">Description *</label>
            <textarea
              rows={3}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What's in the dish? How is it prepared?"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.7rem] font-semibold text-brown uppercase tracking-wide mb-1.5">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                }
                placeholder="12.99"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[0.7rem] font-semibold text-brown uppercase tracking-wide mb-1.5">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[0.7rem] font-semibold text-brown uppercase tracking-wide mb-1.5">Dish Photo</label>
            <div className="flex items-center gap-4">
              {form.imageUrl && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-blush">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blush file:text-brown hover:file:bg-rose transition-colors"
                />
                {uploadingImage && <p className="text-xs text-gold mt-1">Uploading...</p>}
                <p className="text-xs text-muted mt-1">Upload a real photo of the dish.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 accent-gold rounded"
              />
              <span className="text-sm text-brown">Active (visible on menu)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
                className="w-4 h-4 accent-gold rounded"
              />
              <span className="text-sm text-brown">Featured on homepage</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-full border border-blush text-brown text-sm font-medium hover:bg-blush transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              disabled={saving || !form.name || !form.description || form.price <= 0}
              className="flex-1 py-2.5 rounded-full bg-gold text-dark text-sm font-bold hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Dish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import MenuCard from "./MenuCard";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
};

const CATEGORIES = [
  { key: "all", label: "All Dishes" },
  { key: "chicken", label: "Chicken" },
  { key: "beef", label: "Beef" },
  { key: "seafood", label: "Seafood" },
  { key: "pasta", label: "Pasta" },
  { key: "salads", label: "Salads" },
  { key: "vegan", label: "Vegan" },
  { key: "other", label: "Other" },
];

export default function MenuGrid({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? items : items.filter((i) => i.category === active);

  // Only show categories that have items (plus "all")
  const availableCategories = CATEGORIES.filter(
    (c) => c.key === "all" || items.some((i) => i.category === c.key)
  );

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🍽️</p>
        <p
          className="text-xl font-semibold text-dark mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Menu Coming Soon
        </p>
        <p className="text-muted text-sm">
          Chef Tikara drops a new menu every Wednesday. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {availableCategories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === c.key
                ? "bg-dark text-cream shadow-md"
                : "bg-blush text-brown hover:bg-rose"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted py-12">
          No dishes in this category this week.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

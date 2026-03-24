"use client";

import { UtensilsCrossed, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((i) => i.id === item.id);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-blush flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-blush overflow-hidden">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UtensilsCrossed size={48} className="text-rose/40" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-brown text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {item.category}
          </span>
        </div>
        {inCart && (
          <div className="absolute top-3 right-3">
            <span className="bg-gold text-dark text-xs font-bold px-2 py-1 rounded-full">
              In cart
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-semibold text-dark text-lg mb-1.5 line-clamp-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {item.name}
        </h3>
        <p className="text-muted text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-gold font-bold text-xl">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              added
                ? "bg-green-100 text-green-700"
                : "bg-gold text-dark hover:bg-gold-light"
            }`}
          >
            {added ? (
              <>
                <Check size={14} /> Added!
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add to Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

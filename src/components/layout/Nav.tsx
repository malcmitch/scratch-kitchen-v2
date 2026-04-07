"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

const links = [
  { href: "/menu", label: "This Week's Menu" },
  { href: "/#services", label: "Private Chef" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className="text-2xl text-gold"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              The Scratch Kitchen
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted -mt-1">
              Chef Tikara
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-brown hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-brown hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-dark text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <Link
              href="/menu"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-gold text-dark text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Order Now
            </Link>

            <button
              className="md:hidden p-2 text-brown"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-cream border-t border-blush px-4 pb-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-brown font-medium border-b border-blush last:border-0 hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="mt-3 block text-center px-4 py-2.5 rounded-full bg-gold text-dark font-semibold hover:bg-gold-light transition-colors"
            >
              Order Now
            </Link>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

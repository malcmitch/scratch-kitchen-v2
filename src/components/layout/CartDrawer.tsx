"use client";

import { X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "info" | "success">("cart");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryMethod: "pickup",
    address: "",
    paymentMethod: "stripe",
  });

  if (!open) return null;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          deliveryMethod: formData.deliveryMethod,
          deliveryAddress: formData.address,
          paymentMethod: formData.paymentMethod,
          items,
          total,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCheckoutStep("success");
        clearCart();
        
        setTimeout(() => {
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          } else {
            setCheckoutStep("cart");
            onClose();
          }
        }, 2500);
      } else {
        alert("There was an error processing your order. Please try again.");
      }
    } catch {
      alert("Error processing your order.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-dark/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-full max-w-sm bg-cream flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-blush">
          <h2
            className="text-xl text-brown"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Order
          </h2>
          <button onClick={onClose} className="text-muted hover:text-brown">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-muted text-sm text-center mt-8">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 pb-4 border-b border-blush"
              >
                <div className="flex-1">
                  <p className="font-medium text-brown text-sm">{item.name}</p>
                  <p className="text-gold text-sm font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-blush text-brown text-sm flex items-center justify-center hover:bg-rose"
                  >
                    −
                  </button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-blush text-brown text-sm flex items-center justify-center hover:bg-rose"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-1 text-muted hover:text-brown"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && checkoutStep === "cart" && (
          <div className="px-5 py-5 border-t border-blush">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-brown">Total</span>
              <span className="text-xl font-bold text-gold">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setCheckoutStep("info")}
              className="w-full py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors"
            >
              Checkout Now
            </button>
          </div>
        )}

        {checkoutStep === "info" && (
          <div className="px-5 py-5 border-t border-blush overflow-y-auto max-h-[50vh]">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => setCheckoutStep("cart")}
                className="text-sm text-brown underline hover:text-gold"
              >
                &larr; Back to Cart
              </button>
              <span className="font-bold text-gold">${total.toFixed(2)} Total</span>
            </div>
            
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brown mb-1">Full Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-blush bg-white text-sm" placeholder="Your name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">Phone *</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-blush bg-white text-sm" placeholder="Phone" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-blush bg-white text-sm" placeholder="Email" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-brown mb-1">Method *</label>
                <select value={formData.deliveryMethod} onChange={e => setFormData({...formData, deliveryMethod: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-blush bg-white text-sm">
                  <option value="pickup">Pickup (Sunday in Richmond)</option>
                  <option value="delivery">Delivery (Mon-Tue +$10 if outside zone)</option>
                </select>
              </div>

              {formData.deliveryMethod === "delivery" && (
                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">Delivery Address *</label>
                  <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-blush bg-white text-sm" placeholder="Street, City, Zip" />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-brown mb-1">Payment Method *</label>
                <select value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-blush bg-white text-sm">
                  <option value="stripe">Pay with Card / Apple Pay</option>
                  <option value="cashapp">Cash App</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        )}

        {checkoutStep === "success" && (
          <div className="px-5 py-8 border-t border-blush text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-brown mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Order Confirmed!</h3>
            <p className="text-sm text-muted">Redirecting you to payment...</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Metadata } from "next";
import { adminDb } from "@/lib/firestore-admin";

export const dynamic = "force-dynamic";
import MenuGrid from "@/components/menu/MenuGrid";
import HowItWorks from "@/components/home/HowItWorks";
import { Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "This Week's Menu | The Scratch Kitchen",
  description:
    "Browse Chef Tikara's fresh weekly meal prep menu in Richmond, TX. New dishes every Wednesday. Order by Friday at 8pm for Sunday pickup or Fort Bend County delivery.",
};

async function getMenuItems() {
  try {
    const snap = await adminDb
      .collection("menuItems")
      .where("active", "==", true)
      .orderBy("category", "asc")
      .orderBy("name", "asc")
      .get();
    
    const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (items.length > 0) return items;
    
    // Fallback mock data if DB is empty
    return [
      { id: "mock1", name: "Herb Lemon Chicken", price: 14.99, category: "chicken", description: "Grilled chicken breast with herbs, roasted veggies & rice", imageUrl: "/images/herb_lemon_chicken.png" },
      { id: "mock2", name: "Garlic Butter Shrimp", price: 16.99, category: "seafood", description: "Gulf shrimp in a rich garlic butter sauce over pasta", imageUrl: "/images/garlic_butter_shrimp.png" },
      { id: "mock3", name: "Braised Short Rib", price: 19.99, category: "beef", description: "Fall-off-the-bone short rib with smashed potatoes", imageUrl: "/images/braised_short_rib.png" },
      { id: "mock4", name: "Power Greens Bowl", price: 12.99, category: "salads", description: "Kale, quinoa, roasted chickpeas & lemon tahini dressing", imageUrl: "/images/power_greens_bowl.png" },
    ];
  } catch (error) {
    console.error("Error fetching menu items from Firestore:", error);
    return [
      { id: "mock1", name: "Herb Lemon Chicken", price: 14.99, category: "chicken", description: "Grilled chicken breast with herbs, roasted veggies & rice", imageUrl: "/images/herb_lemon_chicken.png" },
      { id: "mock2", name: "Garlic Butter Shrimp", price: 16.99, category: "seafood", description: "Gulf shrimp in a rich garlic butter sauce over pasta", imageUrl: "/images/garlic_butter_shrimp.png" },
      { id: "mock3", name: "Braised Short Rib", price: 19.99, category: "beef", description: "Fall-off-the-bone short rib with smashed potatoes", imageUrl: "/images/braised_short_rib.png" },
      { id: "mock4", name: "Power Greens Bowl", price: 12.99, category: "salads", description: "Kale, quinoa, roasted chickpeas & lemon tahini dressing", imageUrl: "/images/power_greens_bowl.png" },
    ];
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div className="pt-4">
      {/* Header */}
      <section className="bg-dark py-10 px-4 sm:px-6 text-center">
        <p
          className="text-5xl text-gold mb-2"
          style={{ fontFamily: "var(--font-vibes)" }}
        >
          Fresh this week
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-cream mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          This Week's Menu
        </h1>
        <p className="text-cream/60 max-w-lg mx-auto text-sm">
          Everything is made from scratch with fresh ingredients by Chef Tikara.
          Order by Friday at 8pm.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="flex items-center gap-2 bg-blush/10 border border-blush/20 rounded-full px-4 py-2 text-sm text-cream/70">
            <Clock size={14} className="text-gold" />
            Menu drops every Wednesday · Orders close Friday at 8pm
          </div>
          <div className="flex items-center gap-2 bg-blush/10 border border-blush/20 rounded-full px-4 py-2 text-sm text-cream/70">
            <MapPin size={14} className="text-gold" />
            Pickup: Richmond TX (Sundays) · Delivery: Fort Bend Co. (Mon–Tue)
          </div>
        </div>
      </section>

      {/* Menu grid */}
      <section className="py-14 px-4 sm:px-6 bg-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <MenuGrid items={items as any} />
        </div>
      </section>

      {/* How it Works section */}
      <HowItWorks />

      {/* Order CTA */}
      <section className="bg-blush py-14 px-4 sm:px-6 text-center border-t border-rose/20">
        <h2
          className="text-2xl font-bold text-dark mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ready to order?
        </h2>
        <p className="text-brown/70 text-sm mb-6">
          Text, call, or email Chef Tikara to place your order.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="sms:+13463331292?body=Hi%20Chef%20Tikara!%20I%27d%20like%20to%20place%20an%20order."
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors"
          >
            📱 Text 346-333-1292
          </a>
          <a
            href="mailto:hello@thescratchkitchentx.com?subject=Meal%20Prep%20Order"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold font-semibold text-sm hover:bg-gold hover:text-dark transition-colors"
          >
            ✉️ Email Us
          </a>
        </div>
      </section>
    </div>
  );
}

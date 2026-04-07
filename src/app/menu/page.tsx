import { Metadata } from "next";
import { adminDb } from "@/lib/firestore-admin";

export const dynamic = "force-dynamic";
import MenuGrid from "@/components/menu/MenuGrid";
import HowItWorks from "@/components/home/HowItWorks";
import { Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "This Week's Menu | The Scratch Kitchen",
  description:
    "Browse Chef Tikara's fresh weekly meal prep menu in Richmond, TX. This week's Mexican-inspired dishes are available now. Place orders by end of day Wednesday for Sunday delivery.",
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
      {
        id: "mock1",
        name: "Southwestern Chicken Bowl",
        price: 15,
        category: "chicken",
        description:
          "Grilled chicken, cilantro lime rice, black beans, corn, and homemade pico de gallo. Add avocado +$2 | shrimp +$5 | salmon +$7",
        imageUrl: "/images/herb_lemon_chicken.png",
      },
      {
        id: "mock2",
        name: "Southwest Shrimp Avocado Salad",
        price: 16,
        category: "salads",
        description:
          "Fresh greens topped with chili lime shrimp, black beans, corn, pico de gallo, red onion, jalapeno, and avocado lime dressing. Chicken option $15 | Salmon option $18",
        imageUrl: "/images/garlic_butter_shrimp.png",
      },
      {
        id: "mock3",
        name: "Chili Lime Salmon Plate",
        price: 19,
        category: "seafood",
        description:
          "Chili lime salmon, cilantro lime rice, black beans, sauteed corn, tomato, red onion, jalapeno, and avocado.",
        imageUrl: "/images/braised_short_rib.png",
      },
    ];
  } catch (error) {
    console.error("Error fetching menu items from Firestore:", error);
    return [
      {
        id: "mock1",
        name: "Southwestern Chicken Bowl",
        price: 15,
        category: "chicken",
        description:
          "Grilled chicken, cilantro lime rice, black beans, corn, and homemade pico de gallo. Add avocado +$2 | shrimp +$5 | salmon +$7",
        imageUrl: "/images/herb_lemon_chicken.png",
      },
      {
        id: "mock2",
        name: "Southwest Shrimp Avocado Salad",
        price: 16,
        category: "salads",
        description:
          "Fresh greens topped with chili lime shrimp, black beans, corn, pico de gallo, red onion, jalapeno, and avocado lime dressing. Chicken option $15 | Salmon option $18",
        imageUrl: "/images/garlic_butter_shrimp.png",
      },
      {
        id: "mock3",
        name: "Chili Lime Salmon Plate",
        price: 19,
        category: "seafood",
        description:
          "Chili lime salmon, cilantro lime rice, black beans, sauteed corn, tomato, red onion, jalapeno, and avocado.",
        imageUrl: "/images/braised_short_rib.png",
      },
    ];
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div className="pt-4">
      {/* Header */}
      <section className="bg-dark py-10 px-4 sm:px-6 text-center">
        <p className="inline-flex items-center rounded-full border border-blush/20 bg-blush/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
          Week of April 7, 2026
        </p>
        <p className="text-gold/90 text-sm sm:text-base italic mb-3">
          Mexican-Inspired · Freshly Prepared · Chef-Curated
        </p>
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
          Place orders by end of day Wednesday for Sunday delivery.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="flex items-center gap-2 bg-blush/10 border border-blush/20 rounded-full px-4 py-2 text-sm text-cream/70">
            <Clock size={14} className="text-gold" />
            New menus weekly · Orders close end of day Wednesday
          </div>
          <div className="flex items-center gap-2 bg-blush/10 border border-blush/20 rounded-full px-4 py-2 text-sm text-cream/70">
            <MapPin size={14} className="text-gold" />
            Meals delivered every Sunday · Fort Bend County
          </div>
        </div>
      </section>

      {/* Menu grid */}
      <section className="py-14 px-4 sm:px-6 bg-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 rounded-[2rem] border-2 border-gold bg-gradient-to-r from-[#fff3ee] to-[#f8e2d9] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p
                  className="text-4xl text-[#b06d5d] mb-2"
                  style={{ fontFamily: "var(--font-vibes)" }}
                >
                  Meal Deal
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-dark mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  4 Dinners for $50
                </h2>
                <p className="text-brown text-lg font-medium mb-2">4 for $65 with Salmon</p>
                <p className="text-sm text-muted">
                  Add avocado +$2 · shrimp +$5 · salmon +$7
                </p>
              </div>
              <a
                href="sms:+13463331292?body=Hi%20Chef%20Tikara!%20I%27d%20like%20to%20order%20the%20Meal%20Deal%20(4%20Dinners%20for%20%2450)."
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-gold-light"
              >
                Grab the Deal
              </a>
            </div>
          </div>
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
          DM, call, text, or email Chef Tikara to place your order by end of day Wednesday.
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

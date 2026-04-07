import Link from "next/link";
import { ChevronRight, UtensilsCrossed } from "lucide-react";
import { adminDb } from "@/lib/firestore-admin";
import { unstable_noStore as noStore } from "next/cache";

async function getFeaturedDishes() {
  noStore();
  try {
    const snap = await adminDb
      .collection("menuItems")
      .where("active", "==", true)
      .where("featured", "==", true)
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
}


export default async function FeaturedDishes() {
  const dishes = await getFeaturedDishes();

  return (
    <section className="py-20 px-4 sm:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p
              className="text-3xl text-gold mb-1"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              Fresh this week
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-dark"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Popular Dishes
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-gold font-semibold text-sm hover:underline"
          >
            View full menu <ChevronRight size={16} />
          </Link>
        </div>

        {dishes.length === 0 ? (
          /* Empty state when no dishes are in DB yet */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Southwestern Chicken Bowl",
                price: 15,
                category: "chicken",
                desc: "Grilled chicken, cilantro lime rice, black beans, corn, and homemade pico de gallo.",
                imageUrl: "/images/herb_lemon_chicken.png",
              },
              {
                name: "Southwest Shrimp Avocado Salad",
                price: 16,
                category: "salads",
                desc: "Fresh greens with chili lime shrimp, black beans, corn, pico de gallo, and avocado lime dressing.",
                imageUrl: "/images/garlic_butter_shrimp.png",
              },
              {
                name: "Chili Lime Salmon Plate",
                price: 19,
                category: "seafood",
                desc: "Chili lime salmon with cilantro lime rice, black beans, sauteed corn, and avocado.",
                imageUrl: "/images/braised_short_rib.png",
              },
            ].map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish: any) => (
              <DishCard
                key={dish.id}
                dish={{
                  name: dish.name,
                  price: dish.price,
                  category: dish.category,
                  desc: dish.description,
                  imageUrl: dish.imageUrl ?? undefined,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type DishCardProps = {
  dish: {
    name: string;
    price: number;
    category: string;
    desc: string;
    imageUrl?: string;
  };
};

function DishCard({ dish }: DishCardProps) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-blush">
      {/* Image */}
      <div className="relative h-48 bg-blush overflow-hidden">
        {dish.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UtensilsCrossed size={40} className="text-rose/50" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-brown text-xs font-medium px-2.5 py-1 rounded-full capitalize">
            {dish.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-semibold text-dark text-base mb-1 line-clamp-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {dish.name}
        </h3>
        <p className="text-muted text-xs leading-relaxed line-clamp-2 mb-3">
          {dish.desc}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gold font-bold text-lg">
            ${dish.price.toFixed(2)}
          </span>
          <Link
            href="/menu"
            className="text-xs font-semibold text-brown hover:text-gold transition-colors"
          >
            Add to order →
          </Link>
        </div>
      </div>
    </div>
  );
}

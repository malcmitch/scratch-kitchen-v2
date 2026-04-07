import Link from "next/link";

const services = [
  {
    title: "Meal Prep",
    icon: "🥗",
    description:
      "Weekly scratch-made meals ready to heat and eat. New menu every Wednesday, orders close Friday at 8pm. Delivery to Fort Bend County.",
    cta: { label: "See the Menu", href: "/menu" },
    featured: true,
  },
  {
    title: "Private Chef",
    icon: "🍽️",
    description:
      "Chef Tikara comes to your home or venue for an unforgettable dining experience. Perfect for dinner parties, celebrations, and special occasions.",
    cta: { label: "Inquire Now", href: "/#contact" },
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 bg-cream border-t border-blush"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-4xl text-gold mb-2"
            style={{ fontFamily: "var(--font-vibes)" }}
          >
            What we offer
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-dark"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`relative rounded-3xl p-8 flex flex-col ${
                s.featured
                  ? "bg-dark text-cream border-2 border-gold"
                  : "bg-blush/50 border border-blush"
              }`}
            >
              {s.featured && (
                <span className="absolute top-4 right-4 bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  s.featured ? "text-cream" : "text-dark"
                }`}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.title}
              </h3>
              <p
                className={`text-sm leading-relaxed flex-1 mb-6 ${
                  s.featured ? "text-cream/70" : "text-brown/70"
                }`}
              >
                {s.description}
              </p>
              <Link
                href={s.cta.href}
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                  s.featured
                    ? "bg-gold text-dark hover:bg-gold-light"
                    : "border-2 border-gold text-gold hover:bg-gold hover:text-dark"
                }`}
              >
                {s.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Metadata } from "next";
import BookingForm from "@/components/date-night/BookingForm";
import { Wine, ChefHat, Music, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Date Night at Home | The Scratch Kitchen | Chef Tikara",
  description:
    "Book a private Date Night at Home experience with Chef Tikara in Richmond, TX. Personal chef, bartender, curated dinner, wine & cocktails in the comfort of your home or venue.",
};

const includes = [
  {
    icon: ChefHat,
    title: "Personal Chef",
    desc: "Chef Tikara cooks a custom multi-course meal tailored to your taste.",
  },
  {
    icon: Wine,
    title: "Curated Drinks",
    desc: "Wine pairings, signature cocktails, and custom bar setup for your evening.",
  },
  {
    icon: Star,
    title: "Full Setup",
    desc: "Table decor, candles, ambiance — we set the scene so you focus on each other.",
  },
  {
    icon: Music,
    title: "Your Venue",
    desc: "Your home, backyard, or a rented venue — we come to you anywhere in Fort Bend County.",
  },
];

const steps = [
  {
    step: "01",
    title: "Book a Consultation",
    desc: "Fill out the form below. Chef Tikara will reach out within 24 hours to discuss your vision.",
  },
  {
    step: "02",
    title: "Design Your Menu",
    desc: "Choose your courses, dietary needs, wine & cocktail preferences together.",
  },
  {
    step: "03",
    title: "Set the Date",
    desc: "Pick your date and location. We handle all the shopping, prep, and setup.",
  },
  {
    step: "04",
    title: "Enjoy the Experience",
    desc: "Sit back and let Chef Tikara create an unforgettable evening for you and your guests.",
  },
];

export default function DateNightPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] bg-dark flex items-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rose blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center py-20">
          <p
            className="text-6xl text-gold mb-3"
            style={{ fontFamily: "var(--font-vibes)" }}
          >
            Specializing in
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold text-cream mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Date Night
            <br />
            <span className="text-gold">at Home</span>
          </h1>
          <p className="text-cream/70 max-w-2xl mx-auto text-base leading-relaxed mb-8">
            Curate a romantic evening with a personal chef, bartender, and
            dinner in the comfort of your own home or venue. Chef Tikara
            transforms your space into a private dining experience you'll never
            forget.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-dark font-bold hover:bg-gold-light transition-colors"
          >
            🕯️ Book Your Experience
          </a>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-4xl text-gold mb-2"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              Everything taken care of
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-dark"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What's Included
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {includes.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-3xl bg-blush border border-rose/20"
              >
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-gold" />
                </div>
                <h3
                  className="font-bold text-dark text-base mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 bg-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-3xl sm:text-4xl font-bold text-cream"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative">
                <div className="flex items-start gap-4 mb-3">
                  <span
                    className="text-5xl font-bold text-gold/25 leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {s.step}
                  </span>
                </div>
                <h3
                  className="font-semibold text-cream text-base mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.title}
                </h3>
                <p className="text-cream/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / mood */}
      <section className="py-16 px-4 sm:px-6 bg-blush text-center border-y border-rose/20">
        <p
          className="text-5xl text-gold mb-3"
          style={{ fontFamily: "var(--font-vibes)" }}
        >
          "
        </p>
        <blockquote className="max-w-2xl mx-auto text-brown text-lg leading-relaxed italic mb-4">
          She brought the whole restaurant to our living room. The food,
          the drinks, the ambiance — it was the most romantic night we've had
          in years.
        </blockquote>
        <p className="text-muted text-sm">— Happy couple in Sugar Land, TX</p>
      </section>

      {/* Booking form */}
      <section className="py-20 px-4 sm:px-6 bg-cream">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: info */}
          <div>
            <p
              className="text-4xl text-gold mb-2"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              Let's plan it
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-dark mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book Your Date Night
            </h2>
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-dark text-sm">Serving all of Fort Bend County</p>
                  <p className="text-muted text-xs">Richmond, Sugar Land, Katy, Pearland, Missouri City & more</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-dark text-sm">Book 1–2 weeks in advance</p>
                  <p className="text-muted text-xs">Give us time to source the freshest ingredients for your menu</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <div>
                  <p className="font-semibold text-dark text-sm">Questions? Call or text</p>
                  <a
                    href="tel:+13463331292"
                    className="text-gold text-sm font-bold hover:underline"
                  >
                    346-333-1292
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <BookingForm />
        </div>
      </section>
    </div>
  );
}

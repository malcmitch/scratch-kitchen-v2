import { Metadata } from "next";
import BookingForm from "@/components/date-night/BookingForm";
import { ChefHat, Sparkles, Star, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Private Chef Services | The Scratch Kitchen | Chef Tikara",
  description:
    "Inquire about private chef services with Chef Tikara in Richmond, TX. Elevated scratch-made dining for dinner parties, celebrations, and in-home experiences across Fort Bend County.",
};

const includes = [
  {
    icon: ChefHat,
    title: "Personal Chef",
    desc: "Chef Tikara cooks a custom multi-course meal tailored to your taste.",
  },
  {
    icon: Users,
    title: "Hosted Experiences",
    desc: "Perfect for dinner parties, birthdays, celebrations, and elevated in-home gatherings.",
  },
  {
    icon: Star,
    title: "Scratch-Made Menus",
    desc: "Thoughtful menus built around your preferences, dietary needs, and the kind of experience you want to create.",
  },
  {
    icon: Sparkles,
    title: "Your Venue",
    desc: "Your home, backyard, or venue in Fort Bend County — Chef Tikara brings the same care, warmth, and polish anywhere you host.",
  },
];

const steps = [
  {
    step: "01",
    title: "Book a Consultation",
    desc: "Fill out the form below. Chef Tikara will reach out within 24 hours to learn more about your event.",
  },
  {
    step: "02",
    title: "Design Your Menu",
    desc: "Choose your courses, serving style, dietary needs, and event priorities together.",
  },
  {
    step: "03",
    title: "Set the Date",
    desc: "Pick your date and location. We handle all the shopping, prep, and setup.",
  },
  {
    step: "04",
    title: "Enjoy the Experience",
    desc: "Sit back and let Chef Tikara create an elevated dining experience for you and your guests.",
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
            Private Chef
            <br />
            <span className="text-gold">Services</span>
          </h1>
          <p className="text-cream/70 max-w-2xl mx-auto text-base leading-relaxed mb-8">
            From intimate dinners to celebratory gatherings, Chef Tikara brings
            a scratch-made private chef experience to your home or venue.
            Elevated food, thoughtful service, and a menu built around your
            occasion.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-dark font-bold hover:bg-gold-light transition-colors"
          >
            🍽️ Start Your Inquiry
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
          She brought the whole restaurant to our home. The food, the warmth,
          and the attention to detail made the night feel effortless and so
          special for our guests.
        </blockquote>
        <p className="text-muted text-sm">— Happy client in Sugar Land, TX</p>
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
              Plan Your Private Chef Experience
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
                  <p className="text-muted text-xs">Give us time to source the freshest ingredients and shape the right menu for your event</p>
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

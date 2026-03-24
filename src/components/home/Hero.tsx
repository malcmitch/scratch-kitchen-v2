import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream flex items-center overflow-hidden pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blush/40 clip-hero" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-rose/20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gold/10 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-16">
          {/* Text */}
          <div>
            <p
              className="text-5xl text-gold mb-2"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              Introducing
            </p>
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-bold text-dark leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Scratch
              <br />
              <span className="text-gold">Kitchen</span>
            </h1>
            <p className="text-lg text-brown-light mb-2 font-medium">
              Chef Tikara · Richmond, TX
            </p>
            <p className="text-base text-muted mb-8 max-w-md leading-relaxed">
              Scratch-made meal prep, weekly menus, and personal chef
              experiences — delivered fresh to Fort Bend County. Real
              ingredients, real flavor, zero stress.
            </p>

            {/* Schedule callout */}
            <div className="inline-flex flex-col sm:flex-row gap-2 sm:gap-6 bg-blush/60 border border-rose/30 rounded-2xl px-5 py-3 mb-8 text-sm text-brown">
              <span>📅 Menu drops every Wednesday</span>
              <span className="hidden sm:block text-rose/50">·</span>
              <span>🕗 Orders close Friday at 8pm</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-dark font-semibold hover:bg-gold-light transition-colors text-sm"
              >
                View This Week's Menu
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/date-night"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold text-gold font-semibold hover:bg-gold hover:text-dark transition-colors text-sm"
              >
                Date Night at Home
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <p
                  className="text-2xl font-bold text-dark"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  100%
                </p>
                <p className="text-xs text-muted uppercase tracking-wide">
                  Scratch Made
                </p>
              </div>
              <div>
                <p
                  className="text-2xl font-bold text-dark"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Weekly
                </p>
                <p className="text-xs text-muted uppercase tracking-wide">
                  Fresh Menus
                </p>
              </div>
              <div>
                <p
                  className="text-2xl font-bold text-dark"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  FBCo.
                </p>
                <p className="text-xs text-muted uppercase tracking-wide">
                  Delivery Area
                </p>
              </div>
            </div>
          </div>

          {/* Image / Visual placeholder */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 sm:w-[420px] sm:h-[480px]">
              {/* Main image frame */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-blush to-rose shadow-2xl overflow-hidden">
                <img
                  src="/images/chef_tikara.png"
                  alt="Chef Tikara"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card: call/text */}
              <div className="absolute -bottom-4 -left-6 bg-white shadow-xl rounded-2xl px-4 py-3 text-xs">
                <p className="text-muted mb-0.5">Order by phone/text</p>
                <p className="font-bold text-brown text-sm">346-333-1292</p>
              </div>

              {/* Floating card: pickup */}
              <div className="absolute -top-4 -right-4 bg-gold text-dark shadow-xl rounded-2xl px-4 py-3 text-xs font-semibold">
                <p>Pickup: Sundays</p>
                <p className="font-normal text-dark/70">Delivery: Mon–Tue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

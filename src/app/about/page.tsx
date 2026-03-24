import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Chef Tikara | The Scratch Kitchen | Richmond TX",
  description:
    "Meet Chef Tikara, the culinary mind behind The Scratch Kitchen in Richmond, TX. Passionate about scratch cooking, weekly meal prep, and unforgettable dining experiences.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-blush py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <div className="relative">
            <div className="w-full aspect-[4/5] rounded-[3rem] bg-gradient-to-br from-rose to-blush shadow-2xl overflow-hidden flex items-center justify-center relative">
              <img 
                src="https://tsk-website-preview.netlify.app/images/chef_tikara.png" 
                alt="Chef Tikara" 
                className="w-full h-full object-cover z-10"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gold text-dark rounded-2xl px-5 py-3 shadow-lg z-20">
              <p className="font-bold text-sm">Scratch Made</p>
              <p className="text-xs text-dark/70">Always. No shortcuts.</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p
              className="text-5xl text-gold mb-2"
              style={{ fontFamily: "var(--font-vibes)" }}
            >
              Meet
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-dark mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Chef Tikara
            </h1>
            <div className="space-y-4 text-brown/80 text-sm leading-relaxed">
              <p>
                Chef Tikara is a Richmond, Texas-based chef with a deep passion
                for cooking food from scratch — the way it was meant to be made.
                No shortcuts, no compromises, just real ingredients and real
                flavor.
              </p>
              <p>
                The Scratch Kitchen was born out of a simple belief: everyone
                deserves access to delicious, home-cooked meals, even when life
                gets busy. That's why Chef Tikara crafts a fresh weekly menu
                every Wednesday, ready for pickup on Sundays or delivery across
                Fort Bend County.
              </p>
              <p>
                From hearty protein bowls to elegant date night experiences,
                Chef Tikara brings the same love and attention to every dish —
                whether it's a quick weeknight meal prep or a five-course dinner
                in your living room.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/menu"
                className="px-6 py-3 rounded-full bg-gold text-dark font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                View This Week's Menu
              </Link>
              <Link
                href="/date-night"
                className="px-6 py-3 rounded-full border-2 border-gold text-gold font-semibold text-sm hover:bg-gold hover:text-dark transition-colors"
              >
                Book a Date Night
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 bg-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-bold text-cream mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: "🌿", title: "Real Ingredients", desc: "No fillers, no shortcuts. Every dish starts from scratch with fresh, quality produce and proteins." },
              { emoji: "❤️", title: "Community First", desc: "Proudly serving Richmond and Fort Bend County. Local, personal, and always accessible." },
              { emoji: "✨", title: "Elevated Everyday", desc: "Whether it's Tuesday's meal prep or a Saturday date night — every meal deserves to be special." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3
                  className="font-bold text-cream text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {v.title}
                </h3>
                <p className="text-cream/60 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    number: "01",
    title: "Browse the Menu",
    description:
      "A new menu drops every Wednesday. Browse fresh, scratch-made dishes — chicken, beef, seafood, pasta, salads, and more.",
    icon: "🍽️",
  },
  {
    number: "02",
    title: "Place Your Order",
    description:
      "Order by Friday at 8pm. Call or text 346-333-1292, or order online. Choose pickup or delivery.",
    icon: "📱",
  },
  {
    number: "03",
    title: "Enjoy Your Meals",
    description:
      "Pick up on Sunday in Richmond, TX — or get it delivered Monday or Tuesday anywhere in Fort Bend County.",
    icon: "✨",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-4xl text-gold mb-2"
            style={{ fontFamily: "var(--font-vibes)" }}
          >
            Simple as that
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-cream"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold/50 to-transparent z-0" />
              )}

              <div className="relative z-10 flex flex-col items-start">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{step.icon}</span>
                  <span
                    className="text-6xl font-bold text-gold/20"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3
                  className="text-xl font-semibold text-cream mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {step.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule bar */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { day: "Wednesday", action: "Menu Drops", bg: "bg-blush/10 border-blush/20" },
            { day: "Friday 8pm", action: "Orders Close", bg: "bg-rose/10 border-rose/20" },
            { day: "Sun · Mon · Tue", action: "Pickup & Delivery", bg: "bg-gold/10 border-gold/20" },
          ].map((item) => (
            <div
              key={item.day}
              className={`${item.bg} border rounded-2xl px-6 py-4`}
            >
              <p className="text-gold font-semibold text-sm mb-1">
                {item.action}
              </p>
              <p className="text-cream/70 text-sm">{item.day}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

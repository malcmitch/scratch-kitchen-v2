import React from "react";

const schedule = [
  {
    day: "Wednesday",
    event: "Menu Drops",
    description: "New featured dishes are announced.",
    icon: "📜",
  },
  {
    day: "Wednesday",
    event: "Orders Close",
    description: "Place orders by end of day for this week's delivery.",
    icon: "⏱️",
  },
  {
    day: "Sunday",
    event: "Delivery Day",
    description: "Fresh meals are delivered for the week ahead.",
    icon: "🚗",
  },
];

export default function CalendarStrip() {
  return (
    <section className="bg-blush py-16 px-4 sm:px-6 border-y border-blush-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-bold text-dark"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Weekly Flow
          </h2>
          <p className="text-sm text-brown mt-2">
            Fresh meals weekly. Order by Wednesday, delivered Sunday.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[3.5rem] left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent -z-0" />

          {schedule.map((item, index) => (
            <div
              key={item.day}
              className="relative z-10 bg-cream/80 backdrop-blur-sm p-6 rounded-[2rem] border border-blush shadow-lg hover:-translate-y-1 transition-transform"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-2xl mb-4 mx-auto border border-gold/20 shadow-inner">
                {item.icon}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">
                  {item.day}
                </p>
                <h3
                  className="text-lg font-bold text-dark mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.event}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

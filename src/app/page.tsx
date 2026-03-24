import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import CalendarStrip from "@/components/home/CalendarStrip";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import Services from "@/components/home/Services";
import Subscribe from "@/components/home/Subscribe";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "The Scratch Kitchen",
            description:
              "Scratch-made meal prep service in Richmond, TX serving Fort Bend County",
            telephone: "+13463331292",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Richmond",
              addressRegion: "TX",
              addressCountry: "US",
            },
            areaServed: "Fort Bend County, TX",
            priceRange: "$$",
            openingHours: "We-We 00:00-23:59",
          }),
        }}
      />
      <Hero />
      <HowItWorks />
      <CalendarStrip />
      <FeaturedDishes />
      <Services />
      <Subscribe />
    </>
  );
}

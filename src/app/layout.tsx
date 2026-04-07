import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Scratch Kitchen | Meal Prep in Richmond TX | Chef Tikara",
  description:
    "Chef Tikara's scratch-made meal prep and private chef service in Richmond, Texas. Fresh weekly menus delivered every Sunday across Fort Bend County. Place orders by end of day Wednesday.",
  keywords: [
    "meal prep Richmond TX",
    "meal prep Fort Bend County",
    "Chef Tikara",
    "The Scratch Kitchen",
    "healthy meal prep Houston",
    "meal delivery Richmond Texas",
    "personal chef Richmond TX",
    "private chef Fort Bend County",
  ],
  openGraph: {
    title: "The Scratch Kitchen | Chef Tikara",
    description:
      "Scratch-made meal prep and private chef service in Richmond, TX. Weekly menus, Sunday delivery, and Fort Bend County service.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${vibes.variable} antialiased`}
      >
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

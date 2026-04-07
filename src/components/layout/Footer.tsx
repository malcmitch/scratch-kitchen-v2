import Link from "next/link";
import { Phone, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p
            className="text-3xl text-gold mb-1"
            style={{ fontFamily: "var(--font-vibes)" }}
          >
            The Scratch Kitchen
          </p>
          <p className="text-xs uppercase tracking-widest text-cream/50 mb-4">
            Chef Tikara
          </p>
          <p className="text-sm leading-relaxed text-cream/70">
            Fresh, scratch-made meal prep in Richmond, TX. Serving Fort Bend
            County with love, one meal at a time.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-cream mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/menu", label: "This Week's Menu" },
              { href: "/#services", label: "Private Chef" },
              { href: "/about", label: "About Chef Tikara" },
              { href: "/#contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-gold transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-cream mb-4 text-sm uppercase tracking-wider">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-gold shrink-0" />
              <a
                href="tel:+13463331292"
                className="hover:text-gold transition-colors"
              >
                346-333-1292
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={15} className="text-gold shrink-0" />
              <a
                href="https://instagram.com/thescratchkitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                @thescratchkitchen
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
              <span>Richmond, TX · Fort Bend County</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-gold shrink-0" />
              <a
                href="mailto:hello@thescratchkitchentx.com"
                className="hover:text-gold transition-colors"
              >
                hello@thescratchkitchentx.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 sm:px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
        <p>© {new Date().getFullYear()} The Scratch Kitchen. All rights reserved.</p>
        <p className="text-center">
          Menu updates every Wednesday · Orders close Friday at 8pm
        </p>
      </div>
    </footer>
  );
}

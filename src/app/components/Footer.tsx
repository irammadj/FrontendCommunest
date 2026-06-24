import { Link } from "react-router";
import {
  Home,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Building2,
} from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#040b14", borderTop: "1px solid #1e3a5f" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                }}
              >
                <Home size={16} className="text-white" />
              </div>
              <span
                className="text-white text-xl"
                style={{ fontWeight: 700, letterSpacing: "-0.5px" }}
              >
                COMMUNEST
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              Kenya's premier platform connecting house hunters with quality
              estates and helping estate managers grow their communities.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                {
                  Icon: Facebook,
                  label: "Facebook",
                  url: "https://facebook.com/communest.ke",
                  hoverBg: "#1877f2",
                },
                {
                  Icon: Instagram,
                  label: "Instagram",
                  url: "https://instagram.com/communest.ke",
                  hoverBg: "#e1306c",
                },
                {
                  Icon: Twitter,
                  label: "X (Twitter)",
                  url: "https://twitter.com/communest.ke",
                  hoverBg: "#000",
                },
              ].map(({ Icon, label, url, hoverBg }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "#1e3a5f", color: "#94a3b8" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = hoverBg;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1e3a5f";
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600 }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Explore Estates", to: "/explore" },
                { label: "My Estate", to: "/estate" },
                { label: "List Your Estate", to: "/list-estate" },
                { label: "About Communest", to: "/about" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-blue-400"
                    style={{ color: "#94a3b8" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600 }}>
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "House Hunting",
                "Estate Management",
                "Tenant Portal",
                "Rent Payments",
                "Maintenance Requests",
                "Estate Listings",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm flex items-center gap-2"
                  style={{ color: "#94a3b8" }}
                >
                  <Building2 size={12} style={{ color: "#1d6fce" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 600 }}>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  style={{ color: "#1d6fce", marginTop: 2, flexShrink: 0 }}
                />
                <span className="text-sm" style={{ color: "#94a3b8" }}>
                  Upperhill, Nairobi
                  <br />
                  Nairobi County, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: "#1d6fce", flexShrink: 0 }} />
                <a
                  href="tel:+254700000000"
                  className="text-sm hover:text-blue-400 transition-colors"
                  style={{ color: "#94a3b8" }}
                >
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: "#1d6fce", flexShrink: 0 }} />
                <a
                  href="mailto:hello@communest.co.ke"
                  className="text-sm hover:text-blue-400 transition-colors"
                  style={{ color: "#94a3b8" }}
                >
                  hello@communest.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid #1e3a5f" }}
        >
          <p className="text-xs" style={{ color: "#475569" }}>
            &copy; {new Date().getFullYear()} Communest Kenya. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms of Service", to: "/terms-of-service" },
              { label: "Cookie Policy", to: "/cookie-policy" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-xs hover:text-blue-400 transition-colors"
                style={{ color: "#475569" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

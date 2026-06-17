import { Link } from "react-router";
import { ArrowRight, Heart, Users, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ background: "#060d17", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div
        className="py-20 px-6"
        style={{
          background: "linear-gradient(135deg, #040b14, #060d17, #0a1830)",
          borderBottom: "1px solid #1e3a5f",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm mb-3"
            style={{
              color: "#3b82f6",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            About Communest
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontWeight: 800, fontSize: 44, lineHeight: 1.2 }}
          >
            Kenya's Premier Housing Platform
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#94a3b8", lineHeight: 1.8 }}
          >
            Connecting tenants with quality estates and empowering property
            managers with modern tools to build thriving residential
            communities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-sm mb-2"
              style={{
                color: "#3b82f6",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Our Mission
            </p>
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 800, fontSize: 32 }}
            >
              Making Housing Accessible
            </h2>
            <p
              className="text-lg mb-6"
              style={{ color: "#94a3b8", lineHeight: 1.8 }}
            >
              We believe everyone deserves access to quality housing. Communest
              simplifies the rental process by connecting tenants directly with
              reputable estates and providing landlords with the tools they need
              to manage properties efficiently.
            </p>
            <p style={{ color: "#64748b", lineHeight: 1.8 }}>
              Our platform eliminates intermediaries, reduces costs, and creates
              a transparent, trustworthy ecosystem for the rental housing market
              in Kenya.
            </p>
          </div>
          <div
            className="rounded-2xl p-8 h-full"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(59,130,246,0.15)" }}
              >
                <Heart size={24} style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 700 }}>
                  Trust First
                </p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  Transparency in every transaction
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.15)" }}
              >
                <Zap size={24} style={{ color: "#10b981" }} />
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 700 }}>
                  Fast & Simple
                </p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  Find housing in minutes, not months
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(245,158,11,0.15)" }}
              >
                <Globe size={24} style={{ color: "#f59e0b" }} />
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 700 }}>
                  Community
                </p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  Building better neighborhoods together
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <p
            className="text-sm mb-3"
            style={{
              color: "#3b82f6",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Our Values
          </p>
          <h2
            className="text-white mb-8"
            style={{ fontWeight: 800, fontSize: 32 }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "User-Centric",
                desc: "We design every feature with our users' needs at the center.",
                color: "#3b82f6",
                bg: "rgba(59,130,246,0.1)",
              },
              {
                icon: Zap,
                title: "Innovation",
                desc: "We continuously improve to stay ahead of market needs.",
                color: "#10b981",
                bg: "rgba(16,185,129,0.1)",
              },
              {
                icon: Heart,
                title: "Integrity",
                desc: "Honesty and fairness guide all our business decisions.",
                color: "#f59e0b",
                bg: "rgba(245,158,11,0.1)",
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: bg }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <p
                  className="text-white mb-2"
                  style={{ fontWeight: 700, fontSize: 18 }}
                >
                  {title}
                </p>
                <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="rounded-2xl p-12"
          style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
        >
          <h2
            className="text-white mb-12 text-center"
            style={{ fontWeight: 800, fontSize: 32 }}
          >
            By The Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { stat: "50+", label: "Estates" },
              { stat: "1,000+", label: "Listings" },
              { stat: "10,000+", label: "Users" },
              { stat: "98%", label: "Satisfaction" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-white mb-2"
                  style={{ fontWeight: 800, fontSize: 36 }}
                >
                  {stat}
                </p>
                <p style={{ color: "#94a3b8" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
          }}
        >
          <h2
            className="text-white mb-4"
            style={{ fontWeight: 800, fontSize: 32 }}
          >
            Ready to Find Your Dream Home?
          </h2>
          <p
            className="mb-8 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}
          >
            Join thousands of tenants and property managers already using
            Communest to simplify the housing experience.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            Explore Estates <ArrowRight size={18} />
          </Link>
        </div>

        {/* Contact Section */}
        <div className="text-center space-y-6">
          <h2 className="text-white" style={{ fontWeight: 800, fontSize: 32 }}>
            Get In Touch
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.8 }}>
            Have questions? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@communest.co.ke"
              className="px-6 py-3 rounded-xl text-white"
              style={{
                background: "#0d1a2e",
                border: "1px solid #1e3a5f",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Email Us
            </a>
            <a
              href="tel:+254700000000"
              className="px-6 py-3 rounded-xl text-white"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Call +254 700 000 000
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div
        className="py-8 px-6 border-t"
        style={{ borderColor: "#1e3a5f", background: "#0a0f1a" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p style={{ color: "#64748b" }}>
            © 2026 Communest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com/communestke"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/communestke"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/communest.ke"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#3b82f6", textDecoration: "none" }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

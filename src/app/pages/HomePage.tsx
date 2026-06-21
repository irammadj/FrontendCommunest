import { Link } from "react-router";
import {
  Search,
  Building2,
  Shield,
  Star,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Home,
  Users,
  TrendingUp,
} from "lucide-react";
import { mockEstates } from "../data/mockData";

const stats = [
  { label: "Listed Estates", value: "120+", icon: Building2 },
  { label: "Happy Tenants", value: "3,400+", icon: Users },
  { label: "Counties Covered", value: "20+", icon: MapPin },
  { label: "Successful Rentals", value: "5,000+", icon: TrendingUp },
];

const features = [
  {
    icon: Search,
    title: "Easy House Hunting",
    desc: "Browse hundreds of verified estates across Kenya. Filter by county, price, and amenities to find your perfect home.",
  },
  {
    icon: Shield,
    title: "Verified & Approved",
    desc: "Every estate on Communest goes through a thorough approval process with documentation verification before listing.",
  },
  {
    icon: Building2,
    title: "Estate Management",
    desc: "Estate managers get a powerful portal to post vacancies, send announcements, manage tenants, and track payments.",
  },
  {
    icon: Star,
    title: "Premium Listings",
    desc: "Detailed listings with photos, amenities, title deed info, and direct contact to estate management.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create an Account",
    desc: "Sign up for free with your name, email and a secure password.",
  },
  {
    step: "02",
    title: "Explore Estates",
    desc: "Browse approved estates across all Kenya counties and find the one that suits you.",
  },
  {
    step: "03",
    title: "Apply for a House",
    desc: "Select a vacant unit, fill in your details and submit your application directly to the estate manager.",
  },
  {
    step: "04",
    title: "Move In & Settle",
    desc: "Once approved, access your estate portal to stay updated on announcements, events and payments.",
  },
];

export default function HomePage() {
  const featuredEstates = mockEstates.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        id="hero-section"
        className="relative min-h-[90vh] flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #040b14 0%, #060d17 40%, #0a1830 100%)",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #1d6fce 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0ea5e9 0%, transparent 40%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center w-full">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
            style={{ fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1 }}
          >
            Find Your Perfect
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Home in Kenya
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
            style={{ color: "#94a3b8", lineHeight: 1.8 }}
          >
            Browse verified residential estates across all 47 counties. From
            Nairobi to Mombasa, Kisumu to Nakuru — your next home is just a
            click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              id="explore-btn"
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                fontWeight: 600,
                fontSize: 16,
                boxShadow: "0 0 30px rgba(29,111,206,0.4)",
              }}
            >
              <Search size={18} /> Explore Estates
            </Link>
            <Link
              id="list-btn"
              to="/list-estate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              <Building2 size={18} /> List Your Estate
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(13,26,46,0.8)",
                  border: "1px solid #1e3a5f",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon
                  size={20}
                  style={{ color: "#3b82f6", margin: "0 auto 8px" }}
                />
                <div
                  className="text-2xl text-white"
                  style={{ fontWeight: 800 }}
                >
                  {value}
                </div>
                <div className="text-xs mt-1" style={{ color: "#64748b" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6" style={{ background: "#060d17" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm mb-3"
              style={{
                color: "#3b82f6",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Why Communest?
            </p>
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 38 }}
            >
              Everything You Need to
              <br />
              Find or Manage a Home
            </h2>
            <p style={{ color: "#64748b", maxWidth: 520, margin: "0 auto" }}>
              Whether you're looking for a house or managing an estate,
              Communest provides the tools and transparency you need.
            </p>
          </div>
          <div
            id="features-section"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 transition-all hover:-translate-y-1"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(29,111,206,0.15)",
                    border: "1px solid rgba(29,111,206,0.3)",
                  }}
                >
                  <Icon size={22} style={{ color: "#3b82f6" }} />
                </div>
                <h3
                  className="text-white mb-3"
                  style={{ fontWeight: 600, fontSize: 17 }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Estates */}
      <section className="py-24 px-6" style={{ background: "#04090f" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
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
                Top Picks
              </p>
              <h2
                className="text-white"
                style={{ fontWeight: 700, fontSize: 34 }}
              >
                Featured Estates
              </h2>
            </div>
            <Link
              to="/explore"
              className="flex items-center gap-1 text-sm hover:text-blue-400 transition-colors"
              style={{ color: "#3b82f6", fontWeight: 600 }}
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEstates.map((estate) => (
              <div
                key={estate.id}
                className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1 group"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={estate.photo}
                    alt={estate.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,13,23,0.6), transparent)",
                    }}
                  />
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs"
                    style={{
                      background: "rgba(16,185,129,0.2)",
                      border: "1px solid rgba(16,185,129,0.4)",
                      color: "#10b981",
                    }}
                  >
                    ✓ Approved
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-white mb-1"
                    style={{ fontWeight: 700, fontSize: 18 }}
                  >
                    {estate.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin size={13} style={{ color: "#3b82f6" }} />
                    <span className="text-sm" style={{ color: "#64748b" }}>
                      {estate.location}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "#64748b" }}
                  >
                    {estate.description.slice(0, 100)}…
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {estate.amenities.slice(0, 3).map((a) => (
                      <span
                        key={a}
                        className="px-2.5 py-1 rounded-lg text-xs"
                        style={{
                          background: "rgba(29,111,206,0.1)",
                          color: "#3b82f6",
                          border: "1px solid rgba(29,111,206,0.2)",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                    {estate.amenities.length > 3 && (
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs"
                        style={{ background: "#1e3a5f", color: "#94a3b8" }}
                      >
                        +{estate.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/explore/${estate.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                      fontWeight: 600,
                    }}
                  >
                    View Estate <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6" style={{ background: "#060d17" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-sm mb-3"
              style={{
                color: "#3b82f6",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Simple Process
            </p>
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 38 }}
            >
              How Communest Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl text-white"
                  style={{
                    background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                    fontWeight: 800,
                  }}
                >
                  {step}
                </div>
                <h3 className="text-white mb-2" style={{ fontWeight: 700 }}>
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#64748b" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#04090f" }}>
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl p-12"
          style={{
            background: "linear-gradient(135deg, #0d1a2e, #091220)",
            border: "1px solid #1e3a5f",
          }}
        >
          <Home size={40} style={{ color: "#3b82f6", margin: "0 auto 16px" }} />
          <h2
            className="text-white mb-4"
            style={{ fontWeight: 700, fontSize: 34 }}
          >
            Ready to Find Your Home?
          </h2>
          <p className="mb-8" style={{ color: "#64748b", lineHeight: 1.8 }}>
            Join thousands of Kenyans who found their dream home through
            Communest. Start your journey today — it's free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                fontWeight: 600,
              }}
            >
              Create Free Account
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 rounded-xl transition-colors hover:bg-white/5"
              style={{
                border: "1px solid #1e3a5f",
                color: "#e2e8f0",
                fontWeight: 600,
              }}
            >
              Browse Estates
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {["No hidden fees", "Verified estates", "Secure platform"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#64748b" }}
                >
                  <CheckCircle2 size={14} style={{ color: "#10b981" }} /> {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Hidden help hint for onboarding */}
      <div id="help-hint" style={{ display: "none" }} />
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MessageSquare,
  X,
  Home,
  Search,
  Building2,
  User,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  MapPin,
  Star,
} from "lucide-react";

type Screen = "home" | "faq" | "contact" | "navigate" | "faq-answer";

interface FAQ {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: "Renting",
    q: "How do I rent a house on Communest?",
    a: 'Browse estates on the Explore page, click on a house you like, and click "Apply for Rent". You\'ll need to create an account first. Our team will contact you within 24 hours.',
  },
  {
    category: "Renting",
    q: "What documents do I need to rent?",
    a: "You'll need a National ID or Passport, proof of income (payslip or bank statement), and a recent utility bill. Some estates may require additional documents.",
  },
  {
    category: "Renting",
    q: "How much is the deposit?",
    a: "Deposits vary by estate but are typically 1–2 months rent. This is fully refundable at the end of your tenancy if no damages are incurred.",
  },
  {
    category: "Payments",
    q: "How do I pay rent?",
    a: "Rent can be paid via M-Pesa Paybill or bank transfer. Your estate admin will provide the specific payment details in the Payments section of your Estate Portal.",
  },
  {
    category: "Payments",
    q: "When is rent due?",
    a: "Rent is typically due on the 5th of every month. Check your Estate Portal under Payments for your specific due date.",
  },
  {
    category: "Payments",
    q: "What happens if I pay late?",
    a: "Late payments may incur a penalty fee as per your tenancy agreement. Contact your estate admin immediately if you anticipate a late payment.",
  },
  {
    category: "Estate Admins",
    q: "How do I list my estate on Communest?",
    a: 'Click "List Your Estate" on the homepage. Fill in your estate details, upload photos, and submit for review. Approval takes 2–3 business days.',
  },
  {
    category: "Estate Admins",
    q: "How do I post vacant houses?",
    a: 'Log in as admin, go to My Estate → Manage tab, and click "Post Vacant House". Add unit details, amenities, rent, and photos.',
  },
  {
    category: "Estate Admins",
    q: "How do I send announcements to tenants?",
    a: 'Go to My Estate → Notifications tab and click "Post Notification". All tenants in your estate will see it immediately in their portal.',
  },
  {
    category: "Account",
    q: "How do I create an account?",
    a: 'Click "Register" in the top right corner. Fill in your name, email, and password. You can also sign in with an existing account.',
  },
  {
    category: "Account",
    q: "I forgot my password. What do I do?",
    a: 'Click "Sign In", then "Forgot Password". Enter your email and we\'ll send you a reset link within a few minutes.',
  },
  {
    category: "Maintenance",
    q: "How do I report a maintenance issue?",
    a: "Go to My Estate → Maintenance tab. Your estate admin will see your report and update the status as it's being resolved.",
  },
];

const navLinks = [
  {
    label: "Home",
    path: "/",
    icon: Home,
    desc: "Back to the main page",
  },
  {
    label: "Explore Estates",
    path: "/explore",
    icon: Search,
    desc: "Browse all available estates",
  },
  {
    label: "My Estate Portal",
    path: "/estate",
    icon: Building2,
    desc: "Access your estate dashboard",
  },
  {
    label: "List Your Estate",
    path: "/list-estate",
    icon: Star,
    desc: "Register your estate on Communest",
  },
  {
    label: "About Us",
    path: "/about",
    icon: HelpCircle,
    desc: "Learn about Communest",
  },
  {
    label: "Sign In / Register",
    path: "/signin",
    icon: User,
    desc: "Access your account",
  },
];

const quickLinks = [
  { label: "Explore Estates", path: "/explore", icon: Search },
  { label: "My Estate", path: "/estate", icon: Building2 },
  { label: "List Estate", path: "/list-estate", icon: Star },
  { label: "Sign In", path: "/signin", icon: User },
];

const categories = [...new Set(faqs.map((f) => f.category))];

export default function ChatBot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const goHome = () => {
    setScreen("home");
    setSelectedFaq(null);
    setSelectedCategory(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    goHome();
  };

  const filteredFaqs = selectedCategory
    ? faqs.filter((f) => f.category === selectedCategory)
    : faqs;

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: 90,
            right: 20,
            width: 340,
            height: 520,
            background: "#0a1628",
            border: "1px solid #1e3a5f",
            borderRadius: 20,
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #1d6fce, #0ea5e9)" }}
          >
            <div className="flex items-center gap-3">
              {screen !== "home" && (
                <button
                  onClick={goHome}
                  className="p-1 rounded-lg hover:bg-white/20 transition-all"
                >
                  <ArrowLeft size={15} style={{ color: "#fff" }} />
                </button>
              )}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <MessageSquare size={16} style={{ color: "#fff" }} />
              </div>
              <div>
                <p
                  className="text-white text-sm"
                  style={{ fontWeight: 700, lineHeight: 1.2 }}
                >
                  Communest Help
                </p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
                  {screen === "home"
                    ? "How can we help you?"
                    : screen === "faq"
                      ? "Frequently Asked Questions"
                      : screen === "contact"
                        ? "Contact & Social"
                        : screen === "navigate"
                          ? "Navigate the Site"
                          : "Answer"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-all"
            >
              <X size={15} style={{ color: "#fff" }} />
            </button>
          </div>

          {/* Content */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1e3a5f transparent",
            }}
          >
            {/* Home screen */}
            {screen === "home" && (
              <div className="p-4 space-y-3">
                <div
                  className="rounded-2xl p-4 mb-2"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "#94a3b8", lineHeight: 1.7 }}
                  >
                    👋 Welcome to{" "}
                    <span style={{ color: "#3b82f6", fontWeight: 600 }}>
                      Communest
                    </span>{" "}
                    — Kenya's leading housing platform. What would you like help
                    with today?
                  </p>
                </div>

                {[
                  {
                    icon: HelpCircle,
                    label: "Frequently Asked Questions",
                    desc: "Find answers to common questions",
                    screen: "faq" as Screen,
                    color: "#3b82f6",
                    bg: "rgba(59,130,246,0.1)",
                  },
                  {
                    icon: MapPin,
                    label: "Navigate the Website",
                    desc: "Go to a specific page or section",
                    screen: "navigate" as Screen,
                    color: "#10b981",
                    bg: "rgba(16,185,129,0.1)",
                  },
                  {
                    icon: Phone,
                    label: "Contact & Social Media",
                    desc: "Get in touch with our team",
                    screen: "contact" as Screen,
                    color: "#f59e0b",
                    bg: "rgba(245,158,11,0.1)",
                  },
                ].map(({ icon: Icon, label, desc, screen: s, color, bg }) => (
                  <button
                    key={s}
                    onClick={() => setScreen(s)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5"
                    style={{
                      background: "#0d1a2e",
                      border: "1px solid #1e3a5f",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-sm"
                        style={{ color: "#e2e8f0", fontWeight: 600 }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#475569" }}
                      >
                        {desc}
                      </p>
                    </div>
                    <ChevronRight size={15} style={{ color: "#475569" }} />
                  </button>
                ))}

                <div className="pt-2">
                  <p
                    className="text-xs mb-3 px-1"
                    style={{
                      color: "#475569",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Quick Links
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map(({ label, path, icon: Icon }) => (
                      <button
                        key={path}
                        onClick={() => handleNavigate(path)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition-all hover:bg-white/5"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#64748b",
                        }}
                      >
                        <Icon size={13} style={{ color: "#3b82f6" }} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ screen */}
            {screen === "faq" && !selectedFaq && (
              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      background: !selectedCategory
                        ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                        : "#0d1a2e",
                      color: !selectedCategory ? "#fff" : "#64748b",
                      border: `1px solid ${!selectedCategory ? "transparent" : "#1e3a5f"}`,
                      fontWeight: !selectedCategory ? 600 : 400,
                    }}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-3 py-1.5 rounded-full text-xs transition-all"
                      style={{
                        background:
                          selectedCategory === cat
                            ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                            : "#0d1a2e",
                        color: selectedCategory === cat ? "#fff" : "#64748b",
                        border: `1px solid ${selectedCategory === cat ? "transparent" : "#1e3a5f"}`,
                        fontWeight: selectedCategory === cat ? 600 : 400,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {filteredFaqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedFaq(faq);
                        setScreen("faq-answer");
                      }}
                      className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5"
                      style={{
                        background: "#0d1a2e",
                        border: "1px solid #1e3a5f",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <HelpCircle
                          size={14}
                          style={{
                            color: "#3b82f6",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        />
                        <p
                          className="text-sm"
                          style={{ color: "#94a3b8", lineHeight: 1.5 }}
                        >
                          {faq.q}
                        </p>
                      </div>
                      <ChevronRight
                        size={14}
                        style={{ color: "#475569", flexShrink: 0 }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Answer screen */}
            {screen === "faq-answer" && selectedFaq && (
              <div className="p-4 space-y-4">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(29,111,206,0.08)",
                    border: "1px solid rgba(29,111,206,0.2)",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{
                      color: "#3b82f6",
                      fontWeight: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedFaq.q}
                  </p>
                </div>
                <div
                  className="rounded-2xl p-4"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "#94a3b8", lineHeight: 1.8 }}
                  >
                    {selectedFaq.a}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedFaq(null);
                    setScreen("faq");
                  }}
                  className="w-full py-3 rounded-xl text-sm transition-all hover:opacity-90"
                  style={{
                    background: "#0d1a2e",
                    border: "1px solid #1e3a5f",
                    color: "#64748b",
                  }}
                >
                  ← Back to FAQs
                </button>
                <button
                  onClick={goHome}
                  className="w-full py-3 rounded-xl text-sm text-white transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                    fontWeight: 600,
                  }}
                >
                  Back to Home
                </button>
              </div>
            )}

            {/* Navigate screen */}
            {screen === "navigate" && (
              <div className="p-4 space-y-2">
                <p className="text-xs px-1 mb-3" style={{ color: "#475569" }}>
                  Click any link to navigate:
                </p>
                {navLinks.map(({ label, path, icon: Icon, desc }) => (
                  <button
                    key={path}
                    onClick={() => handleNavigate(path)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5"
                    style={{
                      background: "#0d1a2e",
                      border: "1px solid #1e3a5f",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(29,111,206,0.1)" }}
                    >
                      <Icon size={16} style={{ color: "#3b82f6" }} />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-sm"
                        style={{ color: "#e2e8f0", fontWeight: 600 }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#475569" }}
                      >
                        {desc}
                      </p>
                    </div>
                    <ChevronRight size={14} style={{ color: "#475569" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Contact screen */}
            {screen === "contact" && (
              <div className="p-4 space-y-4">
                <div
                  className="rounded-2xl p-4 space-y-3"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "#e2e8f0", fontWeight: 700 }}
                  >
                    Contact Us
                  </p>
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+254 700 000 000",
                      href: "tel:+254700000000",
                      color: "#10b981",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "support@communest.co.ke",
                      href: "mailto:support@communest.co.ke",
                      color: "#3b82f6",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Nairobi, Kenya",
                      href: null,
                      color: "#f59e0b",
                    },
                  ].map(({ icon: Icon, label, value, href, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}18` }}
                      >
                        <Icon size={14} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: "#475569" }}>
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm"
                            style={{
                              color: "#94a3b8",
                              textDecoration: "none",
                              fontWeight: 500,
                            }}
                          >
                            {value}
                          </a>
                        ) : (
                          <p
                            className="text-sm"
                            style={{ color: "#94a3b8", fontWeight: 500 }}
                          >
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <p
                    className="text-sm mb-3"
                    style={{ color: "#e2e8f0", fontWeight: 700 }}
                  >
                    Follow Us
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        icon: Facebook,
                        label: "Facebook",
                        handle: "@CommunestKE",
                        href: "https://facebook.com/communestke",
                        color: "#1877f2",
                      },
                      {
                        icon: Twitter,
                        label: "Twitter / X",
                        handle: "@CommunestKE",
                        href: "https://twitter.com/communestke",
                        color: "#1da1f2",
                      },
                      {
                        icon: Instagram,
                        label: "Instagram",
                        handle: "@communest.ke",
                        href: "https://instagram.com/communest.ke",
                        color: "#e1306c",
                      },
                    ].map(({ icon: Icon, label, handle, href, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          textDecoration: "none",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${color}18` }}
                        >
                          <Icon size={15} style={{ color }} />
                        </div>
                        <div>
                          <p
                            className="text-xs"
                            style={{ color: "#e2e8f0", fontWeight: 600 }}
                          >
                            {label}
                          </p>
                          <p className="text-xs" style={{ color: "#475569" }}>
                            {handle}
                          </p>
                        </div>
                        <ChevronRight
                          size={13}
                          style={{ color: "#475569", marginLeft: "auto" }}
                        />
                      </a>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <p
                    className="text-sm mb-2"
                    style={{ color: "#e2e8f0", fontWeight: 700 }}
                  >
                    Support Hours
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#64748b", lineHeight: 1.7 }}
                  >
                    Mon – Fri: 8:00 AM – 6:00 PM
                    <br />
                    Saturday: 9:00 AM – 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            )}
          </div>

          {screen !== "home" && (
            <div
              className="px-4 pb-3 pt-2 flex-shrink-0"
              style={{ borderTop: "1px solid #1e3a5f" }}
            >
              <button
                onClick={goHome}
                className="w-full py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                style={{
                  background: "#0d1a2e",
                  border: "1px solid #1e3a5f",
                  color: "#64748b",
                }}
              >
                ← Back to Main Menu
              </button>
            </div>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 flex items-center justify-center transition-all hover:scale-110"
        style={{
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 16,
          background: isOpen
            ? "#0d1a2e"
            : "linear-gradient(135deg, #1d6fce, #0ea5e9)",
          border: isOpen ? "1px solid #1e3a5f" : "none",
          boxShadow: "0 8px 32px rgba(29,111,206,0.4)",
        }}
      >
        {isOpen ? (
          <X size={22} style={{ color: "#64748b" }} />
        ) : (
          <MessageSquare size={22} style={{ color: "#fff" }} />
        )}
      </button>
    </>
  );
}

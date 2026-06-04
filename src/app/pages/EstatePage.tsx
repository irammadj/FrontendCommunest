import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  Building2,
  Bell,
  Wrench,
  CreditCard,
  MessageSquare,
  PlusSquare,
  Megaphone,
  Home,
  AlertCircle,
  ChevronRight,
  X,
  Send,
  CheckCircle2,
  Trash2,
  Plus,
  ImagePlus,
  Reply,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockEstates, mockHouses } from "../data/mockData";

const mockAnnouncements = [
  {
    id: "1",
    title: "Water supply maintenance",
    body: "Water will be off on Saturday 7th June from 8am–2pm for routine maintenance.",
    date: "2026-06-01",
    type: "notice",
  },
  {
    id: "2",
    title: "Community Clean-up Day",
    body: "Join us this Sunday for the quarterly estate clean-up. Refreshments will be provided!",
    date: "2026-05-29",
    type: "event",
  },
  {
    id: "3",
    title: "June Rent Reminder",
    body: "Please ensure rent is paid by 5th June to avoid late fees. M-Pesa Paybill: 123456.",
    date: "2026-05-28",
    type: "payment",
  },
];

const mockMaintenance = [
  {
    id: "m1",
    issue: "Broken gate motor — Block A entrance",
    status: "In Progress",
    date: "2026-05-30",
  },
  {
    id: "m2",
    issue: "Burst pipe — Level 2 corridor",
    status: "Resolved",
    date: "2026-05-22",
  },
  {
    id: "m3",
    issue: "Gym equipment inspection",
    status: "Scheduled",
    date: "2026-06-05",
  },
];

const mockBills = [
  {
    month: "June 2026",
    rent: 55000,
    electricity: 3200,
    water: 1800,
    total: 60000,
    paid: false,
  },
  {
    month: "May 2026",
    rent: 55000,
    electricity: 2900,
    water: 1650,
    total: 59550,
    paid: true,
  },
];

const mockTenantPayments = [
  {
    id: "tp1",
    tenant: "John Kamau",
    unit: "A-101",
    amount: 60000,
    month: "June 2026",
    date: "2026-06-03",
    status: "Confirmed",
  },
  {
    id: "tp2",
    tenant: "Aisha Wanjiru",
    unit: "B-203",
    amount: 59550,
    month: "May 2026",
    date: "2026-05-31",
    status: "Confirmed",
  },
  {
    id: "tp3",
    tenant: "Brian Otieno",
    unit: "C-305",
    amount: 60000,
    month: "June 2026",
    date: "2026-06-02",
    status: "Pending",
  },
];

const mockInquiries = [
  {
    id: "i1",
    tenant: "John Kamau",
    unit: "A-101",
    message:
      "The water pressure in my unit has been very low for the past week. Can this be checked?",
    date: "2026-06-02",
    reply: "",
  },
  {
    id: "i2",
    tenant: "Aisha Wanjiru",
    unit: "B-203",
    message:
      "I would like to request a copy of my tenancy agreement for personal records.",
    date: "2026-06-01",
    reply: "We will email you a copy within 2 business days.",
  },
  {
    id: "i3",
    tenant: "Brian Otieno",
    unit: "C-305",
    message:
      "Is there a plan to install additional parking spaces? The current ones are insufficient.",
    date: "2026-05-30",
    reply: "",
  },
];

type Tab =
  | "overview"
  | "announcements"
  | "maintenance"
  | "payments"
  | "inquiries"
  | "manage";

export default function EstatePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [inquiryText, setInquiryText] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [showPostHouse, setShowPostHouse] = useState(false);
  const [newHouseForm, setNewHouseForm] = useState({
    number: "",
    bedrooms: "",
    rent: "",
    amenities: "",
    floor: "",
    type: "",
  });
  const [housePhotos, setHousePhotos] = useState<string[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [showPostAnnouncement, setShowPostAnnouncement] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    body: "",
    type: "notice",
  });
  const [maintenance, setMaintenance] = useState(mockMaintenance);
  const [showPostMaintenance, setShowPostMaintenance] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    issue: "",
    status: "Scheduled",
  });
  const [paymentOptions, setPaymentOptions] = useState([
    {
      id: "po1",
      method: "M-Pesa Paybill",
      details: "Paybill: 123456, Account: Unit Number",
      dueDay: 5,
    },
    {
      id: "po2",
      method: "Bank Transfer",
      details: "Equity Bank: 0123456789, Branch: Kilimani",
      dueDay: 5,
    },
  ]);
  const [showPostPayment, setShowPostPayment] = useState(false);
  const [newPaymentOption, setNewPaymentOption] = useState({
    method: "",
    details: "",
    dueDay: "",
  });
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Not signed in
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "#060d17" }}
      >
        <Building2 size={56} style={{ color: "#1e3a5f", marginBottom: 20 }} />
        <h2
          className="text-white mb-3"
          style={{ fontWeight: 700, fontSize: 28 }}
        >
          Sign In Required
        </h2>
        <p
          className="mb-8 max-w-sm leading-relaxed"
          style={{ color: "#64748b", lineHeight: 1.8 }}
        >
          You need to be signed in to access the Estate Portal.
        </p>
        <Link
          to="/signin"
          className="px-8 py-3.5 rounded-xl text-white"
          style={{
            background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
            fontWeight: 600,
          }}
        >
          Sign In / Register
        </Link>
      </div>
    );
  }

  // Signed in but no estate access
  if (!user?.rentedEstateId && !user?.listedEstateId) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "#060d17" }}
      >
        <div
          className="rounded-3xl p-12 max-w-md w-full"
          style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <AlertCircle size={28} style={{ color: "#f59e0b" }} />
          </div>
          <h2
            className="text-white mb-3"
            style={{ fontWeight: 700, fontSize: 24 }}
          >
            No Estate Access
          </h2>
          <p
            className="mb-6 leading-relaxed"
            style={{ color: "#94a3b8", lineHeight: 1.8 }}
          >
            You need to rent a house in a listed estate before you can access
            the Estate Portal.
          </p>
          <Link
            to="/explore"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
              fontWeight: 600,
            }}
          >
            <Home size={16} /> Find a House to Rent
          </Link>
          <p className="text-xs mt-4" style={{ color: "#475569" }}>
            Already an estate manager?{" "}
            <Link
              to="/list-estate"
              className="hover:text-blue-400 transition-colors"
              style={{ color: "#3b82f6" }}
            >
              List your estate
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const estate = mockEstates.find(
    (e) => e.id === (user.isAdmin ? user.listedEstateId : user.rentedEstateId),
  );
  const rentedHouse = mockHouses.find((h) => h.id === user.rentedHouseId);
  const isAdmin = user.isAdmin;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    ...(isAdmin
      ? [{ id: "manage" as Tab, label: "Manage", icon: Building2 }]
      : []),
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryText.trim()) {
      setInquirySubmitted(true);
      setInquiryText("");
    }
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.body) {
      setAnnouncements((prev) => [
        {
          id: Date.now().toString(),
          ...newAnnouncement,
          date: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
      setNewAnnouncement({ title: "", body: "", type: "notice" });
      setShowPostAnnouncement(false);
    }
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePostMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMaintenance.issue) {
      setMaintenance((prev) => [
        {
          id: Date.now().toString(),
          ...newMaintenance,
          date: new Date().toISOString().split("T")[0],
        },
        ...prev,
      ]);
      setNewMaintenance({ issue: "", status: "Scheduled" });
      setShowPostMaintenance(false);
    }
  };

  const handleDeleteMaintenance = (id: string) => {
    setMaintenance((prev) => prev.filter((m) => m.id !== id));
  };

  const handlePostPaymentOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPaymentOption.method && newPaymentOption.details) {
      setPaymentOptions((prev) => [
        {
          id: Date.now().toString(),
          method: newPaymentOption.method,
          details: newPaymentOption.details,
          dueDay: Number(newPaymentOption.dueDay) || 5,
        },
        ...prev,
      ]);
      setNewPaymentOption({ method: "", details: "", dueDay: "" });
      setShowPostPayment(false);
    }
  };

  const handleReplyInquiry = (id: string) => {
    if (replyText.trim()) {
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, reply: replyText } : i)),
      );
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setHousePhotos((prev) => [...prev, ev.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const openInquiries = inquiries.filter((i) => !i.reply);
  const resolvedInquiries = inquiries.filter((i) => i.reply);
  const pendingPayments = mockTenantPayments.filter(
    (p) => p.status === "Pending",
  );

  return (
    <div style={{ background: "#060d17", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="py-10 px-6"
        style={{
          background: "linear-gradient(135deg, #040b14, #060d17, #0a1830)",
          borderBottom: "1px solid #1e3a5f",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-sm mb-2"
            style={{
              color: "#3b82f6",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Estate Portal
          </p>
          <h1
            className="text-white mb-1"
            style={{ fontWeight: 800, fontSize: 32 }}
          >
            {estate?.name}
          </h1>
          <p style={{ color: "#64748b" }}>
            {estate?.location} · {estate?.county}
          </p>
          {rentedHouse && (
            <div
              className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span
                className="text-sm"
                style={{ color: "#10b981", fontWeight: 500 }}
              >
                Your Unit: {rentedHouse.houseNumber}
              </span>
            </div>
          )}
          {isAdmin && (
            <div
              className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(29,111,206,0.1)",
                border: "1px solid rgba(29,111,206,0.3)",
              }}
            >
              <span
                className="text-sm"
                style={{ color: "#3b82f6", fontWeight: 500 }}
              >
                ⭐ Admin · Managing {estate?.name}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background:
                  activeTab === id
                    ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                    : "#0d1a2e",
                color: activeTab === id ? "#fff" : "#64748b",
                border: `1px solid ${activeTab === id ? "transparent" : "#1e3a5f"}`,
                fontWeight: activeTab === id ? 600 : 400,
              }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Announcements summary */}
              <button
                onClick={() => setActiveTab("announcements")}
                className="rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5 group"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(59,130,246,0.15)" }}
                  >
                    <Bell size={18} style={{ color: "#3b82f6" }} />
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "#475569" }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <p className="text-xs mb-1" style={{ color: "#475569" }}>
                  Announcements
                </p>
                <p
                  className="text-sm mb-1"
                  style={{ color: "#e2e8f0", fontWeight: 600 }}
                >
                  {announcements.length} total
                </p>
                <p className="text-xs" style={{ color: "#64748b" }}>
                  Latest: {announcements[0]?.title || "—"}
                </p>
              </button>

              {/* Maintenance summary */}
              <button
                onClick={() => setActiveTab("maintenance")}
                className="rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5 group"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(245,158,11,0.15)" }}
                  >
                    <Wrench size={18} style={{ color: "#f59e0b" }} />
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "#475569" }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <p className="text-xs mb-1" style={{ color: "#475569" }}>
                  Maintenance
                </p>
                <p
                  className="text-sm mb-1"
                  style={{ color: "#e2e8f0", fontWeight: 600 }}
                >
                  {maintenance.filter((m) => m.status !== "Resolved").length}{" "}
                  open issues
                </p>
                <p className="text-xs" style={{ color: "#64748b" }}>
                  {maintenance.filter((m) => m.status === "Resolved").length}{" "}
                  resolved
                </p>
              </button>

              {/* Payments summary */}
              <button
                onClick={() => setActiveTab("payments")}
                className="rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5 group"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.15)" }}
                  >
                    <CreditCard size={18} style={{ color: "#10b981" }} />
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "#475569" }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <p className="text-xs mb-1" style={{ color: "#475569" }}>
                  Payments
                </p>
                {isAdmin ? (
                  <>
                    <p
                      className="text-sm mb-1"
                      style={{ color: "#e2e8f0", fontWeight: 600 }}
                    >
                      {
                        mockTenantPayments.filter(
                          (p) => p.status === "Confirmed",
                        ).length
                      }{" "}
                      confirmed this month
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        color:
                          pendingPayments.length > 0 ? "#f59e0b" : "#64748b",
                      }}
                    >
                      {pendingPayments.length} pending confirmation
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className="text-sm mb-1"
                      style={{ color: "#e2e8f0", fontWeight: 600 }}
                    >
                      Next due: June 5, 2026
                    </p>
                    <p className="text-xs" style={{ color: "#64748b" }}>
                      KES {mockBills[0].total.toLocaleString()}
                    </p>
                  </>
                )}
              </button>

              {/* Inquiries summary */}
              <button
                onClick={() => setActiveTab("inquiries")}
                className="rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5 group"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(14,165,233,0.15)" }}
                  >
                    <MessageSquare size={18} style={{ color: "#0ea5e9" }} />
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: "#475569" }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <p className="text-xs mb-1" style={{ color: "#475569" }}>
                  Inquiries
                </p>
                {isAdmin ? (
                  <>
                    <p
                      className="text-sm mb-1"
                      style={{ color: "#e2e8f0", fontWeight: 600 }}
                    >
                      {openInquiries.length} unanswered
                    </p>
                    <p className="text-xs" style={{ color: "#64748b" }}>
                      {resolvedInquiries.length} resolved
                    </p>
                  </>
                ) : (
                  <p
                    className="text-sm"
                    style={{ color: "#e2e8f0", fontWeight: 600 }}
                  >
                    Send an inquiry
                  </p>
                )}
              </button>

              {/* Estate info */}
              {estate && (
                <div
                  className="md:col-span-2 rounded-2xl p-6"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <h3 className="text-white mb-5" style={{ fontWeight: 700 }}>
                    Estate Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Management", value: estate.management },
                      { label: "Contact", value: estate.phone },
                      { label: "Email", value: estate.email },
                      { label: "Total Area", value: estate.area },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p
                          className="text-xs mb-1"
                          style={{ color: "#475569" }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "#94a3b8", fontWeight: 500 }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Announcements */}
        {activeTab === "announcements" && (
          <div>
            {isAdmin && (
              <div className="mb-6">
                <button
                  onClick={() => setShowPostAnnouncement(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                    fontWeight: 600,
                  }}
                >
                  <Plus size={15} /> Post Announcement
                </button>
              </div>
            )}
            <div className="space-y-4">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl p-6"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            a.type === "payment"
                              ? "rgba(16,185,129,0.1)"
                              : a.type === "event"
                                ? "rgba(14,165,233,0.1)"
                                : "rgba(245,158,11,0.1)",
                        }}
                      >
                        {a.type === "payment" ? (
                          <CreditCard size={16} style={{ color: "#10b981" }} />
                        ) : a.type === "event" ? (
                          <Megaphone size={16} style={{ color: "#0ea5e9" }} />
                        ) : (
                          <Bell size={16} style={{ color: "#f59e0b" }} />
                        )}
                      </div>
                      <h3 className="text-white" style={{ fontWeight: 700 }}>
                        {a.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {a.date}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteAnnouncement(a.id)}
                          className="p-1.5 rounded-lg transition-all hover:bg-red-500/10"
                          style={{ color: "#ef4444" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#94a3b8", lineHeight: 1.8 }}
                  >
                    {a.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Post Announcement modal */}
            {showPostAnnouncement && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="w-full max-w-md rounded-2xl p-8"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 700, fontSize: 20 }}
                    >
                      Post Announcement
                    </h3>
                    <button
                      onClick={() => setShowPostAnnouncement(false)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handlePostAnnouncement} className="space-y-4">
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#94a3b8", fontWeight: 500 }}
                      >
                        Type
                      </label>
                      <select
                        value={newAnnouncement.type}
                        onChange={(e) =>
                          setNewAnnouncement((a) => ({
                            ...a,
                            type: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#e2e8f0",
                        }}
                      >
                        <option value="notice">Notice</option>
                        <option value="event">Event</option>
                        <option value="payment">Payment</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#94a3b8", fontWeight: 500 }}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={newAnnouncement.title}
                        onChange={(e) =>
                          setNewAnnouncement((a) => ({
                            ...a,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Announcement title"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#e2e8f0",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#94a3b8", fontWeight: 500 }}
                      >
                        Message
                      </label>
                      <textarea
                        value={newAnnouncement.body}
                        onChange={(e) =>
                          setNewAnnouncement((a) => ({
                            ...a,
                            body: e.target.value,
                          }))
                        }
                        placeholder="Write your announcement…"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#e2e8f0",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                        fontWeight: 600,
                      }}
                    >
                      Post Announcement
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Maintenance */}
        {activeTab === "maintenance" && (
          <div>
            {isAdmin && (
              <div className="mb-6">
                <button
                  onClick={() => setShowPostMaintenance(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                    fontWeight: 600,
                  }}
                >
                  <Plus size={15} /> Post Maintenance Issue
                </button>
              </div>
            )}
            <div className="space-y-4">
              {maintenance.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl p-6 flex items-center justify-between gap-4"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(245,158,11,0.1)" }}
                    >
                      <Wrench size={18} style={{ color: "#f59e0b" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm"
                        style={{ color: "#e2e8f0", fontWeight: 600 }}
                      >
                        {m.issue}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#475569" }}>
                        Reported: {m.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className="px-3 py-1.5 rounded-full text-xs"
                      style={{
                        background:
                          m.status === "Resolved"
                            ? "rgba(16,185,129,0.12)"
                            : m.status === "In Progress"
                              ? "rgba(245,158,11,0.12)"
                              : "rgba(29,111,206,0.12)",
                        color:
                          m.status === "Resolved"
                            ? "#10b981"
                            : m.status === "In Progress"
                              ? "#f59e0b"
                              : "#3b82f6",
                        border: `1px solid ${m.status === "Resolved" ? "rgba(16,185,129,0.3)" : m.status === "In Progress" ? "rgba(245,158,11,0.3)" : "rgba(29,111,206,0.3)"}`,
                        fontWeight: 600,
                      }}
                    >
                      {m.status}
                    </span>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteMaintenance(m.id)}
                        className="p-1.5 rounded-lg transition-all hover:bg-red-500/10"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Post Maintenance modal */}
            {showPostMaintenance && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="w-full max-w-md rounded-2xl p-8"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 700, fontSize: 20 }}
                    >
                      Post Maintenance Issue
                    </h3>
                    <button
                      onClick={() => setShowPostMaintenance(false)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handlePostMaintenance} className="space-y-4">
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#94a3b8", fontWeight: 500 }}
                      >
                        Issue Description
                      </label>
                      <input
                        type="text"
                        value={newMaintenance.issue}
                        onChange={(e) =>
                          setNewMaintenance((m) => ({
                            ...m,
                            issue: e.target.value,
                          }))
                        }
                        placeholder="Describe the maintenance issue"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#e2e8f0",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#94a3b8", fontWeight: 500 }}
                      >
                        Status
                      </label>
                      <select
                        value={newMaintenance.status}
                        onChange={(e) =>
                          setNewMaintenance((m) => ({
                            ...m,
                            status: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                          color: "#e2e8f0",
                        }}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                        fontWeight: 600,
                      }}
                    >
                      Post Issue
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payments */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            {isAdmin ? (
              <>
                {/* Payment Options */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 700, fontSize: 18 }}
                    >
                      Payment Options
                    </h3>
                    <button
                      onClick={() => setShowPostPayment(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white transition-all hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                        fontWeight: 600,
                      }}
                    >
                      <Plus size={14} /> Add Option
                    </button>
                  </div>
                  <div className="space-y-3">
                    {paymentOptions.map((po) => (
                      <div
                        key={po.id}
                        className="rounded-2xl p-5 flex items-center justify-between gap-4"
                        style={{
                          background: "#0d1a2e",
                          border: "1px solid #1e3a5f",
                        }}
                      >
                        <div>
                          <p
                            className="text-sm mb-1"
                            style={{ color: "#e2e8f0", fontWeight: 600 }}
                          >
                            {po.method}
                          </p>
                          <p className="text-xs" style={{ color: "#64748b" }}>
                            {po.details}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: "#475569" }}
                          >
                            Due: {po.dueDay}th of every month
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setPaymentOptions((prev) =>
                              prev.filter((p) => p.id !== po.id),
                            )
                          }
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"
                          style={{ color: "#ef4444" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tenant Payment Notifications */}
                <div>
                  <h3
                    className="text-white mb-4"
                    style={{ fontWeight: 700, fontSize: 18 }}
                  >
                    Tenant Payment Notifications
                  </h3>
                  <div className="space-y-3">
                    {mockTenantPayments.map((tp) => (
                      <div
                        key={tp.id}
                        className="rounded-2xl p-5 flex items-center justify-between gap-4"
                        style={{
                          background: "#0d1a2e",
                          border: "1px solid #1e3a5f",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(16,185,129,0.1)" }}
                          >
                            <CreditCard
                              size={18}
                              style={{ color: "#10b981" }}
                            />
                          </div>
                          <div>
                            <p
                              className="text-sm"
                              style={{ color: "#e2e8f0", fontWeight: 600 }}
                            >
                              {tp.tenant} — Unit {tp.unit}
                            </p>
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: "#64748b" }}
                            >
                              KES {tp.amount.toLocaleString()} · {tp.month} ·{" "}
                              {tp.date}
                            </p>
                          </div>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs flex-shrink-0"
                          style={{
                            background:
                              tp.status === "Confirmed"
                                ? "rgba(16,185,129,0.12)"
                                : "rgba(245,158,11,0.12)",
                            color:
                              tp.status === "Confirmed" ? "#10b981" : "#f59e0b",
                            border: `1px solid ${tp.status === "Confirmed" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                            fontWeight: 600,
                          }}
                        >
                          {tp.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post Payment Option modal */}
                {showPostPayment && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <div
                      className="w-full max-w-md rounded-2xl p-8"
                      style={{
                        background: "#0d1a2e",
                        border: "1px solid #1e3a5f",
                      }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3
                          className="text-white"
                          style={{ fontWeight: 700, fontSize: 20 }}
                        >
                          Add Payment Option
                        </h3>
                        <button
                          onClick={() => setShowPostPayment(false)}
                          className="text-slate-500 hover:text-white"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <form
                        onSubmit={handlePostPaymentOption}
                        className="space-y-4"
                      >
                        <div>
                          <label
                            className="block text-sm mb-1.5"
                            style={{ color: "#94a3b8", fontWeight: 500 }}
                          >
                            Payment Method
                          </label>
                          <input
                            type="text"
                            value={newPaymentOption.method}
                            onChange={(e) =>
                              setNewPaymentOption((p) => ({
                                ...p,
                                method: e.target.value,
                              }))
                            }
                            placeholder="e.g. M-Pesa Paybill"
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{
                              background: "#060d17",
                              border: "1px solid #1e3a5f",
                              color: "#e2e8f0",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm mb-1.5"
                            style={{ color: "#94a3b8", fontWeight: 500 }}
                          >
                            Details
                          </label>
                          <input
                            type="text"
                            value={newPaymentOption.details}
                            onChange={(e) =>
                              setNewPaymentOption((p) => ({
                                ...p,
                                details: e.target.value,
                              }))
                            }
                            placeholder="e.g. Paybill: 123456, Account: Unit Number"
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{
                              background: "#060d17",
                              border: "1px solid #1e3a5f",
                              color: "#e2e8f0",
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm mb-1.5"
                            style={{ color: "#94a3b8", fontWeight: 500 }}
                          >
                            Due Day of Month
                          </label>
                          <input
                            type="number"
                            value={newPaymentOption.dueDay}
                            onChange={(e) =>
                              setNewPaymentOption((p) => ({
                                ...p,
                                dueDay: e.target.value,
                              }))
                            }
                            placeholder="e.g. 5"
                            min="1"
                            max="28"
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                            style={{
                              background: "#060d17",
                              border: "1px solid #1e3a5f",
                              color: "#e2e8f0",
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                          style={{
                            background:
                              "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                            fontWeight: 600,
                          }}
                        >
                          Add Payment Option
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Tenant payment view
              <div className="space-y-4">
                <div
                  className="rounded-2xl p-6 mb-2"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>
                    Payment Options
                  </h3>
                  <div className="space-y-3">
                    {paymentOptions.map((po) => (
                      <div
                        key={po.id}
                        className="p-4 rounded-xl"
                        style={{
                          background: "#060d17",
                          border: "1px solid #1e3a5f",
                        }}
                      >
                        <p
                          className="text-sm mb-1"
                          style={{ color: "#e2e8f0", fontWeight: 600 }}
                        >
                          {po.method}
                        </p>
                        <p className="text-xs" style={{ color: "#64748b" }}>
                          {po.details}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#475569" }}
                        >
                          Due: {po.dueDay}th of every month
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {mockBills.map((bill) => (
                  <div
                    key={bill.month}
                    className="rounded-2xl p-6"
                    style={{
                      background: "#0d1a2e",
                      border: "1px solid #1e3a5f",
                    }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-white" style={{ fontWeight: 700 }}>
                        {bill.month}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: bill.paid
                            ? "rgba(16,185,129,0.12)"
                            : "rgba(239,68,68,0.12)",
                          color: bill.paid ? "#10b981" : "#f87171",
                          border: `1px solid ${bill.paid ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                          fontWeight: 600,
                        }}
                      >
                        {bill.paid ? "Paid" : "Due"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-5">
                      {[
                        { label: "Rent", value: bill.rent },
                        { label: "Electricity", value: bill.electricity },
                        { label: "Water", value: bill.water },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="p-3 rounded-xl"
                          style={{ background: "#060d17" }}
                        >
                          <p
                            className="text-xs mb-1"
                            style={{ color: "#475569" }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: "#94a3b8", fontWeight: 600 }}
                          >
                            KES {value.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: "1px solid #1e3a5f" }}
                    >
                      <div>
                        <p className="text-xs" style={{ color: "#475569" }}>
                          Total Due
                        </p>
                        <p
                          style={{
                            color: "#e2e8f0",
                            fontWeight: 800,
                            fontSize: 20,
                          }}
                        >
                          KES {bill.total.toLocaleString()}
                        </p>
                      </div>
                      {!bill.paid && (
                        <button
                          className="px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                          style={{
                            background:
                              "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                            fontWeight: 600,
                          }}
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === "inquiries" && (
          <div className="max-w-2xl space-y-6">
            {isAdmin ? (
              <>
                {openInquiries.length > 0 && (
                  <div>
                    <h3
                      className="text-white mb-4"
                      style={{ fontWeight: 700, fontSize: 18 }}
                    >
                      Unanswered Inquiries
                    </h3>
                    <div className="space-y-4">
                      {openInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="rounded-2xl p-6"
                          style={{
                            background: "#0d1a2e",
                            border: "1px solid #1e3a5f",
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p
                                className="text-sm"
                                style={{ color: "#e2e8f0", fontWeight: 600 }}
                              >
                                {inq.tenant} — Unit {inq.unit}
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: "#475569" }}
                              >
                                {inq.date}
                              </p>
                            </div>
                          </div>
                          <p
                            className="text-sm mb-4 leading-relaxed"
                            style={{ color: "#94a3b8", lineHeight: 1.8 }}
                          >
                            {inq.message}
                          </p>
                          {replyingTo === inq.id ? (
                            <div className="space-y-3">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your reply…"
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                                style={{
                                  background: "#060d17",
                                  border: "1px solid #1e3a5f",
                                  color: "#e2e8f0",
                                }}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleReplyInquiry(inq.id)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                                    fontWeight: 600,
                                  }}
                                >
                                  <Send size={13} /> Send Reply
                                </button>
                                <button
                                  onClick={() => setReplyingTo(null)}
                                  className="px-4 py-2 rounded-xl text-sm"
                                  style={{
                                    color: "#64748b",
                                    background: "#060d17",
                                    border: "1px solid #1e3a5f",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setReplyingTo(inq.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                              style={{
                                color: "#3b82f6",
                                background: "rgba(29,111,206,0.1)",
                                border: "1px solid rgba(29,111,206,0.2)",
                                fontWeight: 600,
                              }}
                            >
                              <Reply size={13} /> Reply
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {resolvedInquiries.length > 0 && (
                  <div>
                    <h3
                      className="text-white mb-4"
                      style={{ fontWeight: 700, fontSize: 18 }}
                    >
                      Resolved Inquiries
                    </h3>
                    <div className="space-y-4">
                      {resolvedInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="rounded-2xl p-6"
                          style={{
                            background: "#0d1a2e",
                            border: "1px solid #1e3a5f",
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <p
                              className="text-sm"
                              style={{ color: "#e2e8f0", fontWeight: 600 }}
                            >
                              {inq.tenant} — Unit {inq.unit}
                            </p>
                            <span
                              className="px-2 py-1 rounded-full text-xs"
                              style={{
                                background: "rgba(16,185,129,0.1)",
                                color: "#10b981",
                                border: "1px solid rgba(16,185,129,0.3)",
                              }}
                            >
                              Resolved
                            </span>
                          </div>
                          <p
                            className="text-sm mb-3 leading-relaxed"
                            style={{ color: "#94a3b8", lineHeight: 1.8 }}
                          >
                            {inq.message}
                          </p>
                          <div
                            className="p-3 rounded-xl"
                            style={{
                              background: "rgba(29,111,206,0.06)",
                              border: "1px solid rgba(29,111,206,0.15)",
                            }}
                          >
                            <p
                              className="text-xs mb-1"
                              style={{ color: "#3b82f6", fontWeight: 600 }}
                            >
                              Your reply:
                            </p>
                            <p className="text-sm" style={{ color: "#94a3b8" }}>
                              {inq.reply}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {inquiries.length === 0 && (
                  <div
                    className="text-center py-12"
                    style={{ color: "#475569" }}
                  >
                    No inquiries yet.
                  </div>
                )}
              </>
            ) : (
              <>
                {inquirySubmitted && (
                  <div
                    className="rounded-2xl p-5 flex items-center gap-3"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.3)",
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: "#10b981" }} />
                    <p className="text-sm" style={{ color: "#10b981" }}>
                      Your inquiry has been sent to estate management.
                    </p>
                  </div>
                )}
                <div
                  className="rounded-2xl p-7"
                  style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
                >
                  <h3
                    className="text-white mb-2"
                    style={{ fontWeight: 700, fontSize: 20 }}
                  >
                    Send an Inquiry or Complaint
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "#64748b" }}>
                    Have a question or issue? Send it directly to{" "}
                    {estate?.management}.
                  </p>
                  <form onSubmit={handleInquirySubmit}>
                    <textarea
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Describe your inquiry or complaint in detail…"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all mb-4"
                      style={{
                        background: "#060d17",
                        border: "1px solid #1e3a5f",
                        color: "#e2e8f0",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!inquiryText.trim()}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                        fontWeight: 600,
                      }}
                    >
                      <Send size={15} /> Send Inquiry
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        )}

        {/* Manage (admin only) */}
        {activeTab === "manage" && isAdmin && (
          <div className="space-y-6">
            <button
              onClick={() => setShowPostHouse(true)}
              className="rounded-2xl p-7 flex items-center gap-5 text-left transition-all hover:-translate-y-1 group"
              style={{
                background: "#0d1a2e",
                border: "1px solid #1e3a5f",
                width: "100%",
                maxWidth: 400,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(29,111,206,0.12)" }}
              >
                <PlusSquare size={22} style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <p className="text-white mb-1" style={{ fontWeight: 700 }}>
                  Post Vacant House
                </p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  Add a vacant unit with photos, amenities and rent details
                </p>
              </div>
            </button>

            {/* Post House modal */}
            {showPostHouse && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  className="w-full max-w-lg rounded-2xl p-8 overflow-y-auto"
                  style={{
                    background: "#0d1a2e",
                    border: "1px solid #1e3a5f",
                    maxHeight: "90vh",
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 700, fontSize: 20 }}
                    >
                      Post Vacant Unit
                    </h3>
                    <button
                      onClick={() => setShowPostHouse(false)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Unit Number",
                        key: "number",
                        placeholder: "e.g. A-205",
                      },
                      {
                        label: "Bedrooms",
                        key: "bedrooms",
                        placeholder: "e.g. 2",
                      },
                      {
                        label: "Monthly Rent (KES)",
                        key: "rent",
                        placeholder: "e.g. 55000",
                      },
                      { label: "Floor", key: "floor", placeholder: "e.g. 3" },
                      {
                        label: "Type",
                        key: "type",
                        placeholder: "e.g. Apartment, Studio",
                      },
                      {
                        label: "Amenities (comma-separated)",
                        key: "amenities",
                        placeholder: "Balcony, BIC, Internet…",
                      },
                    ].map(({ label, key, placeholder }) => (
                      <div key={key}>
                        <label
                          className="block text-sm mb-1.5"
                          style={{ color: "#94a3b8", fontWeight: 500 }}
                        >
                          {label}
                        </label>
                        <input
                          type="text"
                          value={newHouseForm[key as keyof typeof newHouseForm]}
                          onChange={(e) =>
                            setNewHouseForm((f) => ({
                              ...f,
                              [key]: e.target.value,
                            }))
                          }
                          placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{
                            background: "#060d17",
                            border: "1px solid #1e3a5f",
                            color: "#e2e8f0",
                          }}
                        />
                      </div>
                    ))}

                    {/* Photo upload */}
                    <div>
                      <label
                        className="block text-sm mb-1.5"
                        style={{ color: "#94a3b8", fontWeight: 500 }}
                      >
                        Photos
                      </label>
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm w-full transition-all hover:border-blue-500"
                        style={{
                          background: "#060d17",
                          border: "2px dashed #1e3a5f",
                          color: "#64748b",
                        }}
                      >
                        <ImagePlus size={16} style={{ color: "#3b82f6" }} />
                        Click to upload photos
                      </button>
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      {housePhotos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {housePhotos.map((photo, i) => (
                            <div
                              key={i}
                              className="relative rounded-xl overflow-hidden"
                              style={{
                                aspectRatio: "1",
                                background: "#060d17",
                              }}
                            >
                              <img
                                src={photo}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() =>
                                  setHousePhotos((prev) =>
                                    prev.filter((_, idx) => idx !== i),
                                  )
                                }
                                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(0,0,0,0.7)" }}
                              >
                                <X size={10} style={{ color: "#fff" }} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowPostHouse(false);
                      setHousePhotos([]);
                      setNewHouseForm({
                        number: "",
                        bedrooms: "",
                        rent: "",
                        amenities: "",
                        floor: "",
                        type: "",
                      });
                    }}
                    className="mt-6 w-full py-3 rounded-xl text-white text-sm transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                      fontWeight: 600,
                    }}
                  >
                    Submit Listing
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

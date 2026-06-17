import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  ChevronRight,
  X,
  Users,
  Plus,
} from "lucide-react";
import {
  sendApprovalEmail,
  sendDenialEmail,
  sendExpirationEmail,
} from "../services/emailService";

interface PendingEstate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  county: string;
  management: string;
  area: string;
  amenities: string;
  titleDeed: string;
  description?: string;
  photoPreview?: string;
  status: "pending" | "approved" | "denied";
  submittedDate: string;
  denialReason?: string;
}

export default function CommunestAdminDashboard() {
  const { user, isAuthenticated, updateUserSuperAdmin } = useAuth();
  const [pendingEstates, setPendingEstates] = useState<PendingEstate[]>([]);
  const [selectedEstate, setSelectedEstate] = useState<PendingEstate | null>(
    null,
  );
  const [showDenialModal, setShowDenialModal] = useState(false);
  const [denialReason, setDenialReason] = useState("");
  const [filter, setFilter] = useState<"pending" | "approved" | "denied">(
    "pending",
  );
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");

  // Load pending estates from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("communest_pending_estates");
    if (stored) {
      const estates = JSON.parse(stored);
      setPendingEstates(estates);

      // Check for expired estates (7 days)
      const now = new Date();
      estates.forEach((estate: PendingEstate) => {
        if (estate.status === "pending") {
          const submittedDate = new Date(estate.submittedDate);
          const daysElapsed = Math.floor(
            (now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24),
          );

          if (daysElapsed >= 7) {
            // Send expiration email
            sendExpirationEmail({
              estateName: estate.name,
              estateEmail: estate.email,
              submittedDate: estate.submittedDate,
            });

            // Remove expired estate
            setPendingEstates((prev) => prev.filter((e) => e.id !== estate.id));
          }
        }
      });
    }
  }, []);

  // Check if user is super-admin
  if (!isAuthenticated || !user?.isSuperAdmin) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "#060d17" }}
      >
        <AlertCircle size={56} style={{ color: "#ef4444", marginBottom: 20 }} />
        <h2
          className="text-white mb-3"
          style={{ fontWeight: 700, fontSize: 28 }}
        >
          Access Denied
        </h2>
        <p
          className="mb-8 max-w-sm leading-relaxed"
          style={{ color: "#64748b", lineHeight: 1.8 }}
        >
          This page is only accessible to the Communest Super Admin.
        </p>
      </div>
    );
  }

  const filteredEstates = pendingEstates.filter((e) => e.status === filter);

  const handleApprove = async (estate: PendingEstate) => {
    const updated = pendingEstates.map((e) =>
      e.id === estate.id ? { ...e, status: "approved" as const } : e,
    );
    setPendingEstates(updated);
    localStorage.setItem("communest_pending_estates", JSON.stringify(updated));

    await sendApprovalEmail({
      estateName: estate.name,
      estateEmail: estate.email,
      estatePhone: estate.phone,
    });

    setSelectedEstate(null);
    console.log(`✓ Estate "${estate.name}" approved`);
  };

  const handleDeny = async (estate: PendingEstate) => {
    if (!denialReason.trim()) {
      alert("Please enter a denial reason");
      return;
    }

    const updated = pendingEstates.map((e) =>
      e.id === estate.id
        ? { ...e, status: "denied" as const, denialReason }
        : e,
    );
    setPendingEstates(updated);
    localStorage.setItem("communest_pending_estates", JSON.stringify(updated));

    await sendDenialEmail({
      estateName: estate.name,
      estateEmail: estate.email,
      denialReason,
    });

    setSelectedEstate(null);
    setDenialReason("");
    setShowDenialModal(false);
    console.log(`✓ Estate "${estate.name}" denied`);
  };

  const handleAddAdmin = async () => {
    setAdminError("");
    setAdminSuccess("");

    if (!adminEmail.trim()) {
      setAdminError("Please enter an email address");
      return;
    }

    // Get all users from localStorage
    const storedUsers = localStorage.getItem("communest_users");
    if (!storedUsers) {
      setAdminError("No users found in the system");
      return;
    }

    const users = JSON.parse(storedUsers);
    const userToUpdate = users.find((u: any) => u.email === adminEmail.trim());

    if (!userToUpdate) {
      setAdminError(`No account found with email: ${adminEmail}`);
      return;
    }

    if (userToUpdate.isSuperAdmin) {
      setAdminError("This user is already a super admin");
      return;
    }

    // Update user to be super admin
    userToUpdate.isSuperAdmin = true;
    localStorage.setItem("communest_users", JSON.stringify(users));

    // If the user is currently logged in, update them too
    if (user?.email === adminEmail) {
      updateUserSuperAdmin(true);
    }

    setAdminSuccess(
      `✓ ${userToUpdate.name} (${adminEmail}) is now a Super Admin!`,
    );
    setAdminEmail("");

    setTimeout(() => {
      setShowAddAdminModal(false);
      setAdminSuccess("");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "rgba(245,158,11,0.1)",
          text: "#f59e0b",
          label: "Pending",
        };
      case "approved":
        return {
          bg: "rgba(16,185,129,0.1)",
          text: "#10b981",
          label: "Approved",
        };
      case "denied":
        return { bg: "rgba(239,68,68,0.1)", text: "#ef4444", label: "Denied" };
      default:
        return {
          bg: "rgba(107,114,128,0.1)",
          text: "#6b7280",
          label: "Unknown",
        };
    }
  };

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
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p
              className="text-sm mb-2"
              style={{
                color: "#ef4444",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Super Admin Panel
            </p>
            <h1
              className="text-white mb-1"
              style={{ fontWeight: 800, fontSize: 32 }}
            >
              Estate Approval Management
            </h1>
            <p style={{ color: "#64748b" }}>
              Review and approve new estate listings
            </p>
          </div>
          <button
            onClick={() => setShowAddAdminModal(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              fontWeight: 600,
            }}
          >
            <Users size={18} />
            Add Admin
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            {
              id: "pending" as const,
              label: "Pending",
              count: pendingEstates.filter((e) => e.status === "pending")
                .length,
            },
            {
              id: "approved" as const,
              label: "Approved",
              count: pendingEstates.filter((e) => e.status === "approved")
                .length,
            },
            {
              id: "denied" as const,
              label: "Denied",
              count: pendingEstates.filter((e) => e.status === "denied").length,
            },
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background:
                  filter === id
                    ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                    : "#0d1a2e",
                color: filter === id ? "#fff" : "#64748b",
                border: `1px solid ${filter === id ? "transparent" : "#1e3a5f"}`,
                fontWeight: filter === id ? 600 : 400,
              }}
            >
              {label}
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background:
                    filter === id ? "rgba(255,255,255,0.2)" : "#1e3a5f",
                }}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredEstates.length === 0 && (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <Building2
              size={48}
              style={{ color: "#475569", margin: "0 auto 16px" }}
            />
            <p
              className="text-white mb-2"
              style={{ fontWeight: 600, fontSize: 18 }}
            >
              No {filter} estates
            </p>
            <p style={{ color: "#64748b" }}>
              {filter === "pending"
                ? "All pending estate applications have been reviewed."
                : `There are no ${filter} estates to display.`}
            </p>
          </div>
        )}

        {/* Estates List */}
        <div className="space-y-4">
          {filteredEstates.map((estate) => {
            const statusColor = getStatusColor(estate.status);
            const submittedDate = new Date(estate.submittedDate);
            const daysElapsed = Math.floor(
              (new Date().getTime() - submittedDate.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            const daysLeft = Math.max(0, 7 - daysElapsed);

            return (
              <button
                key={estate.id}
                onClick={() => setSelectedEstate(estate)}
                className="w-full rounded-2xl p-6 text-left transition-all hover:-translate-y-0.5"
                style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className="text-white"
                        style={{ fontWeight: 700, fontSize: 18 }}
                      >
                        {estate.name}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: statusColor.bg,
                          color: statusColor.text,
                          fontWeight: 600,
                        }}
                      >
                        {statusColor.label}
                      </span>
                    </div>
                    <p style={{ color: "#94a3b8" }}>
                      {estate.management} • {estate.location}, {estate.county}
                    </p>
                  </div>
                  <ChevronRight size={20} style={{ color: "#475569" }} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      Contact
                    </p>
                    <p className="text-sm" style={{ color: "#e2e8f0" }}>
                      {estate.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      Phone
                    </p>
                    <p className="text-sm" style={{ color: "#e2e8f0" }}>
                      {estate.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#475569" }}>
                      Submitted
                    </p>
                    <p className="text-sm" style={{ color: "#e2e8f0" }}>
                      {estate.submittedDate}
                    </p>
                  </div>
                  {estate.status === "pending" && (
                    <div>
                      <p className="text-xs" style={{ color: "#475569" }}>
                        Days Left
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          color: daysLeft <= 2 ? "#ef4444" : "#10b981",
                          fontWeight: 600,
                        }}
                      >
                        {daysLeft} days
                      </p>
                    </div>
                  )}
                </div>

                {estate.status === "denied" && estate.denialReason && (
                  <div
                    className="rounded-xl p-3 text-sm"
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#fca5a5",
                    }}
                  >
                    <p className="font-semibold mb-1">Denial Reason:</p>
                    <p>{estate.denialReason}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estate Detail Modal */}
      {selectedEstate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-8 overflow-y-auto"
            style={{
              background: "#0d1a2e",
              border: "1px solid #1e3a5f",
              maxHeight: "90vh",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white text-2xl" style={{ fontWeight: 700 }}>
                  {selectedEstate.name}
                </h2>
                <p style={{ color: "#64748b", marginTop: 4 }}>
                  {selectedEstate.management}
                </p>
              </div>
              <button
                onClick={() => setSelectedEstate(null)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <X size={20} style={{ color: "#94a3b8" }} />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              {(() => {
                const statusColor = getStatusColor(selectedEstate.status);
                return (
                  <span
                    className="px-4 py-2 rounded-full text-sm"
                    style={{
                      background: statusColor.bg,
                      color: statusColor.text,
                      fontWeight: 600,
                    }}
                  >
                    {statusColor.label}
                  </span>
                );
              })()}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {[
                { icon: Mail, label: "Email", value: selectedEstate.email },
                { icon: Phone, label: "Phone", value: selectedEstate.phone },
                {
                  icon: MapPin,
                  label: "Location",
                  value: `${selectedEstate.location}, ${selectedEstate.county}`,
                },
                { icon: Building2, label: "Area", value: selectedEstate.area },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} style={{ color: "#3b82f6" }} />
                    <p className="text-xs" style={{ color: "#475569" }}>
                      {label}
                    </p>
                  </div>
                  <p className="text-sm" style={{ color: "#e2e8f0" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            {selectedEstate.description && (
              <div className="mb-6">
                <p className="text-xs mb-2" style={{ color: "#475569" }}>
                  DESCRIPTION
                </p>
                <p style={{ color: "#94a3b8" }}>{selectedEstate.description}</p>
              </div>
            )}

            {/* Denial Reason (if denied) */}
            {selectedEstate.status === "denied" &&
              selectedEstate.denialReason && (
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{
                      color: "#ef4444",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Denial Reason
                  </p>
                  <p style={{ color: "#fca5a5" }}>
                    {selectedEstate.denialReason}
                  </p>
                </div>
              )}

            {/* Action Buttons */}
            {selectedEstate.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedEstate)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2 size={18} /> Approve Estate
                </button>
                <button
                  onClick={() => setShowDenialModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ background: "#ef4444", fontWeight: 600 }}
                >
                  <XCircle size={18} /> Deny Estate
                </button>
              </div>
            )}

            {/* Denial Modal */}
            {showDenialModal && (
              <div className="space-y-4 mt-6">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    Reason for Denial *
                  </label>
                  <textarea
                    value={denialReason}
                    onChange={(e) => setDenialReason(e.target.value)}
                    placeholder="Explain why this estate listing is being denied..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{
                      background: "#060d17",
                      border: "1px solid #1e3a5f",
                      color: "#e2e8f0",
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeny(selectedEstate)}
                    className="flex-1 py-3 rounded-xl text-white transition-all hover:opacity-90"
                    style={{ background: "#ef4444", fontWeight: 600 }}
                  >
                    Send Denial
                  </button>
                  <button
                    onClick={() => {
                      setShowDenialModal(false);
                      setDenialReason("");
                    }}
                    className="flex-1 py-3 rounded-xl transition-all hover:opacity-90"
                    style={{
                      background: "#0d1a2e",
                      border: "1px solid #1e3a5f",
                      color: "#64748b",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-2xl" style={{ fontWeight: 700 }}>
                Add Super Admin
              </h2>
              <button
                onClick={() => {
                  setShowAddAdminModal(false);
                  setAdminEmail("");
                  setAdminError("");
                  setAdminSuccess("");
                }}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <X size={20} style={{ color: "#94a3b8" }} />
              </button>
            </div>

            <p style={{ color: "#94a3b8", marginBottom: 20, lineHeight: 1.6 }}>
              Enter the email address of an existing user account to grant them
              super admin status.
            </p>

            <div className="mb-4">
              <label
                className="block text-sm mb-2"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Email Address *
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#475569" }}
                />
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="user@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: "#060d17",
                    border: `1px solid ${adminError ? "#ef4444" : "#1e3a5f"}`,
                    color: "#e2e8f0",
                  }}
                />
              </div>
              {adminError && (
                <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                  {adminError}
                </p>
              )}
              {adminSuccess && (
                <p className="text-xs mt-1" style={{ color: "#10b981" }}>
                  {adminSuccess}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddAdmin}
                className="flex-1 py-3 rounded-xl text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  fontWeight: 600,
                }}
              >
                Grant Super Admin Status
              </button>
              <button
                onClick={() => {
                  setShowAddAdminModal(false);
                  setAdminEmail("");
                  setAdminError("");
                  setAdminSuccess("");
                }}
                className="flex-1 py-3 rounded-xl transition-all hover:opacity-90"
                style={{
                  background: "#0d1a2e",
                  border: "1px solid #1e3a5f",
                  color: "#64748b",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

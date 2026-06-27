import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  FileText,
  Upload,
  CheckCircle2,
  Info,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  sendSubmissionConfirmationEmail,
  sendNewEstateNotificationToAdmin,
} from "../services/emailService";

const KENYA_COUNTIES_LIST = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Uasin Gishu",
  "Kiambu",
  "Machakos",
  "Meru",
  "Kakamega",
  "Kisii",
  "Nyeri",
  "Embu",
  "Kericho",
  "Garissa",
  "Kilifi",
  "Kwale",
  "Taita Taveta",
  "Lamu",
  "Malindi",
  "Trans Nzoia",
  "Bungoma",
  "Siaya",
  "Migori",
  "Homa Bay",
  "Kajiado",
  "Muranga",
  "Nyandarua",
  "Laikipia",
  "Samburu",
  "Isiolo",
];

export default function ListEstatePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    location: "",
    county: "",
    area: "",
    management: "",
    email: "",
    phone: "",
    titleDeed: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Estate name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.county) e.county = "Please select a county";
    if (!form.area.trim()) e.area = "Area is required";
    if (!form.management.trim()) e.management = "Management name is required";
    if (!form.email.trim() || !form.email.includes("@"))
      e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.titleDeed.trim()) e.titleDeed = "Title deed number is required";
    if (!photoPreview) e.photo = "Please upload a photo of the estate";
    if (!agreed) e.agreed = "You must agree to the Terms & Conditions";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const pendingEstate = {
      id: `estate_${Date.now()}`,
      name: form.name,
      management: form.management,
      email: form.email,
      phone: form.phone,
      location: form.location,
      county: form.county,
      area: form.area,
      amenities: "",
      titleDeed: form.titleDeed,
      description: form.description,
      photoPreview: photoPreview || undefined,
      status: "pending" as const,
      submittedDate: new Date().toISOString().split("T")[0],
    };

    const pendingEstates = JSON.parse(
      localStorage.getItem("communest_pending_estates") || "[]",
    );
    pendingEstates.push(pendingEstate);
    localStorage.setItem(
      "communest_pending_estates",
      JSON.stringify(pendingEstates),
    );

    await sendSubmissionConfirmationEmail({
      estateName: form.name,
      estateEmail: form.email,
      estateManagement: form.management,
      submissionDate: pendingEstate.submittedDate,
    });

    await sendNewEstateNotificationToAdmin({
      estateName: form.name,
      estateEmail: form.email,
      estateManagement: form.management,
      location: form.location,
      county: form.county,
      submissionDate: pendingEstate.submittedDate,
    });

    setSubmitted(true);
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "#060d17" }}
      >
        <Building2 size={52} style={{ color: "#1e3a5f", marginBottom: 20 }} />
        <h2
          className="text-white mb-3"
          style={{ fontWeight: 700, fontSize: 26 }}
        >
          Account Required
        </h2>
        <p
          className="mb-8 max-w-sm leading-relaxed"
          style={{ color: "#64748b", lineHeight: 1.8 }}
        >
          You need a Communest account to list your estate. Sign in or create a
          free account to get started.
        </p>
        <Link
          to="/signin"
          className="px-8 py-3.5 rounded-xl text-white"
          style={{
            background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Sign In / Register
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#060d17" }}
      >
        <div
          className="max-w-md w-full text-center rounded-3xl p-12"
          style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "2px solid rgba(16,185,129,0.35)",
            }}
          >
            <CheckCircle2 size={36} style={{ color: "#10b981" }} />
          </div>
          <h2
            className="text-white mb-3"
            style={{ fontWeight: 800, fontSize: 28 }}
          >
            Submitted for Approval!
          </h2>
          <p
            className="mb-2 leading-relaxed"
            style={{ color: "#94a3b8", lineHeight: 1.8 }}
          >
            <strong className="text-white">{form.name}</strong> has been
            submitted for review. Our team will inspect your documentation and
            notify you within 7 days.
          </p>
          <p className="text-sm mb-8" style={{ color: "#64748b" }}>
            A confirmation email has been sent to <strong>{form.email}</strong>.
            Once approved, your estate will be live on Communest!
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-full py-3 rounded-xl text-white"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                fontWeight: 600,
                textDecoration: "none",
                display: "block",
                textAlign: "center",
              }}
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  location: "",
                  county: "",
                  area: "",
                  management: "",
                  email: "",
                  phone: "",
                  titleDeed: "",
                  description: "",
                });
                setPhotoPreview(null);
                setAgreed(false);
              }}
              className="w-full py-3 rounded-xl transition-colors hover:bg-white/5"
              style={{
                border: "1px solid #1e3a5f",
                color: "#94a3b8",
                fontWeight: 500,
                background: "transparent",
              }}
            >
              Submit Another Estate
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fieldStyle = (name: string) => ({
    background: "#060d17",
    border: `1px solid ${errors[name] ? "#ef4444" : "#1e3a5f"}`,
    color: "#e2e8f0",
  });

  return (
    <div style={{ background: "#060d17", minHeight: "100vh" }}>
      {/* Hero with Background Image */}
      <div
        className="py-14 px-6 text-center relative overflow-hidden"
        style={{
          backgroundImage: "url(/FrontendCommunest/assets/estate-hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundAttachment: "fixed" removed — causes image to not render in many browsers
        }}
      >
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,13,23,0.75) 0%, rgba(6,13,23,0.85) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <p
            className="text-sm mb-3"
            style={{
              color: "#3b82f6",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Estate Managers
          </p>
          <h1
            className="text-white mb-4"
            style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-1px" }}
          >
            List Your Estate
          </h1>
          <p
            className="max-w-md mx-auto"
            style={{ color: "#64748b", lineHeight: 1.8 }}
          >
            Fill in the details below to submit your estate for review and
            approval on Communest.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Info banner */}
        <div
          className="rounded-2xl p-5 mb-8 flex items-start gap-4"
          style={{
            background: "rgba(29,111,206,0.08)",
            border: "1px solid rgba(29,111,206,0.25)",
          }}
        >
          <Info
            size={18}
            style={{ color: "#3b82f6", flexShrink: 0, marginTop: 2 }}
          />
          <div
            className="text-sm leading-relaxed"
            style={{ color: "#94a3b8", lineHeight: 1.7 }}
          >
            Submitting as{" "}
            <strong style={{ color: "#e2e8f0" }}>{user?.name}</strong>. Your
            estate will be reviewed by our team within 7 days. Once approved, it
            will be live on Communest!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Estate Info */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <h2
              className="text-white mb-6 flex items-center gap-2"
              style={{ fontWeight: 700, fontSize: 18 }}
            >
              <Building2 size={18} style={{ color: "#3b82f6" }} /> Estate
              Information
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#94a3b8", fontWeight: 500 }}
                >
                  Estate Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Greenview Gardens"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={fieldStyle("name")}
                />
                {errors.name && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    Location / Area *
                  </label>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#475569" }}
                    />
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Kilimani, Nairobi"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                      style={fieldStyle("location")}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                      {errors.location}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    County *
                  </label>
                  <select
                    name="county"
                    value={form.county}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={fieldStyle("county")}
                  >
                    <option value="">Select county…</option>
                    {KENYA_COUNTIES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.county && (
                    <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                      {errors.county}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#94a3b8", fontWeight: 500 }}
                >
                  Total Area Covered *
                </label>
                <input
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="e.g. 12 acres"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={fieldStyle("area")}
                />
                {errors.area && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                    {errors.area}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#94a3b8", fontWeight: 500 }}
                >
                  Description (optional)
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the estate, its surroundings and key features…"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background: "#060d17",
                    border: "1px solid #1e3a5f",
                    color: "#e2e8f0",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section: Management Details */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <h2
              className="text-white mb-6 flex items-center gap-2"
              style={{ fontWeight: 700, fontSize: 18 }}
            >
              <Mail size={18} style={{ color: "#3b82f6" }} /> Management Details
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#94a3b8", fontWeight: 500 }}
                >
                  Name of Management *
                </label>
                <input
                  name="management"
                  value={form.management}
                  onChange={handleChange}
                  placeholder="e.g. Greenview Properties Ltd"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={fieldStyle("management")}
                />
                {errors.management && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                    {errors.management}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#475569" }}
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@estate.co.ke"
                      type="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                      style={fieldStyle("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: "#94a3b8", fontWeight: 500 }}
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#475569" }}
                    />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                      style={fieldStyle("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Legal & Photo */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <h2
              className="text-white mb-6 flex items-center gap-2"
              style={{ fontWeight: 700, fontSize: 18 }}
            >
              <FileText size={18} style={{ color: "#3b82f6" }} /> Legal
              Documentation & Photo
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#94a3b8", fontWeight: 500 }}
                >
                  Title Deed Number *
                </label>
                <div className="relative">
                  <FileText
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#475569" }}
                  />
                  <input
                    name="titleDeed"
                    value={form.titleDeed}
                    onChange={handleChange}
                    placeholder="e.g. LR/NBI/12345/2019"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={fieldStyle("titleDeed")}
                  />
                </div>
                {errors.titleDeed && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                    {errors.titleDeed}
                  </p>
                )}
              </div>

              {/* Photo upload */}
              <div>
                <label
                  className="block text-sm mb-2"
                  style={{ color: "#94a3b8", fontWeight: 500 }}
                >
                  Estate Photo *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-blue-500 overflow-hidden"
                  style={{ borderColor: errors.photo ? "#ef4444" : "#1e3a5f" }}
                >
                  {photoPreview ? (
                    <div className="relative h-48">
                      <img
                        src={photoPreview}
                        alt="Estate preview"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <p
                          className="text-white text-sm"
                          style={{ fontWeight: 600 }}
                        >
                          Click to change photo
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-40 flex flex-col items-center justify-center gap-3"
                      style={{ color: "#475569" }}
                    >
                      <Upload size={28} />
                      <p className="text-sm">Click to upload estate photo</p>
                      <p className="text-xs">JPG, PNG — up to 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
                {errors.photo && (
                  <p className="text-xs mt-1" style={{ color: "#f87171" }}>
                    {errors.photo}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <label className="flex items-start gap-4 cursor-pointer">
              <button
                type="button"
                onClick={() => setAgreed((a) => !a)}
                className="w-5 h-5 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: agreed ? "#1d6fce" : "transparent",
                  border: `2px solid ${agreed ? "#1d6fce" : errors.agreed ? "#ef4444" : "#1e3a5f"}`,
                }}
              >
                {agreed && <CheckCircle2 size={12} className="text-white" />}
              </button>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#94a3b8", lineHeight: 1.7 }}
              >
                I confirm that all information provided is accurate and I agree
                to Communest's{" "}
                <a
                  href="#"
                  className="hover:text-blue-300 transition-colors"
                  style={{ color: "#3b82f6" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="hover:text-blue-300 transition-colors"
                  style={{ color: "#3b82f6" }}
                >
                  Privacy Policy
                </a>
                . I understand that false documentation may result in permanent
                account suspension.
              </p>
            </label>
            {errors.agreed && (
              <p className="text-xs mt-2 ml-9" style={{ color: "#f87171" }}>
                {errors.agreed}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Submit Estate for Approval
          </button>
        </form>
      </div>
    </div>
  );
}

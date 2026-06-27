import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Upload,
  Home,
  User,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SignInPage() {
  const navigate = useNavigate();
  const {
    signIn,
    register,
    generateVerificationCode,
    verifyEmailCode,
    requestNewVerificationCode,
    isAccountLocked,
    getRemainingLockoutTime,
    trustDevice,
  } = useAuth();

  const [mode, setMode] = useState<"signin" | "register" | "verify">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSymbol: false,
  });

  // Check if account is locked
  useEffect(() => {
    if (mode === "signin" && form.email) {
      if (isAccountLocked(form.email)) {
        const remaining = getRemainingLockoutTime(form.email);
        setLockoutTime(remaining);

        const interval = setInterval(() => {
          setLockoutTime((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [form.email, mode, isAccountLocked, getRemainingLockoutTime]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");

    // Update password strength in real-time
    if (name === "password" && mode === "register") {
      setPasswordStrength({
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSymbol: /[@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      });
    }
  };

  const isPasswordStrong = (): boolean => {
    return (
      passwordStrength.minLength &&
      passwordStrength.hasUppercase &&
      passwordStrength.hasLowercase &&
      passwordStrength.hasNumber &&
      passwordStrength.hasSymbol
    );
  };

  const getPasswordStrengthColor = (): string => {
    const strengths = Object.values(passwordStrength).filter(Boolean).length;
    if (strengths <= 2) return "#ef4444";
    if (strengths <= 3) return "#f59e0b";
    if (strengths <= 4) return "#f59e0b";
    return "#10b981";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signin") {
      // Check if account is locked
      if (isAccountLocked(form.email)) {
        const remaining = getRemainingLockoutTime(form.email);
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        setError(
          `Account locked. Too many failed attempts. Try again in ${hours}h ${minutes}m`,
        );
        return;
      }

      const result = signIn(form.email, form.password);
      if (result.success) {
        // Auto-trust device if new (without showing modal)
        if (result.message === "new_device") {
          trustDevice(form.email);
        }
        // Redirect to explore immediately after successful login
        navigate("/explore");
      } else {
        setError(result.message);
      }
    } else if (mode === "register") {
      if (!form.name.trim()) return setError("Please enter your full name.");
      if (!form.email.trim())
        return setError("Please enter your email address.");
      if (!isPasswordStrong()) {
        return setError(
          "Password must be at least 8 characters with uppercase, lowercase, number, and symbol",
        );
      }
      if (!agreed)
        return setError(
          "Please agree to the Terms & Conditions and Privacy Policy.",
        );

      const result = register(
        form.name,
        form.email,
        form.password,
        profilePreview || undefined,
      );

      if (result.success) {
        setVerificationEmail(form.email);
        setMode("verify");
        setForm({ name: "", email: "", password: "" });
        setResendCountdown(120); // 2 minutes
      } else {
        setError(result.message);
      }
    } else if (mode === "verify") {
      if (verificationCode.length !== 4) {
        return setError("Please enter a 4-digit code");
      }

      if (verifyEmailCode(verificationEmail, verificationCode)) {
        setError("");
        setVerificationCode("");
        // Redirect to explore after email verification
        navigate("/explore");
      } else {
        setError("Invalid or expired verification code");
      }
    }
  };

  const handleResendCode = () => {
    const result = requestNewVerificationCode(verificationEmail);
    if (result.success) {
      setResendCountdown(120);
      setError("");
    } else {
      setError(result.message);
    }
  };

  // Sign In Mode
  if (mode === "signin") {
    return (
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16"
        style={{ background: "#060d17" }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                }}
              >
                <Home size={20} className="text-white" />
              </div>
              <span
                className="text-white text-xl"
                style={{ fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                COMMUNEST
              </span>
            </Link>
            <h1
              className="text-white mb-2"
              style={{ fontWeight: 700, fontSize: 28 }}
            >
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Sign in to continue to Communest
            </p>
          </div>

          {/* Toggle */}
          <div
            className="flex rounded-xl p-1 mb-8"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            {(["signin", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setForm({ name: "", email: "", password: "" });
                }}
                className="flex-1 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background:
                    mode === m
                      ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                      : "transparent",
                  color: mode === m ? "#fff" : "#64748b",
                  fontWeight: mode === m ? 700 : 400,
                }}
              >
                {m === "signin" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            <div className="mb-5">
              <label
                className="block text-sm mb-2"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#060d17",
                    border: "1px solid #1e3a5f",
                    color: "#e2e8f0",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#1d6fce")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#1e3a5f")
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-sm mb-2"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#060d17",
                    border: "1px solid #1e3a5f",
                    color: "#e2e8f0",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#1d6fce")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#1e3a5f")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {lockoutTime > 0 && (
              <div
                className="mb-4 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
              >
                <AlertCircle size={16} />
                Account locked. Try again in {Math.floor(
                  lockoutTime / 60,
                )}m {lockoutTime % 60}s
              </div>
            )}

            {error && (
              <div
                className="mb-4 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={lockoutTime > 0}
              className="w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                fontWeight: 700,
              }}
            >
              Sign In
            </button>

            <p
              className="text-center text-sm mt-5"
              style={{ color: "#64748b" }}
            >
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className="hover:text-blue-300 transition-colors"
                style={{ color: "#3b82f6", fontWeight: 600 }}
              >
                Register here
              </button>
            </p>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "#475569" }}>
            By using Communest you agree to our{" "}
            <a
              href="#"
              className="hover:text-blue-400 transition-colors"
              style={{ color: "#3b82f6" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Register Mode
  if (mode === "register") {
    return (
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16"
        style={{ background: "#060d17" }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                }}
              >
                <Home size={20} className="text-white" />
              </div>
              <span
                className="text-white text-xl"
                style={{ fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                COMMUNEST
              </span>
            </Link>
            <h1
              className="text-white mb-2"
              style={{ fontWeight: 700, fontSize: 28 }}
            >
              Create Your Account
            </h1>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Join thousands of Kenyans finding homes
            </p>
          </div>

          {/* Toggle */}
          <div
            className="flex rounded-xl p-1 mb-8"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            {(["signin", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setForm({ name: "", email: "", password: "" });
                }}
                className="flex-1 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background:
                    mode === m
                      ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                      : "transparent",
                  color: mode === m ? "#fff" : "#64748b",
                  fontWeight: mode === m ? 700 : 400,
                }}
              >
                {m === "signin" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8"
            style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
          >
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer mb-3 overflow-hidden relative group"
                style={{
                  background: profilePreview ? "transparent" : "#1e3a5f",
                  border: "2px dashed #1d6fce",
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={28} style={{ color: "#3b82f6" }} />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                  <Upload size={16} className="text-white" />
                </div>
              </div>
              <p className="text-xs" style={{ color: "#64748b" }}>
                Click to upload profile picture
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Full Name */}
            <div className="mb-5">
              <label
                className="block text-sm mb-2"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#060d17",
                    border: "1px solid #1e3a5f",
                    color: "#e2e8f0",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#1d6fce")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#1e3a5f")
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                className="block text-sm mb-2"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#060d17",
                    border: "1px solid #1e3a5f",
                    color: "#e2e8f0",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#1d6fce")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#1e3a5f")
                  }
                />
              </div>
            </div>

            {/* Password with strength indicator */}
            <div className="mb-6">
              <label
                className="block text-sm mb-2"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Password
              </label>
              <div className="relative mb-3">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "#060d17",
                    border: "1px solid #1e3a5f",
                    color: "#e2e8f0",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#1d6fce")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "#1e3a5f")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748b" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {form.password && (
                <div
                  className="rounded-lg p-4"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid #1e3a5f",
                  }}
                >
                  <p
                    className="text-xs mb-3"
                    style={{
                      color: "#94a3b8",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Password Requirements:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {passwordStrength.minLength ? (
                        <CheckCircle2 size={14} style={{ color: "#10b981" }} />
                      ) : (
                        <Circle size={14} style={{ color: "#475569" }} />
                      )}
                      <span
                        className="text-xs"
                        style={{
                          color: passwordStrength.minLength
                            ? "#10b981"
                            : "#64748b",
                        }}
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasUppercase ? (
                        <CheckCircle2 size={14} style={{ color: "#10b981" }} />
                      ) : (
                        <Circle size={14} style={{ color: "#475569" }} />
                      )}
                      <span
                        className="text-xs"
                        style={{
                          color: passwordStrength.hasUppercase
                            ? "#10b981"
                            : "#64748b",
                        }}
                      >
                        One uppercase letter (A-Z)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasLowercase ? (
                        <CheckCircle2 size={14} style={{ color: "#10b981" }} />
                      ) : (
                        <Circle size={14} style={{ color: "#475569" }} />
                      )}
                      <span
                        className="text-xs"
                        style={{
                          color: passwordStrength.hasLowercase
                            ? "#10b981"
                            : "#64748b",
                        }}
                      >
                        One lowercase letter (a-z)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasNumber ? (
                        <CheckCircle2 size={14} style={{ color: "#10b981" }} />
                      ) : (
                        <Circle size={14} style={{ color: "#475569" }} />
                      )}
                      <span
                        className="text-xs"
                        style={{
                          color: passwordStrength.hasNumber
                            ? "#10b981"
                            : "#64748b",
                        }}
                      >
                        One number (0-9)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasSymbol ? (
                        <CheckCircle2 size={14} style={{ color: "#10b981" }} />
                      ) : (
                        <Circle size={14} style={{ color: "#475569" }} />
                      )}
                      <span
                        className="text-xs"
                        style={{
                          color: passwordStrength.hasSymbol
                            ? "#10b981"
                            : "#64748b",
                        }}
                      >
                        One symbol (@, !, #, $, %, etc.)
                      </span>
                    </div>
                  </div>

                  {/* Strength Bar */}
                  <div
                    className="mt-3 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "#1e3a5f" }}
                  >
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${(Object.values(passwordStrength).filter(Boolean).length / 5) * 100}%`,
                        background: getPasswordStrengthColor(),
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6 flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAgreed((a) => !a)}
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{
                  background: agreed ? "#1d6fce" : "transparent",
                  border: `2px solid ${agreed ? "#1d6fce" : "#1e3a5f"}`,
                }}
              >
                {agreed && <CheckCircle2 size={12} className="text-white" />}
              </button>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#64748b" }}
              >
                I agree to Communest's{" "}
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
              </p>
            </div>

            {error && (
              <div
                className="mb-4 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!isPasswordStrong()}
              className="w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                fontWeight: 700,
              }}
            >
              Create Account
            </button>

            <p
              className="text-center text-sm mt-5"
              style={{ color: "#64748b" }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                }}
                className="hover:text-blue-300 transition-colors"
                style={{ color: "#3b82f6", fontWeight: 600 }}
              >
                Sign in
              </button>
            </p>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "#475569" }}>
            By using Communest you agree to our{" "}
            <a
              href="#"
              className="hover:text-blue-400 transition-colors"
              style={{ color: "#3b82f6" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Verify Email Mode
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16"
      style={{ background: "#060d17" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
              }}
            >
              <Home size={20} className="text-white" />
            </div>
            <span
              className="text-white text-xl"
              style={{ fontWeight: 800, letterSpacing: "-0.5px" }}
            >
              COMMUNEST
            </span>
          </Link>
          <h1
            className="text-white mb-2"
            style={{ fontWeight: 700, fontSize: 28 }}
          >
            Verify Your Email
          </h1>
          <p className="text-sm" style={{ color: "#64748b" }}>
            We've sent a 4-digit code to {verificationEmail}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8"
          style={{ background: "#0d1a2e", border: "1px solid #1e3a5f" }}
        >
          <div className="mb-6">
            <label
              className="block text-sm mb-2"
              style={{ color: "#94a3b8", fontWeight: 500 }}
            >
              Verification Code
            </label>
            <input
              type="text"
              maxLength={4}
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, ""));
                setError("");
              }}
              placeholder="0000"
              className="w-full px-4 py-3 rounded-xl text-sm text-center outline-none transition-all text-2xl tracking-widest"
              style={{
                background: "#060d17",
                border: "1px solid #1e3a5f",
                color: "#e2e8f0",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#1d6fce")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e3a5f")}
              autoFocus
            />
          </div>

          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-xl text-sm"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
              fontWeight: 700,
            }}
          >
            Verify Email
          </button>

          <div
            className="mt-6 p-4 rounded-lg"
            style={{ background: "#1e3a5f/20" }}
          >
            <p
              className="text-xs mb-3"
              style={{ color: "#94a3b8", fontWeight: 600 }}
            >
              Didn't receive the code?
            </p>
            {resendCountdown > 0 ? (
              <p
                className="text-xs flex items-center gap-2"
                style={{ color: "#64748b" }}
              >
                <Clock size={12} />
                Resend available in {resendCountdown}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-xs hover:text-blue-300 transition-colors"
                style={{ color: "#3b82f6", fontWeight: 600 }}
              >
                Request new code
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper component for unchecked circle
function Circle({
  size,
  style,
}: {
  size: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${style?.color || "#475569"}`,
        ...style,
      }}
    />
  );
}

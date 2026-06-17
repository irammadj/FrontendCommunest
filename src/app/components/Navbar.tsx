import { Link } from "react-router";
import { Menu, Home, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onMenuOpen: () => void;
}

export function Navbar({ onMenuOpen }: NavbarProps) {
  const { user, isAuthenticated } = useAuth();

  return (
    <header
      className="w-full z-30"
      style={{
        background: "rgba(6,13,23,0.95)",
        borderBottom: "1px solid #1e3a5f",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuOpen}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: "#0d1a2e", color: "#94a3b8" }}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2 select-none">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
              }}
            >
              <Home size={16} className="text-white" />
            </div>
            <span
              className="text-white hidden sm:block"
              style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}
            >
              COMMUNEST
            </span>
          </Link>
        </div>

        {/* Center: desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { label: "Home", to: "/" },
            { label: "Explore", to: "/explore" },
            !user?.isSuperAdmin && { label: "My Estate", to: "/estate" },
            { label: "About", to: "/about" },
          ]
            .filter(Boolean)
            .map((link: any) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-sm transition-colors hover:text-white hover:bg-white/5"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                {link.label}
              </Link>
            ))}
          {/* Super Admin Link - Only show for super admin */}
          {isAuthenticated && user?.isSuperAdmin && (
            <Link
              to="/communest-admin"
              className="px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
              style={{ color: "#ef4444", fontWeight: 600 }}
            >
              <Settings size={14} />
              Admin
            </Link>
          )}
        </nav>

        {/* Right: auth */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <Link to="/profile" className="flex items-center gap-2 group">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                  style={{ border: "2px solid #1d6fce" }}
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm ring-2 ring-transparent group-hover:ring-blue-400 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                    fontWeight: 700,
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ color: "#94a3b8", fontWeight: 500 }}
              >
                Sign In
              </Link>
              <Link
                to="/signin"
                className="px-4 py-2 rounded-lg text-sm text-white transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

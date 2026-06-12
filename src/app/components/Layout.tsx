import { useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { MenuBar } from "./MenuBar";
import { Footer } from "./Footer";
import OnboardingGuide from "./OnboardingGuide"; // ← ADD THIS LINE

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#060d17" }}
    >
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <OnboardingGuide /> {/* ← ADD THIS LINE */}
      <MenuBar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { MenuBar } from "./MenuBar";
import { Footer } from "./Footer";
import OnboardingGuide from "./OnboardingGuide";
import ChatBot from "./ChatBot"; // 👈 Add this

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#060d17" }}
    >
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <OnboardingGuide />
      <MenuBar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatBot /> {/* 👈 Add this */}
    </div>
  );
}

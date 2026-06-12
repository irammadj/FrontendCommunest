import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  targetId?: string;
  position: "top" | "bottom" | "left" | "right";
}

export default function OnboardingGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<DOMRect | null>(null);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to Communest",
      description:
        "Kenya's leading housing platform. Here you can find your perfect home across all 47 counties, from Nairobi to Mombasa, Kisumu to Nakuru.",
      targetId: "hero-section",
      position: "bottom",
    },
    {
      id: 2,
      title: "Explore Verified Estates",
      description:
        "Click 'Explore Estates' to browse all available properties. Filter by location, price, amenities, and more to find homes that match your budget.",
      targetId: "explore-btn",
      position: "top",
    },
    {
      id: 3,
      title: "List Your Estate",
      description:
        "Are you a property owner or developer? Click here to register your estate on Communest and reach thousands of potential renters.",
      targetId: "list-btn",
      position: "top",
    },
    {
      id: 4,
      title: "Quick Features",
      description:
        "These sections below help you understand Communest better. Browse properties, manage your portfolio, view analytics, and track your growth.",
      targetId: "features-section",
      position: "top",
    },
    {
      id: 5,
      title: "Need Help?",
      description:
        "Have questions? Click the help chatbot button (bottom right) anytime to get instant support and answers to common questions.",
      targetId: "help-hint",
      position: "left",
    },
    {
      id: 6,
      title: "You're Ready!",
      description:
        "You now know the basics of Communest. Start exploring estates, connect with property admins, or list your property. Happy hunting! 🏠",
      targetId: "explore-btn",
      position: "top",
    },
  ];

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const firstTimeParam = urlParams.get("first-time");
      const hasCompletedOnboarding = localStorage.getItem(
        "communest_onboarding_completed",
      );

      console.log("Onboarding check - firstTimeParam:", firstTimeParam);
      console.log(
        "Onboarding check - hasCompletedOnboarding:",
        hasCompletedOnboarding,
      );
      console.log("Onboarding check - isFirstVisit:", isFirstVisit());

      if (
        firstTimeParam === "true" ||
        (!hasCompletedOnboarding && isFirstVisit())
      ) {
        console.log("Opening onboarding!");
        setIsOpen(true);

        if (firstTimeParam === "true") {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }
      }
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const step = steps[currentStep];
    console.log("Looking for element:", step.targetId);

    if (step.targetId) {
      const element = document.getElementById(step.targetId);
      console.log("Found element:", element);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetElement(rect);
        console.log("Element position:", rect);
      }
    }
  }, [currentStep, isOpen]);

  const isFirstVisit = (): boolean => {
    const lastVisit = localStorage.getItem("communest_last_visit");
    if (!lastVisit) {
      localStorage.setItem("communest_last_visit", new Date().toISOString());
      return true;
    }
    return false;
  };

  const handleCompleteOnboarding = () => {
    console.log("Completing onboarding");
    localStorage.setItem("communest_onboarding_completed", "true");
    setIsOpen(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  console.log(
    "OnboardingGuide render - isOpen:",
    isOpen,
    "currentStep:",
    currentStep,
  );

  if (!isOpen) return null;

  // Calculate popover position
  let popoverStyle: React.CSSProperties = {
    position: "fixed",
    background: "#0a1628",
    border: "1px solid #1e3a5f",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "320px",
    zIndex: 10001,
    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
  };

  if (targetElement) {
    const offset = 20;
    switch (step.position) {
      case "top":
        popoverStyle.bottom = window.innerHeight - targetElement.top + offset;
        popoverStyle.left = Math.max(
          20,
          targetElement.left + targetElement.width / 2 - 160,
        );
        break;
      case "bottom":
        popoverStyle.top = targetElement.bottom + offset;
        popoverStyle.left = Math.max(
          20,
          targetElement.left + targetElement.width / 2 - 160,
        );
        break;
      case "left":
        popoverStyle.top = targetElement.top + targetElement.height / 2 - 80;
        popoverStyle.right = window.innerWidth - targetElement.left + offset;
        break;
      case "right":
        popoverStyle.top = targetElement.top + targetElement.height / 2 - 80;
        popoverStyle.left = targetElement.right + offset;
        break;
    }
  } else {
    // Center if target not found
    popoverStyle.top = "50%";
    popoverStyle.left = "50%";
    popoverStyle.transform = "translate(-50%, -50%)";
  }

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(2px)",
        }}
        onClick={handleCompleteOnboarding}
      />

      {/* Highlight spotlight */}
      {targetElement && (
        <div
          className="fixed z-[9998]"
          style={{
            top: targetElement.top - 8,
            left: targetElement.left - 8,
            width: targetElement.width + 16,
            height: targetElement.height + 16,
            border: "2px solid #3b82f6",
            borderRadius: "8px",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Popover tooltip */}
      <div style={popoverStyle}>
        {/* Close button */}
        <button
          onClick={handleCompleteOnboarding}
          className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded transition-all"
        >
          <X size={18} style={{ color: "#64748b" }} />
        </button>

        {/* Progress dots */}
        <div className="flex gap-1 mb-4">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className="h-1.5 flex-1 rounded-full transition-all"
              style={{
                background:
                  idx <= currentStep
                    ? "linear-gradient(135deg, #1d6fce, #0ea5e9)"
                    : "#1e3a5f",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold mb-2" style={{ color: "#e2e8f0" }}>
          {step.title}
        </h3>
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: "#94a3b8" }}
        >
          {step.description}
        </p>

        {/* Step counter */}
        <p className="text-xs mb-4" style={{ color: "#475569" }}>
          Step {currentStep + 1} of {steps.length}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            style={{
              background: "#0d1a2e",
              border: "1px solid #1e3a5f",
              color: "#64748b",
            }}
          >
            <ChevronLeft size={14} />
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-2 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-1 text-sm hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #1d6fce, #0ea5e9)",
            }}
          >
            {currentStep === steps.length - 1 ? "Done" : "Next"}
            {currentStep < steps.length - 1 && <ChevronRight size={14} />}
          </button>
        </div>

        {/* Skip option */}
        <p className="text-center mt-3">
          <button
            onClick={handleCompleteOnboarding}
            className="text-xs transition-all hover:underline"
            style={{ color: "#475569" }}
          >
            Skip tour
          </button>
        </p>
      </div>
    </>
  );
}

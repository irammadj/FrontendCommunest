import { Link } from "react-router";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div style={{ background: "#060d17", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="py-12 px-6"
        style={{
          background: "linear-gradient(135deg, #040b14, #060d17, #0a1830)",
          borderBottom: "1px solid #1e3a5f",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-sm hover:text-blue-400 transition-colors"
            style={{ color: "#64748b" }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1
            className="text-white mb-2"
            style={{ fontWeight: 800, fontSize: 40 }}
          >
            Cookie Policy
          </h1>
          <p style={{ color: "#94a3b8" }}>Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              What Are Cookies?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              Cookies are small data files stored on your device (computer,
              smartphone, or tablet) when you visit our website. They contain
              information that allows us to recognize you on subsequent visits
              and enhance your browsing experience.
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Why We Use Cookies
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              We use cookies for the following purposes:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Authentication:</strong> To
                keep you logged in and secure your account
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Preferences:</strong> To
                remember your language, theme, and display preferences
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Performance:</strong> To
                analyze how users interact with our website
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Security:</strong> To
                detect and prevent fraudulent activity
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Marketing:</strong> To
                track campaigns and provide personalized content (with consent)
              </li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Types of Cookies We Use
            </h2>

            <div className="mb-8">
              <h3
                className="text-white mb-3"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Essential Cookies
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
                These cookies are necessary for our website to function
                properly. They enable core functionality such as user
                authentication, account security, and content delivery. These
                cookies are always active.
              </p>
            </div>

            <div className="mb-8">
              <h3
                className="text-white mb-3"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Analytical Cookies
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
                We use analytical cookies to understand how visitors interact
                with our website. This helps us improve our services and
                identify areas for enhancement. Data collected is aggregated and
                anonymous.
              </p>
            </div>

            <div className="mb-8">
              <h3
                className="text-white mb-3"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Preference Cookies
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
                These cookies store your preferences and settings, allowing us
                to customize your experience on subsequent visits. They remember
                choices like language preference and display settings.
              </p>
            </div>

            <div>
              <h3
                className="text-white mb-3"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Marketing Cookies
              </h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
                Marketing cookies help us deliver relevant content and track
                campaign effectiveness. These are only placed with your explicit
                consent.
              </p>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Third-Party Cookies
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              Our website may also use cookies from trusted third-party
              services, including:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>
                <strong style={{ color: "#e2e8f0" }}>
                  Analytics Providers:
                </strong>{" "}
                To measure website traffic and user behavior
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>
                  Payment Processors:
                </strong>{" "}
                To securely process transactions
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>
                  Social Media Platforms:
                </strong>{" "}
                To facilitate social sharing (when enabled)
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>
                  Advertising Networks:
                </strong>{" "}
                To deliver targeted advertisements
              </li>
            </ul>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 16 }}>
              These third parties have their own privacy policies governing
              their use of cookies. We encourage you to review their policies.
            </p>
          </section>

          {/* Cookie Duration */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Cookie Duration
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              Cookies can be classified by their duration:
            </p>
            <div style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <p>
                <strong style={{ color: "#e2e8f0" }}>Session Cookies:</strong>{" "}
                These expire when you close your browser.
              </p>
              <p>
                <strong style={{ color: "#e2e8f0" }}>
                  Persistent Cookies:
                </strong>{" "}
                These remain on your device until they expire or you delete them
                (typically up to 2 years).
              </p>
            </div>
          </section>

          {/* Your Cookie Choices */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Your Cookie Choices
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              You have control over cookies on your device:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Browser Settings:</strong>{" "}
                Most browsers allow you to refuse cookies or alert you when
                cookies are being sent. Please refer to your browser's help
                section for more information.
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Cookie Consent:</strong>{" "}
                When you first visit our website, you may be asked to consent to
                non-essential cookies. You can modify these preferences at any
                time.
              </li>
              <li>
                <strong style={{ color: "#e2e8f0" }}>Do Not Track:</strong> If
                your browser supports Do Not Track (DNT), we will respect your
                DNT preference.
              </li>
            </ul>
            <p style={{ color: "#f59e0b", lineHeight: 1.8, marginTop: 16 }}>
              <strong>Important:</strong> Disabling essential cookies may affect
              the functionality and security of our website.
            </p>
          </section>

          {/* Privacy and Security */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Privacy and Security
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We do not use cookies to store sensitive information such as
              passwords or payment card details. All data collected through
              cookies is treated in accordance with our Privacy Policy and
              protected by industry-standard security measures.
            </p>
          </section>

          {/* Cookie List */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Cookies We Use
            </h2>
            <div
              style={{
                background: "#0d1a2e",
                border: "1px solid #1e3a5f",
                borderRadius: 12,
                padding: 16,
                overflowX: "auto",
              }}
            >
              <table style={{ color: "#94a3b8", width: "100%" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <th
                      style={{
                        color: "#e2e8f0",
                        textAlign: "left",
                        padding: "8px 0",
                        fontWeight: 600,
                      }}
                    >
                      Cookie Name
                    </th>
                    <th
                      style={{
                        color: "#e2e8f0",
                        textAlign: "left",
                        padding: "8px 0",
                        fontWeight: 600,
                      }}
                    >
                      Purpose
                    </th>
                    <th
                      style={{
                        color: "#e2e8f0",
                        textAlign: "left",
                        padding: "8px 0",
                        fontWeight: 600,
                      }}
                    >
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <td style={{ padding: "12px 0" }}>sessionId</td>
                    <td style={{ padding: "12px 0" }}>User authentication</td>
                    <td style={{ padding: "12px 0" }}>Session</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <td style={{ padding: "12px 0" }}>userPreferences</td>
                    <td style={{ padding: "12px 0" }}>
                      Store user preferences
                    </td>
                    <td style={{ padding: "12px 0" }}>1 year</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                    <td style={{ padding: "12px 0" }}>analyticsId</td>
                    <td style={{ padding: "12px 0" }}>Website analytics</td>
                    <td style={{ padding: "12px 0" }}>2 years</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 0" }}>marketingTracker</td>
                    <td style={{ padding: "12px 0" }}>Campaign tracking</td>
                    <td style={{ padding: "12px 0" }}>6 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Questions About Cookies?
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              If you have questions or concerns about our use of cookies, please
              contact us:
            </p>
            <div style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              <p>Email: hello@communest.co.ke</p>
              <p>Phone: +254 700 000 000</p>
              <p>Address: Upperhill, Nairobi, Nairobi County, Kenya</p>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              Updates to This Policy
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We may update this Cookie Policy periodically to reflect changes
              in our practices or for other operational, legal, or regulatory
              reasons. The "Last updated" date at the top of this policy
              indicates when it was last revised.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

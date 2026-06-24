import { Link } from "react-router";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
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
            Terms of Service
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
              Welcome to Communest
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              These Terms of Service ("Terms") govern your access to and use of
              the Communest website and services. By accessing or using our
              platform, you agree to be bound by these Terms. If you do not
              agree to these Terms, you may not use our Services.
            </p>
          </section>

          {/* Definitions */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              1. Definitions
            </h2>
            <div className="space-y-3">
              <div>
                <p
                  className="text-white"
                  style={{ fontWeight: 600, marginBottom: 4 }}
                >
                  "Services" refers to Communest's website, applications, and
                  services for connecting property seekers with estate managers.
                </p>
              </div>
              <div>
                <p
                  className="text-white"
                  style={{ fontWeight: 600, marginBottom: 4 }}
                >
                  "User" or "You" refers to any individual or entity accessing
                  or using our Services.
                </p>
              </div>
              <div>
                <p
                  className="text-white"
                  style={{ fontWeight: 600, marginBottom: 4 }}
                >
                  "Content" refers to all information, data, text, images, and
                  materials on our platform.
                </p>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              2. User Responsibilities
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              As a user, you agree to:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Provide accurate, truthful, and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not engage in fraudulent, illegal, or unethical conduct</li>
              <li>Not harass, abuse, or harm other users</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not attempt to hack, disrupt, or damage our services</li>
              <li>Not impersonate other users or entities</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              3. Acceptable Use Policy
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              You agree not to:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Post false, misleading, or defamatory content</li>
              <li>Violate anyone's intellectual property rights</li>
              <li>Engage in spamming or unsolicited communications</li>
              <li>Access content or systems without authorization</li>
              <li>Use the platform for illegal activities</li>
              <li>Share discriminatory, offensive, or abusive content</li>
              <li>Reverse engineer or attempt to gain unauthorized access</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              4. Intellectual Property Rights
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              All content, features, and functionality on our platform,
              including but not limited to text, graphics, logos, and software,
              are owned by Communest or our licensors and are protected by
              international copyright and trademark laws. You may not reproduce,
              distribute, or transmit any content without our prior written
              permission.
            </p>
          </section>

          {/* User-Generated Content */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              5. User-Generated Content
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              By posting content on our platform, you grant Communest a
              worldwide, non-exclusive license to use, reproduce, modify, and
              display your content. You represent that you own or have the right
              to use and authorize the use of the content you submit.
            </p>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We reserve the right to remove or modify any content that violates
              these Terms or our policies without notice.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              6. Limitation of Liability
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              To the fullest extent permitted by law, Communest shall not be
              liable for:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>
                Any indirect, incidental, special, or consequential damages
              </li>
              <li>Loss of data, profits, or business interruption</li>
              <li>Third-party conduct or content</li>
              <li>Errors or omissions in our services</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              7. Disclaimers
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              Our Services are provided on an "as is" basis without warranties
              of any kind, either express or implied. Communest does not
              guarantee:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Accuracy of information provided by users</li>
              <li>Suitability of properties for your needs</li>
              <li>Uninterrupted or error-free service</li>
              <li>Security of personal information</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              8. Termination
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We reserve the right to terminate or suspend your account and
              access to our Services, at our sole discretion, without notice,
              for any reason, including if you violate these Terms. Upon
              termination, your right to use our Services immediately ceases.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              9. Dispute Resolution
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              Any disputes arising from these Terms or use of our Services shall
              be governed by the laws of Kenya. Both parties agree to attempt to
              resolve disputes through good faith negotiation before pursuing
              legal action.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              10. Contact Us
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              If you have questions about these Terms, please contact us at:
            </p>
            <div style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              <p>Email: hello@communest.co.ke</p>
              <p>Phone: +254 700 000 000</p>
              <p>Address: Upperhill, Nairobi, Nairobi County, Kenya</p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              11. Changes to Terms
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We may modify these Terms at any time. Continued use of our
              Services after changes indicates your acceptance of the updated
              Terms. We encourage you to review these Terms periodically.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

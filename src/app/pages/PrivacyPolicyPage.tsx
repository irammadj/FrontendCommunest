import { Link } from "react-router";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
              Introduction
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              Communest Kenya ("we," "our," "us," or "Company") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and use our services.
            </p>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 16 }}>
              Please read this Privacy Policy carefully. If you do not agree
              with our policies and practices, please do not use our Services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              1. Information We Collect
            </h2>

            <div className="mb-6">
              <h3
                className="text-white mb-3"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Personal Information You Provide
              </h3>
              <ul
                style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}
              >
                <li>Name, email address, and phone number</li>
                <li>Physical address and location information</li>
                <li>Profile information and photographs</li>
                <li>Payment information (processed securely)</li>
                <li>Communication preferences</li>
                <li>Account credentials and passwords</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3
                className="text-white mb-3"
                style={{ fontWeight: 600, fontSize: 16 }}
              >
                Information Collected Automatically
              </h3>
              <ul
                style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}
              >
                <li>Device information (browser type, IP address)</li>
                <li>Usage data (pages visited, time spent)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Location data (with permission)</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              2. How We Use Your Information
            </h2>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>To provide and maintain our services</li>
              <li>To process transactions and send related information</li>
              <li>To send promotional communications (with consent)</li>
              <li>To improve and personalize your experience</li>
              <li>To monitor and analyze service usage</li>
              <li>To detect and prevent fraudulent activities</li>
              <li>To comply with legal obligations</li>
              <li>To respond to your inquiries and requests</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              3. Data Security
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure. While we strive to
              use commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              4. Data Retention
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              Privacy Policy. You may request deletion of your account and
              associated data at any time by contacting us.
            </p>
          </section>

          {/* Sharing Information */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              5. Sharing Your Information
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information in the following
              circumstances:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>
                With service providers who assist us in operating our website
                and conducting our business
              </li>
              <li>
                With other users as necessary to provide our services (e.g.,
                property listings)
              </li>
              <li>When required by law or to protect our legal rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              6. Your Rights
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 }}>
              You have the right to:
            </p>
            <ul style={{ color: "#94a3b8", lineHeight: 1.8, paddingLeft: 20 }}>
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              7. Contact Us
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              If you have questions about this Privacy Policy, please contact us
              at:
            </p>
            <div style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 16 }}>
              <p>Email: hello@communest.co.ke</p>
              <p>Phone: +254 700 000 000</p>
              <p>Address: Upperhill, Nairobi, Nairobi County, Kenya</p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2
              className="text-white mb-4"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              8. Changes to This Policy
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the new Privacy Policy on our website and updating the
              "Last updated" date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

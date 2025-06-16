import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-4xl font-bold text-red-700 mb-6">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: June 15, 2025</p>

        <section className="space-y-6">
          <p>
            Welcome to <strong>LandasBisnis</strong> ("we," "us," or "our"). These Terms and
            Conditions ("Terms") govern your use of landasbisnis.com and any related services (the
            "Platform"). By accessing or using the Platform, you agree to these Terms.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">1. Eligibility</h2>
            <p>
              You must be at least 18 years old to register as either a Sponsoree (university
              student) or Sponsor.
            </p>
            <p>
              By registering, you represent and warrant that you meet this age requirement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">2. Account Registration & Verification</h2>
            <p>
              To register, you must provide your name, email address, password, and select a role
              ("Sponsor" or "Sponsoree").
            </p>
            <p>
              You agree to keep your account credentials confidential and to notify us immediately of
              any unauthorized use.
            </p>
            <p>
              When you decide to launch a project (Sponsoree) or fund one (Sponsor), you will be
              required to submit additional information (e.g., organization details, contact
              numbers). You warrant that all information you provide is accurate and up-to-date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">3. Platform Services</h2>
            <p>
              LandasBisnis provides an online matchmaking service only. We do not process payments,
              hold funds, or draw up contracts between Sponsors and Sponsorees.
            </p>
            <p>
              All agreements, payments, and deliverables must be arranged directly between the two
              parties off-Platform (e.g., via Zoom, bank transfer, written contract).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">4. Fees & Payment Processing</h2>
            <p>
              At present, we do not charge any fees, commissions, or transaction charges.
            </p>
            <p>
              You are responsible for any costs incurred in connecting (e.g., video conferencing
              fees, bank transfer costs).
            </p>
            <p>
              Refunds, reimbursements, or disputes over funding or deliverables are solely between
              the Sponsor and Sponsoree; LandasBisnis bears no responsibility.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">5. Intellectual Property</h2>
            <p>
              All content, materials, and project descriptions uploaded by Sponsorees remain their
              sole property.
            </p>
            <p>
              By publishing on the Platform, you grant LandasBisnis a non-exclusive, worldwide,
              royalty-free license to display and promote your content on the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">6. User Conduct & Content Standards</h2>
            <p>
              You agree not to post unlawful, defamatory, obscene, pornographic, or otherwise
              inappropriate content.
            </p>
            <p>
              Projects must be genuine and seek legitimate funding for bona fide university-level
              work or initiatives.
            </p>
            <p>
              We reserve the right to remove or reject any project or account that violates these
              standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">7. Disclaimers & Limitation of Liability</h2>
            <p>
              <strong>Disclaimer of Warranties.</strong> The Platform is provided "as is" and "as
              available." We make no warranties of any kind, whether express or implied, regarding
              its operation or content.
            </p>
            <p>
              <strong>No Guarantee of Success.</strong> We do not guarantee that any project will
              receive funding, nor that Sponsors’ contributions will yield results.
            </p>
            <p>
              <strong>Limitation of Liability.</strong> To the fullest extent permitted by law,
              LandasBisnis and its officers, directors, employees, or affiliates shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages, or any loss
              of profits or revenues, whether incurred directly or indirectly, arising out of your
              use of the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">8. Termination & Suspension</h2>
            <p>
              We may suspend or terminate your account, projects, or access to the Platform at our
              sole discretion if we believe you’ve engaged in suspicious, fraudulent, or malicious
              activities.
            </p>
            <p>
              Upon termination, your projects will be removed. You acknowledge that LandasBisnis is
              not responsible for returning or redistributing any funds; Sponsors and Sponsorees must
              resolve this directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">9. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of the Republic of Indonesia.
            </p>
            <p>
              Any dispute arising under or in connection with these Terms shall be resolved between
              the affected parties directly; LandasBisnis is not a party to such disputes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">10. Changes to These Terms</h2>
            <p>
              We may modify these Terms at any time by posting updated Terms on the Platform.
            </p>
            <p>
              Your continued use after changes are posted constitutes your acceptance of the modified
              Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">11. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>LandasBisnis</strong>
              <br />Jl. Mawar No. 1, Jakarta
              <br />support@landasbisnis.com
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
// app/terms/page.tsx
export default function TermsPage() {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: January 1, 2025</p>
  
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using DTU Shop, you accept and agree to be bound by the terms and provision of this agreement. 
                DTU Shop is a marketplace platform designed exclusively for Delhi Technological University students, faculty, and staff.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. User Eligibility</h2>
              <p className="text-gray-700 mb-4">
                To use DTU Shop, you must be:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>A current student, faculty member, or staff of Delhi Technological University</li>
                <li>At least 18 years old or have parental consent</li>
                <li>Capable of forming a binding contract</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Account Registration</h2>
              <p className="text-gray-700 mb-4">
                You must provide accurate and complete information when creating your account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Buying and Selling</h2>
              <p className="text-gray-700 mb-4">
                DTU Shop facilitates transactions between users. We do not own, sell, or purchase any items listed on the platform.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Sellers are responsible for accurate product descriptions and pricing</li>
                <li>Buyers are responsible for inspecting items before purchase</li>
                <li>All transactions are between individual users</li>
                <li>DTU Shop does not guarantee the quality or condition of items</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Prohibited Items</h2>
              <p className="text-gray-700 mb-4">
                The following items are strictly prohibited on DTU Shop:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Illegal substances or items</li>
                <li>Weapons or dangerous materials</li>
                <li>Stolen or counterfeit goods</li>
                <li>Adult content or services</li>
                <li>Academic dishonesty materials (assignment solutions, exam answers)</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. User Conduct</h2>
              <p className="text-gray-700 mb-4">
                Users must not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Post false or misleading information</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with the platform's operation</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Payment and Fees</h2>
              <p className="text-gray-700 mb-4">
                DTU Shop is currently free to use. We reserve the right to introduce fees in the future with proper notice.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                DTU Shop is not liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Disputes between users</li>
                <li>Quality or condition of items sold</li>
                <li>Failed transactions or delivery issues</li>
                <li>Loss or damage resulting from platform use</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may suspend or terminate your account for violations of these terms. 
                You may also delete your account at any time.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may update these terms from time to time. Continued use of DTU Shop after changes 
                constitutes acceptance of the new terms.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these terms, please contact us at:
              </p>
              <p className="text-gray-700">
                Email: support@dtushop.com<br />
                Address: Delhi Technological University, Shahbad Daulatpur, Delhi - 110042
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
// app/privacy/page.tsx
export default function PrivacyPage() {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: January 1, 2025</p>
  
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                DTU Shop ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you use our marketplace platform 
                designed for the Delhi Technological University community.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Name and contact information</li>
                <li>DTU student/staff ID and verification details</li>
                <li>Email address and phone number</li>
                <li>Profile information and preferences</li>
                <li>Payment and transaction information</li>
              </ul>
  
              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Usage patterns and interaction data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide and maintain our marketplace services</li>
                <li>Verify your eligibility as a DTU community member</li>
                <li>Process transactions and communicate with users</li>
                <li>Improve our platform and user experience</li>
                <li>Send important updates and notifications</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>With other users:</strong> Basic profile information for transactions</li>
                <li><strong>Service providers:</strong> Third parties who assist in platform operations</li>
                <li><strong>Legal compliance:</strong> When required by law or to protect rights</li>
                <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale</li>
                <li><strong>Consent:</strong> When you explicitly agree to sharing</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure hosting and infrastructure</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access and review your personal information</li>
                <li>Update or correct your information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of non-essential communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent where applicable</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings, but some features may not work properly if disabled.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide our services and support</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our platform and services</li>
              </ul>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our platform may integrate with third-party services (Google OAuth, payment processors). 
                These services have their own privacy policies, and we encourage you to review them.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                DTU Shop is not intended for users under 18. We do not knowingly collect personal information 
                from children under 18. If you believe we have collected such information, please contact us immediately.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. International Users</h2>
              <p className="text-gray-700 mb-4">
                DTU Shop is primarily designed for the DTU community in India. If you access our platform 
                from outside India, you consent to the transfer and processing of your information in India.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Changes to Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of significant changes 
                through the platform or via email. Your continued use constitutes acceptance of the updated policy.
              </p>
  
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@dtushop.com<br />
                  <strong>Address:</strong> Delhi Technological University<br />
                  Shahbad Daulatpur, Delhi - 110042<br />
                  <strong>Data Protection Officer:</strong> dpo@dtushop.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
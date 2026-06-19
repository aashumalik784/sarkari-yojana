export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">ℹ️ About Us</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="text-lg"><strong>Sarkari Yojana Hub</strong> is India's comprehensive platform for Government Schemes, Jobs, CSC Services, and Official Portals.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">🎯 Our Mission</h2>
          <p>To bridge the gap between citizens and government services by providing accurate, updated information.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">📋 What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>100+ Government Schemes - Auto-updated</li>
            <li>100+ Job Portals - Police, Teaching, Defence, Railway</li>
            <li>50+ CSC Services - Aadhaar, PAN, Passport</li>
            <li>60+ Ministry Links - Direct access</li>
          </ul>
          <h2 className="text-xl font-bold text-gray-900 mt-6">⚠️ Disclaimer</h2>
          <p>We are <strong>NOT an official government website</strong>. Always verify from official .gov.in sources.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">📧 Contact</h2>
          <p>Email: <strong>sarkariyojanahub@gmail.com</strong></p>
        </div>
      </div>
    </main>
  );
}

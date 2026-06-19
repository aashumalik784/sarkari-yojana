export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">⚠️ Disclaimer</h1>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 font-medium text-red-800">Sarkari Yojana Hub is NOT an official Government of India website.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">1. Information Accuracy</h2>
          <p>We strive for accuracy but make no guarantees. Always verify from official .gov.in sources.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">2. External Links</h2>
          <p>All links redirect to official portals. We have no control over external content.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">3. Advertising</h2>
          <p>This site displays Google AdSense ads. Clicking ads redirects to advertiser websites.</p>
        </div>
      </div>
    </main>
  );
}

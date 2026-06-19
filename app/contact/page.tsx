export default function ContactUs() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">📞 Contact Us</h1>
        <div className="space-y-6 text-gray-700">
          <p className="text-lg">Have questions or suggestions? We'd love to hear from you!</p>
          <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
            <h3 className="font-bold text-orange-800 mb-2">📧 Email Us</h3>
            <p className="text-orange-700 font-medium">sarkariyojanahub@gmail.com</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-800 mb-2">🏛️ For Official Queries</h3>
            <p className="text-sm text-blue-700">We are NOT a government body. Contact respective ministries directly through official websites.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// app/schemes/[id]/page.tsx

export default function SchemeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          📜 Yojana Details
        </h1>
        <p className="text-gray-700 mb-2">
          <strong>Scheme ID:</strong> {params.id}
        </p>
        <p className="text-gray-600 mt-4">
          Yahan is scheme ki puri details, eligibility, documents, aur official apply link aayegi. 
          Jaise hi D1 database connect hoga, hum yahan se actual data fetch karke display karenge.
        </p>
        <a 
          href="/" 
          className="mt-6 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          ← Back to All Schemes
        </a>
      </div>
    </div>
  );
}

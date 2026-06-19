'use client';
import { useEffect, useState } from 'react';

interface Scheme {
  id: number;
  name: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string;
  launch_date: string;
  url: string;
}

export default function Home() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchSchemes();
  }, [search]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schemes?q=${search}&limit=100`);
      const data = await res.json();
      setSchemes(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const triggerUpdate = async () => {
    setUpdating(true);
    setUpdateMessage('');
    try {
      const res = await fetch('/api/cron/auto-update', { method: 'POST' });
      const data = await res.json();
      setUpdateMessage(data.message || 'Update successful!');
      setTimeout(() => {
        fetchSchemes();
        setUpdating(false);
      }, 2000);
    } catch (error) {
      setUpdateMessage('Update failed. Try again.');      setUpdating(false);
    }
  };

  const openScheme = (schemeName: string, schemeUrl: string) => {
    if (schemeUrl) {
      window.open(schemeUrl, '_blank');
    } else {
      const query = encodeURIComponent(`${schemeName} official website site:gov.in`);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">
            🇮🇳 सरकारी योजना Hub
          </h1>
          <p className="text-gray-600">Auto-Updated Government Schemes Directory</p>
          <p className="text-sm text-green-600 font-semibold mt-2">
            Total Schemes: {schemes.length}
          </p>
        </header>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder=" योजना खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none"
          />
          <button
            onClick={triggerUpdate}
            disabled={updating}
            className="bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 disabled:bg-gray-400 transition"
          >
            {updating ? '⏳ Updating...' : '🔄 Update Now'}
          </button>
        </div>

        {updateMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl text-center">
            ✅ {updateMessage}
          </div>
        )}

        {loading ? (          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading {schemes.length} schemes...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                अभी कोई योजना नहीं है। ऊपर "Update Now" बटन दबाएं।
              </div>
            ) : (
              schemes.map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => openScheme(scheme.name, scheme.url)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-orange-500 cursor-pointer transform hover:scale-105"
                >
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">
                    {scheme.category}
                  </span>
                  <h2 className="text-lg font-bold mt-3 mb-2 text-gray-900">
                    {scheme.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {scheme.description}
                  </p>
                  {scheme.benefits && (
                    <p className="text-sm text-green-600 mb-2 font-medium bg-green-50 p-2 rounded">
                      💰 {scheme.benefits}
                    </p>
                  )}
                  {scheme.eligibility && (
                    <p className="text-xs text-blue-600 mb-2">
                      👥 {scheme.eligibility}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mb-3">
                    📅 {scheme.launch_date}
                  </p>
                  <p className="text-xs text-orange-600 font-bold">
                    🔗 Click for Official Website →
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );}

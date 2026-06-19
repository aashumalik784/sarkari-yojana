'use client';
import { useEffect, useState } from 'react';

interface Scheme {
    id: number;
    title: string;
    link: string;
    category: string;
    published_date: string;
}

export default function Home() {
    const [schemes, setSchemes] = useState<Scheme[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSchemes();
    }, [search]);

    const fetchSchemes = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/schemes?q=${search}&limit=50`);
            const data = await res.json();
            setSchemes(data);
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-orange-600 mb-2">
                        🇮🇳 सरकारी योजना Hub
                    </h1>
                    <p className="text-gray-600">Auto-Updated Government Schemes Directory</p>
                </header>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="🔍 योजना खोजें..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schemes.length === 0 ? (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                अभी कोई योजना नहीं है। Auto-update जल्द ही शुरू होगा।
                            </div>
                        ) : (
                            schemes.map((scheme) => (
                                <a
                                    key={scheme.id}
                                    href={scheme.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border-l-4 border-orange-500"
                                >
                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                        {scheme.category}
                                    </span>
                                    <h2 className="text-lg font-semibold mt-3 mb-2">
                                        {scheme.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        📅 {new Date(scheme.published_date).toLocaleDateString('hi-IN')}
                                    </p>
                                </a>
                            ))
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

interface Scheme {
  id: number;
  name: string;
  category: string;
  description: string;
  eligibility: string;
  benefits: string;
  launch_date: string;
}

export default async function SchemePage({ params }: { params: { id: string } }) {
  const { getCloudflareContext } = await import('@opennextjs/cloudflare');
  const { env } = await getCloudflareContext();
  
  const { results } = await env.DB.prepare(
    'SELECT * FROM schemes WHERE id =?'
  ).bind(params.id).all<Scheme>();

  const scheme = results[0];

  if (!scheme) {
    notFound();
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 mb-4 inline-block hover:underline">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">{scheme.name}</h1>
      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Category:</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {scheme.category}
          </span>
        </div>
        <div>
          <span className="font-semibold">Launch Date: </span>
          <span>{scheme.launch_date}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
          <p className="text-gray-700 leading-relaxed">{scheme.eligibility}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Benefits</h2>
          <p className="text-gray-700 leading-relaxed">{scheme.benefits}</p>
        </div>
      </div>
    </main>
  );
}

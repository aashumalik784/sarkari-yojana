import { notFound } from 'next/navigation';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

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
  const { env } = getRequestContext();
  
  const { results } = await env.DB.prepare(
    'SELECT * FROM schemes WHERE id =?'
  ).bind(params.id).all<Scheme>();

  const scheme = results[0];

  if (!scheme) {
    notFound();
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <a href="/" className="text-blue-600 mb-4 inline-block">← Back</a>
      <h1 className="text-3xl font-bold mb-4">{scheme.name}</h1>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Category: </span>
          <span className="bg-blue-100 px-2 py-1 rounded">{scheme.category}</span>
        </div>
        <div>
          <span className="font-semibold">Launch Date: </span>
          <span>{scheme.launch_date}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{scheme.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
          <p>{scheme.eligibility}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Benefits</h2>
          <p>{scheme.benefits}</p>
        </div>
      </div>
    </main>
  );
}

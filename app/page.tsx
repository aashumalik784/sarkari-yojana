import { getCloudflareContext } from '@opennextjs/cloudflare';
import Link from 'next/link';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Scheme {
  id: number;
  name: string;
  category: string;
  launch_date: string;
}

export default async function Home() {
  const { env } = await getCloudflareContext();
  const { results } = await env.DB.prepare(
    'SELECT id, name, category, launch_date FROM schemes ORDER BY launch_date DESC LIMIT 10'
  ).all<Scheme>();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sarkari Yojana</h1>
      <div className="grid gap-4">
        {results.map((scheme) => (
          <Link 
            key={scheme.id} 
            href={`/schemes/${scheme.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{scheme.name}</h2>
            <p className="text-gray-600">{scheme.category}</p>
            <p className="text-sm text-gray-500">Launch: {scheme.launch_date}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

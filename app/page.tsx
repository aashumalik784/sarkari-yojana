import { getRequestContext } from '@cloudflare/next-on-pages'
import Link from 'next/link'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Scheme = {
  id: string
  name: string
  description: string
  category: string
  last_date: string
}

async function getAllSchemes(): Promise<Scheme[]> {
  try {
    const { env } = getRequestContext()
    const { results } = await env.DB.prepare(
      'SELECT id, name, description, category, last_date FROM schemes ORDER BY id DESC'
    ).all<Scheme>()
    
    return results || []
  } catch (error) {
    console.error('DB Error:', error)
    return []
  }
}

export default async function HomePage() {
  const schemes = await getAllSchemes()

  return (
    <main className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Sarkari Yojana
        </h1>
        <p className="text-lg text-gray-600">
          Bharat ki sabhi sarkari yojanao ki jankari ek jagah
        </p>
      </div>

      {schemes.length === 0? (
        <div className="text-center bg-white p-10 rounded-lg shadow">
          <p className="text-gray-500 text-lg">Abhi koi yojana available nahi hai.</p>
          <p className="text-sm mt-2 text-gray-400">D1 database me data add karein.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  {scheme.category}
                </span>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                {scheme.name}
              </h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {scheme.description}
              </p>
              
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <p className="text-red-600 text-sm font-semibold">
                  Last Date: {scheme.last_date}
                </p>
                <Link 
                  href={`/schemes/${scheme.id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

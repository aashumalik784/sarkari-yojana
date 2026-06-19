import { notFound } from 'next/navigation'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge' // Cloudflare ke liye zaroori hai

type Scheme = {
  id: string
  name: string
  description: string
  category: string
  eligibility: string
  benefits: string
  documents: string
  apply_link: string
  last_date: string
}

type Props = {
  params: { id: string }
}

async function getScheme(id: string): Promise<Scheme | null> {
  try {
    // D1 database se data nikal rahe hain
    const { env } = getRequestContext()
    const { results } = await env.DB.prepare(
      'SELECT * FROM schemes WHERE id =?'
    ).bind(id).all<Scheme>()

    return results[0] || null
  } catch (error) {
    console.error('Database Error:', error)
    return null
  }
}

export default async function SchemePage({ params }: Props) {
  const scheme = await getScheme(params.id)

  // Agar yojana nahi mili to 404 page dikhao
  if (!scheme) {
    notFound()
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">{scheme.name}</h1>
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mb-4 px-3 py-1 rounded-full">
          {scheme.category}
        </span>

        <p className="text-gray-700 mb-6">{scheme.description}</p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Eligibility / पात्रता</h2>
            <p className="text-gray-600">{scheme.eligibility}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Benefits / लाभ</h2>
            <p className="text-gray-600">{scheme.benefits}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Required Documents / जरूरी दस्तावेज</h2>
            <p className="text-gray-600">{scheme.documents}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Last Date / अंतिम तिथि</h2>
            <p className="text-red-600 font-medium">{scheme.last_date}</p>
          </div>
        </div>

        <a
          href={scheme.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          Apply Now / अभी आवेदन करें
        </a>
      </div>
    </main>
  )
}

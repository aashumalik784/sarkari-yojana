import { notFound } from 'next/navigation'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

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

async function getScheme(id: string): Promise<Scheme | null> {
  try {
    const { env } = getRequestContext()
    const { results } = await env.DB.prepare(
      'SELECT * FROM schemes WHERE id =?'
    ).bind(id).all<Scheme>()
    return results[0] || null
  } catch (error) {
    return null
  }
}

export default async function Page({ 
  params 
}: { 
  params: { id: string } 
}) {
  const scheme = await getScheme(params.id)

  if (!scheme) {
    notFound()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{scheme.name}</h1>
      <p className="mt-4">{scheme.description}</p>
      <p className="mt-2"><b>Category:</b> {scheme.category}</p>
      <p className="mt-2"><b>Eligibility:</b> {scheme.eligibility}</p>
      <p className="mt-2"><b>Benefits:</b> {scheme.benefits}</p>
      <p className="mt-2"><b>Documents:</b> {scheme.documents}</p>
      <p className="mt-2"><b>Last Date:</b> {scheme.last_date}</p>
      <a 
        href={scheme.apply_link} 
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
        target="_blank"
      >
        Apply Now
      </a>
    </div>
  )
}

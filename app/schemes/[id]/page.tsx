import { notFound } from 'next/navigation'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export default async function Page({ 
  params 
}: { 
  params: { schemeId: string } 
}) {
  try {
    const { env } = getRequestContext()
    const { results } = await env.DB.prepare(
      'SELECT * FROM schemes WHERE id =?'
    ).bind(params.schemeId).all()
    
    const scheme = results[0]
    
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
  } catch (e) {
    return <div>Error loading scheme</div>
  }
}

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
  last_date: string
  apply_link: string
}

export default async function Page({ 
  params 
}: { 
  params: { schemeId: string } 
}) {
  try {
    const { env } = getRequestContext()
    const { results } = await env.DB.prepare(
      'SELECT * FROM schemes WHERE id =?'
    ).bind(params.schemeId).all<Scheme>()
    
    const scheme = results?.[0]
    
    if (!scheme) {
      notFound()
    }

    return (
      <main className="container mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mb-4 px-3 py-1 rounded-full">
            {scheme.category}
          </span>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {scheme.name}
          </h1>
          
          <p className="text-gray-700 text-lg mb-8">
            {scheme.description}
          </p>
          
          <div className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-gray-900">Eligibility</h3>
              <p className="text-gray-600">{scheme.eligibility}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Benefits</h3>
              <p className="text-gray-600">{scheme.benefits}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Required Documents</h3>
              <p className="text-gray-600">{scheme.documents}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900">Last Date to Apply</h3>
              <p className="text-red-600 font-semibold">{scheme.last_date}</p>
            </div>
          </div>
          
          <a 
            href={scheme.apply_link} 
            className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </a>
        </div>
      </main>
    )
  } catch (error) {
    console.error('DB Error:', error)
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Scheme</h1>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    )
  }
}

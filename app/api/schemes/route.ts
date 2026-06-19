import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { env } = getRequestContext()
    const db = env.DB
    
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const search = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    let query = "SELECT * FROM schemes WHERE 1=1"
    const params: any[] = []
    
    if (category) {
      query += " AND category = ?"
      params.push(category)
    }
    
    if (search) {
      query += " AND (name LIKE ? OR description LIKE ?)"
      params.push(`%${search}%`, `%${search}%`)
    }
    
    query += " ORDER BY id DESC LIMIT ?"
    params.push(limit)
    
    const { results } = await db.prepare(query).bind(...params).all()
    
    return NextResponse.json({ schemes: results }, {
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

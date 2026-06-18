import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { env } = getRequestContext();
    const db = env.DB;
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const search = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    let query = "SELECT * FROM schemes WHERE 1=1";
    const params: any[] = [];
    
    if (category) {
        query += " AND category =?";
        params.push(category);
    }
    
    if (search) {
        query += " AND (title LIKE? OR description LIKE?)";
        params.push(`%${search}%`, `%${search}%`);
    }
    
    query += " ORDER BY created_at DESC LIMIT?";
    params.push(limit);
    
    const { results } = await db.prepare(query).bind(...params).all();
    
    return NextResponse.json(results, {
        headers: { 
            'Access-Control-Allow-Origin': '*'
        }
    });
}

import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { unstable_noStore as noStore } from 'next/cache';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(request: NextRequest) {
  noStore(); // Build time pe caching roko
  
  const { env } = await getCloudflareContext();
  
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let query = 'SELECT id, name, category, launch_date FROM schemes';
  let params: any[] = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY launch_date DESC LIMIT 50';

  const { results } = await env.DB.prepare(query).bind(...params).all();

  return NextResponse.json({ schemes: results });
}

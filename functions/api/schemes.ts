export const onRequestGet: PagesFunction<{ DB: D1Database }> = async (context) => {
    const db = context.env.DB;
    const url = new URL(context.request.url);
    
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('q');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    let query = "SELECT * FROM schemes WHERE 1=1";
    const params: any[] = [];
    
    if (category) {
        query += " AND category = ?";
        params.push(category);
    }
    
    if (search) {
        query += " AND (title LIKE ? OR description LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }
    
    query += " ORDER BY created_at DESC LIMIT ?";
    params.push(limit);
    
    const { results } = await db.prepare(query).bind(...params).all();
    
    return new Response(JSON.stringify(results), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
};

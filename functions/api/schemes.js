export async function onRequestGet(context) {
    const db = context.env.DB;
    const url = new URL(context.request.url);
    
    const search = url.searchParams.get('q') || '';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    try {
        let query = "SELECT * FROM schemes WHERE 1=1";
        const params = [];
        
        if (search) {
            query += " AND (name LIKE ? OR description LIKE ? OR category LIKE ?)";
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        
        query += " ORDER BY launch_date DESC LIMIT ?";
        params.push(limit);
        
        const { results } = await db.prepare(query).bind(...params).all();
        
        return new Response(JSON.stringify(results), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify([]), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

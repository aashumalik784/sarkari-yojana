export const onRequest: PagesFunction<{ DB: D1Database }> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  let query = 'SELECT id, name, category, launch_date FROM schemes';
  let params: any[] = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY launch_date DESC LIMIT 50';

  const { results } = await env.DB.prepare(query).bind(...params).all();

  return new Response(JSON.stringify({ schemes: results }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });
};

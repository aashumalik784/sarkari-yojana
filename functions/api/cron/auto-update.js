export async function onRequestPost(context) {
    const db = context.env.DB;
    
    const rssFeeds = [
        "https://pib.gov.in/rss/currRls.aspx",
        "https://www.mygov.in/rss.xml"
    ];
    
    let newSchemesCount = 0;
    
    for (const feedUrl of rssFeeds) {
        try {
            const response = await fetch(feedUrl);
            const xml = await response.text();
            
            const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
            
            for (const item of items) {
                const title = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1] || '';
                const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
                const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
                
                const keywords = ['yojna', 'scheme', 'abhiyan', 'mission', 'pm ', 'yojana'];
                const isScheme = keywords.some(k => title.toLowerCase().includes(k));
                
                if (isScheme && link) {
                    try {
                        await db.prepare(
                            `INSERT OR IGNORE INTO schemes (title, link, published_date, category) 
                             VALUES (?, ?, ?, ?)`
                        ).bind(title, link, pubDate, 'Central').run();
                        newSchemesCount++;
                    } catch (e) {}
                }
            }
        } catch (error) {
            console.error(`Error fetching ${feedUrl}:`, error);
        }
    }
    
    return new Response(
        JSON.stringify({ success: true, message: `${newSchemesCount} new schemes added.` }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

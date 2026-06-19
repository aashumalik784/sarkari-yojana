export const onRequest: PagesFunction<{ DB: D1Database }> = async (context) => {
    const db = context.env.DB;
    
    const rssFeeds = [
        "https://pib.gov.in/rss/currRls.aspx",
        "https://www.mygov.in/rss.xml",
        "https://pib.gov.in/rss/Hindi/currRls.aspx"
    ];
    
    let newSchemesCount = 0;
    
    for (const feedUrl of rssFeeds) {
        try {
            const response = await fetch(feedUrl);
            const xml = await response.text();
            
            // XML se items extract karna
            const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
            
            for (const item of items) {
                const title = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1] || '';
                const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
                const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
                
                // Keywords check - sirf yojana se related items save karein
                const keywords = ['yojna', 'scheme', 'abhiyan', 'mission', 'pm ', 'yojana', 'अभियान', 'योजना'];
                const isScheme = keywords.some(k => title.toLowerCase().includes(k));
                
                if (isScheme && link) {
                    try {
                        await db.prepare(
                            `INSERT OR IGNORE INTO schemes (title, link, published_date, category) 
                             VALUES (?, ?, ?, ?)`
                        ).bind(
                            title, 
                            link, 
                            pubDate,
                            feedUrl.includes('Hindi') ? 'Hindi' : 'English'
                        ).run();
                        newSchemesCount++;
                    } catch (e) {
                        // Duplicate entry, skip
                    }
                }
            }
        } catch (error) {
            console.error(`Error fetching ${feedUrl}:`, error);
        }
    }
    
    return new Response(
        JSON.stringify({ 
            success: true, 
            message: `Auto-update complete. ${newSchemesCount} new schemes added.` 
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
};

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
                const description = item.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/)?.[1] || '';
                
                const keywords = ['yojna', 'scheme', 'abhiyan', 'mission', 'pm ', 'yojana', 'yojana'];
                const isScheme = keywords.some(k => title.toLowerCase().includes(k));
                
                if (isScheme && title) {
                    try {
                        await db.prepare(
                            `INSERT OR IGNORE INTO schemes (name, category, description, launch_date) 
                             VALUES (?, ?, ?, ?)`
                        ).bind(
                            title.trim(),
                            feedUrl.includes('mygov') ? 'MyGov' : 'PIB',
                            description.trim().substring(0, 500),
                            pubDate || new Date().toISOString().split('T')[0]
                        ).run();
                        newSchemesCount++;
                    } catch (e) {
                        // Skip duplicates
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
            message: `${newSchemesCount} new schemes added.`,
            timestamp: new Date().toISOString()
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

export async function onRequestGet(context) {
    return new Response(
        JSON.stringify({ 
            message: "Auto-update worker is ready!",
            instructions: "Send POST request to trigger update"
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

// Vercel serverless function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { token, thread } = req.body;
  
    if (!token || !thread) {
      return res.status(400).json({ error: 'Missing token or thread' });
    }
  
    try {
      // Create Notion page
      const notionRes = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parent: { 
            // Replace with your Database ID: e.g., "abc123def456"
            database_id: process.env.NOTION_DB_ID || 'YOUR_DB_ID_HERE' 
          },
          properties: {
            Title: {
              title: [{
                text: {
                  content: `${thread.author} - Twitter Thread (${new Date().toISOString().split('T')[0]})`
                }
              }]
            }
          },
          children: thread.tweets.map((tweet) => ({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                text: {
                  content: tweet
                }
              }]
            }
          }))
        })
      });
  
      if (!notionRes.ok) {
        throw new Error(`Notion API error: ${notionRes.status}`);
      }
  
      res.status(200).json({ ok: true, message: 'Thread saved!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
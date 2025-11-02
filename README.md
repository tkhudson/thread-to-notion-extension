# Thread → Notion Chrome Extension

1-click save Twitter threads to Notion.

## Setup (2 min)

1. Unzip & open `chrome://extensions` → Load unpacked → Select this folder.
2. Get Notion token: [notion.so/my-integrations](https://www.notion.so/my-integrations) → New integration.
3. Create/share a Database with integration → Copy DB ID from URL.
4. Deploy API: Fork [this Vercel template](https://vercel.com/new/git/external?repository-url=https://github.com/vercel-labs/vercel-hello&env=NOTION_DB_ID) → Add `NOTION_DB_ID=your_id`.
5. Update `popup.js`: Replace `'https://your-vercel-app.vercel.app/api/save'` with your URL.
6. Test: Open Twitter thread → Click extension → Paste token → Save!

Questions? DM @hudsonitconsult

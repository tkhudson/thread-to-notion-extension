// api/save.js
export default function handler(req, res) {
    const { text } = req.query;
    const notionUrl = `https://buttered-galliform-468.notion.site/Paste-Thread-Here-2a097d8723e380deba62dbd1773c9485?duplicate=true`;
    const final = `${notionUrl.replace('/YourTemplateLinkHere', '')}?title=Thread ${new Date().toISOString().slice(0,10)}&prefill=${encodeURIComponent(text)}`;
    res.redirect(307, final);
  }
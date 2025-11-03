chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "grab") {
      const tweets = Array.from(document.querySelectorAll('[data-testid="tweetText"]'))
                      .map(t => t.innerText.trim())
                      .filter(Boolean);
      if (tweets.length < 2) {
        alert("Not a thread – need 2+ tweets");
        return;
      }
      const text = tweets.map((t,i) => `${i+1}. ${t}`).join('\n\n');
      const url = `https://notion-thread2notion.vercel.app/api/save?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  });
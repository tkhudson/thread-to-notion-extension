chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "grabThread") {
      const tweets = Array.from(document.querySelectorAll('[data-testid="tweetText"]'))
        .map((t, i) => `${i + 1}. ${t.innerText.trim()}`)
        .filter(Boolean);
      if (tweets.length < 2) {
        sendResponse({text: null});
        return true;
      }
      const formattedText = tweets.join('\n\n');
      sendResponse({text: formattedText});
      return true;
    }
  });
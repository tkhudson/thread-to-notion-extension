// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getThread') {
      try {
        // Find the main tweet/thread container (Twitter's DOM changes, so flexible selectors)
        const tweetElements = document.querySelectorAll('article[data-testid="tweet"]');
        if (tweetElements.length === 0) {
          sendResponse(null);
          return;
        }
  
        const thread = {
          author: '',
          tweets: [],
          url: window.location.href
        };
  
        tweetElements.forEach((el) => {
          const textEl = el.querySelector('[data-testid="tweetText"]');
          const authorEl = el.querySelector('[data-testid="User-Name"] span');
          if (textEl && textEl.textContent.trim()) {
            thread.tweets.push(textEl.textContent.trim());
          }
          if (authorEl && !thread.author) {
            thread.author = authorEl.textContent;
          }
        });
  
        // Filter to unique tweets
        thread.tweets = [...new Set(thread.tweets)];
  
        sendResponse(thread);
      } catch (error) {
        console.error('Thread scrape error:', error);
        sendResponse(null);
      }
    }
    return true; // Keeps message channel open for async
  });
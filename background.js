// Service worker for background tasks (Manifest V3)
chrome.runtime.onInstalled.addListener(() => {
    console.log('Thread → Notion installed!');
  });
  
  // No heavy logic needed here for MVP
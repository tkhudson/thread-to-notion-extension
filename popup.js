document.addEventListener('DOMContentLoaded', () => {
    const tokenInput = document.getElementById('token');
    const saveBtn = document.getElementById('save');
    const status = document.getElementById('status');
  
    // Load saved token
    chrome.storage.sync.get(['notionToken'], (result) => {
      if (result.notionToken) tokenInput.value = result.notionToken;
    });
  
    saveBtn.onclick = async () => {
      const token = tokenInput.value.trim();
      if (!token) {
        status.textContent = 'Enter Notion token first!';
        status.style.color = 'red';
        return;
      }
  
      // Save token for next time
      chrome.storage.sync.set({ notionToken: token });
  
      status.textContent = 'Saving...';
      status.style.color = 'blue';
  
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url.includes('twitter.com') && !tab.url.includes('x.com')) {
          throw new Error('Open a Twitter thread first!');
        }
  
        // Inject content script if needed and get thread data
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getThread' });
        if (!response) throw new Error('No thread found on this page.');
  
        // Call Vercel API (replace with your deployed URL)
        const apiRes = await fetch('https://your-vercel-app.vercel.app/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, thread: response })
        });
  
        if (apiRes.ok) {
          status.textContent = 'Saved to Notion! 🎉';
          status.style.color = 'green';
        } else {
          throw new Error('API error');
        }
      } catch (error) {
        status.textContent = error.message;
        status.style.color = 'red';
      }
    };
  });
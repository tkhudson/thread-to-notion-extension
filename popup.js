document.getElementById('save').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "grabThread"}, (response) => {
        if (response && response.text) {
          navigator.clipboard.writeText(response.text).then(() => {
            window.open('https://buttered-galliform-468.notion.site/Paste-Thread-Here-2a097d8723e380deba62dbd1773c9485?source=copy_link', '_blank');
            alert('Thread copied! Paste (Ctrl+V) into the new Notion page.');
          }).catch(err => {
            console.error('Clipboard error:', err);
          });
        } else {
          alert('No thread found - open a Twitter thread.');
        }
      });
    });
  });
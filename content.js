document.addEventListener("copy", () => {
  const copiedText = document.getSelection().toString();
  if (copiedText) {
    chrome.storage.local.get("clipboardHistory", (data) => {
      const history = data.clipboardHistory || [];
      history.unshift(copiedText); // Add new text to the beginning
      chrome.storage.local.set({ clipboardHistory: history.slice(0, 100) }); // Keep up to 100 items
    });
  }
});

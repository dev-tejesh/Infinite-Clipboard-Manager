chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardHistory: [] }, () => {
    console.log("Clipboard history initialized.");
  });
});

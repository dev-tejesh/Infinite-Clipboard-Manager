document.addEventListener("DOMContentLoaded", () => {
  const clipboardList = document.getElementById("clipboard-list");
  const clearHistoryBtn = document.getElementById("clear-history");

  // Load clipboard history from storage
  chrome.storage.local.get("clipboardHistory", (data) => {
    const history = data.clipboardHistory || [];
    renderClipboardList(history);
  });

  // Render clipboard list
  function renderClipboardList(history) {
    clipboardList.innerHTML = ""; // Clear current list
    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      clipboardList.appendChild(li);
    });
  }

  // Clear clipboard history
  clearHistoryBtn.addEventListener("click", () => {
    chrome.storage.local.set({ clipboardHistory: [] }, () => {
      renderClipboardList([]);
    });
  });
});

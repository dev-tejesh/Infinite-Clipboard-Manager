document.addEventListener("DOMContentLoaded", () => {
  const clipboardList = document.getElementById("clipboard-list");
  const searchBar = document.getElementById("search-bar");
  const clearHistoryBtn = document.getElementById("clear-history");
  let clipboardHistory = []; // Store the clipboard history in memory

  // Load clipboard history from storage
  chrome.storage.local.get("clipboardHistory", (data) => {
    clipboardHistory = data.clipboardHistory || [];
    renderClipboardList(clipboardHistory);
  });

  // Render clipboard list
  function renderClipboardList(history) {
    clipboardList.innerHTML = ""; // Clear current list
    if (history.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "No clipboard history found.";
      emptyMessage.style.textAlign = "center";
      clipboardList.appendChild(emptyMessage);
      return;
    }

    history.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      clipboardList.appendChild(li);
    });
  }

  // Filter clipboard history based on search query
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredHistory = clipboardHistory.filter((item) =>
      item.toLowerCase().includes(query)
    );
    renderClipboardList(filteredHistory);
  });

  // Clear clipboard history
  clearHistoryBtn.addEventListener("click", () => {
    chrome.storage.local.set({ clipboardHistory: [] }, () => {
      clipboardHistory = [];
      renderClipboardList([]);
    });
  });
});

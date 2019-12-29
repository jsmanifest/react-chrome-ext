// Install the context menu items on extension installation
chrome.runtime.onInstalled.addListener(message => {
  const contexts = [
    "page",
    "selection",
    "link",
    "editable",
    "image",
    "video",
    "audio"
  ];
  // onClicking these in the UI will send to contextMenu handlers
  chrome.contextMenus.create([
    {
      title: "Filter by duration",
      id: "filter-by-duration",
      contexts: [...contexts, "browser_action"]
    }
  ]);
});

function getActiveTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0];
    callback(activeTab);
  });
}

// When a context menu item is clicked
chrome.contextMenus.onClicked.addListener(info => {
  console.log(info);
  if (info.menuItemId === "filter-by-duration") {
    getActiveTab(tab => {
      if (info.menuItemId === "filter-by-duration") {
        chrome.tabs.sendMessage(tab.id, {
          type: "filter-by-duration",
          ...info
        });
      }
    });
  }
});

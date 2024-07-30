// constant
import onIconPath from './const/onIconPath.js';
import defaultIconPath from './const/defaultIconPath.js';
// manager
import statusManager from './utils/statusManager.js';
import urlManager from './utils/urlManager.js';
// function
import cleaningUrl from './utils/cleaningUrl.js';

const debug = (inputContent) => {
  console.log(`[DEBUG] ${new Date()}: `);
  console.log("\t", inputContent);
};

const getDateParamsString = () => {
  const dt = new Date();
  let year = dt.getFullYear();
  let month = dt.getMonth() + 1;
  const days = dt.getDate();

  // get 6 month ago
  month -= 6;
  if (month < 1) {
    month += 12;
    year -= 1;
  };

  const dateParams = `&tbs=cdr%3A1%2Ccd_min%3A${month}%2F${days}%2F${year}`;
  return dateParams;
}

const checkAndUpdateUrl = (tabId, tab) => {
  // debug(`inside checkAndUpdateUrl ${tab.url}`);
  const originalUrl = tab.url;

  if (urlManager.isGoogle(tab.url) && !urlManager.getParam(tab.url, "tbs") && !urlManager.getParam(tab.url, "url")) {
    let newUrl = cleaningUrl(originalUrl);
    if (statusManager.getStatus()) {
      newUrl += getDateParamsString()
    };
    if (newUrl !== originalUrl) {
      // debug(`url updated from ${originalUrl} to ${newUrl}`);
      chrome.tabs.update(tabId, {
        url: newUrl
      });
    };
  };
}

// when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  // change status
  statusManager.changeStatus();
  let currentStatus = statusManager.getStatus();
  debug(`Current status: ${currentStatus}`);

  // Change icon
  if (currentStatus) {
    chrome.action.setIcon({
      path: onIconPath,
    });
  } else {
    chrome.action.setIcon({
      path: defaultIconPath,
    });
  };

  // change url
  checkAndUpdateUrl(tab.id, tab)
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // change url
  checkAndUpdateUrl(tab.id, tab);
});

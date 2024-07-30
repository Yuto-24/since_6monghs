chrome.action.onClicked.addListener((tab) => {
  if (statusManager.getStatus()) {
    chrome.action.setIcon({
      path: "../icon/icon-19-off.png"
    });
  } else {
    chrome.action.setIcon({
      path: "../icon/icon-19-on.png"
    });
  }
  statusManager.changeStatus();

  if (urlManager.isGoogle(tab.url)) {
    if (statusManager.getStatus()) {
      chrome.tabs.update(tab.id, {
        url: tab.url + "&tbs=qdr:y"
      });
    } else {
      var url = tab.url;
      // remove unneeded params
      url = url.replace(/&oq=[^&]*/g, "");
      url = url.replace(/&sca_esv=[^&]*/g, "");
      url = url.replace(/&gs_lcrp=[^&]*/g, "");
      url = url.replace(/&sourceid=[^&]*/g, "");
      url = url.replace(/&ved=[^&]*/g, "");
      url = url.replace(/&ei=[^&]*/g, "");
      url = url.replace(/&sxsrf=[^&]*/g, "");
      url = url.replace(/&gs_lp=[^&]*/g, "");
      url = url.replace(/&sclient=[^&]*/g, "");
      url = url.replace(/&bih=[^&]*/g, "");
      url = url.replace(/&dpr=[^&]*/g, "");
      // del tag
      url = url.replace(/#.*/g, "");
      // del date params
      url = url.replace(/&as_qdr=y1/g, "");
      url = url.replace(/&tbs=qdr:y/g, "");
      // cleaning re
      chrome.tabs.update(tab.id, {
        url: url
      });
    }
  }
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const dt = new Date();
  let year = dt.getFullYear();
  let month = dt.getMonth() + 1;
  const days = dt.getDate();

  month -= 6;

  if (month < 1) {
    month += 12;
    year -= 1;
  };
  const dateParams = `&tbs=cdr%3A1%2Ccd_min%3A${month}%2F${days}%2F${year}`;
  if (statusManager.getStatus()) {
    if (urlManager.isGoogle(tab.url) && !urlManager.getParam(tab.url, "tbs") && !urlManager.getParam(tab.url, "url")) {
      chrome.tabs.update(tabId, {
        url: tab.url + dateParams
      });
    }
  }
});

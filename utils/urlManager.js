var urlManager = {};

Object.assign(urlManager, {
  isGoogle: function(url) {
    return url.match(/https?:\/\/www\.google[^\/]+?(\/#|\/search|\/webhp|$)/) != null;
  },
  getGoogleQuery: function(url) {
    var quPattern = new RegExp(/http.*\?.*&qu=(.+?)(&.*|#.*|$)/);
    var qPattern = new RegExp(/http.*\?.*&q=(.+?)(&.*|#.*|$)/);

    // アドレスバーではなくGoogle検索窓で複数ワード検索した時に区切り文字が+になる。
    // 検索ワード自体に含まれる+文字はURLエンコードされる（%2B）
    url = url.replace(/\+/g, " ");

    url = decodeURIComponent(url);
    if (url.match(quPattern) || url.match(qPattern)) {
      return RegExp.$1;
    } else {
      return "";
    }
  },
  getParam: function(url, name) {
    var pattern = new RegExp("http.*\?(.*&)?" + name + "=(.+?)(&.*|#.*|$)");

    url = decodeURIComponent(url);
    if (url.match(pattern)) {
      return RegExp.$2;
    } else {
      return "";
    }
  }
});

// To create a custom event emitter (similar to jQuery's $({}) functionality):
urlManager.events = {};
urlManager.on = function(eventName, callback) {
  if (!this.events[eventName]) {
    this.events[eventName] = [];
  }
  this.events[eventName].push(callback);
};
urlManager.trigger = function(eventName, data) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(function(callback) {
      callback(data);
    });
  }
};

export default urlManager;

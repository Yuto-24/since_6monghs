const cleaningUrl = (url) => {
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
  url = url.replace(/&rlz=[^&]*/g, "");
  url = url.replace(/&sca_esv=[^&]*/g, "");
  url = url.replace(/&sca_upv=[^&]*/g, "");
  url = url.replace(/&iflsig=[^&]*/g, "");
  url = url.replace(/&uact=[^&]*/g, "");
  // del tag
  url = url.replace(/#.*/g, "");
  // del date params
  url = url.replace(/&as_qdr=y1/g, "");
  url = url.replace(/&tbs=[^&]*/g, "");
  return url;
};

export default cleaningUrl;

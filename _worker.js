export default {
  async fetch(request, env) {
    const _url = new URL(request.url);
    _url.hostname = _url.pathname.startsWith("/gh/")
      ? "github.com"
      : "cn.bing.com";
    const req = new Request(_url, request);
    return fetch(req);
  },
};

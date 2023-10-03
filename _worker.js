export default {
  async fetch(request, env) {
    const _url = new URL(request.url);
    _url.hostname = "github.com";
    const req = new Request(_url, request);
    return fetch(req);
  },
};

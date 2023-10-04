export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    url.hostname = "github.com";
    let new_request = new Request(url, request);
    new_request.redirect = "follow";
    return fetch(new_request);
  }
};

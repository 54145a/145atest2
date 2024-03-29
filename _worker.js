const doh = 'https://family.cloudflare-dns.com/dns-query';
const dohjson = 'https://family.cloudflare-dns.com/dns-query';
const contype = 'application/dns-message';
const jstontype = 'application/dns-json';
const r404 = new Response(null, { status: 404 });
async function handleRequest(request) {
  // when res is a Promise<Response>, it reduces billed wall-time
  // blog.cloudflare.com/workers-optimization-reduces-your-bill
  let res = r404;
  const { method, headers, url } = request;
  const searchParams = new URL(url).searchParams;
  if (method == 'GET' && searchParams.has('dns')) {
    res = fetch(doh + '?dns=' + searchParams.get('dns'), {
      method: 'GET',
      headers: {
        'Accept': contype,
      }
    });
  } else if (method === 'POST' && headers.get('content-type') === contype) {
    // streaming out the request body is optimal than awaiting on it
    const rostream = request.body;
    res = fetch(doh, {
      method: 'POST',
      headers: {
        'Accept': contype,
        'Content-Type': contype,
      },
      body: rostream,
    });
  } else if (method === 'GET' && headers.get('Accept') === jstontype) {
    const search = new URL(url).search;
    res = fetch(dohjson + search, {
      method: 'GET',
      headers: {
        'Accept': jstontype,
      }
    });
  }
  return res;
}
export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (url.pathname.includes("dns-query")) {
      return handleRequest(request);
    } else {
      url.hostname = "github.com";
      let new_request = new Request(url, request);
      //let h = request.headers;
      /*h.set("Origin","https://chat.openai.com");
      h.set("X-Forwarded-For","1.32.232.123");*/
      return fetch(new_request);
    }
  }
};

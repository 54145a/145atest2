let targetHostname = "zh.wikipedia.org";
export default {
    async fetch(request, env) {
        let url = new URL(request.url);
        if (url.pathname === "/robots.txt") {
            return new Response("User-Agent: *\nDisallow: /");
        }
        url.hostname = targetHostname;
        let newRequest = new Request(url, request);
        newRequest.headers.set("Access-Control-Allow-Origin", "*");
        newRequest.headers.delete("Origin");
        newRequest.headers.delete("Referrer");
        return new Request(JSON.stringify(newRequest));
        //return fetch(newRequest);
    }
};

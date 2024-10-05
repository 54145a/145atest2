export default {
    async fetch(request, env) {
        let url = new URL(request.url);
        if (url.pathname === "robots.txt") {
            return new Response("User-Agent: *\nDisallow: /");
        }
        //url.hostname = "www.wikipedia.org";
        //let new_request = new Request(url, request);
        return new Response("pathname:" + url.pathname)//fetch(new_request);
    }
};

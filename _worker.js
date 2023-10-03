const rewriter = new HTMLRewriter()
  .on('a', new AttributeRewriter('href'))
  //.on('img', new AttributeRewriter('src'))
 
class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace('github.com', '145atest2.pages.dev')
      )
    }
  }
}
export default {
  async fetch(request, env) {
    const _url = new URL(request.url);
    _url.hostname = "github.com";
    const req = await fetch(new Request(_url, request));
  const res = await fetch(req);
  return rewriter.transform(res);
  },
};

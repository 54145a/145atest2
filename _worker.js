
class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName;
  }

  element(element) {
    const attribute = element.getAttribute(this.attributeName);
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace('//github.com', '//145atest2.pages.dev')
      );
    }
  }
}
const rewriter = new HTMLRewriter()
.on('a', new AttributeRewriter('href'))
.on('img', new AttributeRewriter('src'));
export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    url.hostname = "github.com";
    let new_request = new Request(url, request);
    let new_res = fetch(new_request);
    return rewriter.transform(new_res)
  }
};

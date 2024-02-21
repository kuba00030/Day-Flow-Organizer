export default function getElementsBySelector(selector: string): NodeList {
  return document.querySelectorAll(selector);
}

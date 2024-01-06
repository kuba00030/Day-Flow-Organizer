export default function styleSelectedElement(
  selectByAtribute: string,
  attributeName: string,
  e: any,
  ...className: string[]
) {
  const elements = document.querySelectorAll(selectByAtribute);
  const selectedElement = document.querySelector(
    `[${attributeName}="${e.target.getAttribute(attributeName)}"]`
  );
  elements.forEach((element) => element.classList.remove(...className));
  selectedElement.classList.add(...className);
}

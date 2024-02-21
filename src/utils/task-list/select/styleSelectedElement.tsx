export default function styleSelectedElement(
  selectByAtribute: string,
  currentAttributeName: string,
  e: any,
  ...className: string[]
) {
  const elements = document.querySelectorAll(selectByAtribute);

  const selectedElement = document.querySelector(
    `[${currentAttributeName}="${e.target.getAttribute(currentAttributeName)}"]`
  );

  elements.forEach((element) => element.classList.remove(...className));

  selectedElement.classList.add(...className);
}

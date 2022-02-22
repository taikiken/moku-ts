import getCSSStyle from './getCSSStyle';
import getValue from './getValue';

export default class ComputedStyle {
  element: HTMLElement;
  constructor(element: HTMLElement) {
    this.element = element;
  }
  getCSSStyle(): CSSStyleDeclaration {
    return getCSSStyle(this.element);
  }
  getStyle(property: string) {
    return getValue(this.element, property);
  }
}

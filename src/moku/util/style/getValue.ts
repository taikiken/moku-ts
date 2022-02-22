import getCSSStyle from './getCSSStyle';
import dash from '../str/dash';

const getValue = (element: HTMLElement, property: string): string =>
  getCSSStyle(element).getPropertyValue(dash(property));

export default getValue;

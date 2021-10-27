export interface IIntersectionOptions {
  root: HTMLElement | null;
  rootMargin: string;
  threshold: Array<number>;
}

export interface IIntersection {
  check(entries: Array<IntersectionObserverEntry>): void;
  disconnect(): boolean;
  shouldDisconnect(): boolean;
  intersect(entry: IntersectionObserverEntry): void;
  parallel(entry: IntersectionObserverEntry): void;
  observe(element: HTMLElement): boolean;
  unobserve(element: HTMLElement): boolean;
  destroy(): boolean;
  observer: IntersectionObserver;
  elements: Array<HTMLElement>;
}

export default class Intersection {
  private observer: IntersectionObserver;
  private elements: Array<HTMLElement>;
  constructor(
    elements: Array<HTMLElement> = [],
    options: IIntersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0.5],
    }
  ) {
    this.elements = elements;
    this.observer = new IntersectionObserver(this.check, options);
  }
  private check(entries: Array<IntersectionObserverEntry>): void {
    entries.map((entry) => (entry.isIntersecting ? this.intersect(entry) : this.parallel(entry)));
  }
  private disconnect(): boolean {
    this.observer.disconnect();
    return true;
  }
  private shouldDisconnect(): boolean {
    return this.elements.length === 0 ? this.disconnect() : false;
  }
  public intersect(entry: IntersectionObserverEntry): void {
    console.log('Intersection.intersect - entry', entry);
  }
  public parallel(entry: IntersectionObserverEntry): void {
    console.log('Intersection.parallel - entry', entry);
  }
  public observe(element: HTMLElement): boolean {
    if (this.elements.includes(element)) {
      return false;
    }
    this.observer.observe(element);
    this.elements.push(element);
    return true;
  }
  public unobserve(element: HTMLElement): boolean {
    if (!this.elements.includes(element)) {
      return false;
    }
    this.observer.unobserve(element);
    const { elements } = this;
    const index = elements.indexOf(element);
    elements.splice(index, 1);
    this.elements = [...elements];
    // ---
    return this.shouldDisconnect();
  }
  public destroy(): boolean {
    if (this.elements.length === 0) {
      return false;
    }
    this.elements.map((element) => this.observer.unobserve(element));
    this.elements = [...[]];
    return this.disconnect();
  }
}

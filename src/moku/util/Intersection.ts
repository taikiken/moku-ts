// IE polyfill
import 'intersection-observer';

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
  add(element: HTMLElement): boolean;
  remove(element: HTMLElement): boolean;
  destroy(): boolean;
  observer: IntersectionObserver;
  elements: Array<HTMLElement>;
}

/**
 * intersection-observer による Element 表示判定を行います
 * @see https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API
 * @example
 * const intersection = new Intersection();
 * const element0 = document.querySelector('.element-0');
 * const element1 = document.querySelector('.element-1');
 * const.add(element0);
 * const.add(element1);
 * intersection.intersect = ({ target } => {
 *   if (target === element0) {
 *     // element0 表示
 *   }
 * }
 */
export default class Intersection {
  private observer: IntersectionObserver;
  private elements: Array<HTMLElement>;

  /**
   * intersection-observer による Element 表示判定準備を行います
   * @param [elements=[]] 監視対象 element list
   * @param [options={root: null, rootMargin: '0px', threshold: [0.5]}] IntersectionObserver 第二引数オプション
   */
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

  /**
   * IntersectionObserver callback
   * @param entries IntersectionObserverEntry entry.isIntersecting 判定を使用し表示・非表示判定を行います
   * @private
   */
  private check(entries: Array<IntersectionObserverEntry>): void {
    entries.map((entry) => (entry.isIntersecting ? this.intersect(entry) : this.without(entry)));
  }

  /**
   * IntersectionObserver.disconnect を実施します - 監視を停止します
   * @private
   */
  private disconnect(): boolean {
    this.observer.disconnect();
    return true;
  }

  /**
   * 監視対象 element の存在チェックを行い、可能なら disconnect を実行します
   * @private
   */
  private shouldDisconnect(): boolean {
    return this.elements.length === 0 ? this.disconnect() : false;
  }

  /**
   * 表示時に呼びだされます
   * @param entry entry.target を使用し処理を行います
   */
  public intersect(entry: IntersectionObserverEntry): void {
    console.log('Intersection.intersect - entry', entry);
  }

  /**
   * 非表示時に呼び出されます。
   * @param entry entry.target を使用し処理を行います
   */
  public without(entry: IntersectionObserverEntry): void {
    console.log('Intersection.without - entry', entry);
  }

  /**
   * 監視対象 element を追加します
   * @param element 監視対象 element
   */
  public observe(element: HTMLElement): boolean {
    if (this.elements.includes(element)) {
      return false;
    }
    this.observer.observe(element);
    this.elements.push(element);
    return true;
  }

  /**
   * 監視対象 element から削除します
   * - 削除後監視停止可能か shouldDisconnect 実行します
   * @param element 監視対象 element
   */
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

  /**
   * observe alias
   * @param element
   */
  public add(element: HTMLElement): boolean {
    return this.observe(element);
  }

  /**
   * unobserve alias
   * @param element
   */
  public remove(element: HTMLElement): boolean {
    return this.unobserve(element);
  }

  /**
   * 監視を強制停止します
   */
  public destroy(): boolean {
    if (this.elements.length === 0) {
      return false;
    }
    this.elements.map((element) => this.observer.unobserve(element));
    this.elements = [...[]];
    return this.disconnect();
  }
}

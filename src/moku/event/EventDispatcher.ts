import { IEvents } from './Events';

interface IListeners {
  // events.type を key の配列 - event listener or null がセットされる
  [key: string]: Array<{ (events: IEvents): void } | null>;
}

export interface IEventDispatcher {
  listeners: IListeners;
  destroy(): boolean;
  on(type: string, listener: (events: IEvents) => void): boolean;
  off(type: string, listener: (events: IEvents) => void): boolean;
  has(type: string, listener: (events: IEvents) => void): boolean;
  dispatch(events: IEvents): boolean;
}

/**
 * event dispatcher, override しても使用可能です
 * @example
 * const dispatcher: EventDispatcher = new EventDispatcher();
 * const handler = (events) => {
 *   console.log(events);
 * }
 * dispatcher.on('xxx', handler);
 *
 */
export default class EventDispatcher implements IEventDispatcher {
  /**
   * listener function list
   */
  listeners: IListeners;

  /**
   * listener 初期化します
   */
  constructor() {
    this.listeners = { ...{} };
  }

  /**
   * event listener を破棄します
   */
  public destroy(): boolean {
    this.listeners = { ...{} };
    return true;
  }

  /**
   * event listener を event type へバインドします
   * @param type event type
   * @param listener event listener
   */
  public on(type: string, listener: (events: IEvents) => void): boolean {
    if (!type || typeof listener !== 'function') {
      return false;
    }
    const { listeners } = this;
    if (!Object.keys(listeners).includes(type)) {
      // listeners に key 存在しない時に key 生成しから配列を設定する
      listeners[type] = [];
    }
    // listener method を設定する
    listeners[type].push(listener);
    return true;
  }

  /**
   * event listener を止めます
   * @param type event type
   * @param listener event listener
   */
  public off(type: string, listener: (events: IEvents) => void): boolean {
    if (!type || typeof listener !== 'function') {
      return false;
    }
    const { listeners } = this;
    if (!Object.keys(listeners).includes(type)) {
      // listeners に key 存在しない
      return false;
    }
    const types = listeners[type];
    // listener の配列位置を調べる
    const index: number = types.indexOf(listener);
    if (index < 0) {
      // 存在しない
      return false;
    }
    // すぐに削除するのでは無く null 代入
    // loop(iterator) の中で off すると index 位置が変わりまずい
    types[index] = null;
    this.clean(type, types);
    return true;
  }

  /**
   * event listeners から null 値を削除します
   * @param type event type
   * @param types event listner list
   * @private
   */
  private clean(type: string, types: Array<{ (events: IEvents): void } | null>): boolean {
    const hasMethod = types.some((listener) => typeof listener === 'function');
    if (!hasMethod) {
      this.listeners[type] = [...[]];
    }
    return !hasMethod;
  }

  /**
   * listener が存在するか判定します
   * @param type event type
   * @param listener 判定対象 listener
   */
  public has(type: string, listener: (events: IEvents) => void): boolean {
    if (!type || typeof listener !== 'function') {
      return false;
    }
    const { listeners } = this;
    if (!Object.keys(listeners).includes(type)) {
      // listeners に key 存在しない
      return false;
    }
    return listeners[type].includes(listener);
  }

  /**
   * event を通知します
   * @param events 通知 event
   */
  public dispatch(events: IEvents): boolean {
    // @type {Object} - events.type:string: [listener:Function...]
    const { listeners } = this;
    // @type {string} - event type
    const { type } = events;
    if (!Object.keys(listeners).includes(type)) {
      // listeners に key 存在しない
      return false;
    }
    events.currentTarget = this;
    listeners[type]
      .filter((listener) => typeof listener === 'function')
      .map((listener) => listener?.call(this, events));
    return true;
  }
}

import { IEvents } from './Events';

type TListeners = {
  // events.type を key の配列 - event listener or null がセットされる
  [key: string]: Array<{ (events: IEvents): void } | undefined>;
};

export interface IEventDispatcher {
  listeners: TListeners;
  destroy(type: string): boolean;
  length(type: string): boolean;
  on(type: string, listener: (events: IEvents) => void): boolean;
  off(type: string, listener: (events: IEvents) => void): boolean;
  has(type: string, listener: (events: IEvents) => void): boolean;
  // dispatch(events: IEvents): boolean;
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
  listeners: TListeners;

  /**
   * listener 初期化します
   */
  constructor() {
    this.listeners = { ...{} };
  }

  /**
   * 引数タイプの event listener を破棄します
   * @param type event type
   */
  destroy(type: string): boolean {
    this.listeners[type] = [...[]];
    return true;
  }

  /**
   * event listener を event type へバインドします
   * @param type event type
   * @param listener event listener
   */
  on(type: string, listener: (events: IEvents) => void): boolean {
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
  off(type: string, listener: (events: IEvents) => void): boolean {
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
    types[index] = undefined;
    this.clean(type, types);
    return true;
  }

  /**
   * listener が存在するか判定します
   * @param type event type
   * @param listener 判定対象 listener
   */
  has(type: string, listener: (events: IEvents) => void): boolean {
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
   * 該当 event type が存在するかを判定します
   * @param type
   */
  length(type: string): boolean {
    return this.listeners[type]?.length > 0;
  }

  /**
   * event listeners から null 値を削除します
   * @param type event type
   * @param types event listner list
   * @private
   */
  private clean(type: string, types: Array<{ (events: IEvents): void } | undefined>): boolean {
    const hasMethod = types.some((listener) => typeof listener === 'function');
    if (!hasMethod) {
      this.listeners[type] = [...[]];
    }
    return !hasMethod;
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

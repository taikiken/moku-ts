import { IEvents } from './Events';

interface IListeners {
  // events.type を key の配列 - event listener or null がセットされる
  [key: string]: Array<{ (events: IEvents): void }|null>;
}

interface IEventDispatcher {
  listeners: IListeners;
  destroy(): boolean;
  on(type: string, listener: (events: IEvents)=>void): boolean;
  off(type: string, listener: (events: IEvents)=>void): boolean;
  has(type: string, listener: (events: IEvents)=>void): boolean;
  dispatch(events: IEvents): boolean;
}

export default class EventDispatcher implements IEventDispatcher {
  listeners: IListeners;

  constructor() {
    this.listeners = {...{}};
  }

  public destroy(): boolean {
    this.listeners = {...{}}
    return true;
  }

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

  private clean(type: string, types: Array<{ (events: IEvents): void }|null>): boolean {
    const hasMethod = types.some((listener) => typeof listener === 'function');
    if (!hasMethod) {
      this.listeners[type] = [...[]];
    }
    return !hasMethod;
  }

  public has(type: string, listener: (events: IEvents)=>void): boolean {
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

  public dispatch(events: IEvents): boolean {
    // @type {Object} - events.type:string: [listener:Function...]
    const { listeners } = this;
    // @type {string} - event type
    const { type } = events;
    if (!Object.keys(listeners).includes(type)) {
      // listeners に key 存在しない
      return false;
    }
    listeners[type].filter(listener => typeof listener === 'function')
      .map(listener => listener?.call(this, events))
    return true;
  }
}
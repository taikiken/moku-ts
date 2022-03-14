export type TEventsOption = {
  option?: {};
};

export interface IEvents {
  clone(): Events;
  type: string;
  target: any;
  currentTarget: any;
  option?: any;
}

/**
 * {@link EventDispatcher} に使用する event
 */
export default class Events implements IEvents {
  type: string;
  target: any;
  currentTarget: any;
  option?: any;
  constructor(type: string, target: any = undefined, currentTarget: any = undefined) {
    this.type = type;
    this.target = target;
    this.currentTarget = currentTarget;
  }
  clone(): IEvents {
    return new Events(this.type, this.target, this.currentTarget);
  }
}

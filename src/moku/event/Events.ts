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
  constructor(type: string, target: any = null, currentTarget: any = null) {
    this.type = type;
    this.target = target;
    this.currentTarget = currentTarget;
    this.option = null;
  }
  public clone(): Events {
    return new Events(this.type, this.target, this.currentTarget);
  }
}

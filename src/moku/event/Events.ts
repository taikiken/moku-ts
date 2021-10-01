export interface IEvents {
  clone(): Events;
  type: string;
  target: any;
  currentTarget: any;
}

export default class Events implements IEvents {
  type: string;
  target: any;
  currentTarget: any;
  constructor(type: string, target: any = null, currentTarget: any = null) {
    this.type = type;
    this.target = target;
    this.currentTarget = currentTarget;
  }
  clone(): Events {
    return new Events(this.type, this.target, this.currentTarget);
  }
}

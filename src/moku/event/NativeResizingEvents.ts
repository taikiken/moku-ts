import Events, { IEvents } from './Events';

export type TNativeResizingEvents = {
  body: {
    width: number;
    height: number;
  };
  // window props
  frame: {
    width: number;
    height: number;
    bottom: number;
  };
  scroll: {
    y: number;
    previous: number;
    moved: number;
  };
  origin: Event | undefined;
  changed: boolean;
};

export interface INativeResizingEvents extends IEvents {
  option: TNativeResizingEvents;
}

const config: TNativeResizingEvents = {
  body: {
    width: -1,
    height: -1,
  },
  // window props
  frame: {
    width: -1,
    height: -1,
    bottom: 0,
  },
  scroll: {
    y: -1,
    previous: 0,
    moved: 0,
  },
  origin: undefined,
  changed: false,
};

export default class NativeResizingEvents extends Events implements INativeResizingEvents {
  option: TNativeResizingEvents;
  constructor(
    type: string,
    target: any = undefined,
    currentTarget: any = undefined,
    option: TNativeResizingEvents = { ...config }
  ) {
    super(type, target, currentTarget);
    this.option = option;
  }
  public clone(): NativeResizingEvents {
    return new NativeResizingEvents(this.type, this.target, this.currentTarget, this.option);
  }
}

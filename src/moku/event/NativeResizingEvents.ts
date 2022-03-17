import Events, { IEvents } from './Events';

// box-sizing 設定により body / frame width, height 数値変わるので注意
export type TNativeResizingEvents = {
  // document.body.clientWidth / document.body.clientHeight - margin / border 含まない
  // https://developer.mozilla.org/ja/docs/Web/API/Element/clientWidth
  body: {
    width: number;
    height: number;
  };
  // window props
  // window.innerWidth / window.innerHeight - margin / border 含む
  // https://developer.mozilla.org/ja/docs/Web/API/Window/innerWidth
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
  // changed: boolean;
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
  // changed: false,
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
  public clone(): INativeResizingEvents {
    return new NativeResizingEvents(this.type, this.target, this.currentTarget, this.option);
  }
}

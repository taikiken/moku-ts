import EventDispatcher from './EventDispatcher';
import Events from './Events';

export default class NativeResizing extends EventDispatcher {
  public static UPDATE = 'NativeResizing-UPDATE';
  private events: Events;
  private option: {
    origin: Event | undefined;
    scroll: { previous: number; moved: number; y: number };
    body: { width: number; height: number };
    frame: { bottom: number; width: number; height: number };
    changed: boolean;
  };
  constructor() {
    super();
    this.events = new Events(NativeResizing.UPDATE, this, this);
    this.option = {
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
  }
  public onUpdate(event?: Event) {
    const clone = this.events.clone();
    const { body, frame, scroll } = this.option;
    const y = window.pageYOffset;
    // @type {number} - window width
    const width = window.innerWidth;
    // @type {number} - window height
    const height = window.innerHeight;
    // --- [body]
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;
    const changed =
      !event ||
      scroll.y !== y ||
      width !== frame.width ||
      height !== frame.height ||
      bodyWidth !== body.width ||
      bodyHeight !== body.height;
    const option = {
      frame: {
        width,
        height,
        bottom: y + height,
      },
      body: {
        width: bodyWidth,
        height: bodyHeight,
      },
      scroll: {
        previous: scroll.y,
        y,
        moved: scroll.y - y,
      },
      origin: event,
      changed,
    };
    this.option = { ...option };
    clone.option = { ...option };
    this.dispatch(clone);
  }
  public start() {
    this.stop();
    window.addEventListener('scroll', this.onUpdate, false);
    window.addEventListener('resize', this.onUpdate, false);
    return this;
  }
  public stop() {
    window.removeEventListener('scroll', this.onUpdate);
    window.removeEventListener('resize', this.onUpdate);
    return this;
  }
  public fire() {
    this.onUpdate();
    return this;
  }
}

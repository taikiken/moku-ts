import EventDispatcher from './EventDispatcher';
import NativeResizingEvents from './NativeResizingEvents';

/**
 * widow.onscroll / onresize を監視し発生時に {@link NativeResizing}.UPDATE events を通知します
 * @example
 * const nativeResizing = new NativeResizing();
 * const onUpdate = (events) => {
 *   console.log(events);
 * }
 * nativeResizing.on(NativeResizing.UPDATE, onUpdate);
 * nativeResizing.start().fire();
 */
export default class NativeResizing extends EventDispatcher {
  /**
   * event type
   */
  public static UPDATE = 'NativeResizing-UPDATE';
  private events: NativeResizingEvents;
  constructor() {
    super();
    this.events = new NativeResizingEvents(NativeResizing.UPDATE, this, this);
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
  private onUpdate(event?: Event) {
    const clone = this.events.clone();
    const { body, frame, scroll } = this.events.option;
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
        moved: y - scroll.y,
      },
      origin: event,
      changed,
    };
    clone.option = { ...option };
    this.events.option = clone.option;
    this.dispatch(clone);
  }
}

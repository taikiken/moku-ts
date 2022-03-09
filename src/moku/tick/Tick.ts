import EventDispatcher from '../event/EventDispatcher';
import Events from '../event/Events';

export default class Tick extends EventDispatcher {
  static UPDATE: string = 'tick-update';
  private static id: number = -1;
  private static instance: Tick;
  private events: Events = new Events(Tick.UPDATE, this, this);
  private onCycle = (timestamp: number = 0) => {
    const id = requestAnimationFrame(this.onCycle);
    Tick.id = id;
    const clone = this.events.clone();
    clone.option.id = id;
    clone.option.timestamp = timestamp;
    this.dispatch(clone);
  };
  static factory(): Tick {
    if (!Tick.instance) {
      Tick.instance = new Tick();
    }
    return Tick.instance;
  }
  private constructor() {
    super();
  }

  /**
   * requestAnimationFrame を開始します
   * - Tick.UPDATE listener が存在し稼働していない時に実行されます
   */
  start() {
    if (this.length(Tick.UPDATE) && Tick.id < 0) {
      this.onCycle();
    }
  }

  /**
   * requestAnimationFrame を停止します
   * - Tick.UPDATE listener が存在し無い時に停止可能です
   */
  stop() {
    if (!this.length(Tick.UPDATE)) {
      cancelAnimationFrame(Tick.id);
      Tick.id = -1;
    }
  }

  /**
   * requestAnimationFrame 強制終了させます
   * - listener は強制解除されます
   * @param type event type
   */
  destroy(type: string = Tick.UPDATE): boolean {
    const result = super.destroy(type);
    this.stop();
    return result;
  }
}

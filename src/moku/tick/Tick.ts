import EventDispatcher from '../event/EventDispatcher';
import TickEvents from './TickEvents';
/**
 * `requestAnimationFrame` 由来の Tick.UPDATE を発火します
 * @singleton
 */
export default class Tick extends EventDispatcher {
  /**
   * event type
   */
  public static UPDATE: string = 'tick-update';
  private static id: number = -1;
  private static instance: Tick;
  private events: TickEvents = new TickEvents(Tick.UPDATE, this, this, {
    id: Tick.id,
    timestamp: 0,
  });
  private onUpdate = (timestamp: number = 0) => {
    const id = requestAnimationFrame(this.onUpdate);
    Tick.id = id;
    const clone = this.events.clone();
    clone.option.id = id;
    clone.option.timestamp = timestamp;
    this.dispatch(clone);
  };

  /**
   * singleton instance を返します
   */
  public static factory(): Tick {
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
  public start() {
    if (this.length(Tick.UPDATE) && Tick.id < 0) {
      this.onUpdate();
    }
  }

  /**
   * requestAnimationFrame を停止します
   * - Tick.UPDATE listener が存在し無い時に停止可能です
   */
  public stop() {
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
  public destroy(type: string = Tick.UPDATE): boolean {
    const result = super.destroy(type);
    this.stop();
    return result;
  }
}

import EventDispatcher from '../event/EventDispatcher';
import Tick from './Tick';
import PollingEvents from './PollingEvents';

/**
 * 一定経過時間ごとに Polling.UPDATE を発火します
 * {@link Tick} 依存します
 */
export default class Polling extends EventDispatcher {
  /**
   * event type
   */
  static UPDATE: string = 'polling-update';
  private begin: number = -1;
  private interval: number = 0;
  private tick: Tick = Tick.factory();
  private events: PollingEvents;
  private onUpdate = (): void => {
    const present = Date.now();
    const { begin, interval } = this;
    if (present - begin >= interval) {
      this.begin = present;
      this.fire();
    }
  };
  constructor(interval: number) {
    super();
    this.events = new PollingEvents(Polling.UPDATE, this, this, { interval, timestamp: 0 });
  }
  start(): Polling {
    this.stop();
    if (this.begin < 0) {
      this.begin = Date.now();
    }
    this.tick.on(Tick.UPDATE, this.onUpdate);
    this.tick.start();
    return this;
  }
  stop(): Polling {
    this.tick.off(Tick.UPDATE, this.onUpdate);
    return this;
  }
  fire(timestamp = Date.now()) {
    const events = this.updateEvents(timestamp);
    this.dispatch(events);
  }
  private updateEvents(timestamp: number): PollingEvents {
    const clone = this.events.clone();
    const { interval } = this;
    clone.option = {
      interval,
      timestamp,
    };
    return clone;
  }
}

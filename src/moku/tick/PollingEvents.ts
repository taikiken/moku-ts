import Events, { IEvents } from '../event/Events';

export type TPollingEventsOption = {
  interval: number;
  timestamp: number;
};

export interface IPollingEvents extends IEvents {
  option: TPollingEventsOption;
}

/**
 * {@link Polling} イベント
 */
export default class PollingEvents extends Events implements IPollingEvents {
  public option: TPollingEventsOption;
  constructor(
    type: string,
    target: any = undefined,
    currentTarget: any = undefined,
    option: TPollingEventsOption = { interval: -1, timestamp: -1 }
  ) {
    super(type, target, currentTarget);
    this.option = option;
  }
  public clone(): PollingEvents {
    return new PollingEvents(this.type, this.target, this.currentTarget, this.option);
  }
}

import Events, { IEvents } from '../event/Events';

export type TTickEventsOption = {
  id: number;
  timestamp: number;
};

export interface ITickEvents extends IEvents {
  option: TTickEventsOption;
}

export default class TickEvents extends Events implements ITickEvents {
  option: TTickEventsOption;
  constructor(
    type: string,
    target: any = undefined,
    currentTarget: any = undefined,
    option: TTickEventsOption
  ) {
    super(type, target, currentTarget);
    this.option = option;
  }

  public clone(): ITickEvents {
    return new TickEvents(this.type, this.target, this.currentTarget, this.option);
  }
}

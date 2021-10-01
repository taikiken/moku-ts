import EventDispatcher from '../EventDispatcher';
import Events from '../Events';

describe('EventDispatcher TEST', () => {
  test('EventDispatcher', () => {
    // Mock handler for toast event
    const handler = jest.fn((events) => console.log('handler', events));
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.on('xxx', handler);
    eventDispatcher.dispatch(new Events('xxx'));
    expect(handler).toHaveBeenCalled();
  });
});

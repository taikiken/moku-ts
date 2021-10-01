import Events from '../Events';

test('Events', () => {
  const events = new Events('xxx');
  expect(events.clone()).toEqual(events);
});
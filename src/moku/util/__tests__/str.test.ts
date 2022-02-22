import dash from '../str/dash';
import camel from '../str/camel';

describe('str utility test', () => {
  test('dash: borderRadius -> border-radius', () => {
    expect(dash('borderRadius')).toEqual('border-radius');
  });
  test('camel: border-radius -> borderRadius', () => {
    expect(camel('border-radius')).toEqual('borderRadius');
  });
});

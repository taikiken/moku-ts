import getValue from '../style/getValue';

describe('style test', () => {
  test('div.border', () => {
    const div = document.createElement('div');
    div.style.cssText = 'margin: 10px 20px 30px 40px';
    expect(getValue(div, 'margin-left')).toEqual('40px');
    expect(getValue(div, 'marginTop')).toEqual('10px');
    expect(getValue(div, 'margin')).toEqual('10px 20px 30px 40px');
  });
});

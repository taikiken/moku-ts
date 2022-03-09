import queries from '../queries';
import and from '../../util/str/and';

describe('query parse', () => {
  const query = '?a=1&b=2&c=3';
  const query2 = '?a=1&amp;b=2&amp;c=3&d=4';
  test(`${query} queries.clean`, () => {
    expect(queries.clean(query)).toEqual('a=1&b=2&c=3');
  });
  test(`${query2} str/and`, () => {
    expect(and(query2)).toEqual('?a=1&b=2&c=3&d=4');
  });
  test(`${query2} queries.parse`, () => {
    expect(queries.parse(query2)).toEqual({ a: '1', b: '2', c: '3', d: '4' });
  });
});

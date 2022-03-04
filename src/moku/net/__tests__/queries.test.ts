import queries from '../queries';

describe('query parse', () => {
  const query = '?a=1&b=2&c=3';
  const query2 = '?a=1&amp;b=2&amp;c=3&d=4';
  test(`${query} queries.get`, () => {
    expect(queries.get(query)).toEqual('a=1&b=2&c=3');
  });
  test(`${query2} queries.get`, () => {
    expect(queries.and(query2)).toEqual('?a=1&b=2&c=3&d=4');
  });
  test(`${query2} queries.parse`, () => {
    expect(queries.parse(query2)).toEqual({ a: '1', b: '2', c: '3', d: '4' });
  });
});

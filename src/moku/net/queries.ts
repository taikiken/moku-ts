/**
 * `&amp;` を `&` へ変換します
 * @param text
 */
const and = (text: string): string => text.replace(/\&amp;/g, '&');

const get = (text: string): string => (text.substr(0, 1) === '?' ? text.substring(1) : text);

interface IParsedQuery {
  [key: string]: string | undefined;
}

const parse = (queryString = window.location.search): IParsedQuery =>
  get(and(queryString))
    .split('&')
    .reduce((prev: IParsedQuery, current) => {
      const [key, value] = current.split('=');
      prev[key] = value;
      return prev;
    }, {});

const queries = {
  and,
  get,
  parse,
};

export default queries;

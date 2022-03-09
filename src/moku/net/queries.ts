import and from '../util/str/and';

const clean = (text: string): string => (text.substr(0, 1) === '?' ? text.substring(1) : text);

export interface IParsedQuery {
  [key: string]: string | undefined;
}

/**
 * url query をパースし key: value Object を生成します
 * @param queryString
 */
const parse = (queryString = window.location.search): IParsedQuery =>
  clean(and(queryString))
    .split('&')
    .reduce((prev: IParsedQuery, current) => {
      const [key, value] = current.split('=');
      prev[key] = value;
      return prev;
    }, {});

const queries = {
  clean,
  parse,
};

export default queries;

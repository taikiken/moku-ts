import and from '../util/str/and';

const clean = (text: string): string => (text.substr(0, 1) === '?' ? text.substring(1) : text);

export type TParsedQuery = {
  [key: string]: string | undefined;
};

/**
 * url query をパースし key: value Object を生成します
 * @param queryString
 */
const parse = (queryString = window.location.search): TParsedQuery =>
  clean(and(queryString))
    .split('&')
    .reduce((prev: TParsedQuery, current) => {
      const [key, value] = current.split('=');
      // key が空の時は無視する
      if (key !== '') {
        // 値をdecodeする
        prev[key] = decodeURIComponent(value);
      }
      return prev;
    }, {});

const queries = {
  clean,
  parse,
};

export default queries;

/**
 * `&amp;` を `&` へ変換します
 * @param text
 */
const and = (text: string): string => text.replace(/\&amp;/g, '&');
export default and;

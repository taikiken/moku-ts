/**
 * camel case を hypenation へ変換します
 * @param value
 */
const dash = (value: string): string => value.replace(/([A-Z])/g, '-$1').toLowerCase();

export default dash;

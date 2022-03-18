/**
 * cookie を取得します
 * @param key 取得 cookie name
 */
const get = (key: string): string | undefined => {
  const { cookie } = document;
  const escapeKey = encodeURIComponent(key).replace(/[-.+*]/g, '\\$&');
  const exp = new RegExp(`(?:(?:^|.*;)\\s*${escapeKey}\\s*\\=\\s*([^;]*).*$)|^.*$`);
  return decodeURIComponent(cookie.replace(exp, '$1')) || undefined;
};

/**
 * cookie 設定します
 * @param key cookie name
 * @param value cookie value
 * @param [end=undefined] cookie 持続可能時間, undefined 値の場合は session cookie となりブラウザを閉じるまでになります
 * @param [path='/'] cookie path
 * @param [domain=undefined] cookie 受信可能ホスト - 通常設定無し
 * @param [domain=undefined] cookie 受信可能ホスト - 通常設定無しで構いません
 * @param [secure=true] https protocol only 指定します
 */
const set = (
  key: string,
  value: string | number,
  end: Date | undefined = undefined,
  path: string = '/',
  domain: string | undefined = undefined,
  secure: boolean = true
): boolean => {
  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  if (end !== undefined && end) {
    cookie += `; expires=${end.toUTCString()}`;
  }
  if (path !== undefined && path) {
    cookie += `; path=${path}`;
  }
  if (domain !== undefined && domain) {
    cookie += `; domain=${domain}`;
  }
  if (secure && location.protocol === 'https:') {
    cookie += '; secure';
  }
  // ---
  // SameSite=Lax,
  cookie = `${cookie}; SameSite=Lax`;
  // ---
  document.cookie = cookie;
  return true;
};

/**
 * cookie 保持しているかを判定します
 * @param key cookie name
 */
const has = (key: string): boolean => get(key) !== undefined;

/**
 * cookie を削除します
 * - 値を空にします
 * - 持続時間を現在にします
 * @param key cookie name
 */
const remove = (key: string): boolean => (has(key) ? set(key, '', new Date()) : false);

/**
 * cookie 取得関数
 * - get
 * - set
 * - has
 * - remove
 * @see https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies
 * @example
 * // cookie 設定
 * cookie.set('CookieName', 'CookieValue');
 * // cookie 取得
 * const cookieValue = cookie.get('CookieName');
 * // cookie 削除
 * cookie.remove('CookieName');
 * // cookie 判定
 * if (cookie.has('CookieName') {
 *   cookie.remove('CookieName');
 * }
 */
const cookie = {
  get,
  set,
  has,
  remove,
};

export default cookie;

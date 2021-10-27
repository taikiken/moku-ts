/**
 * cookie を取得します
 * @param key 取得 cookie name
 */
const get = (key: string): string | null => {
  const { cookie } = document;
  const escapeKey = encodeURIComponent(key).replace(/[-.+*]/g, '\\$&');
  const exp = new RegExp(`(?:(?:^|.*;)\\s*${escapeKey}\\s*\\=\\s*([^;]*).*$)|^.*$`);
  return decodeURIComponent(cookie.replace(exp, '$1')) || null;
};

/**
 * cookie 設定します
 * @param key cookie name
 * @param value cookie value
 * @param [end=null] cookie 持続可能時間, null 値の場合は session cookie となりブラウザを閉じるまでになります
 * @param [path='/'] cookie path
 * @param [domain=null] cookie 受信可能ホスト - 通常設定無し
 * @param [domain=null] cookie 受信可能ホスト - 通常設定無しで構いません
 * @param [secure=true] https protocol only 指定します
 */
const set = (
  key: string,
  value: string | number,
  end: Date | null = null,
  path: string = '/',
  domain: string | null = null,
  secure: boolean = true
): boolean => {
  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  if (end !== null && end) {
    cookie += `; expires=${end.toUTCString()}`;
  }
  if (path !== null && path) {
    cookie += `; path=${path}`;
  }
  if (domain !== null && domain) {
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
const has = (key: string): boolean => get(key) !== null;

/**
 * cookie を削除します
 * - 値を空にします
 * - 持続時間を現在にします
 * @param key cookie name
 */
const remove = (key: string): boolean => (has(key) ? set(key, '', new Date()) : false);

const cookie = {
  get,
  set,
  has,
  remove,
};

export default cookie;

import NativeResizing from './NativeResizing';

/**
 * {@link NativeResizing} instance を1つだけを保証する singleton class
 * @example
 * const nativeResizing: NativeResizing = NativeResizingSingle.factory();
 */
export default class NativeResizingSingle {
  private static instance: NativeResizing;
  private constructor() {}
  public static factory(): NativeResizing {
    if (!NativeResizingSingle.instance) {
      NativeResizingSingle.instance = new NativeResizing();
    }
    return NativeResizingSingle.instance;
  }
}

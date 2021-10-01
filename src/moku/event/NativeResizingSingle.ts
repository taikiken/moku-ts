import NativeResizing from './NativeResizing';

export default class NativeResizingSingle {
  private static instance: NativeResizing;
  private constructor() {}
  public static getInstance(): NativeResizing {
    if (!NativeResizingSingle.instance) {
      NativeResizingSingle.instance = new NativeResizing();
    }
    return NativeResizingSingle.instance;
  }
}

import { Dict } from '@/common/types/etc';

export class LibShape {
  public static isObj(arg: unknown): boolean {
    return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
  }

  public static hasObjData(arg: unknown): boolean {
    return this.isObj(arg) && !!Object.keys(arg as Dict).length;
  }

  public static hasText(arg: unknown): boolean {
    return typeof arg === 'string' && !!arg.trim().length;
  }

  public static isNone(arg: unknown): boolean {
    return arg === undefined || arg === null;
  }
}

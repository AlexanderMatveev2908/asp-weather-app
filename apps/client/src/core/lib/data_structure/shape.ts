import { Dict } from '@/common/types/etc';
import { Reg } from '@/core/paperwork/reg';

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

  public static isNoneBug(arg: unknown): boolean {
    return ['undefined', 'null'].some((str: string) => str === arg);
  }

  public static isPrimitive(arg: unknown): boolean {
    return (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean' ||
      typeof arg === 'bigint'
    );
  }

  public static isJsonObj(str: string): boolean {
    const trimmed = str.trim();

    return (
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))
    );
  }

  public static isBoolStr(arg: string): boolean {
    const trimmed = arg.trim().toLowerCase();

    return ['true', 'false'].some((str: string) => str === trimmed);
  }

  public static isInt(arg: unknown): boolean {
    return !this.isNone(arg) && !isNaN(+arg!) && Reg.isInt(arg + '');
  }
}

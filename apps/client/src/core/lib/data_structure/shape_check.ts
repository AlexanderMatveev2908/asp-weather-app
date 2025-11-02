export class LibShapeCheck {
  public static isStr(str: unknown): boolean {
    return typeof str === 'string' && !!str.trim().length;
  }

  public static isObj(arg: unknown): boolean {
    return typeof arg === 'object' && arg !== null;
  }

  public static hasObjData(arg: unknown): boolean {
    return this.isObj(arg) && !!Object.keys(arg as Record<string, unknown>).length;
  }

  public static hasArrData(arg: unknown): boolean {
    return Array.isArray(arg) && !!arg.length;
  }

  public static isPrimitive(arg: unknown): boolean {
    return (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean' ||
      typeof arg === 'bigint'
    );
  }

  public static isNone(arg: unknown): boolean {
    return arg === null || arg === undefined;
  }

  public static isNoneBug(arg: unknown): boolean {
    return ['undefined', 'null'].some((str: string) => str === arg);
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

  public static isPromise(cb: object): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return cb instanceof Promise || typeof (cb as any)?.then === 'function';
  }
}

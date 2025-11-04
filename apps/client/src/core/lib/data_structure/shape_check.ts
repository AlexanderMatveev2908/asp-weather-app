export class LibShape {
  public static hasObjData(arg: unknown): boolean {
    return (
      typeof arg === 'object' && arg !== null && !Array.isArray(arg) && !!Object.keys(arg).length
    );
  }

  public static isStr(arg: unknown): boolean {
    return typeof arg === 'string' && !!arg.trim().length;
  }
}

export class PwdCheckerReg {
  public static readonly UPPER: RegExp = /[A-Z]/;
  public static readonly LOWER: RegExp = /[a-z]/;
  public static readonly NUM: RegExp = /\d/;
  public static readonly SYMBOL: RegExp = /[^\w\s]|_/;
  public static readonly LENGTH: RegExp = /\S{8,}/;
}

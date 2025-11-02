import { OrNone } from '@/common/types/etc';

export class Reg {
  public static readonly NAME: RegExp = /^[\p{L}\s,`'-]*$/u;
  public static readonly MAIL: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public static readonly JOB_NAME: RegExp = /^[\p{L}\s,`'/-]*$/u;
  public static readonly PWD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])\S{8,}$/;
  public static readonly TXT: RegExp = /^[\p{L}\d\s\-'".,;!?]*$/u;
  public static readonly INT: RegExp = /^\d+$/;
  public static readonly FLOAT: RegExp = /^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/;
  public static readonly UUID: RegExp =
    /^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$/;
  public static readonly JWT: RegExp = /^(?:[A-Za-z0-9_-]+={0,2}\.){2}[A-Za-z0-9_-]+={0,2}$/;
  public static readonly JWE: RegExp = /^(?:[A-Za-z0-9_-]+={0,2}\.){4}[A-Za-z0-9_-]+={0,2}$/;
  public static readonly CBC_HMAC: RegExp = /^(?:[A-Fa-f0-9]+\.){3}[A-Fa-f0-9]+$/;
  public static readonly TOTP_SECRET: RegExp = /^[A-Z2-7]{32}$/;
  public static readonly TOTP_CODE: RegExp = /^\d{6}$/;
  public static readonly BKP_CODE: RegExp = /^[A-F0-9]{4}-[A-F0-9]{4}$/;
  public static readonly BASE_64: RegExp = /^[A-Za-z0-9+/]*={0,2}$/;
  public static readonly DATE_PICKER: RegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  public static readonly HEX_UUID: RegExp = /^[a-f0-9-]+$/;
  public static readonly EMOJI: RegExp =
    /(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji})/u;

  private constructor() {
    throw new Error('Keep Reg class as a static helper');
  }

  // ✅ Generic test helper
  public static check(arg: OrNone<string>, reg: RegExp): boolean {
    return !!arg && reg.test(arg);
  }

  public static isName(arg: OrNone<string>): boolean {
    return this.check(arg, this.NAME);
  }

  public static isJobName(arg: OrNone<string>): boolean {
    return this.check(arg, this.JOB_NAME);
  }

  public static isPwd(arg: OrNone<string>): boolean {
    return this.check(arg, this.PWD);
  }

  public static isTxt(arg: OrNone<string>): boolean {
    return this.check(arg, this.TXT);
  }

  public static isInt(arg: OrNone<string>): boolean {
    return this.check(arg, this.INT);
  }

  public static isFloat(arg: OrNone<string>): boolean {
    return this.check(arg, this.FLOAT);
  }

  public static isUUID(arg: OrNone<string>): boolean {
    return this.check(arg, this.UUID);
  }

  public static isJWT(arg: OrNone<string>): boolean {
    return this.check(arg, this.JWT);
  }

  public static isJWE(arg: OrNone<string>): boolean {
    return this.check(arg, this.JWE);
  }

  public static isCbcHmac(arg: OrNone<string>): boolean {
    return this.check(arg, this.CBC_HMAC);
  }

  public static isTotpSecret(arg: OrNone<string>): boolean {
    return this.check(arg, this.TOTP_SECRET);
  }

  public static isTotpCode(arg: OrNone<string>): boolean {
    return this.check(arg, this.TOTP_CODE);
  }

  public static isBkpCode(arg: OrNone<string>): boolean {
    return this.check(arg, this.BKP_CODE);
  }

  public static isDatePicker(arg: OrNone<string>): boolean {
    return this.check(arg, this.DATE_PICKER);
  }

  public static isB64(arg: OrNone<string>): boolean {
    return this.check(arg, this.BASE_64);
  }

  public static isLikeUUID(arg: OrNone<string>): boolean {
    return this.check(arg, this.HEX_UUID);
  }

  public static isEmoji(arg: OrNone<string>): boolean {
    return this.check(arg, this.EMOJI);
  }

  public static isMail(arg: OrNone<string>): boolean {
    return this.check(arg, this.MAIL);
  }
}

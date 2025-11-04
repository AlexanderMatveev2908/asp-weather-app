import { OrNone } from '@/common/types/etc';
import { LibShape } from '../lib/data_structure/shape_check';

export class Reg {
  public static readonly CITY: RegExp = /^[\p{L}\s'-]*$/u;
  public static readonly EMOJI: RegExp =
    /^\s*(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji})/u;

  public static check(arg: OrNone<string>, reg: RegExp): boolean {
    return LibShape.isStr(arg) && reg.test(arg as string);
  }

  public static startWithEmoji(arg: OrNone<string>): boolean {
    return this.check(arg, this.EMOJI);
  }
}

import { RootUiFkt } from '@/core/ui_fkt/root_ui';
import { PwdCheckerReg } from './reg';
import { SvgFillUppercase } from '@/common/components/svgs/fill/uppercase/uppercase';
import { SvgFillLowercase } from '@/common/components/svgs/fill/lowercase/lowercase';
import { SvgFillInteger } from '@/common/components/svgs/fill/integer/integer';
import { SvgFillSymbols } from '@/common/components/svgs/fill/symbols/symbols';
import { SvgFillRuler } from '@/common/components/svgs/fill/ruler/ruler';
import { SvgT } from '@/common/types/etc';

export interface FieldPwdCheckerT {
  id: string;
  reg: RegExp;
  Svg: SvgT;
}

export class PwdCheckerUiFkt extends PwdCheckerReg {
  public static readonly upperLetter: FieldPwdCheckerT = RootUiFkt.withID({
    reg: this.UPPER,
    Svg: SvgFillUppercase,
  });
  public static readonly lowerLetter: FieldPwdCheckerT = RootUiFkt.withID({
    reg: this.LOWER,
    Svg: SvgFillLowercase,
  });
  public static readonly integer: FieldPwdCheckerT = RootUiFkt.withID({
    reg: this.NUM,
    Svg: SvgFillInteger,
  });
  public static readonly symbols: FieldPwdCheckerT = RootUiFkt.withID({
    reg: this.SYMBOL,
    Svg: SvgFillSymbols,
  });

  public static readonly fields: FieldPwdCheckerT[] = [
    this.upperLetter,
    this.lowerLetter,
    this.integer,
    this.symbols,
  ];

  public static readonly ruler: Omit<FieldPwdCheckerT, 'id'> = {
    reg: this.LENGTH,
    Svg: SvgFillRuler,
  };
}

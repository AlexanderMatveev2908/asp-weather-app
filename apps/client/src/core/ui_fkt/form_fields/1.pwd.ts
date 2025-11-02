import { SvgFillLockClose } from '@/common/components/svgs/fill/lock_close/lock-close';
import { SvgFillLockOpen } from '@/common/components/svgs/fill/lock_open/lock-open';
import { SvgT } from '@/common/types/etc';
import { TxtFieldT, TxtInputT, TxtSvgFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';

export interface RecMetaPwdT {
  type: Extract<TxtInputT, 'password' | 'text'>;
  Svg: SvgT;
}

export type PwdFieldT = 'password' | 'confirmPassword' | 'bkp';

export class PwdFieldsUiFkt extends FormFieldsUiFkt {
  private static readonly pwdField: TxtFieldT = this.txtFieldOf({ name: 'password' });
  private static readonly confPwdField: TxtFieldT = this.txtFieldOf({ name: 'confirmPassword' });

  private static readonly mapMetaPwd: Map<boolean, RecMetaPwdT> = new Map<boolean, RecMetaPwdT>([
    [
      true,
      {
        type: 'password',
        Svg: SvgFillLockClose,
      },
    ],
    [
      false,
      {
        type: 'text',
        Svg: SvgFillLockOpen,
      },
    ],
  ]);

  private static metaByBool(val: boolean): RecMetaPwdT {
    return this.mapMetaPwd.get(val) as RecMetaPwdT;
  }

  public static fieldByBool(field: PwdFieldT, val: boolean): TxtSvgFieldT {
    return {
      ...this.txtFieldOf({ name: field }),
      ...this.metaByBool(val),
    };
  }
}

/* eslint-disable no-magic-numbers */
import { TxtFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';

export interface TotpPartFieldsT {
  fields: TxtFieldT[];
  id: string;
}

export class TotpFormUiFkt extends FormFieldsUiFkt {
  public static readonly nFields: number = 6;
  private static readonly parts: number = 2;

  public static skip(outerIdx: number): number {
    const skip: number = outerIdx * (this.nFields / this.parts);

    return skip;
  }

  private static fieldsForPart(outerIdx: number): TxtFieldT[] {
    const perPart: number = this.nFields / this.parts;

    return Array.from({ length: perPart }, (_: undefined, innerIdx: number) =>
      this.txtFieldOf({ name: `totp.${this.skip(outerIdx) + innerIdx}` })
    );
  }

  public static partsFields(): TotpPartFieldsT[] {
    return Array.from({ length: this.parts }, (_: undefined, outerIdx: number) =>
      this.withID({
        fields: this.fieldsForPart(outerIdx),
      })
    );
  }
}

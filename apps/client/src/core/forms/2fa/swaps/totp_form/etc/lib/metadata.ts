import { Nullable } from '@/common/types/etc';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export interface MetadataFormDomT {
  lastTruthy: number;
  currFocus: Nullable<HTMLInputElement>;
  currTotp: Nullable<string>;
  currIdx: Nullable<number>;
  allIn: boolean;
}

export class LibTotpFormMeta {
  private static getLastTruthy(val: string[]): number {
    let lastTruthy: number = 0;

    for (let i = 0; i < val.length; i++) {
      const curr: string = val[i];
      if (LibShapeCheck.isStr(curr)) lastTruthy = i;
    }

    return lastTruthy;
  }

  private static getCurrFocus(val: string[]): Nullable<HTMLInputElement> {
    let currFocus: Nullable<HTMLInputElement> = null;

    for (let i = 0; i < val.length; i++) {
      const el: Nullable<HTMLInputElement> = document.querySelector<HTMLInputElement>(
        `[data-field="totp.${i}"]`
      );

      if (document.activeElement !== el || !el) continue;

      currFocus = el;
      break;
    }

    return currFocus;
  }

  public static main(val: string[]): MetadataFormDomT {
    const currFocus: Nullable<HTMLInputElement> = this.getCurrFocus(val);

    const currTotp: Nullable<string> = currFocus?.dataset?.['field'] ?? null;
    const currIdxStr: Nullable<string> = currTotp?.split('.')?.[1] ?? null;
    const currIdx: Nullable<number> = currIdxStr ? +currIdxStr : null;
    const lastTruthy: Nullable<number> = this.getLastTruthy(val);

    const allIn: boolean =
      [currFocus, currTotp].every(Boolean) &&
      [currIdx, lastTruthy].every((v: Nullable<number>) => typeof v === 'number');

    return {
      currFocus,
      currTotp,
      currIdx,
      lastTruthy,
      allIn,
    };
  }
}

import { ElDomT, Nullable, RefDomT } from '@/common/types/etc';

export class FocusDOM {
  private static getByField(field: Nullable<string>): Nullable<HTMLElement> {
    if (!field) return null;
    const elDOM: Nullable<HTMLElement> = document.querySelector(`[data-field="${field}"]`);
    return elDOM;
  }

  public static byDataField(field: Nullable<string>): void {
    const elDOM: Nullable<HTMLElement> = this.getByField(field);
    if (!elDOM) return;

    elDOM.focus();
  }

  public static bySwap(fields: string[], target: number): void {
    let i: number = 0;

    do {
      if (i !== target) {
        i++;
        continue;
      }

      this.byDataField(fields[i]);
      break;
    } while (i < fields.length);
  }

  public static ifExists(refDOM: RefDomT): void {
    const elDOM: ElDomT = refDOM?.nativeElement;
    if (!elDOM) return;

    elDOM.focus();
  }

  public static blurByField(field: Nullable<string>): void {
    const elDOM: Nullable<HTMLElement> = this.getByField(field);
    if (!elDOM) return;

    const active: Nullable<Element> = document.activeElement;
    if (active === elDOM) elDOM.blur();
  }
}

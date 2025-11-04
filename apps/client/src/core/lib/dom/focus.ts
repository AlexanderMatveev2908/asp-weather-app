import { ElDomT } from '@/common/types/dom';
import { OrNone } from '@/common/types/etc';

export class FocusDom {
  public static focusByDataField(field: OrNone<string>): void {
    if (!field) return;
    const el: ElDomT = document.querySelector(`[data-field="${field}"]`) as ElDomT;
    if (!el) return;

    el.focus();
  }
}

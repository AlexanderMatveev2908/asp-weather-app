import { ErrApp } from '../etc/err';

export class TxtDom {
  public static binaryTrim(
    txt: string,
    { el, maxLines }: { el: HTMLElement; maxLines: number }
  ): string {
    const cs: CSSStyleDeclaration = getComputedStyle(el);
    const lineHeight: number = parseFloat(cs.lineHeight);

    const maxH: number = maxLines * lineHeight;

    el.textContent = txt;
    void el.offsetHeight;

    if (el.scrollHeight <= maxH) return txt;

    let left = 0;
    let right = txt.length;
    let res = '';

    while (left <= right) {
      const mid: number = (left + right) >> 1;
      el.textContent = txt.slice(0, mid) + '...';
      void el.offsetHeight;

      if (el.scrollHeight > maxH) {
        right = mid - 1;
      } else {
        res = el.textContent;
        left = mid + 1;
      }
    }

    el.textContent = res;
    void el.offsetHeight;

    if (el.scrollHeight > maxH) throw new ErrApp('height calculated wrong');

    return res;
  }
}

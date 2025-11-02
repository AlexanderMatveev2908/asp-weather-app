/* eslint-disable no-magic-numbers */
import { ElDomT, RefDomT } from '@/common/types/etc';
import { timeline } from '@motionone/dom';

export class CpyPasteAnimation {
  public static main(pasteNotice: RefDomT): void {
    const pasteNoticeDOM: ElDomT = pasteNotice?.nativeElement;

    if (!pasteNoticeDOM) return;

    timeline([
      // ! set default translation that el should hae at start
      [pasteNoticeDOM, { x: '-50%', y: '-175%' }, { duration: 0 }],

      [
        pasteNoticeDOM,
        { scale: [0, 1.4], opacity: [0, 1] },
        { duration: 0.2, easing: 'ease-in-out' },
      ],
      [pasteNoticeDOM, { scale: [1.4, 0.8] }, { duration: 0.2, easing: 'ease-in-out' }],
      [pasteNoticeDOM, { scale: [0.8, 1.1, 0.9, 1] }, { duration: 0.4, easing: 'ease-in-out' }],

      [pasteNoticeDOM, { opacity: [1, 0] }, { duration: 1, delay: 0.8, easing: 'linear' }],
    ]);
  }
}

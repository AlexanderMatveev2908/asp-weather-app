import { ElDomT, Nullable, RefDomT } from '@/common/types/etc';
import { animate } from '@motionone/dom';

export class FormFieldBoxAnimations {
  public static main({
    checkbox,
    mark,
    val,
  }: {
    checkbox: RefDomT;
    mark: RefDomT;
    val: Nullable<boolean>;
  }): void {
    const markDOM: ElDomT = mark?.nativeElement;
    const boxDOM: ElDomT = checkbox?.nativeElement;

    if ([markDOM, boxDOM].some((el: ElDomT) => !el)) return;

    animate(
      boxDOM!,
      {
        // eslint-disable-next-line no-magic-numbers
        scaleX: [1, 0.6, 1.4, 0.8, 0.9, 1],
        // eslint-disable-next-line no-magic-numbers
        scaleY: [1, 1.4, 0.6, 1.2, 1.1, 1],
      },
      {
        duration: 0.8,
        easing: 'ease-out',
      }
    );

    if (val) {
      animate(
        markDOM!,
        {
          rotate: ['-45deg', '-45deg'],
          scale: ['0', '1.4', '1'],
        },
        {
          easing: 'ease-in-out',
          duration: 0.2,
          delay: 0.1,
        }
      );
    } else {
      animate(
        markDOM!,
        {
          scale: ['1', '0'],
        },
        {
          duration: 0.1,
          easing: 'ease-in-out',
        }
      );
    }
  }
}

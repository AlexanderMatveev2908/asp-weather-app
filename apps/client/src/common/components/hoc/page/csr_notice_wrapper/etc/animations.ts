import { ElDomT } from '@/common/types/dom';
import { animate, AnimationOptionsWithOverrides } from '@motionone/dom';

export class NoticeAnimations {
  public static main({
    svgDOM,
    spanMsgDOM,
    spanStatusDOM,
    contentDOM,
  }: {
    svgDOM: ElDomT;
    spanMsgDOM: ElDomT;
    spanStatusDOM: ElDomT;
    contentDOM: ElDomT;
  }): void {
    if ([svgDOM, spanMsgDOM, spanStatusDOM, contentDOM].some((el: ElDomT) => !el)) return;

    animate(
      svgDOM!,
      {
        // eslint-disable-next-line no-magic-numbers
        scaleX: [0, 1.6, 0.6, 1.3, 0.9, 1.05, 1],
        // eslint-disable-next-line no-magic-numbers
        scaleY: [0, 0.4, 1.4, 0.7, 1.2, 0.95, 1],
      },
      {
        duration: 1,
        easing: 'ease-out',
      }
    );

    const cmnConf: AnimationOptionsWithOverrides = {
      delay: 0.2,
      duration: 1,
      easing: 'ease-in-out',
    };

    const baseFlow: string[] = ['-100%', '40%', '-40%', '20%', '-20%', '10%', '0'];
    const reverseFlow: string[] = baseFlow.map((el: string) =>
      el.startsWith('-') ? el.replace('-', '') : '-' + el
    );

    animate(
      spanMsgDOM!,
      {
        x: baseFlow,
      },
      cmnConf
    );

    animate(
      spanStatusDOM!,
      {
        x: reverseFlow,
      },
      cmnConf
    );

    animate(
      contentDOM!,
      {
        opacity: [0, 1],
      },
      {
        delay: 0.2,
        duration: 0.6,
        easing: 'ease',
      }
    );
  }
}

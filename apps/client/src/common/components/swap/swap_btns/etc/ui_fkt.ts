import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { SvgStrokeLeft } from '@/common/components/svgs/stroke/left/left';
import { SvgStrokeRight } from '@/common/components/svgs/stroke/right/right';
import { WithIdT } from '@/common/types/etc';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';

export class SwapBtnsUiFkt extends RootUiFkt {
  private static readonly _spanProps: Omit<SpanEventPropsT, 'id' | 'Svg'> = {
    eventT: 'NONE',
    label: null,
  };

  public static getSpansProps(): (SpanEventPropsT & WithIdT)[] {
    return this.arrWithIDs(
      Array.from({ length: 2 }, (_: undefined, i: number) => ({
        ...this._spanProps,
        Svg: i ? SvgStrokeRight : SvgStrokeLeft,
      }))
    );
  }
}

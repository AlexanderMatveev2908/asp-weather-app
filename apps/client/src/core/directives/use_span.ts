import { Directive, input, InputSignal } from '@angular/core';
import { SpanEventPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';

@Directive({
  selector: '[appUseSpanDir]',
})
export class UseSpanDir {
  public readonly spanProps: InputSignal<SpanEventPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });
}

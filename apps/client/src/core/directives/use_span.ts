import { Directive, input, InputSignal } from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';

@Directive({
  selector: '[appUseSpanDir]',
})
export class UseSpanDir {
  public readonly spanProps: InputSignal<Partial<SpanPropsT>> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });
}

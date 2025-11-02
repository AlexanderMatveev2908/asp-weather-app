import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from './etc/types';
import { WrapTxtApi } from '../../hoc/txt/wrap_txt_api/wrap-txt-api';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { SpinTxtClsT } from '@/common/types/css';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';

@Component({
  selector: 'app-span',
  imports: [NgComponentOutlet, WrapTxtApi, UseWrapApiDir],
  templateUrl: './span.html',
  styleUrl: './span.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Span {
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly sizesProps: InputSignal<Partial<SpanSizesPropsT>> = input<
    Partial<SpanSizesPropsT>
  >({
    svg: 'sm',
    txt: 'lg',
  });
  public readonly spinSize: InputSignal<SpinTxtClsT> = input<SpinTxtClsT>('md');
  public readonly eventT: InputSignal<AppEventT> = input<AppEventT>('NONE');
  public readonly isPending: InputSignal<boolean> = input(false);

  // ! custom classes only built at runtime
  // ! tailwind would not support it
  public txtCls: Signal<string> = computed(() => `txt__${this.sizesProps().txt ?? 'lg'}`);
  public svgCls: Signal<string> = computed(() => `svg__${this.sizesProps().svg ?? 'sm'}`);
}

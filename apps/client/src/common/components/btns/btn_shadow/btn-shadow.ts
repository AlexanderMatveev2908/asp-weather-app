import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Span } from '../../els/span/span';
import { WrapBtnApi } from '../../hoc/btns/wrap_btn_api/wrap-btn-api';
import { BtnListenersT, BtnStatePropsT, BtnT, Nullable } from '@/common/types/etc';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseSpanDir } from '@/core/directives/use_span';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';

@Component({
  selector: 'app-btn-shadow',
  imports: [Span, WrapBtnApi, UseWrapApiDir],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);

  // ? btn personal props
  public readonly paddingProps: InputSignal<string> = input('10px 15px');
  public readonly btnStateProps: InputSignal<BtnStatePropsT> = input<BtnStatePropsT>({
    isDisabled: false,
    isPending: false,
  });
  public readonly listenersProps: InputSignal<Nullable<BtnListenersT>> =
    input<Nullable<BtnListenersT>>(null);
  public readonly type: InputSignal<BtnT> = input<BtnT>('button');

  public async onClick(): Promise<void> {
    const clickEvent = this.listenersProps()?.onClick;
    if (!clickEvent) return;

    const res: void | Promise<void> = clickEvent();
    if (res instanceof Promise) await res;
  }

  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.useSpanDir.spanProps().eventT)
  );
}

import { UseSpanDir } from '@/core/directives/use_span';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { WrapTxtApi } from '@/common/components/hoc/txt/wrap_txt_api/wrap-txt-api';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';
import { BtnT, Nullable } from '@/common/types/etc';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-search-bar-btn-shape',
  imports: [NgComponentOutlet, WrapTxtApi, UseWrapApiDir],
  templateUrl: './search-bar-btn-shape.html',
  styleUrl: './search-bar-btn-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarBtnShape {
  // ? directives
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? props
  public readonly isPending: InputSignal<boolean> = input(false);
  public readonly btnType: InputSignal<BtnT> = input<BtnT>('button');
  public readonly onClick: InputSignal<Nullable<() => void>> = input<Nullable<() => void>>(null);

  // ? derived
  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.useSpanDir.spanProps().eventT)
  );
}

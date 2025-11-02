import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { ToastRender } from './etc/mng/3.render_toast';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-toast',
  imports: [CloseBtn, NgTemplateOutlet, CloseBtn, UseIDsDir],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast extends ToastRender {
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.toastState().eventT)
  );
}

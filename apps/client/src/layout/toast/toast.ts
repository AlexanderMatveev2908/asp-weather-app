import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { ToastRender } from './etc/mng/3.render_toast';
import { LibMetaEvent } from '@/core/lib/css/events';

@Component({
  selector: 'app-toast',
  imports: [CloseBtn, NgTemplateOutlet, CloseBtn],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast extends ToastRender {
  public readonly cssVar: Signal<string> = computed(() =>
    LibMetaEvent.cssVarByT(this.toastState().eventT)
  );
}

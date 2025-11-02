import { Nullable } from '@/common/types/etc';
import { UseIDsDir } from '@/core/directives/use_ids';
import { AppEventMetaT, AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

export type ArrowTooltipT = 'left' | 'right';

@Component({
  selector: 'app-tooltip',
  imports: [NgClass],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tooltip {
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? personal props required
  public readonly isHover: InputSignal<boolean> = input.required();
  public readonly msg: InputSignal<Nullable<string>> = input.required();
  public readonly eventT: InputSignal<AppEventT> = input.required();
  // ? optional with fallback
  public readonly minW: InputSignal<string> = input('fit');
  public readonly arrowOn: InputSignal<ArrowTooltipT> = input<ArrowTooltipT>('right');

  // ? derived
  public readonly twdAnimation: Signal<string> = computed(() =>
    this.isHover() && this.msg() ? 'translate-y-[-20px] opacity-1' : 'translate-y-[100%] opacity-0'
  );
  public readonly twdPosition: Signal<string> = computed(() =>
    this.arrowOn() === 'left' ? 'left-0' : 'right-0'
  );
  public readonly twdArrow: Signal<string> = computed(() =>
    this.arrowOn() === 'left' ? 'left-[12.5%]' : 'right-[12.5%]'
  );
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.eventT())
  );
}

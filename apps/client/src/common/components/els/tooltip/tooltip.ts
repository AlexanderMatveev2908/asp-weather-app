import { AppEventT, Nullable } from '@/common/types/etc';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { ArrowTooltipDirectionT } from './etc/types';
import { LibMetaEvent } from '@/core/lib/css/events';
import { LibShape } from '@/core/lib/data_structure/shape';

@Component({
  selector: 'app-tooltip',
  imports: [NgClass],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tooltip {
  public readonly isHover: InputSignal<boolean> = input.required();
  public readonly msg: InputSignal<Nullable<string>> = input.required();
  public readonly appEventT: InputSignal<AppEventT> = input.required();
  public readonly arrowOn: InputSignal<ArrowTooltipDirectionT> = input<ArrowTooltipDirectionT>('>');

  // ? derived
  public readonly show: Signal<boolean> = computed(
    () => this.isHover() && LibShape.hasText(this.msg())
  );

  public readonly transform: Signal<string> = computed(() =>
    this.show() ? 'translateY(0)' : 'translateY(100%)'
  );

  public readonly twdPosition: Signal<string> = computed(() =>
    this.arrowOn() === '<' ? 'left-0' : 'right-0'
  );
  public readonly twdArrow: Signal<string> = computed(() =>
    this.arrowOn() === '<' ? 'left-[12.5%]' : 'right-[12.5%]'
  );
  public readonly cssVar: Signal<string> = computed(() => LibMetaEvent.cssVarByT(this.appEventT()));
}

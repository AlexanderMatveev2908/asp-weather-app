import { Nullable } from '@/common/types/etc';
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
  public readonly arrowOn: InputSignal<ArrowTooltipDirectionT> = input<ArrowTooltipDirectionT>('>');

  // ? derived
  public readonly twdAnimation: Signal<string> = computed(() =>
    this.isHover() && this.msg() ? 'translate-y-[-20px] opacity-1' : 'translate-y-[100%] opacity-0'
  );
  public readonly twdPosition: Signal<string> = computed(() =>
    this.arrowOn() === '<' ? 'left-0' : 'right-0'
  );
  public readonly twdArrow: Signal<string> = computed(() =>
    this.arrowOn() === '<' ? 'left-[12.5%]' : 'right-[12.5%]'
  );
}

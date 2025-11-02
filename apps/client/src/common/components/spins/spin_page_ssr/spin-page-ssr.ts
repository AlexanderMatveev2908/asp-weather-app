import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-spin-page-ssr',
  imports: [NgClass],
  templateUrl: './spin-page-ssr.html',
  styleUrl: './spin-page-ssr.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinPageSsr {
  // ? personal props
  public readonly minH: InputSignal<string> = input('min-h-screen');
  public readonly eventT: InputSignal<AppEventT> = input<AppEventT>('NONE');

  // ? static helpers
  public readonly IDs: string[] = Array.from({ length: 10 }, () => v4());
  private readonly dotsCount: number = this.IDs.length;

  // ? derived
  public getRotation(idx: number): string {
    // eslint-disable-next-line no-magic-numbers
    return `${(360 / this.dotsCount) * idx}deg`;
  }
  public readonly clr: Signal<string> = computed(() => {
    const cssVar: string = MetaEventDOM.byT(this.eventT()).css;
    return cssVar;
  });

  public getDelay(idx: number): string {
    return `${(1 / this.dotsCount) * idx}s`;
  }
}

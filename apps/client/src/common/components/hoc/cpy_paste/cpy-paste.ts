/* eslint-disable no-magic-numbers */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { UseSwapPortalDir } from '@/core/directives/use_portal/1.use_swap_portal';
import { LibLog } from '@/core/lib/dev/log';
import { ErrApp } from '@/core/lib/err';
import { Nullable, RefDomT, TimerIdT } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { CpyPasteAnimation } from './etc/animations';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';

@Component({
  selector: 'app-cpy-paste',
  imports: [Portal],
  templateUrl: './cpy-paste.html',
  styleUrl: './cpy-paste.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpyPaste extends UseSwapPortalDir implements AfterViewInit {
  public readonly optionalDep: InputSignal<Nullable<unknown[]>> = input<Nullable<unknown[]>>(null);

  // ? local state
  public readonly label: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
  public readonly txt: InputSignal<Nullable<string>> = input.required();
  public readonly copied: WritableSignal<boolean> = signal(false);
  private timerID: TimerIdT = null;

  // ? static assets
  private readonly TIME_ANIMATION: number = 400;

  // ? children
  @ViewChild('pasteNotice') pasteNotice: RefDomT;

  // ? derived
  public readonly cpyPasteCoords: Signal<Partial<RecCoordsT>> = computed(() => ({
    top: this.coords()?.top,
    left: PortalDOM.patchCoord(
      this.coords()?.left,
      (v: number) => v + PortalDOM.coordToInt(this.coords()?.with) / 2
    ),
  }));

  // ? listeners
  public async onCpy(): Promise<void> {
    const text: Nullable<string> = this.txt();
    try {
      if (!text) throw new ErrApp('tried to copy None');

      await navigator.clipboard.writeText(text);
      this.copied.set(true);

      this.timerID = setTimeout(() => {
        if (this.timerID && this.copied()) this.copied.set(false);

        this.timerID = LibEtc.clearTmrID(this.timerID);
      }, this.TIME_ANIMATION);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      LibLog.log(err);
    }
  }

  // ? animations
  ngAfterViewInit(): void {
    this.useDOM(() => {
      this.setCoords();
    });

    this.useEffect(() => {
      void this.optionalDep();
      this.setCoords();
    });

    this.useEffect(() => {
      if (this.showTooltip()) this.setCoords();
    });

    this.useEffect(() => {
      const isCpy: boolean = this.copied();
      if (!isCpy) return;

      CpyPasteAnimation.main(this.pasteNotice);
    });
  }
}

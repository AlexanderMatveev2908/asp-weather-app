import { UseHoverHk } from '@/core/hooks/listeners/use_hover';
import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Tooltip } from '../../els/tooltip/tooltip';
import { UseSpanDir } from '@/core/directives/use_span';
import { Portal } from '@/layout/portal/portal';
import { UsePortalDir } from '@/core/directives/use_portal/0.use_portal';
import { PortalDOM } from '@/core/lib/dom/portal';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-btn-tooltip',
  imports: [NgComponentOutlet, UseIDsDir, Tooltip, Portal],
  templateUrl: './btn-tooltip.html',
  styleUrl: './btn-tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk],
})
export class BtnTooltip extends UsePortalDir implements AfterViewInit {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);

  // ? hooks
  public readonly useHover: UseHoverHk = inject(UseHoverHk);

  // ? props
  public readonly onClick: InputSignal<() => void> = input.required();
  public readonly optionalDep: InputSignal<Nullable<unknown[]>> = input<Nullable<unknown[]>>(null);

  // ? derived
  public readonly left: Signal<string> = computed(() =>
    PortalDOM.patchCoord(
      this.coords()?.left,
      (v: number) => v + PortalDOM.coordToInt(this.coords()?.with)
    )
  );

  ngAfterViewInit(): void {
    this.setCoords();

    this.useEffect(() => {
      void this.optionalDep();
      this.setCoords();
    });
  }
}

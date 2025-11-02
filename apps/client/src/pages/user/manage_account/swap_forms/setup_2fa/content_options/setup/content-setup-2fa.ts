import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { UseSpanDir } from '@/core/directives/use_span';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { BtnListenersT, BtnStatePropsT, Nullable } from '@/common/types/etc';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Setup2faReturnT } from '@/features/user/etc/types';
import { CpyPaste } from '@/common/components/hoc/cpy_paste/cpy-paste';
import { ConfSwapT } from '@/core/hooks/swap/etc/types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';

@Component({
  selector: 'app-content-setup-2fa',
  imports: [UseSpanDir, BtnShadow, UseIDsDir, CpyPaste, LinkShadow],
  templateUrl: './content-setup-2fa.html',
  styleUrl: './content-setup-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSetup2fa extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly resSetup2FA: InputSignal<Nullable<Setup2faReturnT>> = input.required();
  public readonly onClick: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
  public readonly confSwap: InputSignal<ConfSwapT> = input.required();

  // ? local state
  public readonly optionalDep: WritableSignal<number[]> = signal([0]);

  // ? derived
  public readonly prettyPrintedCodes: Signal<string> = computed(() =>
    LibPrs.prettyPrintCols(this.resSetup2FA()?.backupCodes)
  );

  // ? span btn props
  public readonly spanProps: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Setup',
    Svg: null,
  };
  // ? span zip link
  public readonly spanZipProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Zip',
    Svg: null,
  };

  // ? btn logic props
  public readonly btnListeners: Signal<BtnListenersT> = computed(() => ({
    onClick: this.onClick(),
  }));
  public readonly btnStateT: Signal<BtnStatePropsT> = computed(() => ({
    isPending: this.isPending(),
    isDisabled: false,
  }));

  ngOnInit(): void {
    this.useEffect(() => {
      const timerCalcHeightForParent: number = 500;

      if (this.resSetup2FA())
        setTimeout(() => {
          this.optionalDep.update((prev: number[]) => [...prev, prev.length]);
        }, timerCalcHeightForParent);
    });
  }
}

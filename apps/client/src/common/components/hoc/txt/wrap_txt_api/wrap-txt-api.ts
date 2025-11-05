import { SpinTxt } from '@/common/components/spins/spin_txt/spin-txt';
import { SpinTxtClsT } from '@/common/types/css';
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
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';

@Component({
  selector: 'app-wrap-txt-api',
  imports: [SpinTxt, NgClass, UseMetaEventDir],
  templateUrl: './wrap-txt-api.html',
  styleUrl: './wrap-txt-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapTxtApi {
  // ? directives
  public readonly useWrapApiDir: UseWrapApiDir = inject(UseWrapApiDir);

  // ? props
  public readonly spinSizeT: InputSignal<SpinTxtClsT> = input.required();

  // ? derived
  public readonly css: Signal<string> = computed(() => `wrap__${this.spinSizeT()}`);
}

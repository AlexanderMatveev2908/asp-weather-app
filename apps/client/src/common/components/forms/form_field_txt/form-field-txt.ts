import { Nullable, SvgT } from '@/common/types/etc';
import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field-txt',
  imports: [NgComponentOutlet, ReactiveFormsModule],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt extends UseInjCtxHk {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly Svg: InputSignal<Nullable<SvgT>> = input<Nullable<SvgT>>(null);
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? derived
  public readonly padding: Signal<string> = computed(() =>
    this.Svg() ? '0 34px 0 11px' : '0 11px'
  );
}

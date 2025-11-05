import { Nullable, SvgT } from '@/common/types/etc';
import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { NgClass, NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';

@Component({
  selector: 'app-form-field-txt',
  imports: [NgComponentOutlet, ReactiveFormsModule, FormFieldErr, NgClass],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly Svg: InputSignal<Nullable<SvgT>> = input<Nullable<SvgT>>(null);
  public readonly onSvgClick: InputSignal<() => void> = input<() => void>(() => null);
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly disabled: InputSignal<boolean> = input(false);

  public readonly additionalSvgTwd: InputSignal<string> = input('');

  // ? derived
  public readonly padding: Signal<string> = computed(() =>
    this.Svg() ? '0 34px 0 11px' : '0 11px'
  );

  ngOnInit(): void {
    this.useEffect(() => {
      const isDisabled: boolean = this.disabled();

      if (isDisabled) this.ctrl().disable();
      else this.ctrl().enable();
    });
  }
}

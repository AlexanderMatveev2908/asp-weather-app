import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';
import { Nullable, OptCbT, SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { UseFormFieldDomDir } from '@/core/directives/forms/form_field/1.use_form_field_dom';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormFieldErr, NgComponentOutlet, UseFormFieldDir, UseIDsDir],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt extends UseFormFieldDomDir implements OnInit {
  // ? directives
  public readonly useFormFieldDir: UseFormFieldDir = inject(UseFormFieldDir);

  // ? personal props required
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly f: InputSignal<TxtFieldT | TxtSvgFieldT> = input.required();
  public readonly optionalDep: InputSignal<Nullable<unknown[]>> = input<Nullable<unknown[]>>(null);

  // ? personal props optional
  public readonly onSvgClick: InputSignal<Nullable<() => void>> = input<Nullable<() => void>>(null);
  public readonly hideLabel: InputSignal<boolean> = input(false);
  // ? additional listeners for custom needs beside normal ng flow
  // ? rarely used
  public readonly onFocus: InputSignal<OptCbT> = input<OptCbT>(null);
  public readonly onBlur: InputSignal<OptCbT> = input<OptCbT>(null);
  public readonly onChange: InputSignal<OptCbT> = input<OptCbT>(null);

  public readonly testId: Signal<string> = computed(() => LibPrs.toSnake(this.f().field));

  // ? derived
  public readonly Svg: Signal<Nullable<SvgT>> = computed(
    () => (this.f() as TxtSvgFieldT)?.Svg ?? null
  );
  public readonly padding: Signal<string> = computed(() =>
    !this.Svg() ? '7.5px 20px' : '7.5px 50px 7.5px 20px'
  );

  // ? ng lifecycle
  ngOnInit(): void {
    this.useFormFieldDir.setupWithCtrl(this.ctrl());
  }
}

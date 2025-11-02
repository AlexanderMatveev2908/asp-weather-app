import { CheckFieldT } from '@/common/types/forms';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Nullable, RefDomT, SvgT } from '@/common/types/etc';
import { FormControl } from '@angular/forms';
import { FormFieldBoxAnimations } from './etc/animations';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SvgFillBoxChecked } from '@/common/components/svgs/fill/box_checked/box-checked';
import { FormFieldErr } from '../../base_fields/form_field_err/form-field-err';

@Component({
  selector: 'app-form-field-box-sm',
  imports: [NgClass, FormFieldErr, UseFormFieldDir, UseIDsDir],
  templateUrl: './form-field-box-sm.html',
  styleUrl: './form-field-box-sm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxSm implements OnInit, AfterViewInit {
  public readonly useFormFieldDir: UseFormFieldDir = inject(UseFormFieldDir);

  // ? personal props required
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly f: InputSignal<CheckFieldT> = input.required();
  public readonly Svg: SvgT = SvgFillBoxChecked;

  // ? children
  @ViewChild('checkbox') checkbox: RefDomT;
  @ViewChild('mark') mark: RefDomT;

  // ? helpers
  public getTwd(): string {
    if (!this.useFormFieldDir.interacted?.()) return 'text-gray-300 border-gray-300';
    else if (this.useFormFieldDir.val?.()) return 'text-green-600 border-green-600';
    else return 'text-red-600 border-red-600';
  }

  // ? props err msg
  public readonly testId: Signal<string> = computed(() => LibPrs.toSnake(this.f().field));

  // ? listeners
  public onToggle(): void {
    const c: FormControl = this.ctrl();
    c.markAsDirty();
    c.markAsTouched();
    c.setValue(!this.useFormFieldDir.val?.());
    c.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.useFormFieldDir.setupWithCtrl(this.ctrl());
  }

  ngAfterViewInit(): void {
    this.useFormFieldDir.useEffect(() => {
      const val: Nullable<boolean> = (this.useFormFieldDir.val?.() ?? null) as Nullable<boolean>;

      FormFieldBoxAnimations.main({
        checkbox: this.checkbox,
        mark: this.mark,
        val,
      });
    });
  }
}

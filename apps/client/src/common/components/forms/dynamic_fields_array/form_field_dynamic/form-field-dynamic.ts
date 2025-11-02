import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldDynamicErr } from '../form_field_dynamic_err/form-field-dynamic-err';
import { FocusDOM } from '@/core/lib/dom/focus';

@Component({
  selector: 'app-form-field-dynamic',
  imports: [ReactiveFormsModule, FormFieldDynamicErr, UseFormFieldDynamicDir],
  templateUrl: './form-field-dynamic.html',
  styleUrl: './form-field-dynamic.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDynamic extends UseInjCtxHk implements OnInit, AfterViewInit {
  public readonly useDynamicField: UseFormFieldDynamicDir = inject(UseFormFieldDynamicDir);

  // ? props optional
  public readonly hideLabel: InputSignal<boolean> = input(false);
  public readonly focusOnMount: InputSignal<boolean> = input(false);

  ngOnInit(): void {
    this.useDynamicField.setup();
  }

  ngAfterViewInit(): void {
    this.useDynamicField.useDOM(() => {
      if (!this.focusOnMount()) return;

      FocusDOM.byDataField(this.useDynamicField.fieldAttr());
    });
  }
}

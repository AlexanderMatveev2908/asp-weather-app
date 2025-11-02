import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Nullable } from '@/common/types/etc';
import { ErrsFieldT, RecErrsFieldT } from '@/common/types/forms';
import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { FormControl } from '@angular/forms';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Tooltip } from '@/common/components/els/tooltip/tooltip';

@Component({
  selector: 'app-form-field-dynamic-err',
  imports: [Tooltip, UseIDsDir],
  templateUrl: './form-field-dynamic-err.html',
  styleUrl: './form-field-dynamic-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldDynamicErr implements OnInit {
  // ? directives
  public readonly useDynamicField: UseFormFieldDynamicDir = inject(UseFormFieldDynamicDir);

  // ? props
  public readonly optionalDep: InputSignal<Nullable<unknown[]>> = input<Nullable<unknown[]>>(null);

  // ? derived
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  ngOnInit(): void {
    this.useDynamicField.setup();

    this.useDynamicField.useEffect(() => {
      const c: FormControl = this.useDynamicField.ctrl();
      void this.useDynamicField?.field?.();
      void this.optionalDep();

      const errors: ErrsFieldT = c.errors as ErrsFieldT;

      this.recErrs.update((prev: RecErrsFieldT) => ({
        prev: prev.curr,
        curr: errors?.zod && this.useDynamicField.interacted?.() ? errors.zod : null,
      }));
    });
  }
}

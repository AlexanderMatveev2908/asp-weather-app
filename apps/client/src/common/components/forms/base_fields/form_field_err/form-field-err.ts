import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrsFieldT, RecErrsFieldT } from '@/common/types/forms';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { Nullable } from '@/common/types/etc';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Tooltip } from '@/common/components/els/tooltip/tooltip';

@Component({
  selector: 'app-form-field-err',
  imports: [Tooltip, UseIDsDir],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr implements OnInit {
  public readonly useFormFieldDir: UseFormFieldDir = inject(UseFormFieldDir);
  public readonly useIdsDir: UseIDsDir = inject(UseIDsDir);

  // ? personal props
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly optionalDep: InputSignal<Nullable<unknown[]>> = input<Nullable<unknown[]>>(null);

  // ? derived
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  // ? props testid tooltip
  public readonly testIdErrMsg: Signal<string> = computed(() =>
    LibPrs.toSnake(`err__${this.useIdsDir.testId()}`)
  );

  // ? ng
  ngOnInit(): void {
    this.useFormFieldDir.setupWithCtrl(this.ctrl());

    this.useFormFieldDir.useEffect(() => {
      const c: FormControl = this.ctrl();
      void this.useFormFieldDir?.val?.();
      void this.optionalDep();

      const errors: ErrsFieldT = c.errors as ErrsFieldT;

      this.recErrs.update((prev: RecErrsFieldT) => ({
        prev: prev.curr,
        curr: errors?.zod && this.useFormFieldDir.interacted?.() ? errors.zod : null,
      }));
    });
  }
}

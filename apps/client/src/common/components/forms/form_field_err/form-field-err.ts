import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Tooltip } from '../../els/tooltip/tooltip';
import { FormControl } from '@angular/forms';
import { RecErrsT } from './etc/types';
import { Nullable } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FieldErrsT } from '@/core/paperwork/root_form_mng/root_form_mng';

@Component({
  selector: 'app-form-field-err',
  imports: [Tooltip],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr extends UseInjCtxHk implements OnInit {
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? local state
  public recErrs: WritableSignal<RecErrsT> = signal({
    prev: null,
    curr: null,
  });

  private val: Nullable<Signal<string>> = null;
  private interacted: Nullable<Signal<boolean>> = null;

  ngOnInit(): void {
    const c: FormControl = this.ctrl();

    this.inCtx(() => {
      this.val = toSignal(c.valueChanges, {
        initialValue: c.value,
      });

      this.interacted = toSignal(c.statusChanges.pipe(map(() => !!(c.touched || c.dirty))), {
        initialValue: !!(c.touched || c.dirty),
      });
    });

    this.useEffect(() => {
      void this.val?.();

      const errors: Nullable<FieldErrsT> = c.errors as Nullable<FieldErrsT>;

      this.recErrs.update((prev: RecErrsT) => ({
        prev: prev.curr,
        curr: errors?.zod && this.interacted?.() ? errors.zod : null,
      }));
    });
  }
}

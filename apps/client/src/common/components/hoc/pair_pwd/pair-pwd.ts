import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormFieldTxt } from '../../forms/base_fields/form_field_txt/form-field-txt';
import { PairPwdStateT, TxtSvgFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';
import { PwdGenerator } from './pwd_generator/pwd-generator';
import { ConfSwapT } from '@/core/hooks/swap/etc/types';
import { PwdChecker } from './pwd_checker/pwd-checker';
import { Nullable } from '@/common/types/etc';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { PwdFieldsUiFkt } from '@/core/ui_fkt/form_fields/1.pwd';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseFocusHk } from '@/core/hooks/listeners/use_focus';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';

@Component({
  selector: 'app-pair-pwd',
  imports: [FormFieldTxt, PwdGenerator, PwdChecker, UseFormFieldDir],
  templateUrl: './pair-pwd.html',
  styleUrl: './pair-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFocusHk],
})
export class PairPwd extends UseInjCtxHk implements OnInit {
  // ? personal props
  public readonly getCtrl: InputSignal<(key: string) => FormControl<unknown>> = input.required();
  // ? component may be inside a swapper
  // ? but not necessarily so by default is always 0
  public readonly confSwap: InputSignal<Nullable<ConfSwapT>> = input<Nullable<ConfSwapT>>(null);
  public readonly focusOnMount: InputSignal<boolean> = input(false);
  public readonly useFocus: UseFocusHk = inject(UseFocusHk);

  // ? local state
  public readonly pairPwdState: WritableSignal<PairPwdStateT> = signal({
    isConfirmPwdTypePwd: true,
    isPwdTypePwd: true,
  });

  // ? ui fields
  public readonly pwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFieldsUiFkt.fieldByBool('password', this.pairPwdState().isPwdTypePwd)
  );
  public readonly confPwdField: Signal<TxtSvgFieldT> = computed(() =>
    PwdFieldsUiFkt.fieldByBool('confirmPassword', this.pairPwdState().isConfirmPwdTypePwd)
  );

  // ? confPwd setup to listen pwd changes

  private pwdVal: Nullable<Signal<string>> = null;
  public optionalConfPwdDep: Signal<Nullable<string>[]> = computed(() => [this.pwdVal?.() ?? null]);

  ngOnInit(): void {
    this.inCtx(() => {
      const pwdCtrl: FormControl = this.getCtrl()('password');
      const confPwdCtrl: FormControl = this.getCtrl()('confirmPassword');

      this.pwdVal = toSignal(pwdCtrl.valueChanges as Observable<string>, {
        initialValue: pwdCtrl.value,
      });

      pwdCtrl.valueChanges.subscribe((_: string) => {
        confPwdCtrl.updateValueAndValidity();
      });
    });
  }

  // ? listeners
  public toggleByKey(key: keyof PairPwdStateT): () => void {
    return () => {
      const other: keyof PairPwdStateT =
        key === 'isPwdTypePwd' ? 'isConfirmPwdTypePwd' : 'isPwdTypePwd';

      this.pairPwdState.update((prev: PairPwdStateT) => ({
        ...prev,
        [key]: !prev[key],
        [other]: true,
      }));
    };
  }
}

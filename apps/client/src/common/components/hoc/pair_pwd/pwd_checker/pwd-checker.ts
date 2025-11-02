import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { ConfSwapT } from '@/core/hooks/swap/etc/types';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { FieldPwdCheckerT, PwdCheckerUiFkt } from './etc/ui_fkt';
import { NgComponentOutlet, NgClass } from '@angular/common';
import { Reg } from '@/core/paperwork/reg';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';
import { Nullable } from '@/common/types/etc';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';

@Component({
  selector: 'app-pwd-checker',
  imports: [Portal, NgComponentOutlet, NgClass],
  templateUrl: './pwd-checker.html',
  styleUrl: './pwd-checker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdChecker implements OnInit, AfterViewInit {
  public readonly useFormFieldDir: UseFormFieldDir = inject(UseFormFieldDir);

  // ? personal props
  public readonly isFocused: InputSignal<boolean> = input.required();
  public readonly pwdFieldRef: InputSignal<FormFieldTxt> = input.required();
  public readonly confSwap: InputSignal<Nullable<ConfSwapT>> = input<Nullable<ConfSwapT>>(null);

  // ? static assets
  public readonly fieldsCheckers: FieldPwdCheckerT[] = PwdCheckerUiFkt.fields;
  public readonly pwdRuler: Omit<FieldPwdCheckerT, 'id'> = PwdCheckerUiFkt.ruler;

  // ? local state
  public readonly coords: WritableSignal<Nullable<RecCoordsT>> = signal<Nullable<RecCoordsT>>(null);

  // ? derived
  public pwdLen: Signal<number> = computed(() => {
    const val: Nullable<string> = this.useFormFieldDir?.val?.() as Nullable<string>;
    return val ? val?.trim()?.length ?? 0 : 0;
  });
  public readonly showTooltip: Signal<boolean> = computed(
    () =>
      !this.confSwap() ||
      (!!this.confSwap()?.isCurr && this.confSwap()?.mode !== 'swapping' && this.isFocused())
  );
  public readonly transform: Signal<string> = computed(
    () => `translate(-50%, ${this.showTooltip() ? '-150px' : '0px'})`
  );

  // ? listeners & ng lifecycle
  public getSvgCls(reg: RegExp): string {
    const val: Nullable<string> = this.useFormFieldDir?.val?.() as Nullable<string>;

    if (!this.useFormFieldDir?.interacted?.()) return 'text-gray-300';
    else if (reg.test(val ?? '')) return 'text-green-600';
    else return 'text-red-600';
  }

  public getBorderClr(): string {
    const val: Nullable<string> = this.useFormFieldDir?.val?.() as Nullable<string>;

    return !this.useFormFieldDir.interacted?.()
      ? 'border-gray-300'
      : Reg.isPwd(val ?? '')
      ? 'border-green-600'
      : 'border-red-600';
  }

  ngOnInit(): void {
    this.useFormFieldDir.setupWithFieldRef(this.pwdFieldRef());
  }

  ngAfterViewInit(): void {
    this.useFormFieldDir.useEffect(() => {
      const conf: Nullable<ConfSwapT> = this.confSwap();

      if (!conf || (conf.isCurr && conf.mode !== 'swapping'))
        this.coords.set(PortalDOM.coordsOfRef(this.pwdFieldRef().formField));
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(PortalDOM.coordsOfRef(this.pwdFieldRef().formField));
  }
  @HostListener('window:resize')
  public onResize(): void {
    this.coords.set(PortalDOM.coordsOfRef(this.pwdFieldRef().formField));
  }
}

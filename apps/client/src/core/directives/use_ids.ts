import { Nullable } from '@/common/types/etc';
import { Directive, input, InputSignal } from '@angular/core';
import { Form2faTestIdT } from '../forms/2fa/etc/directives/use_form_2fa';
import { CheckBoxFieldT } from '@/common/types/forms';

@Directive({
  selector: '[appUseIDsDir]',
})
export class UseIDsDir {
  public readonly testId: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  private ifTestID(arg: string): Nullable<string> {
    return !this.testId() ? null : arg;
  }

  public submitVarID(): Nullable<string> {
    return this.ifTestID(`${this.testId()}__submit`);
  }
  public swapperVarID(): Nullable<string> {
    return this.ifTestID(`${this.testId()}__swapper`);
  }

  public swapBtnVarID(idx: number): Nullable<string> {
    return this.ifTestID(this.testId() + (!idx ? '_prev_swap' : '_next_swap'));
  }

  public form2faVarID(t: Form2faTestIdT): Nullable<string> {
    return this.ifTestID(`${this.testId()}__swapper__${t}_form`);
  }

  public boxChoiceVarID(f: CheckBoxFieldT): Nullable<string> {
    return `${f.name}__${f.val}`;
  }
}

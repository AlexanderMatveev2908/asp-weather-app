import { Injectable, signal, WritableSignal } from '@angular/core';
import { UseKitFormHk } from '../../../../hooks/kits/kit_form/0.use_kit_form';

@Injectable()
export abstract class UseKitFormPwdHk extends UseKitFormHk {
  public readonly isPwdTypePwd: WritableSignal<boolean> = signal(true);

  public onToggle: () => void = () => {
    this.isPwdTypePwd.set(!this.isPwdTypePwd());
  };
}

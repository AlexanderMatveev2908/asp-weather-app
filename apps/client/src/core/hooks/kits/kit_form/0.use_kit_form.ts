import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { Observable } from 'rxjs';
import { UseKitNav } from '@/core/services/use_kit_nav';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseInjCtxHk } from '../../use_inj_ctx';

@Injectable()
export abstract class UseKitFormHk {
  public abstract form: FormGroup;

  protected readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  protected readonly useKitNav: UseKitNav = inject(UseKitNav);
  protected readonly useInjCtx: UseInjCtxHk = inject(UseInjCtxHk);

  public readonly getCtrl: (name: string) => FormControl = (name: string): FormControl =>
    this.form.get(name) as FormControl;

  protected readonly submitForm: (cb: (data: unknown) => Observable<unknown>) => void = (
    cb: (data: unknown) => Observable<unknown>
  ): void => {
    if (!this.form.valid) {
      FormZodMng.onSubmitFailed(this.form);
      return;
    }

    this.apiTracker.track(cb(this.form.value)).subscribe();
  };
}

import { inject, Injectable, Signal } from '@angular/core';
import { FormWeatherGroupT, FormWeatherT, SearchWeatherFormMng } from '../../paperwork/form_mng';
import { TxtFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';
import { Nullable } from '@/common/types/etc';
import { FormWeatherUiFkt } from '../../ui_fkt';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseWeatherKitSvc } from '@/features/weather/etc/hooks/use_weather_kit';

@Injectable()
export abstract class UseSetupWeatherHk extends UseInjCtxHk {
  // ? svc
  protected readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);

  // ? statics
  public readonly form: FormWeatherGroupT = SearchWeatherFormMng.form;
  public readonly cityField: TxtFieldT = FormWeatherUiFkt.cityField;

  // ? control city field
  public readonly ctrlCity: FormControl = this.form.get('city') as FormControl;

  // ? local state
  public formValue: Nullable<Signal<FormWeatherT>> = null;
}

import { Nullable } from '@/common/types/etc';
import { Injectable } from '@angular/core';
import { FormWeatherT } from '../../paperwork/form_mng';
import { LibShape } from '@/core/lib/data_structure/shape';
import { UseManageDerivedWeatherHk } from '../2.use_manage_derived';
import { finalize, tap } from 'rxjs';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { ResApiT } from '@/core/store/api/etc/types';
import { WeatherResT } from '@/features/weather/etc/types';

@Injectable()
export abstract class UseManageListenersWeatherHk extends UseManageDerivedWeatherHk {
  // ? listeners
  protected readonly triggerStrategy: (data: FormWeatherT) => void = (data: FormWeatherT) => {
    const val: Nullable<FormWeatherT> = data ?? (this.form.value as Nullable<FormWeatherT>);
    if (!this.form.valid || !LibShape.hasText(val?.city)) return;

    this.forceSetPrevForm(val);

    this.useWeatherKit.weatherSlice.setWeatherPending(true);
    this.useWeatherKit.weatherApi
      .getWeatherByCity(val)
      .pipe(
        tap((res: ResApiT<WeatherResT>) => {
          this.useWeatherKit.weatherSlice.setWeather(res);
        }),
        finalize(() => this.useWeatherKit.weatherSlice.setWeatherPending(false))
      )
      .subscribe();
  };

  public readonly onSubmit: () => void = () => {
    if (!this.form.valid) {
      RootFormMng.onSubmitFailed(this.form);
      return;
    }
    this.triggerStrategy(this.form.value as FormWeatherT);
  };

  // ? btn svg inside input
  public readonly triggerSubmit: () => void = () => {
    const el: Nullable<HTMLFormElement> = document.getElementById(
      'search_weather_form'
    ) as Nullable<HTMLFormElement>;
    if (!el) return;
    el.requestSubmit();
  };
}

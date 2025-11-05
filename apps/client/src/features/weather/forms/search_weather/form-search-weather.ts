import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { BtnSvg } from '@/common/components/btns/btn_svg/btn-svg';
import { Nullable } from '@/common/types/etc';
import { ReactiveFormsModule } from '@angular/forms';
import { FormWeatherT } from './etc/paperwork/form_mng';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GeoUserT } from '../../reducer/reducer';
import { UseManageListenersWeatherHk } from './etc/sub/3.use_manage_listeners';

@Component({
  selector: 'app-form-search-weather',
  imports: [FormFieldTxt, BtnSvg, ReactiveFormsModule],
  templateUrl: './form-search-weather.html',
  styleUrl: './form-search-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSearchWeather extends UseManageListenersWeatherHk implements OnInit {
  ngOnInit(): void {
    this.inCtx(() => {
      this.formValue = toSignal(this.form.valueChanges as Observable<FormWeatherT>, {
        initialValue: this.form.value as FormWeatherT,
      });
    });

    this.debounce({
      triggerStrategy: this.triggerStrategy,
    });

    this.useEffect(() => {
      const geo: Nullable<GeoUserT> = this.useWeatherKit.weatherSlice.geoUser();
      if (this.useWeatherKit.weatherSlice.weather() || !geo) return;

      this.form.markAsDirty();
      this.form.markAsTouched();
      this.form.patchValue({
        city: geo.region,
      });
      this.triggerStrategy(this.form.value as FormWeatherT);
    });
  }
}

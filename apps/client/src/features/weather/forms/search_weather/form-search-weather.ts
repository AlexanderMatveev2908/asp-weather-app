import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { BtnSvg } from '@/common/components/btns/btn_svg/btn-svg';
import { SvgFillSearch } from '@/common/components/svgs/fill/search/search';
import { SvgFillRerun } from '@/common/components/svgs/fill/rerun/rerun';
import { Nullable, SvgT } from '@/common/types/etc';
import { TxtFieldT } from '@/common/types/forms';
import { FormWeatherUiFkt } from './etc/ui_fkt';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormWeatherGroupT, FormWeatherT, SearchWeatherFormMng } from './etc/paperwork/form_mng';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, Observable } from 'rxjs';
import { UseDebounceHk } from './etc/hooks/use_debounce/use_debounce';
import { UseWeatherKitSvc } from '../../etc/hooks/use_weather_kit';
import { SvgFillAlmostCircle } from '@/common/components/svgs/fill/almost_circle/almost-circle';
import { LibShape } from '@/core/lib/data_structure/shape';
import { GeoUserT } from '../../reducer/reducer';

@Component({
  selector: 'app-form-search-weather',
  imports: [FormFieldTxt, BtnSvg, ReactiveFormsModule],
  templateUrl: './form-search-weather.html',
  styleUrl: './form-search-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSearchWeather extends UseDebounceHk implements OnInit {
  private readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);

  // ? derived
  public readonly disable: Signal<boolean> = this.useWeatherKit.weatherSlice.geoPending;

  // ? statics
  public readonly form: FormWeatherGroupT = SearchWeatherFormMng.form;
  public readonly cityField: TxtFieldT = FormWeatherUiFkt.cityField;

  // ? dynamic vectors
  public readonly searchSvg: Signal<SvgT> = computed(() =>
    this.useWeatherKit.weatherSlice.weatherPending() ? SvgFillAlmostCircle : SvgFillSearch
  );
  public readonly searchTwd: Signal<string> = computed(() =>
    this.useWeatherKit.weatherSlice.weatherPending() ? 'app__spin' : ''
  );
  public readonly refreshSvg: Signal<SvgT> = computed(() =>
    this.useWeatherKit.weatherSlice.geoPending() ? SvgFillAlmostCircle : SvgFillRerun
  );
  public readonly refreshTwd: Signal<string> = computed(() =>
    this.useWeatherKit.weatherSlice.geoPending() ? 'app__spin' : ''
  );

  // ? control city field
  public readonly ctrlCity: FormControl = this.form.get('city') as FormControl;

  // ? listeners
  private readonly triggerStrategy: (data: FormWeatherT) => void = (data: FormWeatherT) => {
    const val: Nullable<FormWeatherT> = data ?? (this.form.value as Nullable<FormWeatherT>);
    if (!this.form.valid || !LibShape.hasText(val?.city)) return;

    this.forceSetPrevForm(val);

    this.useWeatherKit.weatherSlice.setWeatherPending(true);
    this.useWeatherKit.weatherApi
      .getWeatherByCity(val)
      .pipe(finalize(() => this.useWeatherKit.weatherSlice.setWeatherPending(false)))
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

  // ? local state
  public formValue: Nullable<Signal<FormWeatherT>> = null;

  ngOnInit(): void {
    this.inCtx(() => {
      this.formValue = toSignal(this.form.valueChanges as Observable<FormWeatherT>, {
        initialValue: this.form.value as FormWeatherT,
      });
    });

    this.debounce({
      form: this.form,
      formValue: this.formValue,
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
    });
  }
}

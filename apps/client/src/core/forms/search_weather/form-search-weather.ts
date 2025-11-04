import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { BtnSvg } from '@/common/components/btns/btn_svg/btn-svg';
import { SvgFillSearch } from '@/common/components/svgs/fill/search/search';
import { SvgFillRerun } from '@/common/components/svgs/fill/rerun/rerun';
import { SvgT } from '@/common/types/etc';
import { TxtFieldT } from '@/common/types/forms';
import { FormWeatherUiFkt } from './etc/ui_fkt';
import { FormGroup } from '@angular/forms';
import { SearchWeatherFormMng } from './etc/form_mng';

@Component({
  selector: 'app-form-search-weather',
  imports: [FormFieldTxt, BtnSvg],
  templateUrl: './form-search-weather.html',
  styleUrl: './form-search-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSearchWeather {
  // ? statics
  public readonly form: FormGroup = SearchWeatherFormMng.form;
  public readonly cityField: TxtFieldT = FormWeatherUiFkt.cityField;

  // ? dynamic vectors
  public readonly searchSvg: Signal<SvgT> = computed(() => SvgFillSearch);
  public readonly refreshSvg: Signal<SvgT> = computed(() => SvgFillRerun);
}

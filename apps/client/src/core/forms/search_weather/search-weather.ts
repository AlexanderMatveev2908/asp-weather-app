import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { BtnSvg } from '@/common/components/btns/btn_svg/btn-svg';
import { SvgFillSearch } from '@/common/components/svgs/fill/search/search';
import { SvgFillRerun } from '@/common/components/svgs/fill/rerun/rerun';
import { SvgT } from '@/common/types/etc';

@Component({
  selector: 'app-search-weather',
  imports: [FormFieldTxt, BtnSvg],
  templateUrl: './search-weather.html',
  styleUrl: './search-weather.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchWeather {
  public readonly searchSvg: Signal<SvgT> = computed(() => SvgFillSearch);
  public readonly refreshSvg: Signal<SvgT> = computed(() => SvgFillRerun);
}

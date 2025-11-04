import { SvgFillHalfSun } from '@/common/components/svgs/fill/half_sun/half-sun';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { FormFieldTxt } from '@/common/components/forms/base_fields/form_field_txt/form-field-txt';
import { SvgFillSearch } from '@/common/components/svgs/fill/search/search';

@Component({
  selector: 'app-header',
  imports: [NgComponentOutlet, FormFieldTxt],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  public readonly logo: SvgT = SvgFillHalfSun;

  public readonly searchSvg: Signal<SvgT> = computed(() => SvgFillSearch);
}

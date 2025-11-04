import { SvgFillHalfSun } from '@/common/components/svgs/fill/half_sun/half-sun';
import { SvgT } from '@/common/types/etc';
import { FormSearchWeather } from '@/core/forms/search_weather/form-search-weather';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [NgComponentOutlet, FormSearchWeather],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  public readonly logo: SvgT = SvgFillHalfSun;
}

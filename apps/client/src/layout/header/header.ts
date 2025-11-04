import { SvgFillHalfSun } from '@/common/components/svgs/fill/half_sun/half-sun';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchWeather } from '@/core/forms/search_weather/search-weather';

@Component({
  selector: 'app-header',
  imports: [NgComponentOutlet, SearchWeather],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  public readonly logo: SvgT = SvgFillHalfSun;
}

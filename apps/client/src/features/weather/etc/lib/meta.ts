import { MainWeatherT } from '../types';
import { SvgFillSun } from '@/common/components/svgs/fill/sun/sun';
import { SvgFillHalfSun } from '@/common/components/svgs/fill/half_sun/half-sun';
import { SvgFillDrop } from '@/common/components/svgs/fill/drop/drop';
import { SvgFillCloud } from '@/common/components/svgs/fill/cloud/cloud';
import { SvgFillRain } from '@/common/components/svgs/fill/rain/rain';
import { Type } from '@angular/core';
import { Nullable } from '@/common/types/etc';
import { SvgFillError } from '@/common/components/svgs/fill/error/error';

export interface MetaWeatherT {
  Svg: AvailableFigmaSvg;
  twdCss: string;
}

export type AvailableFigmaSvg =
  | Type<SvgFillSun>
  | Type<SvgFillHalfSun>
  | Type<SvgFillDrop>
  | Type<SvgFillCloud>
  | Type<SvgFillRain>
  | Type<SvgFillError>;

export class LibMetaWeather {
  private static readonly map: Map<MainWeatherT, MetaWeatherT> = new Map<
    MainWeatherT,
    MetaWeatherT
  >([
    ['Thunderstorm', { Svg: SvgFillRain, twdCss: 'text-blue__sec' }],
    ['Rain', { Svg: SvgFillRain, twdCss: 'text-blue__sec' }],

    ['Drizzle', { Svg: SvgFillDrop, twdCss: 'text-blue__sec' }],

    ['Snow', { Svg: SvgFillHalfSun, twdCss: 'text-yellow__prm' }],

    ['Mist', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Smoke', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Haze', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Dust', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Fog', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Sand', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Ash', { Svg: SvgFillCloud, twdCss: 'text-gray__prm' }],
    ['Squall', { Svg: SvgFillCloud, twdCss: 'gray__prm' }],
    ['Tornado', { Svg: SvgFillCloud, twdCss: 'gray__prm' }],
    ['Clouds', { Svg: SvgFillCloud, twdCss: 'gray__prm' }],

    ['Clear', { Svg: SvgFillSun, twdCss: 'text-yellow__prm' }],

    ['Error', { Svg: SvgFillError, twdCss: 'text-red-600' }],
  ]);

  public static metaByT(t: Nullable<MainWeatherT>): MetaWeatherT {
    if (!t) return this.map.get('Error')!;
    const data: Nullable<MetaWeatherT> = this.map.get(t) ?? null;
    return data ?? this.map.get('Error')!;
  }
}

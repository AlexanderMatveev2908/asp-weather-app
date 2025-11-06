import { SvgFillDrop } from '@/common/components/svgs/fill/drop/drop';
import { SvgFillEye } from '@/common/components/svgs/fill/eye/eye';
import { SvgFillTemperature } from '@/common/components/svgs/fill/temperature/temperature';
import { SvgFillWind } from '@/common/components/svgs/fill/wind/wind';
import { RootUiFkt } from '@/core/ui_fkt/root';
import { Type } from '@angular/core';
import { FooterPayloadBlockA } from './lib';

export interface FooterInfoItemT {
  Svg: Type<SvgFillWind | SvgFillDrop | SvgFillTemperature | SvgFillEye>;
  label: string;
  val: string;
  id: string;
}

export class WeatherUiFktBlockA extends RootUiFkt {
  public static footerFields(arg: FooterPayloadBlockA): FooterInfoItemT[] {
    const list: FooterInfoItemT[] = this.listWithIDs([
      {
        label: 'Wind',
        val: arg.wind,
        Svg: SvgFillWind,
      },
      {
        label: 'Humidity',
        val: arg.humidity,
        Svg: SvgFillDrop,
      },
      {
        label: 'Pressure',
        val: arg.pressure,
        Svg: SvgFillTemperature,
      },
      {
        label: 'Visibility',
        val: arg.visibility,
        Svg: SvgFillEye,
      },
    ]);

    return list;
  }
}

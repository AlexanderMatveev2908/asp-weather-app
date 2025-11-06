import { OrNone } from '@/common/types/etc';
import { CurrWeatherT } from '@/features/weather/etc/types';
import { HeaderWeatherUiFktBlockC, PayloadHeaderBlockC } from './sub/header';
import { FooterWeatherUiFktBlockC, MetaAqiT } from './sub/footer';

export class WeatherUiFktBlockC {
  public static payloadHeader(arg: OrNone<CurrWeatherT>): PayloadHeaderBlockC[] {
    return HeaderWeatherUiFktBlockC.main(arg);
  }

  public static payloadFooter(v: OrNone<number>): MetaAqiT {
    return FooterWeatherUiFktBlockC.main(v);
  }
}

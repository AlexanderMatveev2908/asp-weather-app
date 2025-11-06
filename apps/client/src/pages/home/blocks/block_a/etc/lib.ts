import { Nullable, OrNone } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { LibMetaWeather, MetaWeatherT } from '@/features/weather/etc/lib/meta';
import { LibPrsWeather } from '@/features/weather/etc/lib/prs';
import { CurrWeatherT, GeoResT, MainWeatherT, WeatherResT } from '@/features/weather/etc/types';

export interface HeaderPayloadBlockA {
  titleWhere: string;
  today: string;
}

export interface FooterPayloadBlockA {
  wind: string;
  humidity: string;
  visibility: string;
  pressure: string;
}

export interface PayloadBlockA extends HeaderPayloadBlockA {
  meta: MetaWeatherT;
  main: MainWeatherT;
  temp: string;
  feelsLike: string;
  footerPayload: FooterPayloadBlockA;
}

export class LibWeatherBlockA {
  private static headerPayload(
    geo: Nullable<GeoResT>
  ): Pick<PayloadBlockA, 'titleWhere' | 'today'> {
    return {
      titleWhere: `${geo?.region ?? ''}, ${geo?.country_code ?? ''}`,
      today: LibPrs.prettyDate(),
    };
  }

  private static footerPayload(curr: OrNone<CurrWeatherT>): FooterPayloadBlockA {
    return {
      wind: LibPrsWeather.kmHourFromMetersSec(curr?.wind_speed),
      humidity: LibPrs.roundNone(curr?.humidity) + '%',
      pressure: LibPrs.roundNone(curr?.pressure) + 'hPa',
      visibility: LibPrsWeather.kmVisibilityFromMeters(curr?.visibility),
    };
  }

  public static main(weather: Nullable<WeatherResT>, geo: Nullable<GeoResT>): PayloadBlockA {
    const curr: OrNone<CurrWeatherT> = weather?.current;
    const main: MainWeatherT = curr?.weather?.[0]?.main ?? 'Error';

    return {
      meta: LibMetaWeather.metaByT(main),
      main,
      temp: LibPrsWeather.celsiusFromKelvin(curr?.temp),
      feelsLike: `Feels like ${LibPrsWeather.celsiusFromKelvin(curr?.feels_like)}`,
      footerPayload: this.footerPayload(weather?.current),
      ...this.headerPayload(geo),
    };
  }
}

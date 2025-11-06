import { Nullable, OrNone } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { RootUiFkt } from '@/core/ui_fkt/root';
import { LibMetaWeather } from '@/features/weather/etc/lib/meta';
import { LibPrsWeather } from '@/features/weather/etc/lib/prs';
import { BasePayloadWeatherT, DailyWeatherT, MainWeatherT } from '@/features/weather/etc/types';

export interface PayloadBlockB extends BasePayloadWeatherT {
  weekDay: string;
  id: string;
}

export class WeatherUiFktBLockB extends RootUiFkt {
  private static formatWeekDay(dt: OrNone<number>): string {
    const tmst: number = LibPrs.timestampAsMillis(dt);
    const d: Date = new Date(tmst);
    const weekDay: string = Intl.DateTimeFormat('en-US', {
      weekday: 'short',
    }).format(d);

    return weekDay;
  }

  // eslint-disable-next-line complexity
  private static formatDay(arg: Nullable<DailyWeatherT>, idx: number): PayloadBlockB {
    const main: MainWeatherT = arg?.weather?.[0]?.main ?? 'Error';
    const weekDay: string = !idx ? 'Today' : this.formatWeekDay(arg?.dt);

    return this.withID({
      main,
      meta: LibMetaWeather.metaByT(main),
      temp: LibPrsWeather.celsiusFromKelvin(arg?.temp?.day),
      feelsLike: LibPrsWeather.celsiusFromKelvin(arg?.feels_like?.day),
      weekDay,
    });
  }

  public static formatWeatherDaysList(arg: OrNone<DailyWeatherT[]>): PayloadBlockB[] {
    const daysForecast: number = 5;

    return !arg
      ? []
      : arg
          .slice(0, daysForecast)
          .map((item: DailyWeatherT, idx: number) => this.formatDay(item, idx));
  }
}

import { Nullable } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { LibMetaWeather, MetaWeatherT } from '@/features/weather/etc/lib/meta';
import { LibPrsWeather } from '@/features/weather/etc/lib/prs';
import { GeoResT, MainWeatherT } from '@/features/weather/etc/types';
import { WeatherSlice } from '@/features/weather/slice';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';

@Component({
  selector: 'app-block-a',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './block-a.html',
  styleUrl: './block-a.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockA {
  private readonly weatherSLice: WeatherSlice = inject(WeatherSlice);

  // ? header
  public readonly titleWhere: Signal<string> = computed(() => {
    const geo: Nullable<GeoResT> = this.weatherSLice.geoUser();
    if (!geo) return '';
    return `${geo.region}, ${geo.country_code}`;
  });
  public readonly today: string = LibPrs.prettyDate();

  // ? body

  public readonly mainWeather: Signal<Nullable<MainWeatherT>> = computed(
    () => this.weatherSLice.weather()?.current?.weather?.[0]?.main ?? null
  );

  public readonly metaWeather: Signal<MetaWeatherT> = computed(() => {
    const mainWeather: Nullable<MainWeatherT> = this.mainWeather();
    return LibMetaWeather.metaByT(mainWeather);
  });

  public readonly celsiusTemp: Signal<string> = computed(() =>
    LibPrsWeather.celsiusFromKelvin(this.weatherSLice.weather()?.current?.temp ?? null)
  );

  public readonly feelsLikeCelsius: Signal<string> = computed(
    () =>
      `Feels like ${LibPrsWeather.celsiusFromKelvin(
        this.weatherSLice.weather()?.current?.feels_like ?? null
      )}`
  );
}

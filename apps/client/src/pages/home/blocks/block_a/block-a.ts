import { Nullable } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { GeoResT } from '@/features/weather/etc/types';
import { WeatherSlice } from '@/features/weather/slice';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';

@Component({
  selector: 'app-block-a',
  imports: [],
  templateUrl: './block-a.html',
  styleUrl: './block-a.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockA {
  private readonly weatherSLice: WeatherSlice = inject(WeatherSlice);

  public readonly titleWhere: Signal<string> = computed(() => {
    const geo: Nullable<GeoResT> = this.weatherSLice.geoUser();
    if (!geo) return '';
    return `${geo.region}, ${geo.country_code}`;
  });

  public readonly today: string = LibPrs.prettyDate();
}

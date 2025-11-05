import { SvgFillAlmostCircle } from '@/common/components/svgs/fill/almost_circle/almost-circle';
import { SvgFillRerun } from '@/common/components/svgs/fill/rerun/rerun';
import { SvgFillSearch } from '@/common/components/svgs/fill/search/search';
import { SvgT } from '@/common/types/etc';
import { computed, Injectable, Signal } from '@angular/core';
import { UseDebounceWeatherHk } from '../1.use_debounce';

@Injectable()
export abstract class UseManageDerivedWeatherHk extends UseDebounceWeatherHk {
  public readonly disable: Signal<boolean> = computed(() =>
    this.useWeatherKit.weatherSlice.geoPending()
  );

  // ? dynamic vectors
  public readonly searchSvg: Signal<SvgT> = computed(() =>
    this.useWeatherKit.weatherSlice.weatherPending() ? SvgFillAlmostCircle : SvgFillSearch
  );
  public readonly searchTwd: Signal<string> = computed(() =>
    this.useWeatherKit.weatherSlice.weatherPending() ? 'app__spin' : ''
  );
  public readonly refreshSvg: Signal<SvgT> = computed(() =>
    this.useWeatherKit.weatherSlice.geoPending() ? SvgFillAlmostCircle : SvgFillRerun
  );
  public readonly refreshTwd: Signal<string> = computed(() =>
    this.useWeatherKit.weatherSlice.geoPending() ? 'app__spin' : ''
  );
}

import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { Header } from '@/layout/header/header';
import { UseWeatherKitSvc } from '@/features/weather/etc/hooks/use_weather_kit';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { BlockA } from './blocks/block_a/block-a';
import { BlockB } from './blocks/block_b/block-b';

@Component({
  selector: 'app-home',
  imports: [Header, PageWrapper, UseMetaEventDir, BlockA, BlockB],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);

  // ! what I thought from figma design
  // ! I can not show nothing without weather fetched so i will show a spinner
  // ! but when data is present i show old payload with opacity 0.5
  // ! til new data is fetched
  public readonly opacity: Signal<string> = computed(() =>
    this.useWeatherKit.weatherSlice.weatherPending() ? '0.5' : '1'
  );
}

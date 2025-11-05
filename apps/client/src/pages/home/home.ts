import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from '@/layout/header/header';
import { UseWeatherKitSvc } from '@/features/weather/etc/hooks/use_weather_kit';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { BlockA } from './blocks/block_a/block-a';

@Component({
  selector: 'app-home',
  imports: [Header, PageWrapper, UseMetaEventDir, BlockA],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);
}

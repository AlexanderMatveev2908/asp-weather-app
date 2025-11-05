import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Header } from '@/layout/header/header';
import { UseWeatherKitSvc } from '@/features/weather/etc/hooks/use_weather_kit';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';

@Component({
  selector: 'app-home',
  imports: [Header, PageWrapper, UseMetaEventDir],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly useWeatherKit: UseWeatherKitSvc = inject(UseWeatherKitSvc);
}

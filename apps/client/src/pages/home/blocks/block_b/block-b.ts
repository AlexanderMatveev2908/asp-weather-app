import { WeatherSlice } from '@/features/weather/slice';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PayloadBlockB, WeatherUiFktBLockB } from './etc/ui_fkt';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-block-b',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './block-b.html',
  styleUrl: './block-b.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockB {
  private readonly weatherSlice: WeatherSlice = inject(WeatherSlice);

  public readonly payloadDays: Signal<PayloadBlockB[]> = computed(() =>
    WeatherUiFktBLockB.formatWeatherDaysList(this.weatherSlice.weather()?.daily)
  );
}

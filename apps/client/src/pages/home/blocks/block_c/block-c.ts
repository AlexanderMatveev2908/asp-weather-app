import { WeatherSlice } from '@/features/weather/slice';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PayloadHeaderBlockC, WeatherUiFktBlockC } from './etc/ui_fkt';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-block-c',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './block-c.html',
  styleUrl: './block-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockC {
  private readonly weatherSlice: WeatherSlice = inject(WeatherSlice);

  public readonly payloadHeader: Signal<PayloadHeaderBlockC[]> = computed(() =>
    WeatherUiFktBlockC.fieldsHeaderBlockC(this.weatherSlice.weather()?.current)
  );
}

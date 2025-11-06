import { WeatherSlice } from '@/features/weather/slice';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { WeatherUiFktBlockC } from './etc/ui_fkt';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { PayloadHeaderBlockC } from './etc/ui_fkt/sub/header';
import { MetaAqiT } from './etc/ui_fkt/sub/footer';

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
    WeatherUiFktBlockC.payloadHeader(this.weatherSlice.weather()?.current)
  );

  public readonly payloadFooter: Signal<MetaAqiT> = computed(() =>
    WeatherUiFktBlockC.payloadFooter(
      this.weatherSlice.weather()?.airPollution?.list?.[0]?.main?.aqi
    )
  );
}

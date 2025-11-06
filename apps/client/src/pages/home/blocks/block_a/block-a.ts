import { WeatherSlice } from '@/features/weather/slice';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PayloadBlockA, LibWeatherBlockA } from './etc/lib';
import { FooterInfoItemT, WeatherUiFktBlockA } from './etc/ui_fkt';

@Component({
  selector: 'app-block-a',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './block-a.html',
  styleUrl: './block-a.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockA {
  private readonly weatherSLice: WeatherSlice = inject(WeatherSlice);

  public readonly payload: Signal<PayloadBlockA> = computed(() =>
    LibWeatherBlockA.main(this.weatherSLice.weather())
  );

  public readonly fieldsFooter: Signal<FooterInfoItemT[]> = computed(() =>
    WeatherUiFktBlockA.footerFields(this.payload().footerPayload)
  );
}

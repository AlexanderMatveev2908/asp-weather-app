
import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-fill-temperature',
  templateUrl: `./temperature.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgFillTemperature {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
    fill: InputSignal<string> = input<string>('currentColor');
    stroke: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
    
}

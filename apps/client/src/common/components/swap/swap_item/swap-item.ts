import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-swap-item',
  imports: [],
  templateUrl: './swap-item.html',
  styleUrl: './swap-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapItem {
  public readonly title: InputSignal<string> = input.required();
}

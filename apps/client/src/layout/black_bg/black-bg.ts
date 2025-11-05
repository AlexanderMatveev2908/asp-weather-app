import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-black-bg',
  imports: [NgClass],
  templateUrl: './black-bg.html',
  styleUrl: './black-bg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlackBg {
  public css: InputSignal<string> = input.required();
}

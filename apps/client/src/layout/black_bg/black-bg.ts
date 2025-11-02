import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { BlackBgPropsT } from './etc/types';

@Component({
  selector: 'app-black-bg',
  imports: [NgClass],
  templateUrl: './black-bg.html',
  styleUrl: './black-bg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlackBg {
  public props: InputSignal<BlackBgPropsT> = input.required();
}

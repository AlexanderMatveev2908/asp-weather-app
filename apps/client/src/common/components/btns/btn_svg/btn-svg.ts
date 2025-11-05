import { BtnT } from '@/common/types/dom';
import { SvgT } from '@/common/types/etc';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-btn-svg',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './btn-svg.html',
  styleUrl: './btn-svg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnSvg {
  public readonly Svg: InputSignal<SvgT> = input.required();
  public readonly btnT: InputSignal<BtnT> = input.required();
  public readonly disable: InputSignal<boolean> = input(false);

  public readonly additionalSvgTwd: InputSignal<string> = input('');
}

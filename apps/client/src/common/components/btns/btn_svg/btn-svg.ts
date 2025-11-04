import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-btn-svg',
  imports: [NgComponentOutlet],
  templateUrl: './btn-svg.html',
  styleUrl: './btn-svg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnSvg {
  public readonly Svg: InputSignal<SvgT> = input.required();
}

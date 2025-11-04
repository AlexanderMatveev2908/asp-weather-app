import { Nullable, SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-form-field-txt',
  imports: [NgComponentOutlet],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt {
  // ? props
  public readonly Svg: InputSignal<Nullable<SvgT>> = input<Nullable<SvgT>>(null);

  // ? derived
  public readonly padding: Signal<string> = computed(() =>
    this.Svg() ? '0 34px 0 11px' : '0 11px'
  );
}

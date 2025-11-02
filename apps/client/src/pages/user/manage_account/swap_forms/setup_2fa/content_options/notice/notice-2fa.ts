import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-notice-2fa',
  imports: [NgComponentOutlet],
  templateUrl: './notice-2fa.html',
  styleUrl: './notice-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice2fa {
  public readonly txt: InputSignal<string> = input.required();

  public readonly useMetaEvent: UseMetaEventDir = inject(UseMetaEventDir);
}

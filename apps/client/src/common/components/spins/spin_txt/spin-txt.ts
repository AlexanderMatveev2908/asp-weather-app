import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-spin-txt',
  imports: [],
  templateUrl: './spin-txt.html',
  styleUrl: './spin-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinTxt {
  public readonly useMetaEventDir: UseMetaEventDir = inject(UseMetaEventDir);
}

import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { SvgFillClose } from '../../svgs/fill/close/close';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-close-btn',
  imports: [SvgFillClose],
  templateUrl: './close-btn.html',
  styleUrl: './close-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseBtn {
  // ? directives
  public readonly useIDs: UseIDsDir = inject(UseIDsDir);

  public readonly closeClick: InputSignal<() => void> = input.required();
  public readonly disabled: InputSignal<boolean> = input(false);
}

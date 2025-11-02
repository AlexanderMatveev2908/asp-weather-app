import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { DynamicSwapper } from '@/common/components/swap/dynamic_swapper/dynamic-swapper';
import { UseDynamicSwapHk } from '@/core/hooks/swap/use_dynamic_swap';
import { CheckBoxFieldT } from '@/common/types/forms';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormControl } from '@angular/forms';
import { PortalModule } from '@angular/cdk/portal';
import { ApplicationFormUiFkt } from '../etc/ui_fkt';

@Component({
  selector: 'app-application-statuses',
  imports: [DynamicSwapper, UseIDsDir, PortalModule],
  templateUrl: './application-statuses.html',
  styleUrl: './application-statuses.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatuses extends UseDynamicSwapHk {
  public readonly ctrl: InputSignal<FormControl> = input.required();

  public readonly fields: CheckBoxFieldT[] = ApplicationFormUiFkt.fieldsBox();
}

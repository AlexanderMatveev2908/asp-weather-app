import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { UseSwapHk } from '@/core/hooks/swap/use_swap/use_swap';
import { TotpForm } from './swaps/totp_form/totp-form';
import { BkpForm } from './swaps/bkp_form/bkp-form';
import { Observable } from 'rxjs';
import { UseForm2faDir } from './etc/directives/use_form_2fa';
import { Form2faT } from '@/common/types/etc';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-form-2fa',
  imports: [CsrWithTitle, Swapper, TotpForm, BkpForm, UseForm2faDir, UseIDsDir],
  templateUrl: './form-2fa.html',
  styleUrl: './form-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form2fa extends UseSwapHk implements AfterViewInit {
  // ? directives
  public readonly useIDs: UseIDsDir = inject(UseIDsDir);

  // ? props
  public readonly strategy: InputSignal<(data: Form2faT) => Observable<unknown>> = input.required();

  ngAfterViewInit(): void {
    this.useEffect(() => {
      this.focusWhen('totp.0', 'bkp');
    });
  }
}

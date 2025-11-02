import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { Swapper } from '@/common/components/swap/swapper/swapper';
import { UseSwapHk } from '@/core/hooks/swap/use_swap/use_swap';
import { ChangeMailForm } from './swap_forms/change_mail_form/change-mail-form';
import { ChangePwdForm } from './swap_forms/change_pwd_form/change-pwd-form';
import { Setup2fa } from './swap_forms/setup_2fa/setup-2fa';
import { DeleteAccount } from './swap_forms/delete_account/delete-account';
import { SwapItem } from '@/common/components/swap/swap_item/swap-item';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-manage-account',
  imports: [
    CsrWithTitle,
    Swapper,
    SwapItem,
    ChangeMailForm,
    ChangePwdForm,
    Setup2fa,
    DeleteAccount,
    UseIDsDir,
  ],
  templateUrl: './manage-account.html',
  styleUrl: './manage-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class ManageAccount extends UseSwapHk implements OnInit, AfterViewInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);
  private readonly _triggerCalcH: WritableSignal<number> = signal(0);

  public readonly optionalDep: Signal<unknown[]> = computed(() => [this._triggerCalcH()]);
  public readonly triggerCalcH: () => void = () => {
    this._triggerCalcH.set(this._triggerCalcH() + 1);
  };

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/user/manage-account', TokenT.MANAGE_ACC, {
      pushTo: '/user/access-manage-account',
    });
  }

  ngAfterViewInit(): void {
    this.useEffect(() => this.focusWhen('email', 'password'));
  }
}

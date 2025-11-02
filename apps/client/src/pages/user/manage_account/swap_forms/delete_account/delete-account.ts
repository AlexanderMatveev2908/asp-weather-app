import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UsePopHk } from '@/core/hooks/closable/use_pop';
import { PopupStaticPropsT } from '@/layout/popup/etc/types';
import { Popup } from '@/layout/popup/popup';
import { Portal } from '@/layout/portal/portal';
import { UsePortalDir } from '@/core/directives/use_portal/0.use_portal';
import { BtnPopChoicePropsT, PopChoices } from '@/common/components/hoc/pop_choices/pop-choices';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseKitFormUserSvc } from '@/features/user/etc/services/use_kit_form_user';
import { LibApiShape } from '@/core/store/api/etc/lib/shape';
import { Nullable } from '@/common/types/etc';
import { tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseResetStateSvc } from '@/core/services/use_reset_state';

@Component({
  selector: 'app-delete-account',
  imports: [BtnShadow, UseSpanDir, UseIDsDir, Popup, Portal, PopChoices],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePopHk, UseApiTrackerHk],
})
export class DeleteAccount extends UsePortalDir {
  private readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  private readonly useReset: UseResetStateSvc = inject(UseResetStateSvc);
  private readonly useKitUserForm: UseKitFormUserSvc = inject(UseKitFormUserSvc);

  public readonly useKitPop: UsePopHk = inject(UsePopHk);

  private readonly delAcc: () => void = () => {
    const cbcHmacToken: Nullable<string> = this.useKitUserForm.cbcHmacSlice.cbcHmac();

    LibApiShape.throwIfCbcHmacMissing(
      cbcHmacToken,
      this.useApiTracker.track(
        this.useKitUserForm.useKitUser.userApi
          .delAccount({ cbcHmacToken: cbcHmacToken as string })
          .pipe(
            tap((_: ResApiT<void>) => {
              this.useReset.main();

              this.useKitUserForm.useKitNav.pushNotice({
                eventT: 'OK',
                msg: 'Account deleted',
                status: 200,
              });
            })
          )
      )
    ).subscribe();
  };

  public onBtnCLick: () => void = () => {
    this.useKitPop.isPop.set(true);
  };

  // ? popup props
  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'generic_popup',
    closeOnMouseOut: true,
    eventT: 'ERR',
    closePop: this.useKitPop.closePop,
  };

  // ? btn props
  public readonly spanProps: SpanEventPropsT = {
    label: 'Delete',
    Svg: null,
    eventT: 'ERR',
  };

  // ? pop choices props
  public readonly popChoiceA: Signal<Partial<BtnPopChoicePropsT>> = computed(() => ({
    onClick: this.delAcc,
    isPending: this.useApiTracker.isPending(),
  }));
  public readonly popChoiceB: Partial<BtnPopChoicePropsT> = {
    onClick: this.useKitPop.closePop,
    isPending: false,
  };
}

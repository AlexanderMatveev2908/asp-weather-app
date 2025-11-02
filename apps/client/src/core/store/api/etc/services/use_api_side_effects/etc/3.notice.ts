import { NoticeSlice } from '@/features/notice/slice';
import { inject, Injectable } from '@angular/core';
import { UseSideEffectsToastHk } from './2.toast';
import { ErrApiT, ObsOnOkT, ObsResT, OptErrApiT, StatusT } from '../../../types';
import { Nullable } from '@/common/types/etc';
import { catchError, EMPTY, from, switchMap, throwError } from 'rxjs';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';

@Injectable()
export abstract class UseSideEffectsNoticeHk extends UseSideEffectsToastHk {
  // ? svc
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);

  // ? helper
  private readonly defOptErr: OptErrApiT = {
    pushOnErr: false,
    pushOnStatus: [StatusT.FORBIDDEN, StatusT.TOO_MANY_REQUESTS, StatusT.INTERNAL_SERVER_ERROR],
    pushOnCbcHmacErr: true,
  };

  private readonly CBC_HMAC_ERR_MSG: string[] = [
    'cbc_hmac_expired',
    'cbc_hmac_wrong_type',
    'cbc_hmac_not_found',
    'cbc_hmac_invalid',
  ];

  private mergeArgs(opt: Nullable<Partial<OptErrApiT>>): OptErrApiT {
    const options: Partial<OptErrApiT> = {
      pushOnErr: !!opt?.pushOnErr,
      pushOnStatus: [...this.defOptErr.pushOnStatus, ...(opt?.pushOnStatus ?? [])],
      pushOnCbcHmacErr: !!opt?.pushOnCbcHmacErr,
    };
    return options as OptErrApiT;
  }

  private ignoreErr<T>(opt: OptErrApiT, err: ErrApiT<T>): boolean {
    const firstCheck: boolean =
      !opt.pushOnErr && !opt.pushOnStatus?.some((code: number) => code === err?.status);

    const secondCheck: boolean =
      !opt.pushOnCbcHmacErr ||
      this.CBC_HMAC_ERR_MSG.every((msg: string) => !err.error?.msg?.includes(msg));

    return firstCheck && secondCheck;
  }

  // ? main
  protected withNotice<T>(cb: ObsResT<T>, opt: Nullable<Partial<OptErrApiT>>): ObsOnOkT<T> {
    const options: OptErrApiT = this.mergeArgs(opt);

    return cb.pipe(
      catchError((err: ErrApiT<T>) => {
        if (this.ignoreErr(options, err)) return throwError(() => err);

        if (this.cbcHmacSlice.present()) this.cbcHmacSlice.clearCbcHmac({ startTmr: true });

        this.noticeSlice.notice = {
          eventT: 'ERR',
          msg: err?.error?.msg ?? this.DEF_CLIENT_ERR_MSG,
          status: err?.status ?? 0,
        };

        const navigation: Promise<boolean> = this.useNav.replace('/notice', { from: 'err' });

        return from(navigation).pipe(switchMap(() => EMPTY));
      })
    );
  }
}

import { Injectable, Signal } from '@angular/core';
import { getNoticeState } from './reducer/selectors';
import { NoticeStateT, NoticeTmptT } from './reducer/reducer';
import { NoticeActT } from './reducer/actions';
import { Nullable } from '@/common/types/etc';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';

@Injectable({
  providedIn: 'root',
})
export class NoticeSlice extends UseKitSliceSvc {
  public get _noticeState(): Signal<NoticeStateT> {
    return this.store.selectSignal(getNoticeState);
  }

  private set _noticeState(
    arg: Omit<NoticeStateT, 'cb' | 'tmpt'> & { cb?: () => void; tmpt?: NoticeTmptT }
  ) {
    const { cb, tmpt, ...rst } = arg;

    const template: Nullable<NoticeTmptT> = tmpt ?? null;

    this.store.dispatch(
      NoticeActT.SET_NOTICE({
        ...rst,
        tmpt: template,
        cb: typeof cb === 'function' ? cb : null,
      })
    );

    this.useStorage.setItem('notice', { ...rst, tmpt: template });
  }

  public set notice(arg: Omit<NoticeStateT, 'cb' | 'tmpt'>) {
    this._noticeState = arg;
  }

  public set mailNoticeMsg(arg: string) {
    this._noticeState = {
      status: 201,
      eventT: 'OK',
      tmpt: 'mail',
      msg: `We've sent you an email ${arg}. If you don't see it, check your spam folder, it might be partying there 🎉`,
    };
  }
}

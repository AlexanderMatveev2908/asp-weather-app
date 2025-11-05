import { inject, Injectable } from '@angular/core';
import { _UseRouterHk } from './1.use_router';
import { NoticeSlice } from '@/features/notice/slice';
import { NoticeStateT, NoticeTmptT } from '@/features/notice/reducer/reducer';

@Injectable()
export abstract class _UseNavNoticeHk extends _UseRouterHk {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  public pushNotice(
    arg: Omit<NoticeStateT, 'cb' | 'tmpt'> & { cb?: () => void; tmtp?: NoticeTmptT }
  ): void {
    this.noticeSlice.notice = arg;

    void this.replace('/notice', { from: 'err' });
  }
}

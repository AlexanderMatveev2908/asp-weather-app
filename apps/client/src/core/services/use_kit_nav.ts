import { inject, Injectable } from '@angular/core';
import { NoticeSlice } from '../../features/notice/slice';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { NoticeStateT } from '../../features/notice/reducer/reducer';
import { NavFromT } from '@/core/services/use_nav/etc/0.use_path';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';

@Injectable({
  providedIn: 'root',
})
export class UseKitNav {
  public readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  public readonly useNav: UseNavSvc = inject(UseNavSvc);

  private push(eventT: AppEventT): void {
    const from: NavFromT = eventT === 'OK' ? 'ok' : 'err';
    void this.useNav.replace('/notice', { from });
  }

  public pushNotice(arg: Omit<NoticeStateT, 'cb' | 'tmpt'>): void {
    this.noticeSlice.notice = arg;
    this.push(arg.eventT);
  }

  public pushMailNotice(arg: string): void {
    this.noticeSlice.mailNoticeMsg = arg;
    this.push('OK');
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { NoticeSlice } from '@/features/notice/slice';
import { NoticeWithoutCb } from '@/features/notice/reducer/reducer';
import { UseStorageSvc } from '@/core/services/use_storage';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { Nullable } from '@/common/types/etc';
import { NoticeWrapperPropsT } from '@/common/components/hoc/page/csr_notice_wrapper/etc/types';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';

@Component({
  selector: 'app-notice',
  imports: [CsrNoticeWrapper, CsrNoticeWrapper],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice extends UseRouteMngHk implements OnInit {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  public readonly wrapEventsProps: Signal<NoticeWrapperPropsT> = computed(() => {
    const { cb: _cb, ...rst } = this.noticeSlice._noticeState();

    return rst;
  });

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      const stored: Nullable<NoticeWithoutCb> = this.useStorage.getItem('notice');

      if (stored) this.noticeSlice.notice = stored;
    });

    this.pushOutIfNotFrom('/notice');
  }
}

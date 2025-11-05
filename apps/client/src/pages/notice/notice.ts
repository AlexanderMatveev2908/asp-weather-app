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
import { AppEventT, Nullable } from '@/common/types/etc';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { UseStorageSvc } from '@/core/services/use_storage/use_storage';
import { NoticeWrapperPropsT } from '@/common/components/hoc/page/csr_notice_wrapper/etc/types';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { UseNavSvc } from '@/core/services/use_nav/index';

@Component({
  selector: 'app-notice',
  imports: [CsrNoticeWrapper, UseMetaEventDir],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  public readonly wrapEventsProps: Signal<NoticeWrapperPropsT & { eventT: AppEventT }> = computed(
    () => {
      const { cb: _cb, ...rst } = this.noticeSlice._noticeState();

      return rst;
    }
  );

  ngOnInit(): void {
    this.useNav.usePlatform.onClient(() => {
      const stored: Nullable<NoticeWithoutCb> = this.useStorage.getItem('notice');

      if (stored) this.noticeSlice.notice = stored;
    });

    this.useNav.pushOutIfNotFrom('/notice');
  }
}

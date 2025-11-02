import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';
import { NoticeWrapperPropsT } from '@/common/components/hoc/page/csr_notice_wrapper/etc/types';
import { SpanLinkPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-not-found',
  imports: [CsrNoticeWrapper, LinkShadow, CsrNoticeWrapper, UseSpanDir, UseIDsDir],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  private readonly eventT: AppEventT = 'INFO';

  // ? notice props
  public readonly wrapEventsProps: NoticeWrapperPropsT = {
    tmpt: null,
    eventT: this.eventT,
    msg: 'The treasure chest is empty. Someone got here before you... 💰',
    status: 404,
  };
  // ? link under notice
  public readonly linkProps: Omit<SpanLinkPropsT, 'id'> = {
    label: 'Home',
    eventT: this.eventT,
    Svg: SvgStrokeHome,
    path: '/',
  };
}

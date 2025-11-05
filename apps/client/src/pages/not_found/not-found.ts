import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { UseSpanDir } from '@/core/directives/use_span';
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { NoticeWrapperPropsT } from '@/common/components/hoc/page/csr_notice_wrapper/etc/types';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';

@Component({
  selector: 'app-not-found',
  imports: [CsrNoticeWrapper, LinkShadow, CsrNoticeWrapper, UseSpanDir, UseMetaEventDir],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  // ? notice props
  public readonly wrapEventsProps: NoticeWrapperPropsT = {
    msg: 'The treasure chest is empty. Someone got here before you... 💰',
    status: 404,
  };
  // ? link under notice
  public readonly spanProps: SpanPropsT = {
    label: 'Home',
    Svg: SvgStrokeHome,
  };
}

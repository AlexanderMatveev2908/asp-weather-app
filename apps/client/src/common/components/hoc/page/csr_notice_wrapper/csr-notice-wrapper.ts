import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { ElDomT, RefTemplateT } from '@/common/types/etc';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { NoticeAnimations } from './etc/animations';
import { NoticeWrapperPropsT } from './etc/types';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { envVars } from '@/environments/environment';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Component({
  selector: 'app-csr-notice-wrapper',
  imports: [
    NgComponentOutlet,
    NgClass,
    PageWrapper,
    NgTemplateOutlet,
    PageWrapper,
    LinkShadow,
    UseSpanDir,
    UseIDsDir,
  ],
  templateUrl: './csr-notice-wrapper.html',
  styleUrl: './csr-notice-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrNoticeWrapper extends UseInjCtxHk implements AfterViewInit {
  // ? personal props
  public readonly props: InputSignal<NoticeWrapperPropsT> = input.required();

  // ? mail props link
  public readonly linkProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Open Mail',
    Svg: null,
  };
  public readonly pathProps: string = `https://mail.google.com/mail/u/0/#search/from%3A${envVars.smptFrom.replaceAll(
    '@',
    '%40'
  )}`;

  // ? derived
  public metaEvent: Signal<AppEventMetaT> = computed(() => MetaEventDOM.byT(this.props().eventT));

  // ? tmpl
  @ViewChild('contentRef', { read: TemplateRef })
  public contentRef: RefTemplateT;

  // ? projected
  @ContentChild('header', { read: TemplateRef }) headerTpl: RefTemplateT;
  @ContentChild('footer', { read: TemplateRef }) footerTpl: RefTemplateT;

  // ? animations
  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    this.useDOM(() => {
      const svgDOM: ElDomT = document.getElementById('csr_notice__svg_wrap');
      const contentDOM: ElDomT = document.getElementById('csr_notice__content');
      const spanStatusDOM: ElDomT = document.getElementById('csr_notice__span_status');
      const spanMsgDOM: ElDomT = document.getElementById('csr_notice__span_msg');

      NoticeAnimations.main({
        contentDOM,
        spanMsgDOM,
        spanStatusDOM,
        svgDOM,
      });
    });
  }
}

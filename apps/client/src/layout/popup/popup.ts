import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  HostListener,
  inject,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PopupStaticPropsT } from './etc/types';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { AnimationsPopSvc } from './etc/animations';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { ElDomT, Nullable, RefDomT, RefTemplateT } from '@/common/types/etc';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-popup',
  imports: [BlackBg, NgClass, CloseBtn, NgTemplateOutlet, UseIDsDir],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup extends UseInjCtxHk implements AfterViewInit {
  // ? directives
  private readonly useIDs: UseIDsDir = inject(UseIDsDir);

  // ? svc
  private readonly animationsPop: AnimationsPopSvc = inject(AnimationsPopSvc);

  // ? personal props
  public readonly staticProps: InputSignal<PopupStaticPropsT> = input.required();
  public readonly isPop: InputSignal<Nullable<boolean>> = input.required();
  public readonly allowClose: InputSignal<boolean> = input(true);

  // ? close btn props
  public readonly closeClick: () => void = () => {
    if (!this.allowClose()) return;
    this.staticProps().closePop();
  };

  // ? black bg overlay props
  public blackBgProps: Signal<BlackBgPropsT> = computed(() => ({
    zBg: `z__${this.staticProps().cls}__bg`,
    isDark: this.isPop(),
  }));

  // ? derived
  public readonly eventMeta: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.staticProps().eventT)
  );
  public cssZ: Signal<string> = computed(() => `z__${this.staticProps().cls}`);
  public readonly testID: Signal<string> = computed(() => `${this.useIDs.testId()}__popup`);

  // ? children
  @ViewChild('popup') popup: RefDomT;
  @ContentChild('popContent', { read: TemplateRef }) popContentTpl: RefTemplateT;

  // ? listeners
  ngAfterViewInit(): void {
    this.useEffect(() => {
      const isPop = this.isPop();
      const popDOM: ElDomT = this.popup?.nativeElement;

      if (!popDOM) return;

      if (isPop) this.animationsPop.popIn(popDOM);
      else if (!isPop && isPop !== null) this.animationsPop.popOut(popDOM);
    });
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    const popDOM: ElDomT = this.popup?.nativeElement;
    const target: Nullable<HTMLElement> = e.target as Nullable<HTMLElement>;
    if (!popDOM || !target) return;

    if (this.isPop() && !popDOM.contains(target) && this.allowClose())
      this.staticProps().closePop();
  }
}

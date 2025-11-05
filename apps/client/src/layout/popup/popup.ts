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
import { BlackBg } from '@/layout/black_bg/black-bg';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AnimationsPopSvc } from './etc/animations';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { Nullable } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibMetaEvent } from '@/core/lib/css/events';
import { ElDomT, RefDomT, RefTemplateT } from '@/common/types/dom';

@Component({
  selector: 'app-popup',
  imports: [BlackBg, NgClass, CloseBtn, NgTemplateOutlet],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup extends UseInjCtxHk implements AfterViewInit {
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
  public cssBlackBg: Signal<string> = computed(
    () => `${this.isPop() ? 'fixed' : 'hidden'} ${this.cssZ()}__bg`
  );

  // ? derived
  public readonly cssVarEvent: Signal<string> = computed(() =>
    LibMetaEvent.cssVarByT(this.staticProps().eventT)
  );
  public cssZ: Signal<string> = computed(() => `z__${this.staticProps().cls}`);

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
    const target: Nullable<Node> = e.target as Nullable<Node>;
    if (!popDOM || !target) return;

    if (this.isPop() && !popDOM.contains(target) && this.allowClose())
      this.staticProps().closePop();
  }
}

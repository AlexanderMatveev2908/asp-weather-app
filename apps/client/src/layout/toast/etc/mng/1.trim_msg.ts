import {
  AfterViewInit,
  Directive,
  effect,
  EffectRef,
  HostListener,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ToastRoot } from './0.root_fields';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { TxtDom } from '@/core/lib/dom/txt';

@Directive()
export abstract class ToastTrimMsg extends ToastRoot implements AfterViewInit {
  // ? local state
  public readonly trimmedMsg: WritableSignal<string> = signal('');

  // ? children
  @ViewChild('msgContainer') msgContainer: RefDomT;

  // ? private helper
  private setCutMsg(): void {
    const msg: string = this.toastState().msg;
    const MAX_LINES = 3;

    const elDOM: ElDomT = this.msgContainer?.nativeElement;
    if (!elDOM) return;

    this.trimmedMsg.set(TxtDom.binaryTrim(msg, { el: elDOM, maxLines: MAX_LINES }));
  }

  // ? listeners
  ngAfterViewInit(): void {
    this.setCutMsg();
  }

  private readonly trimEffect: EffectRef = effect(() => {
    this.setCutMsg();
  });

  @HostListener('window:resize')
  onResize(): void {
    this.setCutMsg();
  }
}

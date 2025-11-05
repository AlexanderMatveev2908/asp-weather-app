import { SpinPageSsr } from '@/common/components/spins/spin_page_ssr/spin-page-ssr';
import { RefTemplateT } from '@/common/types/dom';
import { AppEventT } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  InputSignal,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';

@Component({
  selector: 'app-page-wrapper',
  imports: [SpinPageSsr, NgTemplateOutlet, UseMetaEventDir],
  templateUrl: './page-wrapper.html',
  styleUrl: './page-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapper extends UseInjCtxHk implements AfterViewInit {
  // ? local state
  public readonly isHydrated: WritableSignal<boolean> = signal(false);

  // ? personal props
  public readonly waitClient: InputSignal<boolean> = input.required();
  public readonly isPending: InputSignal<boolean> = input(false);
  public readonly minH: InputSignal<string> = input('min-h-screen');
  public readonly eventT: InputSignal<AppEventT> = input<AppEventT>('NONE');

  // ? children
  @ContentChild('contentRef', { read: TemplateRef })
  public contentRef: RefTemplateT;

  // ? derived
  public readonly isServer: boolean = this.usePlatform.isServer;

  // ? ng lifecycle
  ngAfterViewInit(): void {
    this.usePlatform.onClient(() => {
      this.isHydrated.set(true);
    });
  }
}

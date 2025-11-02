import { computed, Directive, Signal } from '@angular/core';
import { PageCounterBlockChangeKeyT, PageCounterUiFkt } from '../ui_fkt';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UsePageCounterMethodsDir } from './1.methods';
import { BtnListenersT, BtnStatePropsT } from '@/common/types/etc';
import { PageT } from '../types';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';

@Directive()
export abstract class UsePageCounterPropsChildrenDir<T> extends UsePageCounterMethodsDir<T> {
  // ? derived
  public readonly pagesUi: Signal<PageT[]> = computed(() => {
    const len: number = this.pagesPerBlock();
    const start: number = len * this.usePagination().block();

    const pagesLessOverflow: PageT[] = Array.from({ length: len }, (_: undefined, i: number) =>
      RootUiFkt.withID({
        label: start + 1 + i + '',
        val: start + i,
      })
    ).filter((p: PageT) => p.val < (this.useSearchbarPaginationPropsDir.pages() ?? 0));

    return pagesLessOverflow;
  });

  // ? helpers
  public twdPage(p: PageT): string {
    return p.val === this.usePagination().page() ? 'bg-gray-300 text-neutral-950 scale-[1.25]' : '';
  }

  // ? btns
  public readonly btnsBlockChange: Record<PageCounterBlockChangeKeyT, SpanEventPropsT> =
    PageCounterUiFkt.btns;

  public readonly listenersPrev: BtnListenersT = {
    onClick: () => this.changeBlock('-'),
  };
  public readonly prevState: Signal<BtnStatePropsT> = computed(() => ({
    isPending: false,
    isDisabled: this.usePagination().block() <= 0,
  }));

  public readonly listenersNext: BtnListenersT = {
    onClick: () => this.changeBlock('+'),
  };
  public readonly nextState: Signal<BtnStatePropsT> = computed(() => ({
    isPending: false,
    isDisabled: this.usePagination().block() >= this.maxBlockAvailable(),
  }));
}

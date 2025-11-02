import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';
import { SvgFillUp } from '../../svgs/fill/up/up';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ElDomT, RefDomT } from '@/common/types/etc';
import { DropStaticTwdCss, RecTwdClsDropT } from './etc';
import { UseDropDir } from '@/core/directives/use_drop';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-drop-static',
  imports: [Span, SvgFillUp, NgClass, NgTemplateOutlet],
  templateUrl: './drop-static.html',
  styleUrl: './drop-static.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropStatic extends UseDropDir implements AfterViewInit, AfterContentChecked {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? app-span component props
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: 'xl',
  };
  // ? personal props
  // ? derived state by children h
  private readonly wrapperH: WritableSignal<number> = signal(0);

  // ? children & projected
  @ViewChild('wrapContent') wrapContent: RefDomT;

  // ? style
  public readonly twd: Signal<RecTwdClsDropT> = computed(() => {
    const isDropOpen: boolean = this.isOpen();
    return DropStaticTwdCss.byState(isDropOpen);
  });

  public readonly maxH: Signal<string> = computed(() =>
    this.isOpen() ? `${this.wrapperH()}px` : '0px'
  );

  // ? listeners & ng lifecycle

  private patchH(): void {
    const wrapContentDOM: ElDomT = this.wrapContent?.nativeElement;
    if (!wrapContentDOM) return;

    this.wrapperH.set(wrapContentDOM.scrollHeight);
  }

  ngAfterViewInit(): void {
    this.patchH();
  }

  ngAfterContentChecked(): void {
    this.patchH();
  }
}

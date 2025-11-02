/* eslint-disable no-magic-numbers */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { UseBarsHk } from '../../hooks/use_bars';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { NgClass } from '@angular/common';
import { ElDomT, RefDomT } from '@/common/types/etc';
import { SearchBarFilterBarHeader } from './header/search-bar-filter-bar-header';
import { SearchBarFilterBarFooter } from './footer/search-bar-filter-bar-footer';
import { UseFiltersHk } from '../../hooks/use_filters';
import { SearchBarFilterT } from '../../ui_fkt';
import { SearchBarFilterBarLabels } from './labels/search-bar-filter-bar-labels';
import { SearchBarFilterBarVals } from './vals/search-bar-filter-bar-vals';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar-filter-bar',
  imports: [
    BlackBg,
    NgClass,
    SearchBarFilterBarHeader,
    SearchBarFilterBarFooter,
    SearchBarFilterBarLabels,
    SearchBarFilterBarVals,
  ],
  templateUrl: './search-bar-filter-bar.html',
  styleUrl: './search-bar-filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBar implements OnInit {
  // ? props
  public readonly useBars: InputSignal<UseBarsHk> = input.required();
  public readonly useFilters: InputSignal<UseFiltersHk> = input.required();
  public readonly filtersAvailable: InputSignal<() => SearchBarFilterT[]> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly onErase: InputSignal<() => void> = input.required();

  // ? derived
  public readonly twd: Signal<string> = computed(() =>
    this.useBars().isFilterBar() ? '-translate-y-full opacity-100' : 'translate-y-0 opacity-0'
  );

  // ? statics
  public readonly HEADER_H: number = 60;
  public readonly FOOTER_H: number = 80;
  public readonly HEIGHT_LESS: string = `${this.HEADER_H + this.FOOTER_H}px`;

  // ? children
  @ViewChild('barRef')
  public barRef: RefDomT;

  // ? black bg props
  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(
    (): BlackBgPropsT => ({
      isDark: this.useBars().isFilterBar(),
      zBg: 'z__filter_bar__bg',
    })
  );

  // ? listeners
  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const bar: ElDomT = this.barRef?.nativeElement;
    const target: Node = e.target as Node;

    if ([bar, target].some((el: ElDomT | Node) => !el)) return;

    if (this.useBars().isFilterBar() && !bar!.contains(target))
      this.useBars().isFilterBar.set(false);
  }

  ngOnInit(): void {
    this.useFilters().currFilter.set(this.filtersAvailable()()[0].field);
  }
}

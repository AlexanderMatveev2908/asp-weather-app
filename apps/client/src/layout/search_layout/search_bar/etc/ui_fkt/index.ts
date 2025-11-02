import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillErase } from '@/common/components/svgs/fill/erase/erase';
import { SvgFillSort } from '@/common/components/svgs/fill/sort/sort';
import { SvgStrokeFilter } from '@/common/components/svgs/stroke/filter/filter';
import { SvgStrokeSearch } from '@/common/components/svgs/stroke/search/search';
import { CheckBoxFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';
import { Type } from '@angular/core';
import { SortValT } from '../paperwork';
import { LibPrs } from '@/core/lib/data_structure/prs';

export interface SearchBarFilterT {
  id: string;
  field: string;
  label: string;
  Svg: Type<unknown>;
  fields: CheckBoxFieldT[];
}

export interface SearchBarSorterT {
  id: string;
  field: string;
  label: string;
  Svg: Type<unknown>;
  fields: CheckBoxFieldT[];
}

export type SearchBarBtnKeyT = 'sortBtn' | 'filterBtn' | 'searchBtn' | 'eraseBtn';

export class SearchBarUiFkt extends FormFieldsUiFkt {
  public static readonly sortBtn: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Sort',
    Svg: SvgFillSort,
  };
  public static readonly filterBtn: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Filter',
    Svg: SvgStrokeFilter,
  };
  public static readonly searchBtn: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Search',
    Svg: SvgStrokeSearch,
  };
  public static readonly eraseBtn: SpanEventPropsT = {
    eventT: 'ERR',
    label: 'Erase',
    Svg: SvgFillErase,
  };

  public static readonly btns: Record<SearchBarBtnKeyT, SpanEventPropsT> = {
    searchBtn: this.searchBtn,
    eraseBtn: this.eraseBtn,
    sortBtn: this.sortBtn,
    filterBtn: this.filterBtn,
  };

  private static readonly sortDataFromIdx: (idx: number) => { label: string; val: string } = (
    idx: number
  ) => {
    const val: SortValT = !idx ? SortValT.ASC : SortValT.DESC;
    const label: string = LibPrs.titleCase(val);

    return {
      val,
      label,
    };
  };

  private static readonly withSortersFields: (
    s: Omit<SearchBarSorterT, 'fields' | 'id'>
  ) => SearchBarSorterT = (s: Omit<SearchBarSorterT, 'fields' | 'id'>) =>
    this.withID({
      ...s,
      fields: Array.from({ length: 2 }, (_: undefined, i: number) =>
        this.checkBoxFieldOf({ name: s.field, ...this.sortDataFromIdx(i), type: 'radio' })
      ),
    });

  public static readonly arrWithSorters: (
    s: Omit<SearchBarSorterT, 'fields' | 'id'>[]
  ) => SearchBarSorterT[] = (s: Omit<SearchBarSorterT, 'fields' | 'id'>[]) =>
    s.map((el: Omit<SearchBarSorterT, 'fields' | 'id'>) => this.withSortersFields(el));
}

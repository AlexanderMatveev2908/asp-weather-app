import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SearchBarBtnShape } from '../../components/btn_shape/search-bar-btn-shape';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseBarsHk } from '../../hooks/use_bars';
import { SearchBarBtnKeyT, SearchBarUiFkt } from '../../ui_fkt';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-search-bar-btns-row',
  imports: [SearchBarBtnShape, UseSpanDir, UseIDsDir],
  templateUrl: './search-bar-btns-row.html',
  styleUrl: './search-bar-btns-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarBtnsRow {
  // ? personal props
  public readonly onErase: InputSignal<() => void> = input.required();
  public readonly useBars: InputSignal<UseBarsHk> = input.required();

  public readonly openFilterBar: () => void = () => {
    this.useBars().isFilterBar.set(true);
  };

  public readonly openSortBar: () => void = () => this.useBars().isSortBar.set(true);

  // ? props btns
  public readonly btns: Record<SearchBarBtnKeyT, SpanEventPropsT> = SearchBarUiFkt.btns;
}

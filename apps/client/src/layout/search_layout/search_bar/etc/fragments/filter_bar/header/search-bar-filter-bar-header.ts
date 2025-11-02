import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { UseBarsHk } from '../../../hooks/use_bars';
import { CloseBtn } from '@/common/components/btns/close_btn/close-btn';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-search-bar-filter-bar-header',
  imports: [CloseBtn, UseIDsDir],
  templateUrl: './search-bar-filter-bar-header.html',
  styleUrl: './search-bar-filter-bar-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFilterBarHeader {
  public readonly useBars: InputSignal<UseBarsHk> = input.required();

  public readonly closeClick: () => void = () => this.useBars().isFilterBar.set(false);
}

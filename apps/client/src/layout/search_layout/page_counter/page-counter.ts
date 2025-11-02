import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseSpanDir } from '@/core/directives/use_span';
import { NgClass } from '@angular/common';
import { UsePageCounterPropsChildrenDir } from './etc/sub/2.props_children';
import { RefreshPaginationReturnT } from './etc/sub/1.methods';

@Component({
  selector: 'app-page-counter',
  imports: [BtnShadow, UseIDsDir, UseSpanDir, NgClass],
  templateUrl: './page-counter.html',
  styleUrl: './page-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCounter<T> extends UsePageCounterPropsChildrenDir<T> implements OnInit {
  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      this.refreshPagesPerBlockLimit();
    });

    this.ifPageBiggerThanAvailable();
    this.ifBlockBiggerThanAvailable();
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.refreshPagesPerBlockLimit();

    const result: RefreshPaginationReturnT = this.refreshItemsPerPage();

    if (!result.wasDifferent) return;

    this.useSearchBarStrategyProps.triggerStrategy()({
      dataForm: null,
      dataPagination: { limit: result.newLimitItemsPerPage },
    });
  }
}

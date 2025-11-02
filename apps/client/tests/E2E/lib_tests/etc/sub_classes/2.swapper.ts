import { Nullable } from '@/common/types/etc';
import { LibFormTests } from './1.form';
import { ErrApp } from '@/core/lib/err';
import { Locator } from '@playwright/test';

export type WhereSwapT = 'prev' | 'next';

export abstract class LibSwapperTests extends LibFormTests {
  private swapperID: Nullable<string> = null;

  private extractBtnID(where: WhereSwapT): string {
    if (!this.swapperID) throw new ErrApp('expected swapperID to be present');
    return `${this.swapperID}_${where === 'prev' ? 'prev_swap' : 'next_swap'}`;
  }

  public async getSwapper(): Promise<Locator> {
    if (!this.swapperID) throw new ErrApp('expected swapperID to be present');
    return await this.byIdInPage(this.swapperID);
  }

  public setSwapperID(id: string): void {
    this.swapperID = id + '__swapper';
  }

  protected getSwapperID(): Nullable<string> {
    return this.swapperID;
  }

  public async getSwapBtn(where: WhereSwapT): Promise<Locator> {
    const swapper: Locator = await this.getSwapper();
    const id: string = this.extractBtnID(where);
    const btn: Locator = await this.byIdIn(swapper, id);

    return btn;
  }

  private async swap(where: WhereSwapT): Promise<Locator> {
    const btn: Locator = await this.getSwapBtn(where);

    await btn.click();

    const timeAnm: number = 500;
    await this.timer(timeAnm);

    return btn;
  }

  public async nextSwap(): Promise<Locator> {
    return this.swap('next');
  }

  public async prevSwap(): Promise<Locator> {
    return this.swap('prev');
  }
}

import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { Locator } from '@playwright/test';
import { LibSwapperTests } from './2.swapper';

type PopChoiceT = 'a' | 'b';

export abstract class LibPopupTests extends LibSwapperTests {
  private popupID: Nullable<string> = null;

  public setPopID(id: string): void {
    this.popupID = `${id}__popup`;
  }

  private extractPopBtnID(choice: PopChoiceT): string {
    if (!this.popupID) throw new ErrApp('expected popupID to be present');
    return `${this.popupID}__choice_${choice}`;
  }

  public async getPop(): Promise<Locator> {
    if (!this.popupID) throw new ErrApp('expected popupID to be present');
    const pop: Locator = await this.byIdInPage(this.popupID);

    return pop;
  }

  private async popChoice(choice: PopChoiceT): Promise<Locator> {
    const pop: Locator = await this.getPop();

    const btnID: string = await this.extractPopBtnID(choice);
    const btn: Locator = await this.byIdIn(pop, btnID);

    await btn.click();

    return btn;
  }

  public async popChoseA(): Promise<Locator> {
    return this.popChoice('a');
  }

  public async popChoseB(): Promise<Locator> {
    return this.popChoice('b');
  }

  public async openPop(): Promise<void> {
    if (!this.popupID) throw new ErrApp('expected popupID to be present');
    await this.clickInPage(`${this.popupID}__open`);
  }
}

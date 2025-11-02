import { expect, Locator } from '@playwright/test';
import { LibApplicationsTests } from './8.applications';
import { Nullable } from '@/common/types/etc';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';

export abstract class LibSearchTests extends LibApplicationsTests {
  public async gridSearchWrapper(): Promise<Locator> {
    const wrapper: Locator = await this.byIdInPage('search__content');

    return wrapper;
  }

  private async nHits(): Promise<Nullable<number>> {
    const hitsCounter: Locator = await this.byIdInPage('hits_counter');

    const msgSpan: Locator = await this.byIdIn(hitsCounter, 'hits_counter__val');
    const msg: Nullable<string> = await msgSpan.textContent();

    return LibShapeCheck.isStr(msg) ? parseInt(msg!, 10) : null;
  }

  public async expectHitsToBe(v: number): Promise<void> {
    const valHits: Nullable<number> = await this.nHits();

    await expect(valHits).not.toBeNull();
    await expect(valHits).toBe(v);
  }

  public async addAllTxtInputs(): Promise<void> {
    const btnDropTxtInputs: Locator = await this.byIdInPage('toggle_drop_txt_inputs');
    await btnDropTxtInputs.click();

    const fieldToAddToSearchBar: Locator = await this.byIdInPage('drop_txt_inputs__position_name');

    await fieldToAddToSearchBar.click();
  }
}

import { expect, Locator } from '@playwright/test';
import { Nullable } from '@/common/types/etc';
import { LibLog } from '@/core/lib/dev/log';
import { LibPopupTests } from './3.popup';
import { LibCss } from '@/core/lib/data_structure/css';

export type ToastExpT = 'ok' | 'err';

export abstract class LibToastTests extends LibPopupTests {
  private async getToast(): Promise<Locator> {
    const toast: Locator = await this.byIdInPage('toast');
    return toast;
  }

  private async isOfType(successType: boolean): Promise<void> {
    const toast: Locator = await this.getToast();
    const rgb: string = LibCss.hexToRgb(successType ? LibCss.twdGreen600 : LibCss.twdRed600);
    await expect(toast).toHaveCSS('border-color', rgb);

    const txt: Nullable<string> = await toast.evaluate((parent: HTMLElement) => {
      const row = parent.querySelector('.status_row__status');
      return row?.querySelector('span')?.textContent ?? null;
    });

    await expect(txt).toBeTruthy();

    const reg: RegExp = successType ? /^20[01]$/ : /^[45]\d{2}$/;
    await expect(txt).toMatch(reg);
  }

  public async isToastOk(): Promise<void> {
    await this.isOfType(true);
  }

  public async isToastErr(): Promise<void> {
    await this.isOfType(false);
  }

  public async closeToastIfPresent(): Promise<void> {
    try {
      const toast: Locator = await this.page.getByTestId('toast');
      const closeBtn: Locator = await toast.getByTestId('toast__close');

      await expect(closeBtn).toBeInViewport({ timeout: 1000 });

      await closeBtn.click();
    } catch {
      LibLog.log('ignore if missing');
    }
  }
}

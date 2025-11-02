import { Browser, BrowserContext, Locator, Page } from '@playwright/test';
import { GetTokensArgT } from './etc/sub_classes/5.api';
import { PreTestResT, TkResT } from './etc/types';
import { LibSearchTests } from './etc/sub_classes/9.search';

export class LibTests extends LibSearchTests {
  public static async fromBrowser(browser: Browser): Promise<LibTests> {
    const newCtx: BrowserContext = await browser.newContext();
    const page: Page = await newCtx.newPage();

    return new LibTests(page);
  }

  public static async with2faUser(
    brw: Browser,
    opt?: Pick<GetTokensArgT, 'tokenT'>
  ): Promise<PreTestResT<void>> {
    const _lib: LibTests = await this.fromBrowser(brw);
    const res: TkResT = await _lib.getTk({ use2FA: true, tokenT: opt?.tokenT });

    const lib: LibTests = await this.fromBrowser(brw);

    return {
      res,
      lib,
    };
  }

  public static async withAccessAccount(
    brw: Browser,
    opt?: Pick<GetTokensArgT, 'tokenT' | 'verify'>
  ): Promise<PreTestResT<{ swapper: Locator }>> {
    const lib: LibTests = await this.fromBrowser(brw);
    const res: TkResT = await lib.getTk({ tokenT: opt?.tokenT, verify: !!opt?.verify });
    const swapper: Locator = await lib.getAccessAccount(res.plainPwd);

    return {
      lib,
      swapper,
      res,
    };
  }

  public static async withAccessAccTotp(brw: Browser): Promise<PreTestResT<{ swapper: Locator }>> {
    const lib: LibTests = await this.fromBrowser(brw);
    const res: TkResT = await lib.getTk({ use2FA: true });

    const swapper: Locator = await lib.getAccessAccountTotp({
      pwd: res.plainPwd,
      totpSecret: res.totpSecret!,
    });

    return {
      lib,
      res,
      swapper,
    };
  }

  public static async withAccessAccBkp(brw: Browser): Promise<PreTestResT<{ swapper: Locator }>> {
    const lib: LibTests = await this.fromBrowser(brw);
    const res: TkResT = await lib.getTk({ use2FA: true });

    const swapper: Locator = await lib.getAccessAccountBkp({
      pwd: res.plainPwd,
      bkpCodes: res.bkpCodes!,
    });

    return {
      lib,
      res,
      swapper,
    };
  }
}

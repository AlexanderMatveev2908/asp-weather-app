import test, { Browser, Locator } from '@playwright/test';
import { preReadApplications } from './pre';
import { ApplicationStatusT, ApplicationT } from '@/features/applications/etc/types';
import { Nullable } from '@/common/types/etc';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, applications } = await preReadApplications(browser);

  lib.setFormID('search_bar_form');

  const statuses: ApplicationStatusT[] = Object.values(ApplicationStatusT);

  let prevToRemove: Nullable<ApplicationStatusT> = null;

  for (const s of statuses) {
    const btnOpenFilterBar: Locator = await lib.byIdInPage('open_filter_bar');
    await btnOpenFilterBar.click();

    const filterBar: Locator = await lib.byIdInPage('filter_bar');

    if (prevToRemove) await lib.toggleBox('status', prevToRemove);
    await lib.toggleBox('status', s);
    prevToRemove = s;

    const closeBtn: Locator = await lib.byIdIn(filterBar, 'close_filter_bar');
    await closeBtn.click();

    await lib.timer();

    const nHitsExpected: number = applications.filter(
      (item: ApplicationT) => item.status === s
    ).length;

    await lib.expectHitsToBe(nHitsExpected);
  }
});

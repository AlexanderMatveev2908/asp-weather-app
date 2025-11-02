import { Nullable } from '@/common/types/etc';
import test, { Browser, expect, Locator } from '@playwright/test';
import { preReadApplications } from './pre';

test('ok', async ({ browser }: { browser: Browser }) => {
  const { lib, applications, gridWrapper } = await preReadApplications(browser);

  await lib.addAllTxtInputs();

  for (const a of applications) {
    await lib.fillByNameWith({
      field: 'companyName',
      val: a.companyName,
    });
    await lib.fillByNameWith({
      field: 'positionName',
      val: a.positionName,
    });

    const itemDOM: Locator = await lib.byIdIn(gridWrapper, `application_item__${a.id}`);
    const statusWrapDOM: Locator = await lib.byIdIn(itemDOM, 'status_wrap');
    const labelSpan: Locator = await lib.byIdIn(statusWrapDOM, 'span_label');
    const status: Nullable<string> = await labelSpan.textContent();
    await expect(status).toBe(a.status);
  }
});

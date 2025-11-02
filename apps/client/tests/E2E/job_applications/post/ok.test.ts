import { ApplicationFormT } from '@/features/applications/etc/forms/job_application/etc/paperwork/form_mng';
import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TestPayload } from 'tests/E2E/lib_tests/etc/payloads';
import { DataFieldT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);
  await lib.getTk({ verify: true });

  await lib.nav('/job-applications/post');

  lib.setFormID('post_application');
  const form: Locator = await lib.getForm();

  const payload: ApplicationFormT = TestPayload.application();

  const txtInputs: DataFieldT[] = [
    {
      field: 'company_name',
      val: payload.companyName,
    },
    {
      field: 'position_name',
      val: payload.positionName,
    },
    {
      field: 'notes',
      val: payload.notes!,
    },
  ];

  await lib.fillFor(form, txtInputs);

  const dateInput: Locator = await lib.byIdIn(form, 'applied_at');
  await dateInput.fill(payload.appliedAt);

  await lib.toggleBox('status', payload.status!);

  await lib.submit();
  await lib.waitPushTo('/job-applications');
});

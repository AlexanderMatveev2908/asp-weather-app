import { ApplicationFormT } from '@/features/applications/etc/forms/job_application/etc/paperwork/form_mng';
import { ApplicationT } from '@/features/applications/etc/types';
import test, { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { TestPayload } from 'tests/E2E/lib_tests/etc/payloads';
import { DataFieldT, TkResT } from 'tests/E2E/lib_tests/etc/types';

test('ok', async ({ browser }: { browser: Browser }) => {
  const lib: LibTests = await LibTests.fromBrowser(browser);

  const resTk: TkResT = await lib.getTk({ verify: true });

  const newApplication: ApplicationT = await lib.postApplication(resTk.accessToken);

  await lib.nav(`/job-applications/put/${newApplication.id}`);

  const payloadUpdate: ApplicationFormT = TestPayload.application();

  lib.setFormID('put_application');

  const form: Locator = await lib.getForm();

  const inputData: DataFieldT[] = [
    {
      field: 'company_name',
      val: payloadUpdate.companyName,
    },
    {
      field: 'position_name',
      val: payloadUpdate.positionName,
    },
    {
      field: 'notes',
      val: payloadUpdate.notes!,
    },
    {
      field: 'applied_at',
      val: payloadUpdate.appliedAt,
    },
  ];

  await lib.fillFor(form, inputData);

  await lib.toggleBox('status', payloadUpdate.status!);

  await lib.submit();

  await lib.waitPushTo('/job-applications');
  await lib.isToastOk();
});

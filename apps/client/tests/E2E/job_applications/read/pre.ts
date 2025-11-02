import { ApplicationT } from '@/features/applications/etc/types';
import { Browser, Locator } from '@playwright/test';
import { LibTests } from 'tests/E2E/lib_tests';
import { PreTestResT, TkResT } from 'tests/E2E/lib_tests/etc/types';

export const preReadApplications = async (
  brw: Browser
): Promise<
  PreTestResT<{
    gridWrapper: Locator;
    applications: ApplicationT[];
  }>
> => {
  const lib: LibTests = await LibTests.fromBrowser(brw);
  const res: TkResT = await lib.getTk({ verify: true });

  const applications: ApplicationT[] = [];

  const nApplications: number = 5;
  for (let i = 0; i < nApplications; i++) {
    const newApplication: ApplicationT = await lib.postApplication(res.accessToken);
    applications.push(newApplication);
  }

  await lib.nav('/job-applications');
  await lib.expectHitsToBe(nApplications);

  const gridWrapper: Locator = await lib.gridSearchWrapper();

  return {
    lib,
    res,
    gridWrapper,
    applications,
  };
};

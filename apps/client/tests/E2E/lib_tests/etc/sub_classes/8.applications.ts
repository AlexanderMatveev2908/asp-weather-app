import { ApplicationT } from '@/features/applications/etc/types';
import { LibUserTests } from './7.user';
import { ApplicationFormT } from '@/features/applications/etc/forms/job_application/etc/paperwork/form_mng';
import { TestPayload } from '../payloads';
import { APIResponse, expect } from '@playwright/test';
import { ResApiT } from '@/core/store/api/etc/types';

export abstract class LibApplicationsTests extends LibUserTests {
  public async postApplication(jwt: string): Promise<ApplicationT> {
    const url: string = this.backUrl + '/job-applications';
    const payload: ApplicationFormT = TestPayload.application();

    const res: APIResponse = await this.page.request.post(url, {
      data: payload,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const data: ResApiT<{ jobApplication: ApplicationT }> = await res.json();
    const application: ApplicationT = data.jobApplication;

    for (const keyInput of ['companyName', 'positionName']) {
      await expect(application[keyInput as keyof typeof application]).toMatch(
        payload[keyInput as keyof typeof payload] as string
      );
    }

    return application;
  }
}

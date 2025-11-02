import { PwdGen } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/pwd_gen';
import { Rand } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/rand';
import { LibDate } from '@/core/lib/data_structure/date';
import { ApplicationFormT } from '@/features/applications/etc/forms/job_application/etc/paperwork/form_mng';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { LoginFormT } from '@/features/auth/pages/login/paperwork/from_mng';
import { RegisterFormT } from '@/features/auth/pages/register/paperwork/form_mng';
import { faker } from '@faker-js/faker';

export class TestPayload {
  // eslint-disable-next-line no-magic-numbers
  private static readonly charsForRange: number = 4;

  public static register(): Omit<RegisterFormT, 'terms' | 'confirmPassword'> {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: PwdGen.pwdOf(this.charsForRange),
    };
  }

  public static login(): LoginFormT {
    return {
      email: faker.internet.email(),
      password: PwdGen.pwdOf(this.charsForRange),
    };
  }

  public static application(): ApplicationFormT {
    return {
      companyName: faker.company.name(),
      positionName: faker.person.jobTitle(),
      notes: faker.lorem.sentence(),
      status: Rand.choice(Object.values(ApplicationStatusT)) as ApplicationStatusT,
      appliedAt: LibDate.randomDate(),
    };
  }
}

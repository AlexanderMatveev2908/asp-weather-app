import { RootUiFkt } from '../root_ui';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';
import { SvgFillBriefcase } from '@/common/components/svgs/fill/briefcase/briefcase';
import { LibShapeCheck } from '../../lib/data_structure/shape_check';
import { SvgStrokeRegister } from '@/common/components/svgs/stroke/register/register';
import { SvgStrokePassword } from '@/common/components/svgs/stroke/password/password';
import { SvgFillLogin } from '@/common/components/svgs/fill/login/login';
import { SvgFillVerify } from '@/common/components/svgs/fill/verify/verify';
import { Nullable } from '@/common/types/etc';
import { SpanLinkPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillSecurity } from '@/common/components/svgs/fill/security/security';
import { SvgFillApplyJob } from '@/common/components/svgs/fill/apply_job/apply-job';

export class LinksUiFkt extends RootUiFkt {
  private static readonly _allUsers: Omit<SpanLinkPropsT, 'id' | 'eventT'>[] = [
    {
      label: 'Home',
      path: '/',
      Svg: SvgStrokeHome,
    },
    {
      label: 'Job Applications',
      path: '/job-applications',
      Svg: SvgFillBriefcase,
    },
    {
      label: 'Add Application',
      path: '/job-applications/post',
      Svg: SvgFillApplyJob,
    },
  ];

  private static readonly _notLogged: Omit<SpanLinkPropsT, 'id' | 'eventT'>[] = [
    {
      label: 'Register',
      path: '/auth/register',
      Svg: SvgStrokeRegister,
    },
    {
      label: 'Login',
      path: '/auth/login',
      Svg: SvgFillLogin,
    },
    {
      label: 'Recover Password',
      path: '/auth/require-email/recover-pwd',
      Svg: SvgStrokePassword,
    },
    {
      label: 'Verify account',
      path: '/auth/require-email/confirm-email',
      Svg: SvgFillVerify,
    },
  ];

  private static readonly _logged: Omit<SpanLinkPropsT, 'id' | 'eventT'>[] = [
    {
      label: 'Verify account',
      path: '/user/confirm-email',
      Svg: SvgFillVerify,
    },
    {
      label: 'Account Settings',
      path: '/user/manage-account',
      Svg: SvgFillSecurity,
    },
  ];

  public static get allUsers(): SpanLinkPropsT[] {
    return this.arrWithIdAndEvent(this._allUsers);
  }
  public static get notLogged(): SpanLinkPropsT[] {
    return this.arrWithIdAndEvent(this._notLogged);
  }

  public static getLoggedByVerifyStatus(isVerified: boolean): SpanLinkPropsT[] {
    return this.arrWithIdAndEvent(
      this._logged.filter((el: Omit<SpanLinkPropsT, 'id' | 'eventT'>) =>
        isVerified ? el.path !== this._logged[0].path : true
      )
    );
  }

  private static cutPath(arg: string): string {
    return arg.split('?')[0].replace(/\/+$/, '');
  }

  public static isCurrPath(currPath: Nullable<string>, lkPath: string): boolean {
    if (!LibShapeCheck.isStr(currPath)) return false;

    const currCut = LinksUiFkt.cutPath(currPath!);
    const lkCut = LinksUiFkt.cutPath(lkPath);

    return currCut === lkCut;
  }
}

import { Routes } from '@angular/router';

import { PostJobApplications } from '@/pages/job_applications/post/post-job-applications';
import { PutJobApplications } from '@/pages/job_applications/put/put-job-applications';
import { ReadAllJobApplications } from '@/pages/job_applications/read_all/read-all-job-applications';
import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { Notice } from '@/pages/notice/notice';
import { LayoutJobApplications } from '@/pages/job_applications/layout/layout-job-applications';
import { LayoutAuth } from '@/pages/auth/layout/layout-auth';
import { Register } from '@/pages/auth/register/register';
import { Login } from '@/pages/auth/login/login';
import { RecoverPwd } from '@/pages/auth/recover_pwd/recover-pwd';
import { Login2fa } from '@/pages/auth/login_2fa/login-2fa';
import { RecoverPwd2fa } from '@/pages/auth/recover_pwd_2fa/recover-pwd-2fa';
import { AuthReqMailConfMail } from '@/pages/auth/req_mail/conf_mail/auth-req-mail-conf-mail';
import { AuthReqMailRecoverPwd } from '@/pages/auth/req_mail/recover_pwd/auth-req-mail-recover-pwd';
import { LayoutReqMailAuth } from '@/pages/auth/req_mail/layout/layout-req-mail-auth';
import { Protected } from '@/pages/protected/protected';
import { Verify } from '@/pages/verify/index/verify';
import { LayoutUser } from '@/pages/user/layout/layout-user';
import { ManageAccount } from '@/pages/user/manage_account/manage-account';
import { AccessManageAccount } from '@/pages/user/access_manage_account/access-manage-account';
import { UserVerifyMail } from '@/pages/user/verify_mail/user-verify-mail';
import { AccessManageAccount2fa } from '../pages/user/access_manage_account_2fa/access-manage-account-2fa';
import { LayoutVerify } from '@/pages/verify/layout/layout-verify';
import { ChangeEmail2fa } from '@/pages/verify/change_email_2fa/change-email-2fa';
import { VerifyRecoverPwd2fa } from '@/pages/verify/recover_pwd_2fa/verify-recover-pwd-2fa';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'protected',
    component: Protected,
  },
  {
    path: 'notice',
    component: Notice,
  },
  {
    path: 'verify',
    component: LayoutVerify,
    children: [
      {
        path: '',
        component: Verify,
      },
      {
        path: 'change-email-2fa',
        component: ChangeEmail2fa,
      },
      {
        path: 'recover-pwd-2fa',
        component: VerifyRecoverPwd2fa,
      },
    ],
  },
  {
    path: 'auth',
    component: LayoutAuth,
    children: [
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'recover-pwd',
        component: RecoverPwd,
      },
      {
        path: 'login-2fa',
        component: Login2fa,
      },
      {
        path: 'recover-pwd-2fa',
        component: RecoverPwd2fa,
      },
      {
        path: 'require-email',
        component: LayoutReqMailAuth,
        children: [
          {
            path: 'confirm-email',
            component: AuthReqMailConfMail,
          },
          {
            path: 'recover-pwd',
            component: AuthReqMailRecoverPwd,
          },
        ],
      },
    ],
  },
  {
    path: 'user',
    component: LayoutUser,
    children: [
      {
        path: 'manage-account',
        component: ManageAccount,
      },
      {
        path: 'access-manage-account',
        component: AccessManageAccount,
      },
      {
        path: 'access-manage-account-2fa',
        component: AccessManageAccount2fa,
      },
      {
        path: 'confirm-email',
        component: UserVerifyMail,
      },
    ],
  },
  {
    path: 'job-applications',
    component: LayoutJobApplications,
    children: [
      {
        path: 'post',
        component: PostJobApplications,
      },
      {
        path: 'put/:applicationID',
        component: PutJobApplications,
      },
      {
        path: '',
        component: ReadAllJobApplications,
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];

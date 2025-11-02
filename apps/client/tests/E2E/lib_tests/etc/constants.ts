export class LibConstTests {
  private static genMgs(msg: string): string {
    return `We've sent you an email ${msg}. If you don't see it, check your spam folder, it might be partying there 🎉`;
  }

  public static readonly CONF_ACCOUNT_MSG: string = this.genMgs('to confirm your account');
  public static readonly RECOVER_PWD_MSG: string = this.genMgs('to recover your password');
  public static readonly CHANGE_MAIL_MSG: string = this.genMgs('to your new email address');
}

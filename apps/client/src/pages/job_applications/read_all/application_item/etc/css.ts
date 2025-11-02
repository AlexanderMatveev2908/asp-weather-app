import { ApplicationStatusT } from '@/features/applications/etc/types';

export class LibCssApplication {
  private static readonly mapCssVar: Map<ApplicationStatusT, string> = new Map<
    ApplicationStatusT,
    string
  >([
    [ApplicationStatusT.APPLIED, 'var(--gray__300)'],
    [ApplicationStatusT.UNDER_REVIEW, 'var(--blue__300)'],
    [ApplicationStatusT.INTERVIEW, 'var(--blue__600)'],
    [ApplicationStatusT.OFFER, 'var(--green__600)'],
    [ApplicationStatusT.WITHDRAWN, 'var(--orange__600)'],
    [ApplicationStatusT.REJECTED, 'var(--red__600)'],
  ]);

  public static cssVarByStatus(arg: ApplicationStatusT): string {
    return this.mapCssVar.get(arg)!;
  }
}

/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { UseRefHk } from '@/core/hooks/use_ref';
import { UseCasesVerifyDir } from './etc/1.use_cases';
import { AadCbcHmacT, TokenT } from '@/features/cbcHmac/etc/types';

@Component({
  selector: 'app-verify',
  imports: [PageWrapper],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRefHk],
})
export class Verify extends UseCasesVerifyDir implements OnInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly useRef: UseRefHk = inject(UseRefHk);

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      if (this.useRef.current) return;
      this.useRef.current = true;

      const cbcHmac: Nullable<string> = this.useNavKit.useNav.query()?.['cbcHmacToken'];

      // ! extractAad also check cbcHmac is a string and not null
      const aad: Nullable<AadCbcHmacT> = this.extractAad(cbcHmac);

      if (!aad) return;

      switch (aad.tokenT) {
        case TokenT.CONF_EMAIL:
          this.confMail(cbcHmac!);
          break;

        case TokenT.RECOVER_PWD:
          this.recoverPwd(cbcHmac!);
          break;

        case TokenT.CHANGE_EMAIL:
          this.confNewMail(cbcHmac!);
          break;

        default:
          throw new ErrApp('bug checking token');
      }
    });
  }
}

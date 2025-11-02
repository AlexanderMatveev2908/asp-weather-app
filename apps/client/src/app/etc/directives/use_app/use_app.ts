import { Directive, OnInit } from '@angular/core';
import { UseAppUserDir } from './etc/3.use_app_user';

@Directive()
export abstract class UseAppDir extends UseAppUserDir implements OnInit {
  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      this.onRouteChange();

      this.markUserLogged();

      this.populateCbcHmac();
      this.delCbcHmacOnNavOut();

      this.fetchUser();
    });

    this.resetLoggingInTmr();
    this.resetLoggingOutTmr();

    this.resetSavingCbcHmac();
    this.resetClearingCbcHmac();
  }
}

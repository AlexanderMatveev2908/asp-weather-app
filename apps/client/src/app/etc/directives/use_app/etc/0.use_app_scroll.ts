import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { Directive, inject } from '@angular/core';

@Directive()
export abstract class UseAppScrollDir extends UseInjCtxHk {
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);

  protected onRouteChange(): void {
    this.usePlatform.onClient(() => {
      this.useEffect(() => {
        void this.useNav.currPath();

        const marginScroll: number = 250;
        setTimeout(() => {
          window.scroll({ top: 0, behavior: 'smooth' });
        }, marginScroll);
      });
    });
  }
}

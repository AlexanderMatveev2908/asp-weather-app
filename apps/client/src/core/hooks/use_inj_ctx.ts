import {
  afterNextRender,
  effect,
  EffectCleanupRegisterFn,
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import { UsePlatformSvc } from '../services/use_platform';

@Injectable()
export class UseInjCtxHk {
  public readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly inj: EnvironmentInjector = inject(EnvironmentInjector);

  public inCtx(cb: () => void): void {
    runInInjectionContext(this.inj, () => {
      cb();
    });
  }

  public useEffect(cb: (onCleanup: EffectCleanupRegisterFn) => void): void {
    this.inCtx(() => {
      effect(cb, { injector: this.inj });
    });
  }

  public useDOM(cb: () => void): void {
    this.usePlatform.onClient(() => {
      this.inCtx(() => {
        afterNextRender(() => {
          requestAnimationFrame(() => cb());
        });
      });
    });
  }
}

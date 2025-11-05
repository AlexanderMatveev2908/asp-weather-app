import { Nullable } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibShape } from '@/core/lib/data_structure/shape';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Navigation,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';

export type NavFromT = 'err' | 'ok';

export interface MetaNavT {
  from: Nullable<NavFromT>;
}

@Injectable()
export abstract class _UsePathHk extends UseInjCtxHk {
  protected readonly router: Router = inject(Router);

  private readonly _currPath: WritableSignal<Nullable<string>> = signal(null);
  private readonly _goingTo: WritableSignal<Nullable<string>> = signal(null);
  private readonly _meta: WritableSignal<Nullable<MetaNavT>> = signal(null);
  private readonly _query: WritableSignal<Nullable<Params>> = signal(null);
  private readonly _path_variables: WritableSignal<Nullable<Params>> = signal(null);

  public readonly meta: Signal<Nullable<MetaNavT>> = this._meta.asReadonly();
  public readonly currPath: Signal<Nullable<string>> = this._currPath.asReadonly();
  public readonly goingTo: Signal<Nullable<string>> = this._currPath.asReadonly();
  public readonly query: Signal<Nullable<Params>> = this._query.asReadonly();
  public readonly path_variables: Signal<Nullable<Params>> = this._path_variables.asReadonly();

  private findDeepestRoute(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let snap: ActivatedRouteSnapshot = snapshot;
    while (snap.firstChild) snap = snap.firstChild;

    return snap;
  }

  constructor() {
    super();
    this.router.events
      .pipe(filter((e: unknown) => e instanceof NavigationEnd || e instanceof NavigationStart))
      .subscribe((e: NavigationStart | NavigationEnd) => {
        if (e instanceof NavigationStart) {
          this._goingTo.set(e.url);
          return;
        }
        this._currPath.set(e.urlAfterRedirects);

        const navigation: Nullable<Navigation> = this.router.currentNavigation();
        this._meta.set((navigation?.extras.state as MetaNavT) ?? null);

        const snapshot: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;

        const queryParams: Params = snapshot.root.queryParams;
        this._query.set(LibShape.hasObjData(queryParams) ? queryParams : null);

        const deepestSnap: ActivatedRouteSnapshot = this.findDeepestRoute(snapshot);
        const params: Params = deepestSnap.params;

        this._path_variables.set(LibShape.hasObjData(params) ? params : null);
      });
  }

  public ifPathStartsWith(arg: string, cb: (path: string) => void): void {
    const path: Nullable<string> = this.currPath();
    if (!path || !path.startsWith(arg)) return;

    cb(path);
  }

  public ifPathEqual(arg: string, cb: (full: string) => void): void {
    const full: Nullable<string> = this.currPath();
    if (!full) return;

    const partial: string = full.split('?')[0];
    if (partial !== arg) return;

    cb(full);
  }
}

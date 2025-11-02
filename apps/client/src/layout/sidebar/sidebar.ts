import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { TxtClamp } from '@/common/components/els/txt/txt_clamp/txt-clamp';
import { SidebarSlice } from '@/features/sidebar/slice';
import { LinksUiFkt } from '@/core/ui_fkt/links';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { DropStatic } from '@/common/components/drop/static/drop-static';
import { SpanLinkPropsT, SpanPropsT } from '@/common/components/els/span/etc/types';
import { NavLink } from '@/common/components/links/nav_link/nav-link';
import { Nullable, RefDomT } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { TxtPropsT } from '@/common/components/els/txt/etc/types';
import { UserSlice } from '@/features/user/slice';
import { UserT } from '@/features/user/etc/types';
import { SidebarUiFkt } from './etc/ui_fkt';
import { LogoutBtn } from '@/features/auth/components/logout_btn/logout-btn';
import { MouseDOM } from '@/core/lib/dom/mouse';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseTxtDir } from '@/core/directives/use_txt';

@Component({
  selector: 'app-sidebar',
  imports: [
    BlackBg,
    NgClass,
    TxtClamp,
    DropStatic,
    NavLink,
    LogoutBtn,
    LogoutBtn,
    UseIDsDir,
    UseSpanDir,
    UseTxtDir,
  ],

  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  // ? svc
  private readonly sideSlice: SidebarSlice = inject(SidebarSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly userSlice: UserSlice = inject(UserSlice);

  // ? local state
  public readonly isDropOpen: WritableSignal<boolean> = signal(false);
  public readonly setIsDropOpen: (val: boolean) => void = (val: boolean) => {
    this.isDropOpen.set(val);
  };

  // ? children
  @ViewChild('side') side: RefDomT;

  // ? testId
  public testIdFromPath(path: string): string {
    return LibPrs.toSnake(`sidebar__${path}`);
  }

  // ? derived
  public readonly isSideOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly currPath: Signal<Nullable<string>> = this.useNav.currPath;
  public readonly user: Signal<Nullable<UserT>> = computed(() => this.userSlice.userState().user);

  // ? static fields
  public readonly allUsersLinks: Signal<SpanLinkPropsT[]> = computed(() =>
    LinksUiFkt.allUsers.map((lk: SpanLinkPropsT): SpanLinkPropsT => {
      const { path } = lk;

      if (!path.startsWith('/job-application')) return lk;

      return !this.user()
        ? {
            ...lk,
            insteadHere: '/auth/login',
          }
        : !this.user()?.isVerified
        ? {
            ...lk,
            insteadHere: '/user/confirm-email',
          }
        : lk;
    })
  );
  // ? dynamic props
  public readonly linksUser: Signal<SpanLinkPropsT[]> = computed(() =>
    this.user() ? LinksUiFkt.getLoggedByVerifyStatus(this.user()!.isVerified) : LinksUiFkt.notLogged
  );

  // ? app-span-drop props
  public readonly spanUserProps: Signal<SpanPropsT> = computed(() =>
    this.user() ? SidebarUiFkt.spanLogged : SidebarUiFkt.spanNotLogged
  );

  // ? txt-clamp props
  public readonly txtClampProps: Signal<Nullable<TxtPropsT>> = computed(() =>
    !this.user()
      ? null
      : {
          txt: this.user()!.email,
          size: 'lg',
        }
  );

  // ? black bg overlay props
  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(() => ({
    isDark: this.isSideOpen(),
    zBg: 'z__sidebar__bg',
  }));

  // ? listeners
  public readonly onSideClick: () => void = (): void => {
    this.sideSlice.close();
  };

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    MouseDOM.onMouseOut(this.side, e, () => this.sideSlice.close());
  }
}

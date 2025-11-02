import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgFillGhost } from '@/common/components/svgs/fill/ghost/ghost';
import { SvgStrokeUserWrite } from '@/common/components/svgs/stroke/user_write/user-write';
import { SvgStrokeBurger } from '@/common/components/svgs/stroke/burger/burger';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { SidebarSlice } from '@/features/sidebar/slice';
import { DropAbs } from '@/common/components/drop/abs/drop-abs';
import {
  SpanLinkPropsT,
  SpanPropsT,
  SpanSizesPropsT,
} from '@/common/components/els/span/etc/types';
import { NgClass } from '@angular/common';
import { LinksUiFkt } from '@/core/ui_fkt/links';
import { NavLink } from '@/common/components/links/nav_link/nav-link';
import { Nullable } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { UserSlice } from '@/features/user/slice';
import { UserT } from '@/features/user/etc/types';
import { WrapTxtApi } from '@/common/components/hoc/txt/wrap_txt_api/wrap-txt-api';
import { LogoutBtn } from '@/features/auth/components/logout_btn/logout-btn';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';
import { UseDropHk } from '@/core/hooks/closable/use_drop';

@Component({
  selector: 'app-header',
  imports: [
    SvgFillGhost,
    RouterLink,
    DropAbs,
    SvgFillClose,
    SvgStrokeBurger,
    NgClass,
    NavLink,
    WrapTxtApi,
    LogoutBtn,
    UseIDsDir,
    UseSpanDir,
    UseWrapApiDir,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class Header {
  // ? svc
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly sideSlice: SidebarSlice = inject(SidebarSlice);
  private readonly userSlice: UserSlice = inject(UserSlice);

  // ? derived
  public readonly isSideOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly currPath: Signal<Nullable<string>> = this.useNav.currPath;
  public readonly user: Signal<Nullable<UserT>> = computed(() => this.userSlice.userState().user);
  public readonly fetchingUser: Signal<boolean> = computed(
    () => this.userSlice.userState().isPending
  );

  // ? testid
  public testIdFromPath(path: string): string {
    return LibPrs.toSnake('header__' + path);
  }

  // ? helper
  public readonly toggleSide: () => void = () => {
    this.sideSlice.toggle();
  };

  // ? hooks
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  // ? static fields
  public readonly dropLinks: Signal<SpanLinkPropsT[]> = computed(() =>
    this.user() ? LinksUiFkt.getLoggedByVerifyStatus(this.user()!.isVerified) : LinksUiFkt.notLogged
  );

  // ? app-span props
  public readonly spanDropProps: Signal<SpanPropsT> = computed(() => ({
    label: this.user() ? LibPrs.initials(this.user()!) : null,
    Svg: this.user() ? null : SvgStrokeUserWrite,
  }));
  public readonly spanDropSizesProps: Partial<SpanSizesPropsT> = {
    svg: '3xl',
    txt: '3xl',
  };
}

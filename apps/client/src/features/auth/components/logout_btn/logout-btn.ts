import { SpanPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';
import { Span } from '@/common/components/els/span/span';
import { SvgFillLogout } from '@/common/components/svgs/fill/logout/logout';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseLogout } from '@/features/auth/etc/services/use_logout';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-logout-btn',
  imports: [Span],
  templateUrl: './logout-btn.html',
  styleUrl: './logout-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutBtn extends UseApiTrackerHk {
  private readonly useLogout: UseLogout = inject(UseLogout);
  public readonly closeSomethingCb: InputSignal<() => void> = input.required();

  public readonly spanProps: SpanPropsT = {
    label: 'Logout',
    Svg: SvgFillLogout,
  };
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: '2xl',
  };

  public onLogout(): void {
    this.track(this.useLogout.main())
      .pipe(finalize(() => this.closeSomethingCb()()))
      .subscribe();
  }
}

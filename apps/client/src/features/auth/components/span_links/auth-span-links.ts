import { Nullable } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthSpanLinksUiFkt } from './etc/ui_fkt';
import { SpanLinkPropsT } from '@/common/components/els/span/etc/types';
import { TooltipLink } from '@/common/components/links/tooltip_link/tooltip-link';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-auth-span-links',
  imports: [TooltipLink, UseIDsDir],
  templateUrl: './auth-span-links.html',
  styleUrl: './auth-span-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSpanLinks extends UseInjCtxHk implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly links: WritableSignal<Nullable<SpanLinkPropsT[]>> = signal(null);

  ngOnInit(): void {
    this.useEffect(() => {
      const path: Nullable<string> = this.useNav.currPath();

      this.links.set(AuthSpanLinksUiFkt.byPath(path));
    });
  }
}

import { ElDomT, RefDomT } from '@/common/types/dom';
import { Optional } from '@/common/types/etc';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { UsePlatformSvc } from '@/core/services/use_platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { animate } from '@motionone/dom';
import { v4 } from 'uuid';

@Component({
  selector: 'app-spin-btn',
  imports: [],
  templateUrl: './spin-btn.html',
  styleUrl: './spin-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinBtn implements AfterViewInit {
  // ? directives
  public readonly useMetaEventDir: UseMetaEventDir = inject(UseMetaEventDir);

  // ? svc
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? static ids to map for spin
  public readonly IDs: string[] = Array.from({ length: 4 }, () => v4());

  // ? children
  @ViewChildren('dot') dots: Optional<QueryList<RefDomT>>;

  // ? animations
  ngAfterViewInit(): void {
    if (!this.usePlatform.isClient) return;

    if (!this.dots) return;

    const dotsDOM = this.dots.toArray();

    for (let i = 0; i < dotsDOM.length; i++) {
      const curr: RefDomT = dotsDOM[i];
      const currDOM: ElDomT = curr?.nativeElement;

      if (!currDOM) return;

      animate(
        currDOM,
        // eslint-disable-next-line no-magic-numbers
        { scale: [1, 1.25, 1], y: [0, 35, 0] },
        {
          duration: 1,
          delay: (i * 1) / dotsDOM.length,
          easing: 'ease-in-out',
          repeat: Infinity,
        }
      );
    }
  }
}

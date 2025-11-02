import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { DropAbs } from '@/common/components/drop/abs/drop-abs';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { SvgStrokeNotes } from '@/common/components/svgs/stroke/notes/notes';
import { SvgFillStatus } from '@/common/components/svgs/fill/status/status';
import { ApplicationT } from '@/features/applications/etc/types';
import { Span } from '@/common/components/els/span/span';
import { UseDropHk } from '@/core/hooks/closable/use_drop';

@Component({
  selector: 'app-application-status-row',
  imports: [DropAbs, UseIDsDir, Span],
  templateUrl: './application-status-row.html',
  styleUrl: './application-status-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class ApplicationStatusRow {
  // ? props
  public readonly application: InputSignal<ApplicationT> = input.required();
  public readonly cssTheme: InputSignal<string> = input.required();

  // ? hooks
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  // ? span
  public readonly spanNotes: SpanPropsT = {
    label: null,
    Svg: SvgStrokeNotes,
  };

  public readonly spanStatus: Signal<SpanPropsT> = computed(() => ({
    label: this.application().status,
    Svg: SvgFillStatus,
  }));
}

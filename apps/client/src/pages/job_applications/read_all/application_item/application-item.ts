import { ApplicationT } from '@/features/applications/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { LibCssApplication } from './etc/css';
import { SpanEventPropsT, SpanPropsT } from '@/common/components/els/span/etc/types';
import { ApplicationItemUiFkt } from './etc/ui_fkt';
import { BtnListenersT, WithIdT } from '@/common/types/etc';
import { Span } from '@/common/components/els/span/span';
import { ApplicationStatusRow } from './status_row/application-status-row';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { UseSpanDir } from '@/core/directives/use_span';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SvgFillFancyPen } from '@/common/components/svgs/fill/fancy_pen/fancy-pen';
import { SvgStrokeTrash } from '@/common/components/svgs/stroke/trash/trash';
import { Popup } from '@/layout/popup/popup';
import { PopupStaticPropsT } from '@/layout/popup/etc/types';
import { BtnPopChoicePropsT, PopChoices } from '@/common/components/hoc/pop_choices/pop-choices';
import { UsePopHk } from '@/core/hooks/closable/use_pop';
import { UseApplicationsKitSvc } from '@/features/applications/etc/hooks/use_applications_kit';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { finalize, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';

@Component({
  selector: 'app-application-item',
  imports: [
    Span,
    ApplicationStatusRow,
    LinkShadow,
    UseSpanDir,
    BtnShadow,
    UseIDsDir,
    Popup,
    PopChoices,
  ],
  templateUrl: './application-item.html',
  styleUrl: './application-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePopHk, UseApiTrackerHk],
})
export class ApplicationItem {
  // ? services
  private readonly useApplicationsKit: UseApplicationsKitSvc = inject(UseApplicationsKitSvc);

  // ? props
  public readonly application: InputSignal<ApplicationT> = input.required();

  // ? hooks
  public readonly usePopKit: UsePopHk = inject(UsePopHk);
  public readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? derived
  public readonly cssTheme: Signal<string> = computed(() =>
    LibCssApplication.cssVarByStatus(this.application().status)
  );

  // ? basic info
  public readonly pairsLabelSvg: Signal<(SpanPropsT & WithIdT)[]> = computed(() =>
    ApplicationItemUiFkt.pairsLabelSvg(this.application())
  );

  // ? row btns
  public readonly spanLink: Signal<SpanEventPropsT> = computed(() => ({
    eventT: 'INFO',
    label: 'Update',
    Svg: SvgFillFancyPen,
  }));

  public readonly pathLink: Signal<string> = computed(
    () => `/job-applications/put/${this.application().id}`
  );

  public readonly deleteSpan: Signal<SpanEventPropsT> = computed(() => ({
    eventT: 'ERR',
    label: 'Delete',
    Svg: SvgStrokeTrash,
  }));

  public readonly listenersBtnDelete: BtnListenersT = {
    onClick: () => this.usePopKit.isPop.set(true),
  };

  // ? listeners
  public readonly deleteApplication: () => void = () => {
    this.useApiTracker
      .track(this.useApplicationsKit.applicationsApi.delete(this.application().id))
      .pipe(
        tap((_: ResApiT<void>) => {
          this.useApplicationsKit.applicationsSlice.triggerKeyRefresh();
        }),
        finalize(() => this.usePopKit.isPop.set(false))
      )
      .subscribe();
  };

  // ? app-popup
  public readonly staticPopProps: PopupStaticPropsT = {
    closeOnMouseOut: true,
    cls: 'generic_popup',
    eventT: 'ERR',
    closePop: this.usePopKit.closePop,
  };

  // ? app-pop-choices
  public readonly mainPopTxt: Signal<string> = computed(
    () => `Are you sure to delete application for ${this.application().companyName} company ?`
  );

  public readonly popChoiceA: Signal<Partial<BtnPopChoicePropsT>> = computed(() => ({
    isPending: this.useApiTracker.isPending(),
    onClick: this.deleteApplication,
  }));
  public readonly popChoiceB: Partial<BtnPopChoicePropsT> = {
    onClick: this.usePopKit.closePop,
  };
}

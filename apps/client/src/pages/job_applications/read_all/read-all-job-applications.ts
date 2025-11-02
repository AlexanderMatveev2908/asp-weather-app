import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchApplicationsUiFkt } from '@/features/applications/etc/forms/search_applications/etc/ui_fkt';
import {
  SearchApplicationsFormMng,
  SearchApplicationsFormT,
} from '@/features/applications/etc/forms/search_applications/etc/paperwork/form_mng';
import { SearchLayout } from '@/layout/search_layout/search-layout';
import { SearchBarFilterT, SearchBarSorterT } from '@/layout/search_layout/search_bar/etc/ui_fkt';
import { Observable, tap } from 'rxjs';
import { SearchQueryArgT, SearchQueryResT } from '@/layout/search_layout/search_bar/etc/types';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseApplicationsKitSvc } from '@/features/applications/etc/hooks/use_applications_kit';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { ApplicationT } from '@/features/applications/etc/types';
import {
  UseSearchBarPropsDir,
  UseSearchBarPaginationPropsDir,
} from '@/layout/search_layout/search_bar/etc/directives/use_search_bar_props';
import { ApplicationItem } from './application_item/application-item';
import { UseSearchApplicationsFormSvc } from '@/core/services/forms/use_search_applications';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [SearchLayout, UseSearchBarPropsDir, UseSearchBarPaginationPropsDir, ApplicationItem],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class ReadAllJobApplications {
  // ? svc
  public readonly useApplicationsKit: UseApplicationsKitSvc = inject(UseApplicationsKitSvc);
  public readonly useSearchApplicationsForm: UseSearchApplicationsFormSvc = inject(
    UseSearchApplicationsFormSvc
  );

  // ? hooks
  public readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? static
  public readonly defState: SearchApplicationsFormT = SearchApplicationsFormMng.defState();

  // ? ui & form_fkt
  public readonly txtInputsAvailable: () => TxtFieldArrayT[] = SearchApplicationsUiFkt.txtInputs;
  public readonly filtersAvailable: () => SearchBarFilterT[] = SearchApplicationsUiFkt.filters;
  public readonly sortersAvailable: () => SearchBarSorterT[] = SearchApplicationsUiFkt.sorters;

  // ? listeners
  private triggerApi(data: SearchQueryArgT): Observable<unknown> {
    return this.useApiTracker.track(
      this.useApplicationsKit.applicationsApi.get(data).pipe(
        tap({
          next: (res: ResApiT<SearchQueryResT<{ jobApplications: ApplicationT[] }>>) => {
            this.useApplicationsKit.applicationsSlice.saveApplications({
              applications: res.jobApplications,
              nHits: res.nHits,
              pages: res.pages,
            });
          },
          error: (_: ErrApiT<void>) => {
            this.useApplicationsKit.applicationsSlice.reset();
          },
        })
      )
    );
  }

  public readonly strategy: (data: SearchQueryArgT) => Observable<unknown> = (
    data: SearchQueryArgT
  ) => this.triggerApi(data);
}

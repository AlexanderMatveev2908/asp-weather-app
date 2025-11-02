import { ObsResT, StatusT } from '@/core/store/api/etc/types';
import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { ApplicationResT, ApplicationT } from './etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { SearchQueryArgT, SearchQueryResT } from '@/layout/search_layout/search_bar/etc/types';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiSvc {
  private readonly base: string = '/job-applications';

  private readonly api: UseApiSvc = inject(UseApiSvc);

  public post(formData: FormData): ObsResT<ApplicationResT> {
    return this.api.post(LibApiArgs.withURL(this.base).body(formData).toastOnFulfilled());
  }

  public getByID(id: string): ObsResT<ApplicationResT> {
    return this.api.get(
      LibApiArgs.withURL(`${this.base}/${id}`).toastOnErr().pushOnStatus([StatusT.NOT_FOUND])
    );
  }

  public put(id: string, formData: FormData): ObsResT<ApplicationResT> {
    return this.api.put(LibApiArgs.withURL(`${this.base}/${id}`).body(formData).toastOnFulfilled());
  }

  public get(data: SearchQueryArgT): ObsResT<SearchQueryResT<{ jobApplications: ApplicationT[] }>> {
    return this.api.get(LibApiArgs.withURL(this.base).query(data).toastOnErr());
  }

  public delete(id: string): ObsResT<void> {
    return this.api.delete(
      LibApiArgs.withURL(`${this.base}/${id}`).toastOnFulfilled().pushOnStatus([StatusT.NOT_FOUND])
    );
  }
}

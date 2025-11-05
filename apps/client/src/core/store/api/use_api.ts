import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LibApiArgs } from './etc/lib/api_args';
import { _UseSideEffectsMngSvc } from './etc/services/manage_side_effects';
import { ObsOnOkT, ResApiT } from './etc/types';
import { Optional } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class UseApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly sideEffectsMng: _UseSideEffectsMngSvc = inject(_UseSideEffectsMngSvc);

  public get<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOr(undefined) as Optional<HttpParams>,
      }),
      args
    );
  }

  public post<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args
    );
  }

  public put<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public patch<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public delete<T, K>(args: LibApiArgs<K>): ObsOnOkT<T> {
    return this.sideEffectsMng.main(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOr(undefined) as Optional<HttpParams>,
      }),
      args
    );
  }
}

import { LibShapeCheck } from './shape_check';
import { ErrApp } from '../err';

export class LibFormPrs {
  private static appendPrimitive(params: URLSearchParams | FormData, k: string, v: unknown): void {
    params.append(k, typeof v === 'string' ? v : v + '');
  }

  private static handleList(
    formParams: URLSearchParams | FormData,
    key: string,
    v: unknown[]
  ): void {
    const arrayKey = key + '[]';

    for (const vv of v)
      if (LibShapeCheck.isObj(vv)) this.nestingMng(vv, formParams, arrayKey);
      else this.appendPrimitive(formParams, arrayKey, vv);
  }

  private static nestingMng(
    arg: unknown,
    formParams: URLSearchParams | FormData,
    prefix: string = ''
  ): URLSearchParams | FormData {
    if (!LibShapeCheck.hasObjData(arg))
      throw new ErrApp('passed falsy value where expect Record<string,unknown>');

    for (const [k, v] of Object.entries(arg as Record<string, unknown>)) {
      if (LibShapeCheck.isNone(v)) continue;

      const key: string = prefix ? `${prefix}[${k}]` : k;

      if (Array.isArray(v)) this.handleList(formParams, key, v);
      else if (LibShapeCheck.isObj(v)) this.nestingMng(v, formParams, key);
      else this.appendPrimitive(formParams, key, v);
    }

    return formParams;
  }

  public static genParamsURL(obj: unknown): string {
    return this.nestingMng(obj, new URLSearchParams()).toString();
  }

  public static genFormData(obj: unknown): FormData {
    const result: FormData | URLSearchParams = this.nestingMng(obj, new FormData());

    if (!(result instanceof FormData)) throw new ErrApp('bug generating dynamic nested forms');

    return result;
  }
}

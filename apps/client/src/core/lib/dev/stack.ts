import { Optional } from '@/common/types/etc';
import { LibShape } from '../data_structure/shape';

export class LibStack {
  private static getTraces(upCount: number): string[] {
    const err: Error = new Error();
    const traces: Optional<string[]> = err.stack?.split('\n');

    // ? 0 => Error line
    // ? 1 this function itself
    // ? 2 private _getCaller
    // ? 3 public getCaller
    // ? 4 real caller
    // eslint-disable-next-line no-magic-numbers
    const tracesArg: string[] = (traces ?? []).slice(4 + upCount);

    return tracesArg;
  }

  private static getSplittedName(t: string): string {
    let splitted = '';
    if (t.includes('@')) splitted = t.split('@')?.[0] ?? '';
    else if (t.includes('at')) splitted = t.split('at')?.[1]?.split('(')?.[0] ?? '';

    return splitted;
  }

  private static _getCaller(upCount?: number): string {
    const traces = this.getTraces(upCount ?? 0);
    let caller = '';

    for (const t of traces) {
      caller = this.getSplittedName(t);

      if (LibShape.hasText(caller)) return caller.replace(/[_<>/]/g, '');
    }

    return 'unknown caller';
  }

  public static getCallerLess(cbCount: number): string {
    return this._getCaller(cbCount);
  }

  public static getCaller(): string {
    return this._getCaller(0);
  }
}

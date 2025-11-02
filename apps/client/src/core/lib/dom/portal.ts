import { ElDomT, None, Nullable, RefDomT } from '@/common/types/etc';

export interface RecCoordsT {
  top: Nullable<string>;
  left: Nullable<string>;
  right: Nullable<string>;
  bottom: Nullable<string>;
  with: Nullable<string>;
  height: Nullable<string>;
}

export class PortalDOM {
  // | most of cases i will just use directly calculated coords
  // | so is faster to receive them as css property
  // | just in rare cases i will need to adjust size using integer values

  private static coordsOfNative(elDOM: ElDomT): Nullable<RecCoordsT> {
    if (!elDOM) return null;
    const coordsDOM: DOMRect = elDOM.getBoundingClientRect();

    return {
      top: `${coordsDOM.top}px`,
      left: `${coordsDOM.right - coordsDOM.width}px`,
      right: `${coordsDOM.left}px`,
      bottom: `${window.innerHeight - coordsDOM.bottom}px`,
      with: `${coordsDOM.width}px`,
      height: `${coordsDOM.height}px`,
    };
  }

  public static coordsOfRef(refDom: RefDomT): Nullable<RecCoordsT> {
    const elDOM: ElDomT = refDom?.nativeElement;

    return this.coordsOfNative(elDOM);
  }

  public static coordToInt(arg: string | None): number {
    if (!arg) return 0;

    const splitted: string[] = arg.split('px');
    const int: number = +splitted[0];

    return int;
  }

  public static patchCoord(arg: string | None, cb: (v: number) => number): string {
    const int: number = this.coordToInt(arg);

    return `${cb(int)}px`;
  }
}

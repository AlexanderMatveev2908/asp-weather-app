import { SvgFillCheck } from '@/common/components/svgs/fill/check/check';
import { SvgFillError } from '@/common/components/svgs/fill/error/error';
import { SvgFillInfo } from '@/common/components/svgs/fill/info/info';
import { AppEventT, SvgT } from '@/common/types/etc';

export interface MetaEventT {
  varCss: string;
  Svg: SvgT;
}

export class LibMetaEvent {
  private static readonly meta: Record<AppEventT, MetaEventT> = {
    OK: {
      Svg: SvgFillCheck,
      varCss: 'var(--green__600)',
    },
    NONE: {
      Svg: SvgFillInfo,
      varCss: 'var(--gray__300)',
    },
    INFO: {
      Svg: SvgFillInfo,
      varCss: 'var(--blue__600)',
    },
    WARN: {
      Svg: SvgFillError,
      varCss: 'var(--yellow__600)',
    },
    ERR: {
      Svg: SvgFillError,
      varCss: 'var(--red__600)',
    },
  };

  public static metaByT(t: AppEventT): MetaEventT {
    return this.meta[t];
  }
  public static cssVarByT(t: AppEventT): string {
    return this.metaByT(t).varCss;
  }
  public static svgByT(t: AppEventT): SvgT {
    return this.metaByT(t).Svg;
  }
}

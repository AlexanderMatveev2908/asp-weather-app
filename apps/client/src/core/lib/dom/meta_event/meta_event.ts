import { SvgFillCheck } from '@/common/components/svgs/fill/check/check';
import { SvgFillError } from '@/common/components/svgs/fill/error/error';
import { SvgFillInfo } from '@/common/components/svgs/fill/info/info';
import { AppEventMetaT, AppEventT } from './etc/types';

export class MetaEventDOM {
  private static readonly eventsData: Record<AppEventT, AppEventMetaT> = {
    OK: {
      Svg: SvgFillCheck,
      clr: 'green__600',
      txtTwd: 'text-green-600',
      bdTwd: 'border-green-600',
      css: 'var(--green__600)',
    },
    NONE: {
      Svg: SvgFillInfo,
      clr: 'gray__300',
      txtTwd: 'text-gray-300',
      bdTwd: 'border-gray-300',
      css: 'var(--gray__300)',
    },
    INFO: {
      Svg: SvgFillInfo,
      clr: 'blue__600',
      txtTwd: 'text-blue-600',
      bdTwd: 'border-blue-600',
      css: 'var(--blue__600)',
    },
    WARN: {
      Svg: SvgFillError,
      clr: 'yellow__600',
      txtTwd: 'text-yellow-600',
      bdTwd: 'border-yellow-600',
      css: 'var(--yellow__600)',
    },
    ERR: {
      Svg: SvgFillError,
      clr: 'red__600',
      txtTwd: 'text-red-600',
      bdTwd: 'border-red-600',
      css: 'var(--red__600)',
    },
  };

  public static byT(e: AppEventT): AppEventMetaT {
    return this.eventsData[e];
  }
}

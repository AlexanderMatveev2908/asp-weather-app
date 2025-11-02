import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillBuilding } from '@/common/components/svgs/fill/building/building';
import { SvgFillJobPosition } from '@/common/components/svgs/fill/job_position/job-position';
import { SvgFillSandglass } from '@/common/components/svgs/fill/sandglass/sandglass';
import { WithIdT } from '@/common/types/etc';
import { LibDate } from '@/core/lib/data_structure/date';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';
import { ApplicationT } from '@/features/applications/etc/types';

export class ApplicationItemUiFkt extends RootUiFkt {
  public static pairsLabelSvg(arg: ApplicationT): (SpanPropsT & WithIdT)[] {
    return this.arrWithIDs([
      {
        label: arg.companyName,
        Svg: SvgFillBuilding,
      },
      {
        label: arg.positionName,
        Svg: SvgFillJobPosition,
      },
      {
        label: LibDate.fromTmspToPretty(arg.appliedAt),
        Svg: SvgFillSandglass,
      },
    ]);
  }
}

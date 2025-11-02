import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { SvgStrokeUserCheck } from '@/common/components/svgs/stroke/user_check/user-check';
import { SvgStrokeUserQuest } from '@/common/components/svgs/stroke/user_quest/user-quest';

export class SidebarUiFkt {
  public static readonly spanNotLogged: SpanPropsT = {
    label: 'User',
    Svg: SvgStrokeUserQuest,
  };

  public static readonly spanLogged: SpanPropsT = {
    label: 'Account',
    Svg: SvgStrokeUserCheck,
  };
}

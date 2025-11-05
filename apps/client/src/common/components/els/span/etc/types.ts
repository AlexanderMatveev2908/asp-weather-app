import { SvgClsT, TxtClsT } from '@/common/types/css';
import { Nullable, SvgT } from '@/common/types/etc';

export interface SpanPropsT {
  label: Nullable<string>;
  Svg: Nullable<SvgT>;
}

export interface SpanSizesPropsT {
  txt: TxtClsT;
  svg: SvgClsT;
}

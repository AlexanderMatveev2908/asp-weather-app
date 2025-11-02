import { SvgClsT, TxtClsT } from '@/common/types/css';
import { Nullable, SvgT, WithEventT, WithIdT } from '@/common/types/etc';

export interface SpanPropsT {
  label: Nullable<string>;
  Svg: Nullable<SvgT>;
}

export interface SpanSizesPropsT {
  txt: TxtClsT;
  svg: SvgClsT;
}

export interface SpanEventPropsT extends SpanPropsT, WithEventT {}

// ! most of links if not all are always passed
// ! dynamically in loop so they need an id to track them in DOM
export interface SpanLinkPropsT extends SpanEventPropsT, WithIdT {
  path: string;
  insteadHere?: string;
}

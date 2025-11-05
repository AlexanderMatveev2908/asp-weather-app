import { AppEventT } from '@/common/types/etc';

export interface PopupStaticPropsT {
  cls: PopupCssClsT;
  closeOnMouseOut: boolean;
  eventT: AppEventT;
  closePop: () => void;
}

export type PopupCssClsT = 'wake_up' | 'generic_popup';

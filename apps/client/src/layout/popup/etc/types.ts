import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';

export interface PopupStaticPropsT {
  cls: PopupClsT;
  closeOnMouseOut: boolean;
  eventT: AppEventT;
  closePop: () => void;
}

export type PopupClsT = 'wake_up' | 'generic_popup';

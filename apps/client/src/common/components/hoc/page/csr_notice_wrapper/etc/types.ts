import { Nullable } from '@/common/types/etc';
import { AppEventPayloadT } from '@/core/lib/dom/meta_event/etc/types';
import { NoticeTmptT } from '@/features/notice/reducer/reducer';

export interface NoticeWrapperPropsT extends AppEventPayloadT {
  tmpt: Nullable<NoticeTmptT>;
}

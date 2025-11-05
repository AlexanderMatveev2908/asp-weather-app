import { AppPayloadEventT } from '@/common/types/etc';

export type NoticeWrapperPropsT = Omit<AppPayloadEventT, 'eventT'>;

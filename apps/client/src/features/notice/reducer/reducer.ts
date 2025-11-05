import { createReducer, on } from '@ngrx/store';
import { NoticeActT } from './actions';
import { AppPayloadEventT, Nullable } from '@/common/types/etc';

export type NoticeTmptT = 'mail';
export type NoticeWithoutCb = Omit<NoticeStateT, 'cb'>;

export interface NoticeStateT extends AppPayloadEventT {
  cb: Nullable<() => void>;
  tmpt: Nullable<NoticeTmptT>;
}

export const initState: NoticeStateT = {
  msg: '',
  status: 0,
  eventT: 'NONE',
  cb: null,
  tmpt: null,
};

export const noticeReducer = createReducer(
  initState,
  on(NoticeActT.RESET__NOTICE_STATE, (_: NoticeStateT) => initState),
  on(NoticeActT.SET_NOTICE, (_: NoticeStateT, action: NoticeStateT) => ({
    ...action,
  }))
);

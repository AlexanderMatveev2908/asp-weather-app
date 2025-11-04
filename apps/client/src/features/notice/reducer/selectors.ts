import { createFeatureSelector } from '@ngrx/store';
import { NoticeStateT } from './reducer';

export const getNoticeState = createFeatureSelector<NoticeStateT>('notice');

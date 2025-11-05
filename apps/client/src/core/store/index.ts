import { noticeReducer, NoticeStateT } from '@/features/notice/reducer/reducer';
import { toastReducer, ToastStateT } from '@/features/toast/reducer/reducer';
import { weatherReducer, WeatherStateT } from '@/features/weather/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  toast: ToastStateT;
  notice: NoticeStateT;
  weather: WeatherStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  toast: toastReducer,
  notice: noticeReducer,
  weather: weatherReducer,
};

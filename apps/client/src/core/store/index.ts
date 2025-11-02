import { applicationsReducer, ApplicationsStateT } from '@/features/applications/reducer/reducer';
import { authReducer, AuthStateT } from '@/features/auth/reducer/reducer';
import { cbcHmacReducer, CbcHmacStateT } from '@/features/cbcHmac/reducer/reducer';
import { noticeReducer, NoticeStateT } from '@/features/notice/reducer/reducer';
import { sideReducer, SideStateT } from '@/features/sidebar/reducer/reducer';
import { toastReducer, ToastStateT } from '@/features/toast/reducer/reducer';
import { userReducer, UserStateT } from '@/features/user/reducer/reducer';
import { wakeUpReducer, WakeUpStateT } from '@/features/wake_up/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  side: SideStateT;
  notice: NoticeStateT;
  toast: ToastStateT;
  wakeUp: WakeUpStateT;
  auth: AuthStateT;
  user: UserStateT;
  cbcHmac: CbcHmacStateT;
  applications: ApplicationsStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  side: sideReducer,
  notice: noticeReducer,
  toast: toastReducer,
  wakeUp: wakeUpReducer,
  auth: authReducer,
  user: userReducer,
  cbcHmac: cbcHmacReducer,
  applications: applicationsReducer,
};

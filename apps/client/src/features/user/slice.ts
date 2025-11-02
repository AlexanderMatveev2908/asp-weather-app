import { computed, Injectable, Signal } from '@angular/core';
import { UserStateT } from './reducer/reducer';
import { getUserState } from './reducer/selectors';
import { UseKitSliceHk } from '@/core/hooks/kits/use_kit_slice';
import { UserT } from './etc/types';
import { UserActT } from './reducer/actions';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class UserSlice extends UseKitSliceHk {
  public get userState(): Signal<UserStateT> {
    return this.store.selectSignal(getUserState);
  }

  public readonly user: Signal<Nullable<UserT>> = computed(() => this.userState().user);

  public setUser(user: UserT): void {
    this.store.dispatch(UserActT.SET_USER(user));
  }

  public markNull(): void {
    this.store.dispatch(UserActT.MARK_NULL());
  }

  public setPending(val: boolean): void {
    this.store.dispatch(UserActT.SET_PENDING({ isPending: val }));
  }

  public triggerApi(): void {
    this.store.dispatch(UserActT.TRIGGER_API());
  }

  public mark: Signal<number> = computed(() => this.userState().mark);

  public handshake: Signal<boolean> = computed(() => this.userState().handShake);

  public reset(): void {
    this.store.dispatch(UserActT.RESET_USER_STATE());
  }
}

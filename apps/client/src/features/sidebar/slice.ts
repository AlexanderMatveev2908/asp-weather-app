import { Injectable, Signal } from '@angular/core';
import { getSideState } from './reducer/selectors';
import { SideStateT } from './reducer/reducer';
import { SidebarActT } from './reducer/actions';
import { UseKitSliceHk } from '@/core/hooks/kits/use_kit_slice';

@Injectable({
  providedIn: 'root',
})
export class SidebarSlice extends UseKitSliceHk {
  public get sideState(): Signal<SideStateT> {
    return this.store.selectSignal(getSideState);
  }

  public toggle(): void {
    this.store.dispatch(SidebarActT.TOGGLE());
  }

  public close(): void {
    this.store.dispatch(SidebarActT.CLOSE());
  }
}

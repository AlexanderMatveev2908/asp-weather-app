import { Directive, HostListener, signal, ViewChild, WritableSignal } from '@angular/core';
import { Nullable, RefDomT } from '@/common/types/etc';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Directive()
export abstract class UsePortalDir extends UseInjCtxHk {
  // ? local state
  public readonly coords: WritableSignal<Nullable<RecCoordsT>> = signal(null);

  // ? ref tooltip to calculate position wanted
  // ? relative to a certain element
  @ViewChild('tooltipRef') tooltipRef: RefDomT;

  // ? listeners
  protected readonly setCoords: () => void = () => {
    this.usePlatform.onClient(() => {
      this.coords.set(PortalDOM.coordsOfRef(this.tooltipRef));
    });
  };

  @HostListener('window:scroll')
  public onScroll(): void {
    this.setCoords();
  }
  @HostListener('window:resize')
  public onResize(): void {
    this.setCoords();
  }
}

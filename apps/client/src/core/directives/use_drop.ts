import {
  ContentChild,
  Directive,
  HostListener,
  input,
  InputSignal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RefDomT, RefTemplateT } from '@/common/types/etc';
import { MouseDOM } from '../lib/dom/mouse';

@Directive()
export abstract class UseDropDir {
  // ? props
  public readonly isOpen: InputSignal<boolean> = input.required();
  public readonly setIsOpen: InputSignal<(val: boolean) => void> = input.required();
  public readonly closeOnMouseOut: InputSignal<boolean> = input.required();

  // ? children & projected
  @ViewChild('drop') drop: RefDomT;
  @ContentChild('dropContent', { read: TemplateRef }) dropContentRef: RefTemplateT;

  // ? listeners
  public onClick(): void {
    this.setIsOpen()(!this.isOpen());
  }

  @HostListener('document:mousedown', ['$event'])
  protected onMouseDown(e: MouseEvent): void {
    MouseDOM.onMouseOut(this.drop, e, () =>
      this.closeOnMouseOut() ? this.setIsOpen()(false) : null
    );
  }
}

import { ElDomT, Nullable, RefDomT } from '@/common/types/etc';
import { TxtFieldArrayT } from '@/common/types/forms';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  InputSignal,
  Signal,
  Type,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SvgStrokeSearchPlus } from '@/common/components/svgs/stroke/search_plus/search-plus';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { v4 } from 'uuid';
import { LibShapeCheck } from '@/core/lib/data_structure/shape_check';
import { FocusDOM } from '@/core/lib/dom/focus';
import { BaseSearchBarFormT } from '../../../paperwork';
import { UseDropHk } from '@/core/hooks/closable/use_drop';
import { LibPrs } from '@/core/lib/data_structure/prs';

@Component({
  selector: 'app-search-bar-drop-add-field',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './search-bar-drop-add-field.html',
  styleUrl: './search-bar-drop-add-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class SearchBarDropAddField<T> {
  // ? props
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly formVal: InputSignal<Nullable<BaseSearchBarFormT<T>>> = input.required();
  public readonly txtInputsAvailable: InputSignal<() => TxtFieldArrayT[]> = input.required();

  // ? derived
  public readonly txtFieldsLessPresent: Signal<TxtFieldArrayT[]> = computed(() => {
    const existing: TxtFieldArrayT[] = (this.formVal()?.txtInputs ?? []).filter(
      (f: TxtFieldArrayT) => LibShapeCheck.hasObjData(f)
    );

    const namesIn: Set<string> = new Set<string>(existing.map((f: TxtFieldArrayT) => f.name));

    return this.txtInputsAvailable()().filter((f: TxtFieldArrayT) => !namesIn.has(f.name));
  });

  // ? hooks
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  // ? helpers
  public toggle(): void {
    this.useDrop.isOpen.set(!this.useDrop.isOpen());
  }

  // ? children
  @ViewChild('dropRef') dropRef: RefDomT;
  @ViewChild('dropBtnRef') dropBtnRef: RefDomT;

  // ? derived
  public readonly twd: Signal<string> = computed(() =>
    this.useDrop.isOpen()
      ? 'opacity-100 translate-y-[120%] pointer-events-auto'
      : 'opacity-0 translate-y-0 pointer-events-none'
  );

  public itemDropTestID(f: TxtFieldArrayT): string {
    return `drop_txt_inputs__${LibPrs.toSnake(f.name)}`;
  }

  // ? props span drop-abs
  public readonly SvgDrop: Type<unknown> = SvgStrokeSearchPlus;

  // ? listeners

  public addField(f: TxtFieldArrayT): void {
    const txtInputs: FormArray = this.form().get('txtInputs') as FormArray;

    txtInputs.push(
      new FormControl({
        ...f,
        id: v4(),
      })
    );

    this.useDrop.setIsOpen(false);

    setTimeout(() => {
      FocusDOM.byDataField(`txtInputs.${txtInputs.length - 1}`);
    }, 0);
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const drop: ElDomT = this.dropRef?.nativeElement;
    const dropBtn: ElDomT = this.dropBtnRef?.nativeElement;

    const target: Nullable<HTMLElement> = e.target as HTMLElement;

    if ([drop, dropBtn, target].some((el: ElDomT | HTMLElement) => !el)) return;

    if (this.useDrop.isOpen() && ![drop, dropBtn].some((el: ElDomT) => el!.contains(target)))
      this.useDrop.isOpen.set(false);
  }
}

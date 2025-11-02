import { Nullable } from '@/common/types/etc';
import { CheckBoxFieldT } from '@/common/types/forms';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseIDsDir } from '@/core/directives/use_ids';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-box-lg',
  imports: [],
  templateUrl: './form-field-box-lg.html',
  styleUrl: './form-field-box-lg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxLg implements OnInit {
  // ? directives
  public readonly useFormFieldDir: UseFormFieldDir = inject(UseFormFieldDir);
  public readonly useIdsDir: UseIDsDir = inject(UseIDsDir);

  // ? props
  public readonly f: InputSignal<CheckBoxFieldT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? local state
  public readonly wasHover: WritableSignal<boolean> = signal(false);

  public onHover(): void {
    if (this.isChosen()) this.wasHover.set(true);
  }
  public onOut(): void {
    this.wasHover.set(false);
  }

  // ? derived
  public readonly isChosen: Signal<boolean> = computed(() => {
    const currVal: Nullable<string | string[]> = (this.useFormFieldDir.val?.() ?? null) as Nullable<
      string | string[]
    >;
    if (this.f().type === 'radio') return currVal === this.f().val;
    return ((currVal ?? []) as string[]).some((el: string) => el === this.f().val);
  });
  public readonly transform: Signal<string> = computed(
    () => `scale(${this.isChosen() ? '1.2' : '1'})`
  );
  public readonly transformHover: Signal<string> = computed(
    () => `scale(${this.isChosen() || !this.wasHover() ? '1.2' : '1'})`
  );
  public readonly bg: Signal<string> = computed(
    () => `var(--${this.isChosen() ? 'gray__300' : 'neutral__950'})`
  );
  public readonly clr: Signal<string> = computed(
    () => `var(--${this.isChosen() ? 'neutral__950' : 'gray__300'})`
  );
  public readonly bgHover: Signal<string> = computed(
    () => `var(--${this.isChosen() || !this.wasHover() ? 'gray__300' : 'neutral__950'})`
  );
  public readonly clrHover: Signal<string> = computed(
    () => `var(--${this.isChosen() || !this.wasHover() ? 'neutral__950' : 'gray__300'})`
  );

  // ? listeners
  private withRadio(): void {
    this.ctrl().setValue(this.isChosen() ? '' : this.f().val);
  }

  private withCheckBox(): void {
    const existing: string[] = (this.useFormFieldDir.val?.() ?? []) as string[];

    this.ctrl().setValue(
      existing.some((str: string) => str === this.f().val)
        ? existing.filter((el: string) => el !== this.f().val)
        : [...existing, this.f().val]
    );
  }

  public onClick(): void {
    this.wasHover.set(this.isChosen());

    this.ctrl().markAsDirty();
    this.ctrl().markAsTouched();

    if (this.f().type === 'radio') this.withRadio();
    else this.withCheckBox();
  }

  ngOnInit(): void {
    this.useFormFieldDir.setupWithCtrl(this.ctrl());
  }
}

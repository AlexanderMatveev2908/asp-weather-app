import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { TotpFormUiFkt, TotpPartFieldsT } from '../etc/ui_fkt';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Reg } from '@/core/paperwork/reg';
import { FocusDOM } from '@/core/lib/dom/focus';
import { from } from 'rxjs';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-totp-part',
  imports: [ReactiveFormsModule],
  templateUrl: './totp-part.html',
  styleUrl: './totp-part.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotpPart {
  // ? props
  public readonly part: InputSignal<TotpPartFieldsT> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly skip: InputSignal<number> = input.required();
  public readonly formCtrl: InputSignal<(innerIdx: number) => FormControl> = input.required();
  public readonly selectAll: InputSignal<boolean> = input.required();
  public readonly formID: InputSignal<Nullable<string>> = input.required();

  // ? derived
  public readonly bg: Signal<string> = computed(() =>
    this.selectAll() ? 'var(--gray__300)' : 'var(--neutral__950)'
  );
  public readonly clr: Signal<string> = computed(
    () => `var(--${this.selectAll() ? 'neutral__950' : 'gray__300'})`
  );

  // ? helpers

  // ? listeners
  public onChange(e: Event, innerIdx: number): void {
    const input: HTMLInputElement = e.target as HTMLInputElement;

    if (!Reg.isInt(input.value)) {
      const ctrl: FormControl = this.formCtrl()(innerIdx);
      ctrl.setValue('');
      return;
    }

    const nextIdx: number = this.skip() + innerIdx + 1;
    if (nextIdx > TotpFormUiFkt.nFields) return;

    const nextBox: string = `totp.${nextIdx}`;
    FocusDOM.byDataField(nextBox);
  }

  private blurOnPaste(realIdx: number): void {
    // ? for blur purposes
    const nextIdx: number = realIdx + 1;
    const nextTotpField: string = `totp.${
      nextIdx > TotpFormUiFkt.nFields ? TotpFormUiFkt.nFields : nextIdx
    }`;
    FocusDOM.blurByField(nextTotpField);
  }

  private getPartialExistingCode(realIdx: number): string[] {
    // | do not override previous boxes
    const existing: string[] = this.form().value.totp;
    const untilHere: string[] = existing.slice(0, realIdx);

    return untilHere;
  }

  public onPaste(_: Event, innerIdx: number): void {
    from(navigator.clipboard.readText()).subscribe({
      next: (txt: Nullable<string>) => {
        if (!txt) return;

        const realIdx: number = this.skip() + innerIdx;

        const newPartialCode: string = txt.trim().slice(0, TotpFormUiFkt.nFields);
        if (!Reg.isTotpCode(newPartialCode)) return;

        const partialExistingCode: string[] = this.getPartialExistingCode(realIdx);
        // ? extract num fields to paste
        const diff: number = TotpFormUiFkt.nFields - realIdx;

        this.form().setValue({
          totp: [
            ...partialExistingCode,
            ...Array.from({ length: diff }, (_: undefined, idx: number) => newPartialCode[idx]),
          ],
        });

        this.blurOnPaste(realIdx);

        const currDigits: string[] = this.form().value.totp;
        const currCode: string = currDigits.join('');
        if (!Reg.isTotpCode(currCode)) return;

        const form: Nullable<HTMLFormElement> = document.querySelector(
          `[data-testid="${this.formID()}"]`
        );
        if (!form) return;

        form.requestSubmit();
      },
    });
  }
}

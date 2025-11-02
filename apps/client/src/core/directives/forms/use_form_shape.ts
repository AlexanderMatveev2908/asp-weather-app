import { Directive, input, InputSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appUseFormShapeDir]',
})
export class UseFormShapeDir {
  public readonly fromGroup: InputSignal<FormGroup> = input.required();
  public readonly onSubmit: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();
}

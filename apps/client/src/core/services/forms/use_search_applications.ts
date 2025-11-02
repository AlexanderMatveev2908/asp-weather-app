import { Nullable } from '@/common/types/etc';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchApplicationsFormMng } from '@/features/applications/etc/forms/search_applications/etc/paperwork/form_mng';
import { SearchApplicationsUiFkt } from '@/features/applications/etc/forms/search_applications/etc/ui_fkt';
import { ApplicationT } from '@/features/applications/etc/types';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TxtInputsKeysAvailable = 'companyName' | 'positionName';

@Injectable({
  providedIn: 'root',
})
export class UseSearchApplicationsFormSvc {
  public readonly form: FormGroup = SearchApplicationsFormMng.form();

  private findCtrl(formArray: FormArray, fieldKey: TxtInputsKeysAvailable): Nullable<FormControl> {
    let found: Nullable<FormControl> = null;

    for (const ctrl of formArray.controls) {
      const field: TxtFieldArrayT = ctrl.value;

      if (field.name !== fieldKey) continue;

      found = ctrl as FormControl;
      return found;
    }

    return null;
  }

  private setTxtInput(fieldKey: TxtInputsKeysAvailable, fieldVal: string): void {
    const formArray: FormArray = this.form.get('txtInputs') as FormArray;

    let found: Nullable<FormControl> = this.findCtrl(formArray, fieldKey);

    if (!found) {
      formArray.push(new FormControl(SearchApplicationsUiFkt[fieldKey]()));
      found = this.findCtrl(formArray, fieldKey) as FormControl;
    }

    found.setValue({
      ...found.value,
      val: fieldVal,
    });
  }

  public preFillFieldsWith(application: ApplicationT): void {
    this.setTxtInput('companyName', application.companyName);
    this.setTxtInput('positionName', application.positionName);
  }
}

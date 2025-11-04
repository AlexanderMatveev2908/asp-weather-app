import { Nullable } from '@/common/types/etc';
import { Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormWeatherT } from '../../../paperwork/form_mng';

export interface UseDebounceMainArgT {
  form: FormGroup;
  formValue: Nullable<Signal<FormWeatherT>>;
  triggerStrategy: (arg: FormWeatherT) => void;
}

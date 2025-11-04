import { TxtFieldT } from '@/common/types/forms';
import { FormsUiFkt } from '@/core/ui_fkt/forms/forms';

export class FormWeatherUiFkt extends FormsUiFkt {
  public static cityField: TxtFieldT = this.txtFieldOf({ name: 'city', place: 'Search City...' });
}

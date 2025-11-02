import { CheckBoxFieldT, TxtFieldT } from '@/common/types/forms';
import { LibPrs } from '@/core/lib/data_structure/prs';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';
import { ApplicationStatusT } from '@/features/applications/etc/types';

export class ApplicationFormUiFkt extends FormFieldsUiFkt {
  public static txtInputs: () => TxtFieldT[] = () => [
    this.txtFieldOf({ name: 'companyName' }),
    this.txtFieldOf({ name: 'positionName' }),
    this.txtFieldOf({ name: 'notes', type: 'textarea' }),
    this.txtFieldOf({ name: 'appliedAt', type: 'date' }),
  ];

  public static readonly fieldsBox: () => CheckBoxFieldT[] = () =>
    Object.values(ApplicationStatusT).map((v: string) =>
      this.checkBoxFieldOf({
        name: 'status',
        val: v,
        label: LibPrs.titleCase(v.split('_').join(' ')),
      })
    );
}

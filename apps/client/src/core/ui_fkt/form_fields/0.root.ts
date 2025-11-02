import { CheckBoxFieldT, CheckFieldT, TxtFieldArrayT, TxtFieldT } from '@/common/types/forms';
import { RootUiFkt } from '../root_ui';
import { LibPrs } from '../../lib/data_structure/prs';

export class FormFieldsUiFkt extends RootUiFkt {
  private static labelOf(arg: { name: string; label?: string }): string {
    return arg?.label ?? LibPrs.txtOfCamelCase(arg.name, { titleCase: true });
  }

  public static txtFieldOf(arg: Partial<TxtFieldT> & { name: string }): TxtFieldT {
    const label = this.labelOf(arg);

    return this.withID({
      ...arg,
      field: arg.field ?? arg.name,
      label,
      place: label + '...',
      type: arg.type ?? 'text',
    });
  }

  public static checkFieldOf(arg: Partial<CheckFieldT> & { name: string }): CheckFieldT {
    const label = this.labelOf(arg);

    return this.withID({
      ...arg,
      field: arg.field ?? arg.name,
      label,
      type: arg?.type ?? 'radio',
    });
  }

  public static checkBoxFieldOf(
    arg: Partial<CheckBoxFieldT> & { name: string; label: string; val: string }
  ): CheckBoxFieldT {
    return this.withID({
      name: arg.name,
      field: arg.field ?? arg.name,
      val: arg.val,
      label: arg.label,
      type: arg?.type ?? 'radio',
    });
  }

  public static fieldArrayOf(
    arg: Partial<TxtFieldArrayT> & { name: string; field: string }
  ): TxtFieldArrayT {
    return {
      ...this.txtFieldOf(arg),
      val: '',
    };
  }
}

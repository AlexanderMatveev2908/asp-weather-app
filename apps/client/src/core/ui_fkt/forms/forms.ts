import { TxtFieldT } from '@/common/types/forms';
import { RootUiFkt } from '../root';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';

export class FormsUiFkt extends RootUiFkt {
  public static txtFieldOf(arg: Partial<TxtFieldT> & { name: string }): TxtFieldT {
    return this.withID({
      ...arg,
      place: arg.place ?? LibPrs.txtOfCamelCase(arg.name, { titleCase: true }) + '...',
      field: arg.field ?? arg.name,
      type: arg.type ?? 'text',
    });
  }
}

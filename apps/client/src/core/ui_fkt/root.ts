import { WithIdT } from '@/common/types/etc';
import { v4 } from 'uuid';

export class RootUiFkt {
  public static withID<T>(arg: T): WithIdT<T> {
    return {
      ...arg,
      id: v4(),
    };
  }
}

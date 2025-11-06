import { WithIdT } from '@/common/types/etc';
import { v4 } from 'uuid';

export class RootUiFkt {
  public static withID<T>(arg: T): WithIdT<T> {
    return {
      ...arg,
      id: v4(),
    };
  }

  public static listWithIDs<T>(arg: T[]): WithIdT<T>[] {
    return arg.map((el: T) => this.withID(el));
  }
}

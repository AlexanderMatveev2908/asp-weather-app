import { WithEventT, WithIdT } from '@/common/types/etc';
import { v4 } from 'uuid';
import { AppEventT } from '../lib/dom/meta_event/etc/types';

export class RootUiFkt {
  public static withID<T>(arg: T): T & WithIdT {
    return {
      ...arg,
      id: v4(),
    };
  }

  public static withIdAndEvent<T>(arg: T, eventT?: AppEventT): T & WithIdT & WithEventT {
    return {
      ...arg,
      id: v4(),
      eventT: eventT ?? 'NONE',
    };
  }

  public static arrWithIDs<T>(arg: T[]): (T & WithIdT)[] {
    return arg.map((el: T) => this.withID(el));
  }

  public static arrWithIdAndEvent<T>(arg: T[], eventT?: AppEventT): (T & WithEventT & WithIdT)[] {
    return arg.map((el: T) => this.withIdAndEvent(el, eventT));
  }
}

import { Nullable, TimerIdT } from '@/common/types/etc';

export class Lorem {
  public genLorem(n: number): string {
    return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quod, exercitationem tempora distinctio molestiae accusantium voluptatem! Maiores, obcaecati ullam, hic aliquam ipsum ex laudantium quidem voluptates, nisi autem natus iste.'.repeat(
      n
    );
  }
}

export class LibEtc {
  public static clearTmrID(timerID: TimerIdT): null {
    if (timerID) clearTimeout(timerID);

    return null;
  }

  public static idxIn(target: string, lists: string[][]): Nullable<number> {
    let i: number = 0;

    while (i < lists.length) {
      const list: string[] = lists[i];

      if (list.includes(target)) return i;
      i++;
    }

    return null;
  }
}

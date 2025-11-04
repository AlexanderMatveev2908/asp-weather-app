import { Dict } from '@/common/types/etc';

export class LibMemory {
  // eslint-disable-next-line complexity
  public static cpy<T>(arg: T): T {
    if (arg === null || typeof arg === 'function' || typeof arg !== 'object') return arg;

    if (arg instanceof Date) return new Date(arg) as T;

    if (arg instanceof RegExp) return new RegExp(arg.source, arg.flags) as T;

    if (arg instanceof Set) return new Set(Array.from(arg, (v: T) => this.cpy(v))) as T;

    if (arg instanceof Map)
      return new Map(
        Array.from(arg.entries(), ([k, v]: [T, T]) => [this.cpy(k), this.cpy(v)])
      ) as T;

    if (Array.isArray(arg)) return arg.map((v: T) => this.cpy(v)) as T;

    const obj: Dict = {};

    for (const k in arg)
      if (Object.prototype.hasOwnProperty.call(arg, k)) obj[k] = this.cpy(obj[k]);

    return obj as T;
  }

  private static isSameSet<T>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) return false;

    for (const item of a) {
      let found = false;
      for (const other of b) {
        if (this.isSame(item, other)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }

  private static isSameMap<T, K>(a: Map<K, T>, b: Map<K, T>): boolean {
    if (a.size !== b.size) return false;
    for (const [key, valueA] of a.entries()) {
      if (!b.has(key)) return false;
      const valueB = b.get(key);
      if (!this.isSame(valueA, valueB)) return false;
    }
    return true;
  }

  private static isSameDict(a: Dict, b: Dict): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      const valA = a[key];
      const valB = b[key];
      if (!this.isSame(valA, valB)) return false;
    }

    return true;
  }

  private static isSameList<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!this.isSame(a[i], b[i])) return false;

    return true;
  }

  // eslint-disable-next-line complexity
  public static isSame<T>(a: T, b: T): boolean {
    if (a === b) return true;

    if ([a, b].some((el: T) => typeof el !== 'object' || el === null)) return false;

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    if (a instanceof RegExp && b instanceof RegExp)
      return a.source === b.source && a.flags === b.flags;

    if (Array.isArray(a) && Array.isArray(b)) return this.isSameList(a, b);

    if (a instanceof Set && b instanceof Set) return this.isSameSet(a, b);
    if (a instanceof Map && b instanceof Map) return this.isSameMap(a, b);

    return this.isSameDict(a as Dict, b as Dict);
  }
}

import { Injectable } from '@angular/core';
import { _UseNavNoticeHk } from './2.use_notice';
import { Nullable } from '@/common/types/etc';
import { MetaNavT, NavFromT } from './0.use_path';

@Injectable()
export abstract class _UseNavSecurityHk extends _UseNavNoticeHk {
  private readonly ALLOWED_FROM: Set<NavFromT> = new Set<NavFromT>(['err', 'ok']);

  private allowedFrom(): boolean {
    const meta: Nullable<MetaNavT> = this.meta();

    if (!meta?.from || !this.ALLOWED_FROM.has(meta?.from)) return false;
    return true;
  }

  public pushOutIfNotFrom(path: string): void {
    this.useEffect(() => {
      this.ifPathEqual(path, () => {
        if (this.allowedFrom()) return;

        void this.replace('/');
      });
    });
  }
}

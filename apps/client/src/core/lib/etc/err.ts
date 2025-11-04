import { ApiStatusT } from '@/core/store/api/etc/types';

export class ErrApp extends Error {
  private readonly msg: string;
  private readonly status: number;

  constructor(msg: string);
  constructor(msg: string, status: number);

  constructor(msg: string, status?: number) {
    super(msg);
    this.msg = `❌ ${msg}`;
    this.status = status ?? ApiStatusT.INTERNAL_SERVER_ERROR;
  }

  public getMsg(): string {
    return this.msg;
  }

  public getStatus(): number {
    return this.status;
  }
}

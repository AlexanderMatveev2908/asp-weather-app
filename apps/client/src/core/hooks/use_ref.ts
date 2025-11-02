import { Injectable } from '@angular/core';

@Injectable()
export class UseRefHk {
  private ref: unknown = null;

  public set current(val: unknown) {
    this.ref = val;
  }

  public get current(): unknown {
    return this.ref;
  }
}

import { Type } from '@angular/core';

export type None = null | undefined;

export type OrNone<T> = T | None;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type SvgT = Type<unknown>;

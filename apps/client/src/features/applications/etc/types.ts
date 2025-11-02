import { Nullable, SqlTableT } from '@/common/types/etc';

export enum ApplicationStatusT {
  APPLIED = 'APPLIED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export interface ApplicationT extends SqlTableT {
  companyName: string;
  positionName: string;
  notes: Nullable<string>;
  status: ApplicationStatusT;
  appliedAt: number;
}

export interface ApplicationResT {
  jobApplication: ApplicationT;
}
